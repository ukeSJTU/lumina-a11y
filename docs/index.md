# **2024-2026年数字无障碍鸿沟深度研究报告：Web可访问性缺陷、视障用户群体特征及AI辅助技术的演进路径**

## **执行摘要**

随着互联网成为现代社会基础设施的核心，数字无障碍（Digital Accessibility）已不再仅仅是一个合规性问题，而是关乎全球数以亿计视障人士基本生存权利的社会议题。本报告旨在为开发基于人工智能（AI）的无障碍修复工具提供详尽的理论基础、市场数据及技术路径分析。

基于2024年至2026年的最新数据，本研究揭示了一个严峻的悖论：尽管法律法规（如《欧洲无障碍法案》EAA）日益严格，社会意识逐渐提升，但在Web开发框架日益复杂化、单页应用（SPA）普及化的技术背景下，互联网的实际可访问性并未得到显著改善，甚至在某些关键指标上出现了倒退。

报告详细分析了全球WebAIM百万网页年度检测数据、世界卫生组织（WHO）的流行病学统计、以及视障用户（Blind and Low Vision, BLV）的行为模式。分析表明，当前互联网存在结构性的“可访问性债务”，绝大多数自动修复工具（Overlays）因技术局限性而宣告失败。这为下一代基于大语言模型（LLM）和计算机视觉（CV）的“代理式”辅助工具提供了巨大的市场空白和技术切入点。

## ---

**第一章 当代互联网的可访问性现状（2024-2026）：基于数据的全景分析**

要开发有效的人工智能辅助工具，首先必须量化当前互联网生态中的无障碍缺陷。数据表明，Web可访问性的缺失并非个例，而是系统性的常态。现代前端技术的快速迭代，尤其是动态内容加载和组件化开发的普及，在提升交互体验的同时，往往以牺牲无障碍支持为代价。

### **1.1 Web可访问性失败的普遍性与严重程度**

WebAIM（Web Accessibility In Mind）作为全球公认的无障碍数据权威机构，其年度发布的《WebAIM Million》报告为我们提供了最为核心的统计基准。2024年的分析结果显示，互联网的可访问性状况令人堪忧，且呈现出恶化的趋势。

**总体失败率的停滞与恶化** 在对全球排名前100万的主页进行的自动化分析中，高达 **95.9%** 的页面被检测出至少存在一种符合WCAG 2（Web内容无障碍指南）标准的失败项 1。虽然这一数字较2023年的96.3%有微小的统计学改善，但从实际工程角度来看，这意味着用户访问的几乎每一个网页都存在阻碍其获取信息的障碍。

更为关键的指标是“错误密度”。2024年的数据显示，平均每个主页包含 **56.8** 个明显的无障碍错误，这一数字较2023年的50个错误激增了 **13.6%** 1。这种错误的激增与网页复杂度的提升呈现出强正相关性——同期网页的DOM（文档对象模型）元素数量平均增加了11.8%，达到1173个元素 2。这揭示了一个核心趋势：现代网页正变得越来越“重”，而开发者在堆砌功能和视觉效果时，未能同步匹配相应的无障碍属性。

### **1.2 “六大障碍”：最为普遍的技术缺失**

通过对数百万网页的扫描，研究发现 **96.4%** 的检测错误集中在六个特定的类别中 1。对于致力于开发AI修复工具的开发者而言，这六类问题构成了“高价值目标”——如果能通过AI准确识别并修复这六类问题，将直接解决绝大多数的无障碍阻碍。

下表详细列出了这六大类错误的发生率及其对屏幕阅读器用户的具体影响：

