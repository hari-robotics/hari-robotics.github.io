"use strict";
const avatarPlaceholder = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
const localeStorageKey = "resume-locale";
const bundles = {
    en: {
        resume: {
            name: "Zihao Zheng",
            role: "MSc Student",
            summary: "Experienced in mechanical structure design, hardware design, embedded systems, and motion-control algorithms. Capable of end-to-end robot system development and delivering complete workflows from scratch. Strong hands-on engineering skills and problem-solving ability, with a strong interest in robotics research and real-world applications.",
            contacts: [
                { kind: "email", value: "zzh_robotic@163.com", href: "mailto:zzh_robotic@163.com" },
                { kind: "location", value: "Milan, Italy" },
                { kind: "github", value: "github.com/hari-robotics", href: "https://github.com/hari-robotics" }
            ],
            skills: [
                "C/C++",
                "ROS",
                "ROS 2",
                "Python",
                "MATLAB",
                "Control System Design",
                "UAV Structural Design",
                "Motion Planning Algorithms",
                "Embedded System Development"
            ],
            experiences: [
                {
                    title: "Research Assistant",
                    company: "Nanjing University",
                    period: "Jul 2025 - Sep 2025",
                    highlights: [
                        "Designed two unconventional UAV structures and built flight-control system prototypes, achieving autonomous takeoff/landing and fixed-point hovering.",
                        "Contributed to UAV motion-planning algorithm development based on NMPC and implemented waypoint tracking control.",
                        "Assisted with experimental data analysis, paper video production, and participated in paper review.",
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
                    description: "PhD research topic. Designed and implemented a prototype fully-actuated UAV system and validated controller feasibility in simulation.",
                    stack: "ROS, C/C++, UAV Dynamics and Control Algorithm Design"
                },
                {
                    name: "Challenge Cup National Undergraduate Extracurricular Academic and Science Competition",
                    description: "Won Provincial Second Prize for a ROS-based distributed control solution and interface standardization.",
                    stack: "ROS, C/C++, Motor Control, Embedded Systems"
                },
                {
                    name: "RoboMaster Robotics Competition",
                    description: "Won multiple Third Prizes in individual events and confrontation events.",
                    stack: "ROS, C/C++, Embedded Systems"
                }
            ],
            education: [
                {
                    school: "University of Nottingham Ningbo China",
                    degree: "BEng in Electrical and Electronic Engineering",
                    period: "2019 - 2023"
                },
                {
                    school: "University of Nottingham Ningbo China",
                    degree: "PhD in Aerospace Engineering (Discontinued)",
                    period: "2023 - 2024"
                },
                {
                    school: "Politecnico di Milano (QS 98)",
                    degree: "MSc in Automation and Control Engineering (QS 21)",
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
            skills: "Skills",
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
        switcherAria: "Switch language"
    },
    zh: {
        resume: {
            name: "郑子豪",
            role: "在读硕士",
            summary: "有机械结构设计，硬件设计，嵌入式系统与运控算法等相关开发经验。具备机器人系统的全栈开发能力，可实现从0搭建完整机器人系统的整套工作流程。项目经验丰富，具备较强的动手能力和问题解决能力。热衷于机器人相关技术的研究与应用。",
            contacts: [
                { kind: "email", value: "zzh_robotic@163.com", href: "mailto:zzh_robotic@163.com" },
                { kind: "location", value: "意大利，米兰，米兰" },
                { kind: "github", value: "https://github.com/hari-robotics", href: "https://github.com/hari-robotics" }
            ],
            skills: [
                "C/C++",
                "ROS",
                "ROS 2",
                "Python",
                "Matlab",
                "控制系统设计",
                "无人机结构设计",
                "运动规划算法",
                "嵌入式系统开发"
            ],
            experiences: [
                {
                    title: "研究助理",
                    company: "南京大学",
                    period: "2025.7 - 2025.9",
                    highlights: [
                        "设计两款异形无人机结构，并搭建飞行控制系统原型，成功实现自主起降与定点悬停。",
                        "辅助完成基于NMPC的无人机运动规划算法开发，实现路径点的跟踪控制。",
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
                    description: "博士课题，设计并实现了一款全自由度无人机的原型系统，在仿真中验证了控制算法的可行性。",
                    stack: "ROS, C/C++, 无人机动力学与控制算法设计"
                },
                {
                    name: "挑战杯全国大学生课外学术科技作品竞赛",
                    description: "基于ROS的分布式控制方案与接口标准化获得省级二等奖",
                    stack: "ROS, C/C++, 电机控制， 嵌入式系统"
                },
                {
                    name: "RoboMaster机甲大师赛",
                    description: "多个单项赛与对抗赛三等奖",
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
            skills: "技能",
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
        switcherAria: "切换语言"
    }
};
function isLocale(value) {
    return value === "en" || value === "zh";
}
function getInitialLocale() {
    try {
        const stored = localStorage.getItem(localeStorageKey);
        if (stored && isLocale(stored)) {
            return stored;
        }
    }
    catch {
        // Ignore localStorage failures in restricted environments.
    }
    return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}
function persistLocale(locale) {
    try {
        localStorage.setItem(localeStorageKey, locale);
    }
    catch {
        // Ignore localStorage failures in restricted environments.
    }
}
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    if (options.className) {
        element.className = options.className;
    }
    if (options.text) {
        element.textContent = options.text;
    }
    if (tag === "a") {
        const anchor = element;
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
function getContactIconClass(kind) {
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
function renderResume(bundle) {
    const { resume, headings, contactNames } = bundle;
    const shell = createElement("main", { className: "resume-shell" });
    const hero = createElement("section", { className: "hero" });
    const heroMain = createElement("div", { className: "hero-main" });
    const heroAside = createElement("div", { className: "hero-aside" });
    heroMain.append(createElement("h1", { className: "name", text: resume.name }), createElement("p", { className: "role", text: resume.role }), createElement("p", { className: "summary", text: resume.summary }));
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = avatarPlaceholder;
    avatar.alt = "Avatar placeholder";
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
    const contactStrip = createElement("section", { className: "contact-strip" });
    contactStrip.append(contactList);
    heroAside.append(avatar);
    hero.append(heroMain, heroAside);
    const grid = createElement("section", { className: "grid" });
    const left = createElement("div");
    const right = createElement("aside");
    const experienceSection = createElement("section", { className: "section" });
    experienceSection.append(createElement("h2", { text: headings.experience }));
    const timeline = createElement("div", { className: "timeline" });
    for (const exp of resume.experiences) {
        const item = createElement("article", { className: "item" });
        item.append(createElement("h3", { text: `${exp.title} · ${exp.company}` }), createElement("p", { className: "meta", text: exp.period }));
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
        item.append(title, createElement("p", { text: project.description }), createElement("p", { className: "meta", text: project.stack }));
        projects.append(item);
    }
    projectsSection.append(projects);
    left.append(experienceSection, projectsSection);
    const skillsSection = createElement("section", { className: "section" });
    skillsSection.append(createElement("h2", { text: headings.skills }));
    const tags = createElement("div", { className: "tags" });
    for (const skill of resume.skills) {
        tags.append(createElement("span", { className: "tag", text: skill }));
    }
    skillsSection.append(tags);
    const eduSection = createElement("section", { className: "section" });
    eduSection.append(createElement("h2", { text: headings.education }));
    for (const edu of resume.education) {
        const line = createElement("article", { className: "item" });
        line.append(createElement("h3", { text: edu.degree }), createElement("p", { className: "meta", text: `${edu.school} · ${edu.period}` }));
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
    right.append(skillsSection, eduSection, publicationSection);
    grid.append(left, right);
    shell.append(hero, contactStrip, grid);
    return shell;
}
function createLanguageSwitcher(getLocale, onLocaleChange) {
    const switcher = createElement("div", { className: "lang-switcher" });
    const menu = createElement("ul", { className: "lang-menu" });
    const button = createElement("button", { className: "lang-fab" });
    button.type = "button";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    const icon = createElement("i", { className: "fa-solid fa-language" });
    icon.setAttribute("aria-hidden", "true");
    button.append(icon);
    const options = [
        { locale: "en", text: "English" },
        { locale: "zh", text: "中文" }
    ];
    function closeMenu() {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    }
    function rebuildMenu() {
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
        }
        else {
            closeMenu();
        }
        button.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!switcher.contains(target)) {
            closeMenu();
        }
    });
    switcher.append(menu, button);
    rebuildMenu();
    return switcher;
}
const app = document.querySelector("#app");
if (app) {
    let currentLocale = getInitialLocale();
    const renderApp = () => {
        const activeBundle = bundles[currentLocale];
        app.replaceChildren(renderResume(activeBundle));
        document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";
        const switchButton = document.querySelector(".lang-fab");
        if (switchButton) {
            switchButton.setAttribute("aria-label", activeBundle.switcherAria);
        }
    };
    const existingSwitcher = document.querySelector(".lang-switcher");
    if (existingSwitcher) {
        existingSwitcher.remove();
    }
    const switcher = createLanguageSwitcher(() => currentLocale, (nextLocale) => {
        if (nextLocale === currentLocale) {
            return;
        }
        currentLocale = nextLocale;
        persistLocale(nextLocale);
        renderApp();
    });
    document.body.append(switcher);
    renderApp();
}
