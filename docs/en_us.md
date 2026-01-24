# In-Depth Research Report on the Digital Accessibility Gap 2024-2026: Web Accessibility Defects, Characteristics of Blind and Low Vision User Groups, and the Evolution Path of AI-Assisted Technology

**Language:** **English** | [中文](zh_cn.md)

---

## Summary

As the internet becomes the core infrastructure of modern society, digital accessibility is no longer merely a compliance issue, but a social matter concerning the basic survival rights of hundreds of millions of people with visual impairments worldwide. This report aims to provide detailed theoretical foundations, market data, and technical pathway analysis for developing AI-based accessibility remediation tools.

Based on the latest data from 2024 to 2026, this study reveals a grim paradox: despite increasingly stringent legal regulations (such as the European Accessibility Act, EAA) and gradually rising social awareness, against the backdrop of increasingly complex web development frameworks and widespread adoption of Single Page Applications (SPAs), the actual accessibility of the internet has not significantly improved—it has even regressed on certain key indicators.

The report provides detailed analysis of global WebAIM Million annual web detection data, World Health Organization (WHO) epidemiological statistics, and behavioral patterns of Blind and Low Vision (BLV) users. The analysis shows that the current internet has structural "accessibility debt," and the vast majority of automatic remediation tools (Overlays) have failed due to technical limitations. This provides enormous market gaps and technical entry points for the next generation of "agent-based" assistive tools based on Large Language Models (LLMs) and Computer Vision (CV).

---

## Chapter 1: The State of Internet Accessibility (2024-2026): A Data-Driven Panoramic Analysis

To develop effective AI-assisted tools, we must first quantify accessibility defects in the current internet ecosystem. Data shows that the lack of web accessibility is not isolated incidents but systematic norms. The rapid iteration of modern front-end technologies, especially the proliferation of dynamic content loading and componentized development, often sacrifices accessibility support while enhancing interactive experiences.

### 1.1 The Prevalence and Severity of Web Accessibility Failures

WebAIM (Web Accessibility In Mind), as the globally recognized authority on accessibility data, provides us with the most core statistical benchmarks through its annually published "WebAIM Million" report. The 2024 analysis results show that the state of internet accessibility is worrying and shows a worsening trend.

**Stagnation and Deterioration of Overall Failure Rates** In automated analysis of the world's top 1 million homepages, a staggering **95.9%** of pages were detected to have at least one failure meeting WCAG 2 (Web Content Accessibility Guidelines) standards ¹. While this figure shows a slight statistical improvement from 96.3% in 2023, from a practical engineering perspective, this means that almost every webpage a user visits has obstacles preventing them from accessing information.

A more critical indicator is "error density." 2024 data shows that the average homepage contains **56.8** obvious accessibility errors, a figure that surged **13.6%** from 50 errors in 2023 ¹. This surge in errors shows a strong positive correlation with increased webpage complexity—during the same period, the average number of DOM (Document Object Model) elements per webpage increased by 11.8%, reaching 1,173 elements ². This reveals a core trend: modern webpages are becoming increasingly "heavy," and developers are not matching corresponding accessibility attributes while piling on features and visual effects.

### 1.2 The "Big Six Barriers": Most Common Technical Deficiencies

Through scanning millions of webpages, research found that **96.4%** of detected errors are concentrated in six specific categories ¹. For developers committed to building AI remediation tools, these six categories constitute "high-value targets"—if AI can accurately identify and fix these six types of problems, it will directly resolve the vast majority of accessibility barriers.

The following table details the occurrence rates of these six major error categories and their specific impacts on screen reader users:

| Error Category (WCAG Failure Type) | Occurrence Rate (% of homepages) | Specific Impact on Visually Impaired Users and Technical Challenges                                                                                                                                                                                                       |
| :--------------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Low Contrast Text**              | 81.0%                            | **Impact**: Low vision users cannot distinguish text. **AI Challenge**: Requires precise calculation of brightness ratios between background and foreground pixels, and dynamic CSS adjustment without breaking UI aesthetics.                                            |
| **Missing Alt Text**               | 54.5%                            | **Impact**: Screen readers only read filenames (e.g., `img_123.jpg`), users lose all visual information. **AI Challenge**: Requires Computer Vision (CV) to understand image content (decorative vs. informational) and generate contextually appropriate descriptions.   |
| **Missing Form Labels**            | 48.6%                            | **Impact**: Users don't know whether to fill in real name or username when focusing on input box. **AI Challenge**: Requires DOM spatial analysis or OCR to identify nearby visual text and associate it with `<input>`.                                                  |
| **Empty Links**                    | 44.6%                            | **Impact**: Links contain only icons (e.g., FontAwesome), reader announces "link," user doesn't know destination. **AI Challenge**: Requires analysis of link's target URL or visual icon meaning to generate `aria-label`.                                               |
| **Empty Buttons**                  | 28.2%                            | **Impact**: Common in hamburger menus or search icons, users cannot operate core functions. **AI Challenge**: Requires UI component intent recognition.                                                                                                                   |
| **Missing Document Language**      | 17.1%                            | **Impact**: Screen readers cannot automatically switch pronunciation engines (e.g., reading Chinese with English accent), resulting in garbled pronunciation. **AI Challenge**: Relatively simple, use NLP to detect page's primary language and inject `lang` attribute. |

**In-Depth Analysis: Popular Websites and the Complexity Paradox** User research often contains a misconception that "popular websites developed by large companies have better accessibility." However, data reveals the opposite conclusion. WebAIM's analysis points out that **the more popular and complex a website, the more accessibility errors it contains** ³.

-   **Element Explosion**: Top-ranked popular websites typically integrate numerous third-party scripts, ad trackers, dynamic widgets, and complex interaction frameworks. This complexity leads to chaotic DOM structures.
-   **ARIA Misuse**: ARIA (Accessible Rich Internet Applications) should be a bridge to assistive technology, but data shows that webpages using ARIA code have higher error rates than those not using ARIA. In 2024, ARIA usage increased by 15%, but pages averaged 18 instances of `aria-hidden="true"` (incorrectly hiding visible content) and 3.6 instances of `role="button"` (fake buttons lacking keyboard event support) ⁴.
-   **The Specificity of Popular Websites**: For visually impaired users, this means not only inability to access obscure blogs, but also facing more severe technical barriers in daily essential "popular" services such as shopping, banking, and social media than on regular webpages.

### 1.3 Invisible Barriers Created by Modern Front-End Frameworks (SPAs)

In addition to the explicit errors detectable by automated tools mentioned above, Single Page Applications (SPAs) represented by React, Vue, and Angular have introduced more deadly "invisible errors." These problems often cannot be discovered through static code scanning and must be identified through Runtime Analysis ⁵.

#### Focus Management Disasters

In traditional multi-page applications, clicking a link to navigate causes the browser to refresh and default focus to the top of the page. But in SPAs, page content updates are accomplished by dynamically replacing DOM nodes with JavaScript, and the browser doesn't consider a "navigation" to have occurred.

-   **Phenomenon**: After a visually impaired user clicks the "next page" button, content has updated visually, but the screen reader's focus may still remain at the now-destroyed button position, or be reset to the `<body>` tag at the bottom of the page.
-   **Consequence**: Users become completely disoriented, don't know if the page has refreshed, and may even mistakenly believe the button didn't work and click repeatedly.
-   **AI Remediation Need**: Your program needs the ability to monitor DOM mutations (`MutationObserver`) and intelligently guide focus to the logical starting point (such as `<h1>` or main content container) when routes change ⁷.

#### Silent Updates of Dynamic Content

Modern webpages extensively use asynchronous loading (AJAX). For example, real-time filtering of search results or shopping cart quantity updates.

-   **Phenomenon**: New search results appear visually, but because developers didn't add the `aria-live` attribute, screen readers remain silent, unaware of the change.
-   **Consequence**: Users don't know the system has responded to their action.

### 1.4 The "Black Hole" of Images and Multimedia

