type Locale = "en" | "zh";

type ContactKind = "email" | "phone" | "location" | "website" | "github";

type Contact = {
  kind: ContactKind;
  value: string;
  href?: string;
};

type Experience = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
};

type Project = {
  name: string;
  highlights: string[];
  stack: string;
  link?: string;
};

type Education = {
  school: string;
  degree: string;
  period: string;
};

type Publication = {
  title: string;
  publisher: string;
  period: string;
  link?: string;
};

type TechStack = {
  name: string;
  level: string;
  core?: boolean;
  capabilities: string[];
};

type ResumeData = {
  name: string;
  role: string;
  summary: string;
  contacts: Contact[];
  skills: TechStack[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  publications: Publication[];
};

type LocaleBundle = {
  resume: ResumeData;
  headings: {
    experience: string;
    projects: string;
    skills: string;
    education: string;
    publication: string;
  };
  contactNames: Record<ContactKind, string>;
  coreSkillLabel: string;
  switcherAria: string;
};

const avatarPlaceholder = "./asserts/image.jpeg";
const localeStorageKey = "resume-locale";

const bundles: Record<Locale, LocaleBundle> = {
  en: {
    resume: {
      name: "Zihao Zheng",
      role: "Robotics Engineer | MSc Student",
      summary:
        "Experienced in mechanical structure design, hardware design, embedded systems, and motion control algorithms. Capable of full-stack robotics development and able to build complete robot systems from scratch. Strong project experience, hands-on engineering ability, and problem-solving skills, with a strong interest in robotics research and applications.",
      contacts: [
        { kind: "email", value: "zzh211106370@gmail.com", href: "mailto:zzh211106370@gmail.com" },
        { kind: "location", value: "Milan, Italy" },
        { kind: "github", value: "https://github.com/hari-robotics", href: "https://github.com/hari-robotics" }
      ],
      skills: [
        {
          name: "C/C++",
          level: "Proficient",
          core: true,
          capabilities: [
            "Able to implement reusable robotics algorithm modules with Modern C++, with solid code organization and documentation practices.",
            "Familiar with common threading, synchronization, and performance optimization methods, and able to make reasonable design choices for real-time robotics systems."
          ]
        },
        {
          name: "ROS / ROS 2",
          level: "Proficient",
          core: true,
          capabilities: [
            "Familiar with ROS interfaces and communication patterns, and able to design appropriate software architectures for robotic functions independently.",
            "Hands-on experience with various open-source ROS packages such as Fast-LIO2 and DDR-opt, and able to build systems quickly on top of existing components and extend them further.",
            "Familiar with simulation tools in ROS environments such as Gazebo, RViz, and MuJoCo for algorithm validation and system debugging."
          ]
        },
        {
          name: "Motion Control & Planning",
          level: "Proficient",
          core: true,
          capabilities: [
            "Able to derive kinematic and dynamic models of robotic systems and design related control algorithms.",
            "Able to design experiments for parameter identification and validate algorithm performance in both simulation and real hardware.",
            "Familiar with multiple controller models and design methods such as PID, LQR, and MPC, and able to choose and design suitable controllers for different robotic systems and task requirements."
          ]
        },
        {
          name: "Embedded Systems",
          level: "Proficient",
          core: true,
          capabilities: [
            "Able to design MCU peripheral circuits based on requirements and implement related functionality in firmware.",
            "Familiar with common bus protocols such as SPI, I2C, UART, and CAN, and able to implement drivers and communication for sensors and actuators.",
            "Experience with RTOS and able to design real-time task scheduling and resource management schemes.",
            "Familiar with ARM Cortex-M microcontroller architecture, compilation principles, and linking processes, with the ability to perform optimization and troubleshooting."
          ]
        },
        {
          name: "MATLAB / Simulink",
          level: "Proficient",
          capabilities: [
            "Able to perform rapid algorithm prototyping and simulation validation.",
            "Able to use ROS interface tools for fast algorithm deployment and testing.",
            "Able to visualize experimental data and analyze control performance and system behavior."
          ]
        },
        {
          name: "CAD Tools such as SolidWorks",
          level: "Regularly Used",
          capabilities: [
            "Familiar with mechanical structure design and modeling, with experience designing multiple robotic platforms.",
            "Able to identify robot mass, inertia, and related parameters with CAD tools to support controller design.",
            "Hands-on experience with machining and 3D printing, and able to turn designs into manufacturable parts."
          ]
        }
      ],
      experiences: [
        {
          title: "Research Assistant",
          company: "Nanjing University",
          period: "Jul 2025 - Sep 2025",
          highlights: [
            "Designed two unconventional UAV structures, derived their dynamic models, and modified the NMPC algorithm to achieve autonomous takeoff, landing, and fixed-point hovering.",
            "Assisted with experimental data analysis, paper video production, and paper review.",
            "Related results were published at the IEEE International Conference on Robotics and Automation (ICRA 2026)."
          ]
        },
        {
          title: "Robot Control Engineer Intern",
          company: "Wuji Technology Co., Ltd.",
          period: "Jun 2024 - Aug 2024",
          highlights: [
            "Designed bidirectional synchronized control for a teleoperation system, enabling low-latency remote control of robots.",
            "Developed kinematic and dynamic models for a parallel robot structure to achieve precise motion control.",
            "Designed motor control algorithms based on sliding mode control to mitigate cogging effects and improve motion accuracy."
          ]
        },
        {
          title: "Embedded Engineer Intern",
          company: "Geshi Intelligent Co., Ltd.",
          period: "Jun 2021 - Aug 2021",
          highlights: [
            "Developed a remote control system based on NXP32 microcontroller for wireless vehicle control and status monitoring.",
            "Developed upper-computer software in C# for system configuration and data visualization."
          ]
        }
      ],
      projects: [
        {
          name: "Design and Control of a Fully-Actuated UAV",
          highlights: [
            "PhD research topic focused on the design and control of a fully-actuated UAV system.",
            "Designed a fully-actuated UAV system and derived its dynamic model.",
            "Designed an optimal control allocation algorithm and validated the feasibility of the control method in simulation."
          ],
          stack: "ROS, C/C++, Motion Control and Planning"
        },
        {
          name: "Challenge Cup National Undergraduate Extracurricular Academic and Science Competition",
          highlights: [
            "Designed and implemented a ROS-based distributed control solution capable of real-time control on physical systems from MATLAB.",
            "Verified algorithms in MATLAB and then exported them as ROS packages for higher runtime efficiency and rapid deployment.",
            "Won Provincial Second Prize in the competition."
          ],
          stack: "ROS, C/C++, MATLAB/Simulink, ROS/ROS 2"
        },
        {
          name: "RoboMaster Robotics Competition",
          highlights: [
            "Participated in multiple individual and confrontation events, responsible for control and embedded-related modules.",
            "Developed STM32 microcontroller firmware based on FreeRTOS and the HAL library to implement low-level motion control.",
            "Implemented communication between non-ROS lower-level controllers and a ROS upper computer through the ROS messaging mechanism, enabling reception of high-level control commands."
          ],
          stack: "ROS, C/C++, Embedded Systems"
        },
        {
          name: "System Identification of a Soft-body UAV",
          highlights: [
            "Undergraduate final-year project using least-squares-based system identification.",
            "Designed a PID controller based on the identified model and validated it through simulation and real-world testing."
          ],
          stack: "ROS, C/C++, Embedded Systems"
        }
      ],
      education: [
        {
          school: "University of Nottingham Ningbo China",
          degree: "BEng in Electrical Engineering and Automation",
          period: "2019 - 2023"
        },
        {
          school: "University of Nottingham Ningbo China",
          degree: "PhD in Aerospace Engineering (Discontinued)",
          period: "2023 - 2024"
        },
        {
          school: "Politecnico di Milano",
          degree: "MSc in Automation and Control Engineering",
          period: "2025 - 2027"
        }
      ],
      publications: [
        {
          title: "A Self-Rotating Tri-Rotor UAV for Field-of-View Expansion and Autonomous Flight",
          publisher: "ICRA (Accepted)",
          period: "2026"
        },
        {
          title: "Design and Validation of Flexible Aerial Robotics for Safe Human-Robot Interaction",
          publisher: "IROS",
          period: "2024",
          link: "https://doi.org/10.1109/IROS58592.2024.10801991"
        }
      ]
    },
    headings: {
      experience: "Experience",
      projects: "Projects",
      skills: "Tech Stack",
      education: "Education",
      publication: "Publications"
    },
    contactNames: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      website: "Website",
      github: "GitHub"
    },
    coreSkillLabel: "Core",
    switcherAria: "Switch language"
  },
  zh: {
    resume: {
      name: "郑子豪",
      role: "机器人工程师｜在读硕士",
      summary:
        "有机械结构设计，硬件设计，嵌入式系统与运控算法等相关开发经验。具备机器人系统的全栈开发能力，可实现从0搭建完整机器人系统的整套工作流程。项目经验丰富，具备较强的动手能力和问题解决能力。热衷于机器人相关技术的研究与应用。",
      contacts: [
        { kind: "email", value: "zzh_robotic@163.com", href: "mailto:zzh_robotic@163.com" },
        { kind: "location", value: "意大利，米兰" },
        { kind: "github", value: "https://github.com/hari-robotics", href: "https://github.com/hari-robotics" }
      ],
      skills: [
        {
          name: "C/C++",
          level: "熟练",
          core: true,
          capabilities: [
            "能使用Modern C++实现可复用的机器人算法模块，并具备良好的代码组织与文档习惯",
            "了解常用的线程同步与性能优化方法，能针对机器人系统的实时性需求进行合理设计",
          ]
        },
        {
          name: "ROS / ROS 2",
          level: "熟练",
          core: true,
          capabilities: [
            "了解ROS中各种接口与通信方式，能自主设计合适的代码架构实现机器人各类功能",
            "使用过多种开源ROS包组件（如Fast-LIO2，DDR-opt等），能基于已有组件快速搭建系统并进行二次开发",
            "熟悉ROS环境下的各种仿真工具（如Gazebo，Rviz，mujoco等），能搭建仿真环境进行算法验证与系统调试"
          ]
        },
        {
          name: "运动控制与规划",
          level: "熟练",
          core: true,
          capabilities: [
            "能够推导机器人的运动学与动力学模型，设计相关控制算法",
            "能够设计实验对位置参数进行辨识，并通过仿真与实物验证算法的性能",
            "了解多种控制器模型与设计方法（如PID，LQR，MPC等），能针对不同的机器人系统与任务需求进行合理选择与设计"
          ]
        },
        {
          name: "嵌入式系统",
          level: "熟练",
          core: true,
          capabilities: [
            "可根据需求设计MCU外围电路并编写固件实现相关功能",
            "了解基础总线协议（如SPI、I2C、UART、CAN等），能实现各种传感器与执行器的驱动与通信",
            "有RTOS使用经验，能够设计实时任务调度与资源管理方案",
            "了解ARM Cortex-M系列微控制器架构，了解编译原理与链接过程，能够进行性能优化与故障排查"
          ]
        },
        {
          name: "Matlab / Simulink",
          level: "熟练",
          capabilities: [
            "可进行快速的算法原型设计与仿真验证",
            "能够使用ROS接口工具进行快速算法部署与测试",
            "能够将实验数据可视化并分析控制性能与系统行为"
          ]
        },
        {
          name: "SolidWorks等CAD软件",
          level: "常用",
          capabilities: [
            "了解机械结构设计与建模，设计过多个机器人平台。",
            "能够通过CAD软件标定机器人质量、惯量等参数，辅助控制器设计。",
            "有机加工，3D打印等经验，能够将设计转换为可制造的零件。"
          ]
        }
      ],
      experiences: [
        {
          title: "研究助理",
          company: "南京大学",
          period: "2025.7 - 2025.9",
          highlights: [
            "设计两款异形无人机结构，并推导其动力学模型修改NMPC算法，成功实现自主起降与定点悬停。",
            "辅助实验数据的分析与论文视频的制作，并参与论文的review",
            "相关成果发表于 2026 年国际机器人与自动化会议（ICRA 2026）。"
          ]
        },
        {
          title: "机器人控制工程师实习生",
          company: "舞肌科技有限公司",
          period: "2024.6 - 2024.8",
          highlights: [
            "为公司设计遥操作系统的双向同步控制，实现远程对机器人的低延迟控制。",
            "设计并联结构机器人的运动学与动力学模型，实现对机器人运动的精确控制。",
            "使用滑模控制设计电机控制算法，减轻了电机的齿槽效应问题，提高了机器人运行的精确度。"
          ]
        },
        {
          title: "嵌入式工程师实习生",
          company: "格仕智能有限公司",
          period: "2021.6 - 2021.8",
          highlights: [
            "开发基于NXP32微控制器的远程控制系统，实现对车辆的无线控制与状态监测。",
            "使用C#开发上位机软件，实现对车辆系统的配置与数据可视化。"
          ]
        }
      ],
      projects: [
        {
          name: "全自由度无人机的设计与控制",
          highlights: [
            "博士课题方向，设计了一款全自由度无人机系统，并推导其动力学模型",
            "设计了最优控制分配算法并在仿真中验证了控制算法的可行性。"
          ],
          stack: "ROS, C/C++, 运动控制与规划"
        },
        {
          name: "挑战杯全国大学生课外学术科技作品竞赛",
          highlights: [
            "设计并实现基于 ROS 的分布式控制方案，可在MATLAB中实现实时实机控制。",
            "可在MATLAB中验证实机算法后导出ROS包，提高运行效率并进行快速部署。",
            "项目获得省级二等奖。"
          ],
          stack: "ROS, C/C++, MATLAB/Simulink， ROS/ROS2"
        },
        {
          name: "RoboMaster机甲大师赛",
          highlights: [
            "参与多个单项赛与对抗赛任务，负责控制与嵌入式相关模块。",
            "基于FreeRTOS与HAL库开发STM32微控制器固件，实现机器人运动的底层控制。",
            "基于ROS消息机制实现下位机无需集成ROS系统便可与ROS上位机通信的功能，以便接收上位机控制指令。"
          ],
          stack: "ROS, C/C++，嵌入式系统"
        },
        {
          name: "软体无人机的系统辨识",
          highlights: [
            "本科毕业设计，使用最小二乘法进行系统辨识。",
            "基于辨识结果设计了PID控制器，并进行了仿真验证与实机测试。",
          ],
          stack: "ROS, C/C++，嵌入式系统"
        }
      ],
      education: [
        {
          school: "宁波诺丁汉大学",
          degree: "电气工程与自动化 学士",
          period: "2019 - 2023"
        },
        {
          school: "宁波诺丁汉大学",
          degree: "航空航天工程 博士（肄业）",
          period: "2023 - 2024"
        },
        {
          school: "米兰理工大学（QS98）",
          degree: "自动化与控制工程（QS21） 硕士",
          period: "2025 - 2027"
        }
      ],
      publications: [
        {
          title: "A Self-Rotating Tri-Rotor UAV for Field-of-View Expansion and Autonomous Flight",
          publisher: "ICRA (Accepted)",
          period: "2026"
        },
        {
          title: "Design and Validation of Flexible Aerial Robotics for Safe Human-Robot Interaction",
          publisher: "IROS",
          period: "2024",
          link: "https://doi.org/10.1109/IROS58592.2024.10801991"
        }
      ]
    },
    headings: {
      experience: "工作经历",
      projects: "项目经历",
      skills: "技术栈",
      education: "教育背景",
      publication: "成果"
    },
    contactNames: {
      email: "邮箱",
      phone: "电话",
      location: "地点",
      website: "网站",
      github: "GitHub"
    },
    coreSkillLabel: "核心",
    switcherAria: "切换语言"
  }
};