| 错误类别 (WCAG Failure Type) | 发生率 (% 的主页) | 对视障用户的具体影响与技术挑战 |
| :---- | :---- | :---- |
| **低对比度文本 (Low Contrast Text)** | 81.0% | **影响**：低视力用户无法辨识文字。 **AI挑战**：需精确计算背景与前景像素的亮度比，并动态调整CSS而不破坏UI美感。 |
| **缺失替代文本 (Missing Alt Text)** | 54.5% | **影响**：屏幕阅读器仅朗读文件名（如"img\_123.jpg"），用户丢失所有视觉信息。 **AI挑战**：需利用计算机视觉（CV）理解图片内容（是装饰性还是信息性），并生成符合上下文的描述。 |
| **缺失表单标签 (Missing Form Labels)** | 48.6% | **影响**：用户聚焦输入框时不知应填写真名还是用户名。 **AI挑战**：需通过DOM空间分析或OCR识别附近的视觉文本，将其与\<input\>关联。 |
| **空链接 (Empty Links)** | 44.6% | **影响**：链接仅包含图标（如FontAwesome），阅读器朗读“链接”，用户不知去向。 **AI挑战**：需分析链接的目标URL或视觉图标含义，生成aria-label。 |
| **空按钮 (Empty Buttons)** | 28.2% | **影响**：常见于汉堡菜单或搜索图标，用户无法操作核心功能。 **AI挑战**：需识别UI组件的功能意图（Intent Recognition）。 |
| **缺失文档语言 (Missing Language)** | 17.1% | **影响**：屏幕阅读器无法自动切换发音引擎（如用英语口音读中文），导致乱码式朗读。 **AI挑战**：相对简单，通过NLP检测页面主要语言并注入lang属性。 |

**深入剖析：常用网站与复杂度的悖论** 用户调研中常有一个误区，即认为“大公司开发的热门网站无障碍做得更好”。然而，数据揭示了相反的结论。WebAIM的分析指出，**网站越流行、越复杂，其包含的无障碍错误反而越多** 3。

* **元素爆炸**：排名前列的流行网站通常集成了大量的第三方脚本、广告追踪器、动态小部件（Widgets）和复杂的交互框架。这种复杂性导致了DOM结构的混乱。  
* **ARIA的滥用**：ARIA（Accessible Rich Internet Applications）本应是辅助技术的桥梁，但数据表明，使用了ARIA代码的网页，其错误率反而高于不使用ARIA的网页。2024年，ARIA的使用量增加了15%，但页面上平均出现了18个aria-hidden="true"（错误地隐藏了可见内容）和3.6个role="button"（缺乏键盘事件支持的假按钮）4。  
* **流行网站的特殊性**：对于视障用户而言，这不仅意味着无法访问冷门博客，更意味着在购物、银行业务、社交媒体等日常必需的“热门”服务中，他们面临着比普通网页更严峻的技术壁垒。

### **1.3 现代前端框架（SPA）带来的隐形壁垒**

除了上述可被自动化工具检测出的显性错误外，以React、Vue、Angular为代表的单页应用（Single Page Application, SPA）引入了更为致命的“隐形错误”。这些问题往往无法通过静态代码扫描发现，必须通过运行时分析（Runtime Analysis）来识别 5。

**焦点管理（Focus Management）的灾难**

在传统多页应用中，点击链接跳转后，浏览器会刷新并默认聚焦到页面顶部。但在SPA中，页面内容的更新是通过JavaScript动态替换DOM节点完成的，浏览器并不认为发生了“跳转”。

* **现象**：视障用户点击“下一页”按钮后，视觉上内容已更新，但屏幕阅读器的焦点（Focus）可能仍停留在已被销毁的按钮位置，或者被重置到页面最底部的\<body\>标签。  
* **后果**：用户完全迷失方向，不知道页面是否已刷新，甚至误以为按钮未生效而重复点击。  
* **AI修复需求**：您的程序需要具备监控DOM变动（MutationObserver）的能力，并在路由变化时智能地将焦点引导至逻辑起点（如\<h1\>或主要内容容器）7。

**动态内容的静默更新**

现代网页大量使用异步加载（AJAX）。例如，搜索结果的实时筛选或购物车的数量更新。

* **现象**：视觉上出现了新的搜索结果，但由于开发者未添加aria-live属性，屏幕阅读器对此一无所知，保持沉默。  
* **后果**：用户不知道系统已响应其操作。

### **1.4 图片与多媒体的“黑洞”**

AudioEye的2024年研究补充了WebAIM的数据，指出在图像可访问性方面的缺陷远比基础数据更严重。**93%** 的域名下至少包含一个不可访问的图像，且 **60%** 的图像完全没有替代文本 8。更细致的分析表明，即使存在替代文本，由于缺乏人工审核，大量图片被错误地标记为“图片”、“logo”或包含冗长的文件名，这些无效信息不仅未能提供帮助，反而增加了用户的认知负荷。对于AI工具而言，区分“装饰性图片”（应被忽略）和“信息性图片”（需生成描述）是极具挑战性的任务。