AudioEye's 2024 research supplements WebAIM's data, pointing out that defects in image accessibility are far more serious than basic data suggests. **93%** of domains contain at least one inaccessible image, and **60%** of images have no alternative text at all ⁸. More detailed analysis shows that even when alternative text exists, due to lack of human review, large numbers of images are incorrectly labeled as "image," "logo," or contain lengthy filenames. This invalid information not only fails to help but actually increases users' cognitive load. For AI tools, distinguishing between "decorative images" (which should be ignored) and "informational images" (which need descriptions) is an extremely challenging task.

---

## Chapter 2: Global Blind and Low Vision User Demographics: Market Scale and Real-World Challenges

After clarifying "webpage-side" problems, we need to examine "user-side" scale and characteristics. This not only determines your tool's market potential but also determines interaction principles that product design should follow.

### 2.1 Massive Potential User Base

According to the latest data (2024/2025) from the World Health Organization (WHO) and related epidemiological research, the global population with visual impairments is massive, and this number is rising with accelerating population aging.

-   **Overall Scale**: Globally, at least **2.2 billion** people have near or distance vision impairment ⁹.
-   **Core Target Users (Screen Reader Users)**:
    -   **Blindness**: Approximately **43 million** people ¹⁰. This group completely relies on screen readers and is your tool's most core audience.
    -   **Moderate to Severe Visual Impairment (MSVI)**: Approximately **295 million** people ¹⁰. This group typically uses a combination of screen magnifiers and screen readers, and is extremely sensitive to color contrast and layout clarity.
-   **Uncorrected Refractive Errors**: Notably, approximately 157 million people's visual impairment stems from uncorrected refractive problems, and this population has grown by 72% since 2000 ¹¹. This indicates that visual impairment is not limited to medically underserved areas; in modern society highly dependent on electronic screens, vision degradation is a universal phenomenon.

### 2.2 The "Silver Tsunami": Aging User Structure

WebAIM's 2024 Screen Reader User Survey reveals a key demographic change: **the proportion of elderly users aged 60 and above has significantly increased** ¹².

This trend presents special requirements for tool development:

1. **Non-Tech Natives**: Many elderly users became blind later in life due to illness (such as diabetic retinopathy, macular degeneration). They are not computer experts and are unfamiliar with complex screen reader shortcuts.
2. **Multiple Disabilities**: Elderly users often have concurrent motor function degradation (tremors, arthritis) or cognitive decline.
3. **Design Implications**: Your AI tool cannot assume users are "geeks." Interaction design must be extremely simplified, avoiding complex configuration, ideally achieving "zero-configuration" automated remediation.

### 2.3 Mobile-First Usage Habits

While WebAIM's data primarily targets desktop webpages, user behavior has fundamentally shifted. **91.3%** of screen reader users report using mobile devices (phones/tablets) for assistive reading ¹³.

-   **Cross-Platform Gap**: Many webpages are barely usable on desktop but often hide labels, overlap elements, or make touch targets too small on mobile (responsive layouts).
-   **App Preference**: Due to extremely poor mobile web experiences, 58% of users prefer using native apps rather than webpages for banking or shopping ¹⁴. This conversely proves the failure of web accessibility—users are forced to flee the web.

---

## Chapter 3: Screen Reader Ecosystem and User Interaction Behaviors

To make your program work synergistically with existing assistive tools, you must deeply understand the current market landscape and users' operational habits.

### 3.1 Screen Reader Market Share: Duopoly and Mobile Monopoly

According to WebAIM Screen Reader Survey #10 (2024) data, the market shows distinct regional and platform characteristics ¹⁴:

| Screen Reader | Platform    | Primary Usage Rate | Commonly Used Rate | Notes                                                                                                                                 |
| :------------ | :---------- | :----------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **JAWS**      | Windows     | 40.5%              | 60.5%              | Commercial software, expensive, dominant in North America and corporate workplaces.                                                   |
| **NVDA**      | Windows     | 37.7%              | 65.6%              | Open-source and free, most popular globally (especially in Europe, Asia, and developing regions), total user base has surpassed JAWS. |
| **VoiceOver** | macOS / iOS | 9.7%               | 43.9%              | Built into Apple ecosystem, absolute monopoly on mobile.                                                                              |
| **Narrator**  | Windows     | 0.7%               | 37.3%              | Built into Windows, few users as primary tool, but increasing usage rate as backup.                                                   |