function isLocale(value: string): value is Locale {
  return value === "en" || value === "zh";
}

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(localeStorageKey);
    if (stored && isLocale(stored)) {
      return stored;
    }
  } catch {
    // Ignore localStorage failures in restricted environments.
  }
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Ignore localStorage failures in restricted environments.
  }
}

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    className?: string;
    text?: string;
    href?: string;
    target?: string;
    rel?: string;
  } = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  if (tag === "a") {
    const anchor = element as HTMLAnchorElement;
    if (options.href) {
      anchor.href = options.href;
    }
    if (options.target) {
      anchor.target = options.target;
    }
    if (options.rel) {
      anchor.rel = options.rel;
    }
  }
  return element;
}

function getContactIconClass(kind: ContactKind): string {
  switch (kind) {
    case "email":
      return "fa-solid fa-envelope";
    case "phone":
      return "fa-solid fa-phone";
    case "location":
      return "fa-solid fa-location-dot";
    case "website":
      return "fa-solid fa-globe";
    case "github":
      return "fa-brands fa-github";
    default:
      return "fa-solid fa-circle-info";
  }
}

function renderResume(bundle: LocaleBundle): HTMLElement {
  const { resume, headings, contactNames, coreSkillLabel } = bundle;
  const shell = createElement("main", { className: "resume-shell" });

  const hero = createElement("section", { className: "hero" });
  const heroMain = createElement("div", { className: "hero-main" });
  const heroAside = createElement("div", { className: "hero-aside" });
  heroMain.append(
    createElement("h1", { className: "name", text: resume.name }),
    createElement("p", { className: "role", text: resume.role }),
    createElement("p", { className: "summary", text: resume.summary })
  );

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = avatarPlaceholder;
  avatar.alt = "Avatar";
  avatar.width = 110;
  avatar.height = 154;

  const contactList = createElement("ul", { className: "contact" });
  for (const contact of resume.contacts) {
    const item = createElement("li");
    const content = contact.href
      ? createElement("a", {
          href: contact.href,
          target: contact.href.startsWith("http") ? "_blank" : undefined,
          rel: contact.href.startsWith("http") ? "noopener noreferrer" : undefined
        })
      : createElement("span");

    content.classList.add("contact-entry");
    content.setAttribute("aria-label", `${contactNames[contact.kind]}: ${contact.value}`);

    const icon = createElement("i", { className: `contact-icon ${getContactIconClass(contact.kind)}` });
    icon.setAttribute("aria-hidden", "true");

    const text = createElement("span", { text: contact.value });
    content.append(icon, text);

    item.append(content);
    contactList.append(item);
  }

  heroMain.append(contactList);

  heroAside.append(avatar);
  hero.append(heroMain, heroAside);

  const grid = createElement("section", { className: "grid" });

  const experienceSection = createElement("section", { className: "section" });
  experienceSection.append(createElement("h2", { text: headings.experience }));
  const timeline = createElement("div", { className: "timeline" });
  for (const exp of resume.experiences) {
    const item = createElement("article", { className: "item" });
    item.append(
      createElement("h3", { text: `${exp.title} · ${exp.company}` }),
      createElement("p", { className: "meta", text: exp.period })
    );
    const list = createElement("ul");
    for (const highlight of exp.highlights) {
      list.append(createElement("li", { text: highlight }));
    }
    item.append(list);
    timeline.append(item);
  }
  experienceSection.append(timeline);

  const projectsSection = createElement("section", { className: "section" });
  projectsSection.append(createElement("h2", { text: headings.projects }));
  const projects = createElement("div", { className: "projects" });
  for (const project of resume.projects) {
    const item = createElement("article", { className: "project" });
    const title = project.link
      ? createElement("a", {
          className: "link",
          text: project.name,
          href: project.link,
          target: "_blank",
          rel: "noopener noreferrer"
        })
      : createElement("strong", { text: project.name });
    const highlights = createElement("ul", { className: "project-highlights" });
    for (const highlight of project.highlights) {
      highlights.append(createElement("li", { text: highlight }));
    }
    item.append(
      title,
      highlights,
      createElement("p", { className: "meta", text: project.stack })
    );
    projects.append(item);
  }
  projectsSection.append(projects);

  const skillsSection = createElement("section", { className: "section" });
  skillsSection.append(createElement("h2", { text: headings.skills }));
  const stackList = createElement("div", { className: "stack-list" });
  for (const skill of resume.skills) {
    const card = createElement("article", { className: "stack-card" });
    const head = createElement("div", { className: "stack-head" });
    const name = createElement("h3", { className: "stack-name", text: skill.name });
    const badges = createElement("div", { className: "stack-badges" });

    if (skill.core) {
      badges.append(createElement("span", { className: "stack-core", text: coreSkillLabel }));
    }
    badges.append(createElement("span", { className: "stack-level", text: skill.level }));
    head.append(name, badges);

    const capabilities = createElement("ul", { className: "stack-capabilities" });
    for (const capability of skill.capabilities) {
      capabilities.append(createElement("li", { text: capability }));
    }

    card.append(head, capabilities);
    stackList.append(card);
  }
  skillsSection.append(stackList);

  const eduSection = createElement("section", { className: "section" });
  eduSection.append(createElement("h2", { text: headings.education }));
  for (const edu of resume.education) {
    const line = createElement("article", { className: "item" });
    line.append(
      createElement("h3", { text: edu.degree }),
      createElement("p", { className: "meta", text: `${edu.school} · ${edu.period}` })
    );
    eduSection.append(line);
  }

  const publicationSection = createElement("section", { className: "section" });
  publicationSection.append(createElement("h2", { text: headings.publication }));
  const publicationList = createElement("div", { className: "timeline" });
  for (const publication of resume.publications) {
    const line = createElement("article", { className: "item" });
    const title = publication.link
      ? createElement("a", {
          className: "link",
          text: publication.title,
          href: publication.link,
          target: "_blank",
          rel: "noopener noreferrer"
        })
      : createElement("strong", { text: publication.title });
    line.append(title, createElement("p", { className: "meta", text: `${publication.publisher} · ${publication.period}` }));
    publicationList.append(line);
  }
  publicationSection.append(publicationList);

  grid.append(skillsSection, experienceSection, projectsSection, eduSection, publicationSection);
  shell.append(hero, grid);

  return shell;
}