## ---

**第二章 全球视障用户群体画像：需求规模与现实困境**

在明确了“网页端”的问题后，我们需要审视“用户端”的规模与特征。这不仅决定了您的工具的市场潜力，更决定了产品设计应遵循的交互原则。

### **2.1 巨大的潜在用户基数**

根据世界卫生组织（WHO）及相关流行病学研究的最新数据（2024/2025），全球视障群体规模庞大，且随着人口老龄化加剧，这一数字呈上升趋势。

* **总体规模**：全球至少有 **22亿** 人患有近视力或远视力受损 9。  
* **核心目标用户（Screen Reader Users）**：  
  * **全盲（Blindness）**：约 **4300万** 人 10。这部分用户完全依赖屏幕阅读器，是您工具的最核心受众。  
  * **中重度视力障碍（MSVI）**：约 **2.95亿** 人 10。这部分用户通常结合使用屏幕放大器（Magnifiers）和屏幕阅读器，对色彩对比度和布局清晰度极为敏感。  
* **未矫正的屈光不正**：值得注意的是，有约1.57亿人的视力障碍源于未矫正的屈光问题，这一群体自2000年以来增长了72% 11。这表明视力障碍并非仅限于医疗落后地区，在高度依赖电子屏幕的现代社会，视力退化是普遍现象。

### **2.2 “银发海啸”：用户结构的老龄化**

WebAIM 2024年的屏幕阅读器用户调查显示了一个关键的人口统计学变化：**60岁以上的老年用户比例显著增加** 12。

这一趋势对工具开发提出了特殊要求：

1. **非技术原住民**：许多老年用户是在晚年因病致盲（如糖尿病视网膜病变、黄斑变性），他们并非计算机专家，不熟悉复杂的屏幕阅读器快捷键。  
2. **多重障碍**：老年用户常伴随运动机能退化（手抖、关节炎）或认知能力下降。  
3. **设计启示**：您的AI工具不能假设用户是“极客”，交互设计必须极度简化，避免复杂的配置，最好能实现“零配置”的自动化修复。

### **2.3 移动优先的使用习惯**

虽然WebAIM的数据主要针对桌面网页，但用户行为已发生根本性转移。**91.3%** 的屏幕阅读器用户表示他们使用移动设备（手机/平板）进行辅助阅读 13。

* **跨平台鸿沟**：许多网页在桌面端尚勉强可用，但在移动端（响应式布局下）往往会隐藏标签、重叠元素或使得触摸目标过小。  
* **应用偏好**：由于移动Web体验极差，58%的用户在进行银行转账或购物时，更倾向于使用原生App而非网页 14。这反过来证明了Web可访问性的失败——用户是被迫逃离Web的。

## ---

**第三章 屏幕阅读器生态与用户交互行为**

要让您的程序与现有的辅助工具协同工作，必须深入了解当前的市场格局和用户的操作习惯。

### **3.1 屏幕阅读器市场份额：双寡头与移动垄断**

根据WebAIM Screen Reader Survey \#10 (2024) 的数据，市场呈现出明显的地域和平台特征 14：

| 屏幕阅读器 | 平台 | 主要使用率 (Primary) | 常用率 (Commonly Used) | 备注 |
| :---- | :---- | :---- | :---- | :---- |
| **JAWS** | Windows | 40.5% | 60.5% | 商业软件，价格昂贵，在北美及企业职场中占主导地位。 |
| **NVDA** | Windows | 37.7% | 65.6% | 开源免费，全球范围内（尤其是欧洲、亚洲及发展中地区）最受欢迎，总体用户量已超越JAWS。 |
| **VoiceOver** | macOS / iOS | 9.7% | 43.9% | 苹果生态自带，移动端处于绝对垄断地位。 |
| **Narrator** | Windows | 0.7% | 37.3% | Windows自带，虽然作为主力的用户少，但作为备用工具的使用率在提升。 |

**对开发的启示**：