#### Implications for Development

1. **Testing Benchmark**: Your tool must be rigorously tested with **Chrome + NVDA** and **Chrome + JAWS** combinations, which are the configurations for the vast majority of desktop users. Must also be compatible with mobile **Safari + VoiceOver**.
2. **Browser Engines**: Chrome and its engine (Chromium) account for 52.3% of browser market share ¹⁵, so Chromium-based browser extensions offer the widest coverage.

### 3.2 User Navigation Strategies and Coping Mechanisms

Visually impaired users don't read webpages linearly; they have a unique information retrieval strategy. If your tool breaks these strategies, users will abandon it.

**Core Navigation Pattern: Headings** **71.6%** of users use headings (H1-H6) as the primary way to jump and find information on pages ¹⁵.

-   **Pain Point**: As mentioned earlier, 39% of webpages have heading hierarchy jumps or are missing.
-   **Opportunity**: If your AI can only do one thing, restructuring a page's heading structure (inferring logical structure from visual font size and layout and injecting `<h1>` tags, etc.) will solve over 70% of navigation challenges.

#### Coping Mechanisms: Abandonment and Help-Seeking

When users encounter inaccessible webpages, how do they solve it?

1. **Abandonment**: This is the most common reaction. Due to lack of alternatives, users can only leave the website and seek competitors' services. Less than 10% of users frequently contact website administrators to report problems ¹⁴. This means website owners are often completely unaware of lost users with disabilities.
2. **Human/AI Visual Assistance**: In recent years, users have begun turning to **Be My Eyes** (connecting to volunteer video calls) or its built-in **Be My AI** (based on GPT-4 Vision) to "see" screens.
    - **Be My AI**: Users take screenshots and ask AI "What's in this image?" or "What does this button do?" ¹⁶.
    - **JAWS Picture Smart**: JAWS integrates AI functionality, allowing users to analyze the current window or image via shortcuts ¹⁸.
    - **Limitations**: These solutions are mostly "workaround" solutions—they tell users what's on screen but don't **fix** the DOM itself. Users still cannot directly click that unlabeled button and can only simulate mouse clicks through OCR (Optical Character Recognition), which is extremely inefficient.

---

## Chapter 4: Deficiencies in Existing Solutions and Technical Pathways for AI Remediation

Your goal is to develop a program to fix these problems. There are already some attempts in the market (mainly Accessibility Overlays), but they are highly controversial. Understanding their failure reasons is key to your success.

### 4.1 The Failure of "Accessibility Overlays"

There are numerous toolbar plugins (Overlays) in the market claiming to "solve accessibility with one line of code." However, the blind community generally holds negative attitudes toward these tools, and there are even dedicated websites (such as shouldiuseanaccessibilityoverlay.com) resisting them ¹⁹.

#### Why Do They Fail?

1. **Intrusive**: Overlays often forcibly change page shortcuts, conflicting with screen readers' own shortcuts (such as NVDA keys).
2. **False Fixes**: They often only provide superficial solutions (such as adjusting contrast) but cannot resolve core structural problems (such as SPA focus management, form associations).
3. **Legal Risk**: In 2024, numerous lawsuits listed Overlays as barriers rather than solutions, with cases even being sued for using Overlays ²⁰.

### 4.2 Ideal AI Remediation Program Architecture Requirements

Synthesizing the above research, a truly effective AI accessibility remediation program should have the following characteristics, which are also technical barriers you need to focus on overcoming during development:

1. **Semantic Understanding Rather Than Heuristic Guessing**

    Traditional remediation scripts rely on simple rules (such as "if there's an image, add an `alt` tag"). Next-generation tools must utilize **Multimodal AI**.

    - **Scenario**: A button with only a magnifying glass icon.
    - **Traditional Script**: Labeled as "magnifying glass" or "icon." (User confusion: What is the magnifying glass for?)
    - **AI Capability**: Combining icon visual features, surrounding text (such as "Please enter search term"), and HTML class name (`class="search-btn"`), comprehensively determine its intent and inject `aria-label="Search"`.

