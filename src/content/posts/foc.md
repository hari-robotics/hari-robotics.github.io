---
title: FOC电机控制
published: 2024-07-17
description: '电机系统与FOC控制'
image: ''
tags: [电机, 控制]
category: '电机'
draft: false 
---

:::warning
本文内含大量公式，可能导致头晕，请做好观前准备
:::

## 电机数学建模
对于一个三相PMSM，其电压方程为：
$$
\begin{bmatrix}
    v_a \\ v_b \\ v_c
\end{bmatrix} = \begin{bmatrix}
    R_S & 0 & 0 \\
    0 & R_S & 0 \\
    0 & 0 & R_S
\end{bmatrix} \begin{bmatrix}
    i_a \\ i_b \\ i_c
\end{bmatrix} + \begin{bmatrix}
    \dot{\Psi}_a \\
    \dot{\Psi}_b \\
    \dot{\Psi}_c
\end{bmatrix}
$$

$v_a, v_b, v_c$是相电压，$R_S$是相电阻，$i_a, i_b, i_c$是相电流，$\dot{\Psi}_a, \dot{\Psi}_b, \dot{\Psi}_c$是定子三相绕组的磁链变化率。通过定子的磁链可以使用以下等式表示：
$$
\begin{bmatrix}
    \Psi_a \\ \Psi_b \\ \Psi_c
\end{bmatrix} = \begin{bmatrix}
    L_{aa} & L_{ab} & L_{ac} \\
    L_{ba} & L_{bb} & L_{bc} \\
    L_{ca} & L_{cb} & L_{cc}
\end{bmatrix} \begin{bmatrix}
    i_a \\ i_b \\ i_c
\end{bmatrix} + \begin{bmatrix}
    \Psi_{am} \\ \Psi_{bm} \\ \Psi_{cm}
\end{bmatrix}
$$

其中$\mathbf{L}$矩阵的对角项为自感，其余为互感，$\Psi_{am}, \Psi_{bm}, \Psi_{cm}$是永磁体在三相绕组上产生的磁链。定子电感与转子角度相关，有如下关系：
$$
\begin{aligned}
    \theta_e &= N*\theta_r \\
    L_{aa} &= L_S + L_m \cos{(2\theta_e)} \\
    L_{bb} &= L_S + L_m \cos{2(\theta_e - 2\pi/3)} \\
    L_{cc} &= L_S + L_m \cos{2(\theta_e + 2\pi/3)} \\
    L_{ab} &= L_{ba} = -M_S - L_m \cos{2(\theta_e + \pi/6)} \\
    L_{bc} &= L_{cb} = -M_S - L_m \cos{2(\theta_e + \pi/6 - 2\pi/3)} \\
    L_{ca} &= L_{ac} = -M_S - L_m \cos{2(\theta_e + \pi/6 + 2\pi/3)} \\
\end{aligned}
$$

$\theta_r$是机械转角，$\theta_e$是电角度，$N$是极对数，$L_S$是相定子自感，$L_m$是定子脉动电感，与自感、互感和转子角度变换相关，$M_S$是定子互感。永磁体在定子上产生的磁链也与电角度相关：
$$
\begin{bmatrix}
    \Psi_{am} \\ \Psi_{bm} \\ \Psi_{cm}
\end{bmatrix} = \begin{bmatrix}
    \Psi_{m} \cos{\theta_e} \\
    \Psi_{m} \cos{\theta_e - 2\pi/3} \\
    \Psi_{m} \cos{\theta_e + 2\pi/3} \\
\end{bmatrix}
$$

由于三相电压不便于计算，我们使用Clarke-Park变换将三相电压转换为d-q轴表示。Clarke-Park有等幅值和等功率两种变换方法，这里我们使用等幅值变换，
$$
R_{P} = \frac23\begin{bmatrix}
    \cos{\theta_e} & \cos{\theta_e - 2\pi/3} & \cos{\theta_e + 2\pi/3} \\
    -\sin{\theta_e} & -\sin{\theta_e - 2\pi/3} & -\sin{\theta_e + 2\pi/3} \\
    0.5 & 0.5 & 0.5