1. **测试基准**：您的工具必须在 **Chrome \+ NVDA** 和 **Chrome \+ JAWS** 组合下进行严格测试，这是绝大多数桌面用户的配置。同时，必须兼容移动端的 **Safari \+ VoiceOver**。  
2. **浏览器引擎**：Chrome及其内核（Chromium）占据了52.3%的浏览器市场份额 15，因此基于Chromium开发的浏览器扩展（Extension）是覆盖面最广的技术形态。

### **3.2 用户的导航策略与应对机制**

视障用户并非线性地阅读网页，他们有一套独特的信息检索策略。如果您的工具破坏了这些策略，将被用户弃用。

**核心导航模式：标题（Headings）** **71.6%** 的用户使用标题（H1-H6）作为在页面中跳转和寻找信息的主要方式 15。

* **痛点**：如前所述，39%的网页存在标题层级跳跃或缺失。  
* **机会**：如果您的AI只能做一件事，那么重构页面的标题结构（根据视觉字号和布局推断逻辑结构并注入\<h1\>等标签），将解决70%以上的导航难题。

**应对机制：放弃与求助**

当用户遇到不可访问的网页时，他们如何解决？

1. **放弃（Abandonment）**：这是最常见的反应。由于缺乏替代方案，用户只能离开网站，寻找竞争对手的服务。只有不到10%的用户会经常联系网站管理员反馈问题 14。这意味着网站所有者往往对流失的残障用户一无所知。  
2. **人工/AI视觉辅助**：近年来，用户开始转向 **Be My Eyes**（连接志愿者视频通话）或其内置的 **Be My AI**（基于GPT-4 Vision）来“看”屏幕。  
   * **Be My AI**：用户截图并询问AI“这张图片里有什么？”或“这个按钮是干什么的？”16。  
   * **JAWS Picture Smart**：JAWS集成了AI功能，允许用户通过快捷键分析当前窗口或图片 18。  
   * **局限性**：这些方案大多是“旁路”解决——它们告诉用户屏幕上有什么，但并没有**修复**DOM本身。用户仍然无法直接点击那个没有标签的按钮，只能通过OCR（光学字符识别）模拟鼠标点击，效率极低。

## ---

**第四章 现有解决方案的缺陷与AI修复的技术路径**

您的目标是开发一个程序来修复这些问题。目前市场上已有一些尝试（主要是Accessibility Overlays），但它们备受争议。了解它们的失败原因，是您成功的关键。

### **4.1 “无障碍覆盖层”（Overlays）的失败**

市场上存在大量宣称能“一行代码解决无障碍”的工具栏插件（Overlays）。然而，盲人社区对这些工具普遍持负面态度，甚至有专门的网站（如 shouldiuseanaccessibilityoverlay.com）抵制它们 19。

**为何失败？**

1. **干扰性**：Overlays经常强行改变页面的快捷键，与屏幕阅读器本身的快捷键（如NVDA键）冲突。  
2. **虚假修复**：它们往往只做表面功夫（如调整对比度），却无法解决核心的结构性问题（如SPA焦点管理、表单关联）。  
3. **法律风险**：2024年，大量诉讼案件将Overlays列为障碍而非解决方案，甚至有因使用了Overlays而被起诉的案例 20。

### **4.2 理想的AI修复程序架构要求**

综合上述调研，一个真正有效的AI无障碍修复程序应当具备以下特征，这也是您开发时需要重点攻克的技术壁垒：

**1\. 语义理解而非启发式猜测**

传统的修复脚本依靠简单的规则（如“如果有图片，加个alt标签”）。新一代工具必须利用 **Multimodal AI（多模态AI）**。

* **场景**：一个只有放大镜图标的按钮。  
* **传统脚本**：标记为“放大镜”或“图标”。（用户困惑：放大镜是用来干什么的？）  
* **AI能力**：结合图标视觉特征、周围文本（如“请输入搜索词”）以及HTML类名（class="search-btn"），综合判断出其意图，并注入 aria-label="搜索"。

**2\. 动态DOM监控（Mutation Observation）**

针对React/Vue等框架，程序不能是一次性运行的脚本。必须实现高效的 **MutationObserver** 机制。

* **技术要求**：监听DOM树的子节点变化。当新的内容（如弹窗、下拉菜单）被插入DOM时，毫秒级地拦截并进行无障碍属性注入，确保屏幕阅读器能即时捕捉到变化。

**3\. 影子DOM（Shadow DOM）的穿透**