2. **Dynamic DOM Monitoring (Mutation Observation)**

    For frameworks like React/Vue, the program cannot be a one-time script. Must implement efficient `MutationObserver` mechanism.

    - **Technical Requirements**: Monitor child node changes in the DOM tree. When new content (such as popups, dropdown menus) is inserted into the DOM, intercept at millisecond-level and inject accessibility attributes, ensuring screen readers can capture changes immediately.

3. **Shadow DOM Penetration**

    Modern Web Components often encapsulate structure in Shadow DOM, which is often a blind spot for traditional scanning tools. Your tool must have the ability to traverse Shadow Roots, ensuring buttons and labels encapsulated inside components can also be fixed.

4. **Balancing Privacy and Performance**

    Since real-time page content analysis is required, if AI models run entirely in the cloud (sending HTML/screenshots to servers), it will raise serious privacy concerns (such as bank page data leakage) and latency.

    - **Trend**: Explore **on-device small models (On-device Small Language Models)** or browser-built AI capabilities (such as Chrome Nano Gemini) to complete basic label prediction and structure remediation locally, calling cloud APIs only when necessary (such as complex image descriptions).

---

## Chapter 5: Conclusions and Recommendations

From 2024 to 2026, the field of web accessibility is at a turning point. On one hand, traditional web development models have led to universal accessibility failures, with 95.9% of webpages containing barriers to visually impaired users; on the other hand, the global 2.2 billion population with vision impairments has increasingly strong demands for digital life, and with accelerating aging, this demand becomes more urgent.

This study reaches the following core conclusions:

1. **Market Pain Points Are Extremely Clear**: Current commonly used websites have enormous gaps in image descriptions, form labels, link intent, and SPA interaction logic. Existing Overlay solutions are rejected by the community due to poor experience and high legal risks.
2. **Technical Entry Points**: Don't create "universal" overlays, but focus on **Intelligent Remediation Agents**. Focus on:
    - Using vision models to generate meaningful Alt Text for hundreds of millions of unlabeled images.
    - Completing `aria-label` for "empty links" and "empty buttons" through intent recognition.
    - Building runtime scripts for React/Vue, taking over focus management, and fixing SPA navigation experiences.
3. **User-Oriented**: Given the high usage rates of NVDA and mobile devices, your tool should prioritize running as a **browser extension** or **system-level assistive service** rather than code that forces website administrators to install. Empowering the user-agent side, letting users take control of webpage remediation, is the main technical trend for the coming years.

By filling the "cognitive understanding" gap that automated code scanning cannot cover, your program has the potential to rebuild an understandable and operable internet for tens of millions of screen reader-dependent users.

---

## Data Source Index Cited in This Report

-   ¹ WebAIM Million Report 2024
-   ⁴ WebAIM Million Report Detailed Statistics
-   ³ AudioEye WebAIM 2024 Takeaways
-   ² WebAIM Mailing List Discussion 2024
-   ¹² WebAIM Screen Reader Survey #10
-   ⁹ WHO & Global Burden of Disease Vision Impairment Statistics
-   ²⁰ UsableNet & Accessibility Legal Reports
-   ⁸ AudioEye Accessibility Statistics
-   ¹⁴ WebAIM Survey Qualitative Analysis
-   ¹⁶ Be My Eyes / Be My AI Technical Documentation
-   ⁵ Technical Analysis of SPA Accessibility Challenges

### References

