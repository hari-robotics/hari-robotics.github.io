---
title: 李群和李代数
published: 2024-07-16
description: '机器人表示空间中旋转和位移的群和向量'
image: ''
tags: [机器人, 数学]
category: '数学'
draft: false 
---

## 李群
群是包含运算的集合，对于一个群包含的集合{$A$}及其运算{$\cdot$}，需要满足以下条件：
1. 封闭性：$\forall a_1, a_2 \in A, a_1 \cdot a_2 \in A$
2. 结合律：$\forall a_1, a_2, a_3 \in A, (a_1 \cdot a_2) \cdot a_3 = a_1 \cdot (a_2 \cdot a_3)$
3. 幺元：$\exist a_0 \in A, s.t. \forall a \in A, a_0 \cdot a = a \cdot a_0 = a$
4. 逆：$\forall a \in A, \exist a^{-1} \in A, s.t. a \cdot a^{-1} = a_0$

对于机器人在空间中的旋转，我们可以用旋转矩阵$R$表示，旋转矩阵$R$属于特殊正交群$SO(3)$。对于$SO(3)$群，满足以下约束：
$$
SO(3) = \{\mathbf{R}\in\mathbb{R}^{3 \times 3} | \mathbf{R}\mathbf{R}^T = \mathbf{I} | \mathrm{det}(\mathbf{R}) = 1\}
$$

空间中除了旋转以外，还存在平移变换，我们可以使用变换矩阵$T$来表示。变换矩阵$T$属于特殊欧式群$SE(3)$，满足以下约束条件：
$$
SE(3) = \{ \mathbf{T} = \begin{bmatrix}
    \mathbf{R} & \mathbf{t} \\
    0 & 1
\end{bmatrix} \in \mathbb{R}^{4\times 4} | \mathbf{R} \in SO(3), \mathbf{t} \in \mathbb{R}^3 \}
$$

由于旋转矩阵对加法不封闭，即$\mathbf{R_1} + \mathbf{R_2} \notin SO(3)$，由此我们可以引出李代数来对李群进行运算

## 李代数
首先，对于一个与时间相关的旋转矩阵$\mathbf{R}(t)$，有$\mathbf{R}(t)\mathbf{R}^T(t) = \mathbf{I}$，对时间求导，有：
$$
\dot{\mathbf{R}}(t)\mathbf{R}^T(t) + \mathbf{R}(t)\dot{\mathbf{R}}^T(t) = 0
$$

:::warning
Constructing, Not Finished Yet
:::