现代Web组件（Web Components）常将结构封装在Shadow DOM中，这往往是传统扫描工具的盲区。您的工具必须具备遍历Shadow Root的能力，确保封装在组件内部的按钮和标签也能被修复。

**4\. 隐私与性能的平衡**

由于需要实时分析页面内容，AI模型若完全运行在云端（发送HTML/截图到服务器），将引发严重的隐私担忧（如银行页面数据泄露）和延迟。

* **趋势**：探索 **端侧小模型（On-device Small Language Models）** 或浏览器内置的AI能力（如Chrome Nano Gemini），在本地完成基础的标签预测和结构修复，仅在必要时（如复杂图片描述）调用云端API。

## ---

**第五章 结论与建议**

2024年至2026年，Web无障碍领域正处于一个转折点。一方面，传统的网页开发模式导致了普遍的可访问性失败，95.9%的网页存在阻碍视障用户的缺陷；另一方面，全球22亿视力受损人群对数字化生活的需求日益增长，且随着老龄化加剧，这一需求变得更加迫切。

对于您计划开发的AI程序，本研究得出以下核心结论：

1. **市场痛点极度清晰**：目前的常用网站在图像描述、表单标签、链接意图及SPA交互逻辑上存在巨大缺口。现有的Overlay方案因体验差、法律风险高而被社区排斥。  
2. **技术切入点**：不要做“通用”的覆盖层，而应专注于**智能修复代理（Intelligent Remediation Agent）**。重点解决：  
   * 利用视觉模型为数以亿计的无标签图片生成有意义的Alt Text。  
   * 通过意图识别为“空链接”和“空按钮”补全aria-label。  
   * 构建针对React/Vue的运行时脚本，接管焦点管理，修复SPA的导航体验。  
3. **用户导向**：鉴于NVDA和移动端的高使用率，您的工具应优先考虑作为 **浏览器扩展** 或 **系统级辅助服务** 运行，而非强迫网站管理员安装的代码。赋能用户端（User-Agent based），让用户掌握修复网页的主动权，是未来几年的主要技术趋势。

通过填补自动化代码扫描无法覆盖的“认知理解”空白，您的程序有望为数千万依赖屏幕阅读器的用户重建一个可理解、可操作的互联网。

---

**本报告引用数据来源索引：** 1 WebAIM Million Report 2024 4 WebAIM Million Report Detailed Statistics 3 AudioEye WebAIM 2024 Takeaways 2 WebAIM Mailing List Discussion 2024 12 WebAIM Screen Reader Survey \#10 9 WHO & Global Burden of Disease Vision Impairment Statistics 20 UsableNet & Accessibility Legal Reports 8 AudioEye Accessibility Statistics 14 WebAIM Survey Qualitative Analysis 16 Be My Eyes / Be My AI Technical Documentation 5 Technical Analysis of SPA Accessibility Challenges

#### **引用的著作**