1. The WebAIM Million - The 2024 report on the accessibility ... - WebAIM, [https://webaim.org/projects/million/2024](https://webaim.org/projects/million/2024)
2. WebAIM List: The WebAIM Million report for 2024, [https://webaim.org/discussion/mail_thread?thread=11026](https://webaim.org/discussion/mail_thread?thread=11026)
3. 4 Takeaways From the 2024 WebAIM Million Report - AudioEye, [https://www.audioeye.com/post/4-takeaways-2024-webaim-million-report/](https://www.audioeye.com/post/4-takeaways-2024-webaim-million-report/)
4. The WebAIM Million - The 2025 report on the accessibility of the top 1000000 home pages, [https://webaim.org/projects/million/](https://webaim.org/projects/million/)
5. Single Page Application Accessibility: React, Vue, and Angular Guide | TestParty, [https://testparty.ai/blog/single-page-app-accessibility](https://testparty.ai/blog/single-page-app-accessibility)
6. Building Accessible Single Page Applications (SPAs) - Atyantik Technologies, [https://atyantik.com/building-accessible-single-page-applications-spas/](https://atyantik.com/building-accessible-single-page-applications-spas/)
7. Making dynamic websites accessible using focus management - Vision Australia, [https://www.visionaustralia.org/business-consulting/digital-access/blog/making-dynamic-websites-accessible-using-focus-management](https://www.visionaustralia.org/business-consulting/digital-access/blog/making-dynamic-websites-accessible-using-focus-management)
8. Web Accessibility Stats and Data 2024 - AudioEye, [https://www.audioeye.com/post/accessibility-statistics/](https://www.audioeye.com/post/accessibility-statistics/)
9. Blindness and vision impairment - World Health Organization (WHO), [https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)
10. Global estimates on the number of people blind or visually impaired by Uncorrected Refractive Error: a meta-analysis from 2000 to 2020 - PubMed, [https://pubmed.ncbi.nlm.nih.gov/38965322/](https://pubmed.ncbi.nlm.nih.gov/38965322/)
11. Global estimates on the number of people blind or visually impaired by Uncorrected Refractive Error | Institute for Health Metrics and Evaluation, [https://www.healthdata.org/research-analysis/library/global-estimates-number-people-blind-or-visually-impaired-uncorrected](https://www.healthdata.org/research-analysis/library/global-estimates-number-people-blind-or-visually-impaired-uncorrected)
12. WebAIM Screen Reader Survey #10: Key Takeaways for 2024 and Beyond - Allyant, [https://allyant.com/blog/webaim-screen-reader-survey-10-key-takeaways-for-2024-and-beyond/](https://allyant.com/blog/webaim-screen-reader-survey-10-key-takeaways-for-2024-and-beyond/)
13. My WebAIM 10th SR User Survey Takeaways - Adrian Roselli, [https://adrianroselli.com/2024/02/my-webaim-10th-sr-user-survey-takeaways.html](https://adrianroselli.com/2024/02/my-webaim-10th-sr-user-survey-takeaways.html)
14. Screen Reader User Survey #10 Results - WebAIM, [https://webaim.org/projects/screenreadersurvey10/](https://webaim.org/projects/screenreadersurvey10/)
15. Screen Reader User Survey #10 Results - WebAIM, [https://webaim.org/blog/screen-reader-user-survey-10-results/](https://webaim.org/blog/screen-reader-user-survey-10-results/)
16. Be My Eyes for Windows - AI-Powered Desktop Accessibility, [https://www.bemyeyes.com/be-my-eyes-for-windows/](https://www.bemyeyes.com/be-my-eyes-for-windows/)
17. Be My Eyes Launches its Award-Winning App on Windows with Immediate Availability, [https://www.bemyeyes.com/news/be-my-eyes-launches-its-award-winning-app-on-windows-with-immediate-availability/](https://www.bemyeyes.com/news/be-my-eyes-launches-its-award-winning-app-on-windows-with-immediate-availability/)
18. Picture Smart AI for JAWS: Making charts and graphs accessible!, [https://www.perkins.org/resource/picture-smart-ai-for-jaws-making-charts-and-graphs-accessible/](https://www.perkins.org/resource/picture-smart-ai-for-jaws-making-charts-and-graphs-accessible/)
19. Should I Use An Accessibility Overlay?, [https://shouldiuseanaccessibilityoverlay.com/](https://shouldiuseanaccessibilityoverlay.com/)
20. 2024 Year-End Report on Web Accessibility Lawsuits, [https://info.usablenet.com/2024-year-end-report](https://info.usablenet.com/2024-year-end-report)
21. Accessibility Overlay Widgets Attract Lawsuits, [https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/](https://www.accessibility.works/blog/avoid-accessibility-overlay-tools-toolbar-plugins/)