\end{bmatrix}
$$

经过变换，可以将三相电压电流变换为dq轴电压电流，于是可以引出如下等式：
$$
\begin{aligned}
    v_d &= R_S i_d + L_d \overline{i}_d - N\omega i_q L_q \\
    v_q &= R_S i_q + L_q \overline{i}_q + N\omega (i_d L_d + \Psi_m) \\
    v_0 &= R_S i_0 + L_0 \overline{i}_0 \\
    T &= \frac32 N(i_q(i_d L_d + \Psi_m) - i_d i_q L_q)
\end{aligned}
$$

其中$L_d = L_S + M_S + 3/2 L_m$，是d轴电感，$L_q = L_S + M_S - 3/2 L_m$是q轴电感，$L_0 = L_S - 2M_S$是零序电感，$\omega$是机械角速度，$T$是产生的电磁转矩。

反电动势常数$k_e$与永磁体磁链之间存在线性关系，
$$
k_e = N \Psi_m
$$

:::note
该部分参考[Permanent magnet synchronous motor with sinusoidal flux distribution - MATLAB Documents](https://ww2.mathworks.cn/help/sps/ref/pmsm.html)编写
:::

## 控制器设计
### 电机模型转换
首先将电机数学模型转换为状态空间方程，
$$
\begin{bmatrix}
    \overline{i}_d \\
    \overline{i}_q
\end{bmatrix} = \begin{bmatrix}
    -\frac{R_S}{L_d} & N \omega \frac{L_q}{L_d}\\
    -N \omega \frac{L_d}{L_q}  & -\frac{R_S}{L_q}
\end{bmatrix} \begin{bmatrix}
    i_d \\ i_q
\end{bmatrix} + \begin{bmatrix}
    \frac{1}{L_d} & 0 \\
    0 & \frac{1}{L_q}
\end{bmatrix} \begin{bmatrix}
    v_d \\ v_q
\end{bmatrix} + \begin{bmatrix}
    0 \\ -N\omega \frac{\Psi_m}{L_q}
\end{bmatrix}
$$

根据机械运动方程，
$$
J \dot{\omega} = T - T_L - B\omega
$$

结合电磁转矩公式，可以得到转速与电流之间的关系：
$$
\dot{\omega} = \frac{3}{2J}N((L_d - L_q)i_d i_q + \Psi_m i_q) - \frac{T_L}{J} - \frac{B}{J} \omega
$$

### 基于电压前馈的线性化方法
为了实现dq轴电流的解耦控制，一般会使用电流前馈补偿实现电机系统的线性化：
$$
\begin{aligned}
    v_{d0} &= N \omega L_q i_q \\
    v_{q0} &= N \omega (L_d i_d + \Psi_m)
\end{aligned}
$$

其中$v_{d0}$和$v_{q0}$将作为前馈项补偿电压的非线性项，补偿后的系统将变为一个线性系统：
$$
\begin{bmatrix}
    \overline{i}_d \\
    \overline{i}_q
\end{bmatrix} = \begin{bmatrix}
    -\frac{R_S}{L_d} & 0\\
    0  & -\frac{R_S}{L_q}
\end{bmatrix} \begin{bmatrix}
    i_d \\ i_q
\end{bmatrix} + \begin{bmatrix}
    \frac{1}{L_d} & 0 \\
    0 & \frac{1}{L_q}
\end{bmatrix} \begin{bmatrix}
    v_d \\ v_q
\end{bmatrix}
$$

### 基于电流偏差前馈的线性化方法
不难发现，使用前馈电压法要求对电机系统参数的精确建模，如果存在参数不匹配的情况，将无法完全消除电流间的耦合问题。此时，我们可以使用电流偏差来做解耦控制，电机的输入期望电流为$i_d^*$和$i_q^*$，电流偏差解耦的传递函数为$G_d^{'}(s)$和$G_q^{'}(s)$，电流环控制器使用PID控制，传递函数为$G_d(s)$和$G_q(s)$，控制框图如下图所示：
![电流偏差解耦法](/PMSM/PMSM_CDDC.jpg)

根据图示可以推导出控制方程：
$$
\begin{aligned}
    v_d^* &= G_d(s)i_d^* + G_d^{'}(s)i_q - G_d(s)i_d - G_d^{'}(s)i_q^* \\
    v_q^* &= G_q(s)i_q^* + G_q^{'}(s)i_d^* - G_q(s)i_q - G_q^{'}(s)i_d + N\omega \Psi_m
\end{aligned}
$$

带入系统状态方程，可以得到：
$$
\begin{aligned}
    G_d(s)i_d^* + G_d^{'}(s)i_q - G_d(s)i_d - G_d^{'}(s)i_q^* &= (R_S + L_d s) i_d - N\omega L_q i_q \\
    G_q(s)i_q^* + G_q^{'}(s)i_d^* - G_q(s)i_q - G_q^{'}(s)i_d &= (R_S + L_q s) i_q + N\omega L_d i_d
\end{aligned}
$$

化简上式可以得到：
$$
\begin{aligned}
    ai_d^* + bi_q^* = ci_d + di_q \\
    mi_d^* + ni_q^* = pi_d + qi_q
\end{aligned}
$$

其中：
* $a = G_d(s)$
* $b = - G_d^{'}(s)$
* $c = (R_S + L_d s + G_d(s))$
* $d = - (G_d^{'}(s)  + N\omega L_q)$
* $m = G_q^{'}(s)$
* $n = G_q(s)$
* $p = (G_q^{'}(s) + N\omega L_d)$
* $q = (R_S + L_q s + G_q(s))$

写为矩阵形式，可以得到：
$$
\begin{bmatrix}
    i_d \\ i_q
\end{bmatrix} = \begin{bmatrix}
    A_{dd} & A_{dq} \\
    A_{qd} & A_{qq} 
\end{bmatrix} \begin{bmatrix}
    i_d^* \\ i_q^*
\end{bmatrix}
$$

其中，
* $A_{dd} = \frac{aq-dm}{cq-dp}$
* $A_{dq} = \frac{bq-dn}{cq-dp}$
* $A_{qd} = \frac{ap-cm}{dp-cq}$
* $A_{qq} = \frac{bp-cn}{dp-cq}$

当$A_{dq} = A_{qd} = 0$时，系统完全解耦。可以解得传递函数$G_d^{'}(s)$和$G_q^{'}(s)$：
$$
\begin{aligned}
    G_d^{'}(s) &= \frac{N\omega L_q}{R_S + L_q s}G_q(s) \\
    G_q^{'}(s) &= \frac{N\omega L_d}{R_S + L_d s}G_d(s)
\end{aligned}
$$
修改控制框图，使用电流偏差法解耦后的控制框图如下图：
![电流偏差法化简](/PMSM/PMSM_CDDC_Simplified.jpg)

### 滑模观测器设计
当估计值$\hat{L}_q$和$\hat{L}_d$与真实值$L_q, L_d$之间不匹配时，$A_{dq}, A_{qd} \neq 0$，系统中仍然存在耦合项。为了获取准确的电流，这里设计一个滑模观测器。

根据上面的电流状态方程，可以给出滑模观测器的估计方程：
$$
\begin{aligned}
    \dot{\hat{i}}_d &= -\frac{R_S}{L_d}\hat{i}_d + \frac{v_d}{L_d} + N \omega \frac{L_q}{L_d}\hat{i}_q + f_1 \\
    \dot{\hat{i}}_q &= -\frac{R_S}{L_q}\hat{i}_q + \frac{v_q}{L_q} - N \omega \frac{L_d}{L_q}\hat{i}_d - N\omega \frac{\Psi_m}{L_q} + f_2
\end{aligned}
$$

给出滑模观测器的控制律：
$$
\begin{bmatrix}
    f_1 \\ f_2
\end{bmatrix} = \begin{bmatrix}
    -\frac{R_S}{L_d}s_d + \frac{L_q}{L_d}N\omega s_q + K_d \mathrm{sign}(s_d) \\
    -\frac{R_S}{L_d}s_q - \frac{L_q}{L_d}N\omega s_d + K_q \mathrm{sign}(s_q)
\end{bmatrix}
$$

其中$K_d$和$K_q$分别为dq轴滑模增益，滑模面为：
$$
\mathbf{s} = \begin{bmatrix}
    s_d \\ s_q
\end{bmatrix} = \begin{bmatrix}
    \tilde{i}_d \\ \tilde{i}_q
\end{bmatrix} = \begin{bmatrix}
    i_d - \hat{i}_d \\ i_q - \hat{i}_q
\end{bmatrix}
$$

使用指数趋近律，有：
$$
\dot{\mathbf{s}} = \begin{bmatrix}
    \dot{s}_d \\ \dot{s}_q
\end{bmatrix} = \begin{bmatrix}
    -\frac{R_S}{L_d}s_d + \frac{L_q}{L_d}N\omega s_q + K_d \mathrm{sign}(s_d) \\
    -\frac{R_S}{L_d}s_q - \frac{L_q}{L_d}N\omega s_d + K_q \mathrm{sign}(s_q)
\end{bmatrix}
$$

根据李雅普诺夫稳定性，$\dot{V}(x) = \mathbf{s}\dot{\mathbf{s}} \leq 0$，即：
$$
\begin{aligned}
    s_d \dot{s}_d &= s_d (-\frac{R_S}{L_d}s_d + \frac{L_q}{L_d}N\omega s_q + K_d \mathrm{sign}(s_d)) \leqslant 0 \\
    s_q \dot{s}_q &= s_q (-\frac{R_S}{L_d}s_q - \frac{L_q}{L_d}N\omega s_d + K_q \mathrm{sign}(s_q)) \leqslant 0
\end{aligned}
$$

为了满足稳定性条件，可以得出$K_d$和$K_q$的取值范围：
$$
\begin{aligned}
    K_d \leqslant \frac{R_S}{L_d}s_d - \frac{L_q}{L_d}N\omega s_q \\
    K_q \leqslant \frac{R_S}{L_q}s_q - \frac{L_d}{L_q}N\omega s_d
\end{aligned}
$$

根据滑模观测器的电流方程可以得到估计电流，
$$
\begin{aligned}
    \dot{\hat{i}}_d &= -\frac{R_S}{L_d}\hat{i}_d + \frac{v_d}{L_d} + N \omega \frac{L_q}{L_d}\hat{i}_q + f_1 \\
    \dot{\hat{i}}_q &= -\frac{R_S}{L_q}\hat{i}_q + \frac{v_q}{L_q} - N \omega \frac{L_d}{L_q}\hat{i}_d - N\omega \frac{\Psi_m}{L_q} + f_2
\end{aligned}
$$

化简上式可得：
$$
\begin{aligned}
    \dot{\hat{i}}_d &= \frac{v_d}{L_d} - \frac{R_S}{L_d}i_d + \frac{L_q}{L_d}N\omega i_q + K_d \mathrm{sign}(s_d) \\
    \dot{\hat{i}}_q &= \frac{v_q}{L_q} - \frac{R_S}{L_q}i_q + \frac{L_d}{L_q}N\omega i_d - N \omega \frac{\Psi_m}{L_q} + K_q \mathrm{sign}(s_q)
\end{aligned}
$$

:::caution
此处未能推导出论文中提及的滑模观测器公式，可能是推导错误或者论文中的错误，直接使用论文中的结论进行实验，结果尚未验证。论文中，原传递函数为：
$$
\begin{aligned}
    G_d^{'}(s) &= \frac{\hat{L}_q N \omega + \frac{\beta_1 \hat{L}_q N \omega}{s\hat{L}_d}}{R_S + \hat{L}_q s + \frac{\beta_2 R_S}{s\hat{L}_q}} G_q(s) \\
    G_q^{'}(s) &= \frac{\hat{L}_d N \omega + \frac{\beta_2 \hat{L}_d N \omega}{s\hat{L}_q}}{R_S + \hat{L}_d s + \frac{\beta_1 R_S}{s\hat{L}_d}} G_d(s) \\
\end{aligned}
$$
:::


:::note
本部分解耦控制与滑模观测器参考[基于滑模观测器的永磁同步电机电流偏差解耦控制](https://dgjsxb.ces-transaction.com/fileup/HTML/2020-8-1642.htm)
:::

### 力反馈实现
我们设计完电流的闭环控制以后，可以将电流环路作为一个有一阶延迟的理想系统，通过改变电流可以实现更改电机的输出力矩，让我们回到电机的力矩与电流的方程：
$$
\begin{aligned}
    T &= \frac32 N(i_q(i_d L_d + \Psi_m) - i_d i_q L_q) \\
    &= \frac32 N(L_d - L_q)i_d i_q + \frac32 N\Psi_m i_q
\end{aligned}
$$

让我们分两种情况分析，当$L_d = L_q$时，$i_d = 0$即可实现最大转矩电流比，此时有：
$$
    T = \frac32 N\Psi_m i_q
$$

转矩和q轴电流呈线性关系，即我们通过读取电机的电流可以估计电机的输出转矩。再根据机械转动平衡方程，可以得到以下公式：
$$
    T = J \dot{\omega} + B \omega + T_L + T_d
$$

其中$T_L$为负载转矩，$T_d$为未建模的干扰转矩。为了消除干扰转矩的影响，我们可以通过设计鲁棒速度控制器来对干扰转矩进行反向建模。

首先，给出状态空间方程：
$$
\dot{\omega} = -\frac{B}{J} \omega + \frac{1}{J}(T - T_L - T_d)
$$

在电机空载时，$T_L = 0$，此时我们可以先忽略干扰项进行控制器设计：
$$
T = -K\omega
$$

使用LQR离线求解状态反馈矩阵$K$，定义滑模面$s = G\omega + z$，对滑模面求导得到趋近律：
$$
\dot{s} = G\dot{\omega} + \dot{z}
$$

配置滑模面和趋近律使其初始位置为0，于是有：
$$
\dot{z} = -G\dot{\omega} = -G(-\frac{B}{J}\omega  + \frac{1}{J}(T - T_d))
$$

由于$T_d$是未知项，这里使用近似法直接去除$T_d$项来保持$\dot{z}$全程已知。
$$
\dot{z} = -G\dot{\omega} \approx -G(-\frac{B}{J}\omega  + \frac{1}{J}T)
$$

将$\dot{z}$带入滑模面，可得：
$$
s = G\omega + \int_0^{\inf} (-G(-\frac{B}{J}\omega  + \frac{1}{J}T))dt + (-G\dot{\omega}_0)
$$

对于趋近律，有：
$$
\begin{aligned}
    \dot{s} &= G\dot{\omega} - G(-\frac{B}{J}\omega  + \frac{1}{J}T) \\
    &= \frac{G}{J}T_d
\end{aligned}
$$

当$G = J$时，$\dot{s} = T_d$，为了消除该干扰项，我们可以修改控制率：
$$
T = -K\omega -\rho \frac{s}{|s| + 0.001}
$$

$\rho$为干扰上界，这里不再证明控制器的稳定性。控制电机保持低速旋转，通过读取输出力矩可以得到近似干扰力矩$T_d$，使用数值法对该干扰力矩进行建模并通过前馈补偿消除干扰力矩。