1. The WebAIM Million \- The 2024 report on the accessibility ... \- WebAIM, 访问时间为 一月 24, 2026， [https://webaim.org/projects/million/2024](https://webaim.org/projects/million/2024)  
2. WebAIM List: The WebAIM Million report for 2024, 访问时间为 一月 24, 2026， [https://webaim.org/discussion/mail\_thread?thread=11026](https://webaim.org/discussion/mail_thread?thread=11026)  
3. 4 Takeaways From the 2024 WebAIM Million Report \- AudioEye, 访问时间为 一月 24, 2026， [https://www.audioeye.com/post/4-takeaways-2024-webaim-million-report/](https://www.audioeye.com/post/4-takeaways-2024-webaim-million-report/)  
4. The WebAIM Million \- The 2025 report on the accessibility of the top 1000000 home pages, 访问时间为 一月 24, 2026， [https://webaim.org/projects/million/](https://webaim.org/projects/million/)  
5. Single Page Application Accessibility: React, Vue, and Angular Guide | TestParty, 访问时间为 一月 24, 2026， [https://testparty.ai/blog/single-page-app-accessibility](https://testparty.ai/blog/single-page-app-accessibility)  
6. Building Accessible Single Page Applications (SPAs) \- Atyantik Technologies, 访问时间为 一月 24, 2026， [https://atyantik.com/building-accessible-single-page-applications-spas/](https://atyantik.com/building-accessible-single-page-applications-spas/)  
7. Making dynamic websites accessible using focus management \- Vision Australia, 访问时间为 一月 24, 2026， [https://www.visionaustralia.org/business-consulting/digital-access/blog/making-dynamic-websites-accessible-using-focus-management](https://www.visionaustralia.org/business-consulting/digital-access/blog/making-dynamic-websites-accessible-using-focus-management)  
8. Web Accessibility Stats and Data 2024 \- AudioEye, 访问时间为 一月 24, 2026， [https://www.audioeye.com/post/accessibility-statistics/](https://www.audioeye.com/post/accessibility-statistics/)  
9. Blindness and vision impairment \- World Health Organization (WHO), 访问时间为 一月 24, 2026， [https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)  
10. Global estimates on the number of people blind or visually impaired by Uncorrected Refractive Error: a meta-analysis from 2000 to 2020 \- PubMed, 访问时间为 一月 24, 2026， [https://pubmed.ncbi.nlm.nih.gov/38965322/](https://pubmed.ncbi.nlm.nih.gov/38965322/)  
11. Global estimates on the number of people blind or visually impaired by Uncorrected Refractive Error | Institute for Health Metrics and Evaluation, 访问时间为 一月 24, 2026， [https://www.healthdata.org/research-analysis/library/global-estimates-number-people-blind-or-visually-impaired-uncorrected](https://www.healthdata.org/research-analysis/library/global-estimates-number-people-blind-or-visually-impaired-uncorrected)  
12. WebAIM Screen Reader Survey \#10: Key Takeaways for 2024 and Beyond \- Allyant, 访问时间为 一月 24, 2026， [https://allyant.com/blog/webaim-screen-reader-survey-10-key-takeaways-for-2024-and-beyond/](https://allyant.com/blog/webaim-screen-reader-survey-10-key-takeaways-for-2024-and-beyond/)  
13. My WebAIM 10th SR User Survey Takeaways \- Adrian Roselli, 访问时间为 一月 24, 2026， [https://adrianroselli.com/2024/02/my-webaim-10th-sr-user-survey-takeaways.html](https://adrianroselli.com/2024/02/my-webaim-10th-sr-user-survey-takeaways.html)  
14. Screen Reader User Survey \#10 Results \- WebAIM, 访问时间为 一月 24, 2026， [https://webaim.org/projects/screenreadersurvey10/](https://webaim.org/projects/screenreadersurvey10/)  
15. Screen Reader User Survey \#10 Results \- WebAIM, 访问时间为 一月 24, 2026， [https://webaim.org/blog/screen-reader-user-survey-10-results/](https://webaim.org/blog/screen-reader-user-survey-10-results/)  
16. Be My Eyes for Windows \- AI-Powered Desktop Accessibility, 访问时间为 一月 24, 2026， [https://www.bemyeyes.com/be-my-eyes-for-windows/](https://www.bemyeyes.com/be-my-eyes-for-windows/)  
17. Be My Eyes Launches its Award-Winning App on Windows with Immediate Availability, 访问时间为 一月 24, 2026， [https://www.bemyeyes.com/news/be-my-eyes-launches-its-award-winning-app-on-windows-with-immediate-availability/](https://www.bemyeyes.com/news/be-my-eyes-launches-its-award-winning-app-on-windows-with-immediate-availability/)  
18. Picture Smart AI for JAWS: Making charts and graphs accessible\!, 访问时间为 一月 24, 2026， [https://www.perkins.org/resource/picture-smart-ai-for-jaws-making-charts-and-graphs-accessible/](https://www.perkins.org/resource/picture-smart-ai-for-jaws-making-charts-and-graphs-accessible/)  
19. Should I Use An Accessibility Overlay?, 访问时间为 一月 24, 2026， [https://shouldiuseanaccessibilityoverlay.com/](https://shouldiuseanaccessibilityoverlay.com/)  
20. 2024 Year-End Report on Web Accessibility Lawsuits, 访问时间为 一月 24, 2026， [https://info.usablenet.com/2024-year-end-report](https://info.usablenet.com/2024-year-end-report)  
21. Accessibility Overlay Widgets Attract Lawsuits, 访问时间为 一月 24, 2026， [https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/](https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/)