function createLanguageSwitcher(
  getLocale: () => Locale,
  onLocaleChange: (locale: Locale) => void
): HTMLElement {
  const switcher = createElement("div", { className: "lang-switcher" });
  const menu = createElement("ul", { className: "lang-menu" });

  const button = createElement("button", { className: "lang-fab" });
  button.type = "button";
  button.setAttribute("aria-haspopup", "menu");
  button.setAttribute("aria-expanded", "false");

  const icon = createElement("i", { className: "fa-solid fa-language" });
  icon.setAttribute("aria-hidden", "true");
  button.append(icon);

  const options: Array<{ locale: Locale; text: string }> = [
    { locale: "en", text: "English" },
    { locale: "zh", text: "中文" }
  ];

  function closeMenu(): void {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  function rebuildMenu(): void {
    menu.textContent = "";
    const activeLocale = getLocale();
    for (const option of options) {
      const li = createElement("li");
      const optionButton = createElement("button", { className: "lang-option", text: option.text });
      optionButton.type = "button";
      optionButton.setAttribute("role", "menuitem");
      if (option.locale === activeLocale) {
        optionButton.classList.add("active");
      }
      optionButton.addEventListener("click", () => {
        onLocaleChange(option.locale);
        rebuildMenu();
        closeMenu();
      });
      li.append(optionButton);
      menu.append(li);
    }
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = !menu.classList.contains("open");
    if (open) {
      menu.classList.add("open");
    } else {
      closeMenu();
    }
    button.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (!switcher.contains(target)) {
      closeMenu();
    }
  });

  switcher.append(menu, button);
  rebuildMenu();

  return switcher;
}

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  let currentLocale = getInitialLocale();

  const renderApp = (): void => {
    const activeBundle = bundles[currentLocale];
    app.replaceChildren(renderResume(activeBundle));
    document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
    const switchButton = document.querySelector<HTMLButtonElement>(".lang-fab");
    if (switchButton) {
      switchButton.setAttribute("aria-label", activeBundle.switcherAria);
    }
  };

  const existingSwitcher = document.querySelector(".lang-switcher");
  if (existingSwitcher) {
    existingSwitcher.remove();
  }

  const switcher = createLanguageSwitcher(
    () => currentLocale,
    (nextLocale) => {
      if (nextLocale === currentLocale) {
        return;
      }
      currentLocale = nextLocale;
      persistLocale(nextLocale);
      renderApp();
    }
  );

  document.body.append(switcher);
  renderApp();
}
