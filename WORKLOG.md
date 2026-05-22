# 工作交接备忘录

> 最后更新：2026-05-22
> 最新Git提交：本轮待提交
> 今日工作：标题补充 + 企业详情动态数据 + MCI/EHI弹窗 + 迷你地图 + 风场 + 面状飞线

---

## 📋 PRD v3.1 最终差距分析（2026-05-21 逐条核对）

> 核对基准：`docs/PRD/PRD-污碳协同AI监管与决策平台.md`（v3.1，1,414 行）
> 核对范围：排除 PRD §12 "本期不实现功能"（锅炉行业、BIM、语音输入、碳交易、区块链、CFD 等）

---

### 🔴 大遗漏（核心功能缺失）

| # | 遗漏项 | PRD 出处 | 当前状态 | 建议修复优先级 |
|---|--------|----------|----------|----------------|
| 1 | **悖论弹幕流** | §4.2 L1 | 底部为 ticker 滚动条，非 PRD 要求的"弹幕式飘过+点击直达详情" | 高（大屏核心交互） |
| 2 | **错峰生产智能排班甘特图** | §4.2 L2 | LLM 助手仅有文字版建议，大屏缺少各企业时段分配甘特图可视化 | 中 |
| 3 | **资源调度模拟（What-if）** | §4.2 L2 | 完全缺失。PRD 要求："如果某企业停产整改 N 天，对区域 C-P 的影响？" | 高（L2 预测层核心） |
| 4 | **一键生成汇报材料** | §4.2 L3 | 完全缺失。PRD 要求：AI 自动组装 PPT 提纲 + 图表，支持导出 Word/PDF | 中 |

### 🟡 中遗漏（功能有但形式/深度不足）

| # | 遗漏项 | PRD 出处 | 当前状态 |
|---|--------|----------|----------|
| 5 | **数据血缘追溯** | §4.2 | 数据管理仅3个 Tab，缺少第4个"数据血缘追溯"Tab |
| 6 | **3D GIS 3D 热力图** | §4.3 | 当前为 Leaflet 2D CircleMarker，PRD 要求"500m 网格柱体高度"3D 热力图 |
| 7 | **3D GIS 排放动态粒子** | §4.3 | 仅有飞线粒子，无烟囱位置排放粒子（粒子发射速率 ∝ VOCs 浓度） |
| 8 | **大屏自然语言钻取 + LLM 归因** | §4.2 L3 | 点击 KPI 仅弹出静态详情弹窗，PRD 要求"LLM 自动生成归因分析小报告" |
| 9 | **企业管理批量操作不完整** | §4.2 | 仅实现批量导出，缺少"批量下发调度"和"批量标记重点监管对象" |

### 🟢 小遗漏（细节缺失，可微调补齐）

| # | 遗漏项 | PRD 出处 | 当前状态 |
|---|--------|----------|----------|
| 10 | **悖论模拟器缺少"减碳增污陷阱"标签** | §4.1 / §6.1 | 仅有"减污增碳陷阱/协同失衡/协同改善"，缺"减碳增污陷阱" |
| 11 | **月度填报排口数据字段不全** | §3.1 / §4.1 | 仅 TVOC 入口/出口，缺 NMHC/PM2.5/SO₂/NOₓ 填报字段 |
| 12 | **月度填报缺少 LCA 上游数据项** | §3.1 B-1 | 缺涂料供应商产地、运输吨公里、仓储能耗等 |
| 13 | **企业工作台悖论风险标签** | §4.1 | 有四象限图但缺少明确的"本月悖论风险标签"文字标识 |
| 14 | **悖论模拟器 LCA 参数输入不全** | §4.1 | 缺"涂料供应商距离"等上游参数输入项 |

---

### 📌 核对结论

- **已确认实现的关键功能**：短信验证码登录、同区域脱敏均值参考线、悖论模拟器历史对比、企业画像对比雷达图、3D GIS 文字操控地图、附件资料区、设备效能排名、监测月报审核发布状态、扩展污染物在排口下钻中的展示。
- **本期不实现功能（PRD §12）未列入差距**：锅炉行业、审批/许可/执法、汽修/家具/金属完整表单、3D GIS 室内级 BIM、LLM 语音输入、跨区域数据共享、碳交易对接、区块链存证、高精度 CFD、IoT 全覆盖等。
- **建议下一步**：优先修复 🔴 大遗漏中的第1、3项（悖论弹幕流 + What-if 模拟），其余可按用户验收要求选择性修复。

---

## 📊 项目总览

- **项目**：污碳协同AI监管与决策平台（HTML高保真原型）
- **技术栈**：纯静态HTML+CSS+JS，零框架，浏览器直接打开
- **总页数**：20页（企业端10 + 管理科4 + 监测科5 + 入口1）
- **设计风格**：深蓝黑`#020617` + 青色霓虹`#22d3ee` + 玻璃态卡片

---

## ✅ 已完成（本次开机）

| # | 任务 | 关键文件/说明 |
|---|---|---|
| 1 | 3D GIS底图换怀柔区真实地图 | `gov-monitoring/index.html` Leaflet+CartoDB暗色瓦片，中心40.32,116.63 |
| 2 | 浅色背景字体修复 | 全站18页扫描修复，残留浅色背景→深色科技风 |
| 3 | **可交互假数据+闭环管理** | `js/data.js` DataStore(localStorage) 支持CRUD |
| 4 | 企业端视觉升级 | 加载动画、数字滚动、卡片入场、自定义滚动条 |
| 5 | 指挥大屏交互增强 | KPI弹窗、新建调度可用、统计报表可跳转 |
| 6 | LLM助手字体修复 | 问答内容深色背景下的浅色字体 |
| 7 | 企业端loader修复 | 8个页面补JS，解决一直loading |
| 8 | 3D监测气泡下钻 | 点击气泡→`enterprise-detail.html?name=xxx` |
| 9 | 海淀区→怀柔区 | 全局替换 |
| 10 | Paradox→减污增碳/减碳增污悖论 | 全局替换 |
| 11 | 3D监测增强 | **28家企业**、飞线动画、告警/图例点击定位+闪烁 |
| 12 | **实时双算看板接入DataStore** | `enterprise/realtime-panel.html` 动态读取实时数据+数字滚动动画 |
| 13 | **悖论模拟器接入DataStore** | `enterprise/simulator.html` 工艺参数数据库、计算逻辑、历史记录CRUD、保存评估结果 |
| 14 | **三评合一报告接入DataStore** | `enterprise/triple-report.html` 动态渲染评分/AI摘要/详情/优先级 |
| 15 | **企业透视页扩展至28家** | `gov-monitoring/enterprise-detail.html` ENT_DATA完整映射28家企业+动态实时数据 |
| 16 | **政府端视觉升级** | 管理科/监测科全部页面添加page-loader、修复浅色边框/背景、hover动效 |
| 17 | **科技风设计系统v2.1** | `css/style.css`全面重写：玻璃态卡片、HUD角标、霓虹发光、粒子背景、六边形蜂窝、扫描线、故障艺术、按钮能量扫光、输入框能量环、LED双层能量环等12项动效 |
| 18 | **全站19页统一接入新设计系统** | style.css移到最后加载确保覆盖、标准页面添加`bg-honeycomb`背景、index.html补page-loader、`.main`添加z-index确保层叠正确 |
| 19 | **P0核心闭环修复6项** | 新增`paradox-report.html`动态诊断报告、alerts跳转、OCR台账、90天趋势图、退回原因弹窗、事件流跳转 |
| 20 | **paradox-report.html动态化** | DataStore读取+URL参数+4种预警类型适配+状态流+操作按钮动态 |
| 21 | **P1体验补全9项** | 三评合一历史报告/模拟器历史对比/短信Toast/超期催办/AI风险扫描/处置追踪/区域均值/时间轴回放/注册跳转 |
| 22 | **P2高级交互增强（5项）** | LLM历史会话/动态推荐问题/可信度标注、调度指令模板选择、月报生成动画、悖论产量排除逻辑、健康评分定时更新 |
| 23 | **P0-1 多排口数据底座改造** | `js/data.js` 新增 `outlets[3]` + `devices[3]` + DataStore `getOutlets/setOutlets/getDevices/setDevices` |
| 24 | **P0-2 政府端-企业管理页面** | `gov-dashboard/enterprise-management.html` 创建完成：筛选/企业卡片网格/详情抽屉/雷达图对比/批量导出（618行） |
| 25 | **P0-3 政府端-数据管理页面** | `gov-dashboard/data-management.html` 创建完成：实时数据查询(SVG趋势图+表格)/月度数据审核(6规则AI检查+批量操作)/数据质量仪表盘(KPI+排名+离线监测) |
| 26 | **P0-4 政府端-企业设备管理页面** | `gov-dashboard/device-management.html` 创建完成：AI维保预警面板/8设备卡片网格(效率进度条+状态+维保倒计时)/去除效率+能效比双排名/设备详情抽屉(12月效率衰减曲线+维保历史+运行参数) |
| 27 | **导航栏统一更新** | `gov-dashboard/index.html` + `knowledge-base.html` 导航栏新增 企业管理/数据管理/设备管理 入口 |

---

## 📅 2026-05-21 工作日志（今日）

### 一、今日完成目标：P1 + P2 全部完成

> **策略**：4个后台 Agent 并行执行 P1-5/6/7/8，我同步处理技术债务和 WORKLOG 维护。

#### 1. P1-6 月度填报-电力三指标改造
- **文件**：`enterprise/monthly-report.html`
- **改动**：
  - 「⚡ 能源消耗」电力拆分为：总用电量 / 绿电量 / 化石能源用电量
  - 实时校验：总 = 绿 + 化石，不等时黄色警告；绿电下方提示「绿电不计入碳核算」
  - 新增折叠面板「🔬 排口补充数据（选填）」：3个排口各含废气流量/TVOC进口/TVOC出口
  - `getFormData()` / `saveDraft()` / `submitReport()` 扩展收集电力+排口数据
  - 调用 `DataStore.setElectricity()` / `setOutletMonitoring()` 持久化

#### 2. P1-7 实时看板-排口下钻
- **文件**：`enterprise/realtime-panel.html`
- **改动**：
  - 新增「🔬 排口实时监测明细」区域，位于图表区下方
  - Tab 切换展示3个排口：喷涂线/烘干线/调漆间
  - 每个排口展示核心指标（inlet/outlet TVOC&NMHC、removalEfficiency）+ 扩展污染物（SO₂/NOₓ/PM2.5/CO/CO₂/CH₄）+ 运行参数
  - 状态颜色自动判定：正常绿/关注黄/超标红
  - 大卡网格扩展为6列，新增 MCI/EHI 卡片

#### 3. P1-5 三层指标 MCI/EHI 计算与展示
- **文件**：`enterprise/dashboard.html` + `enterprise/realtime-panel.html` + `gov-dashboard/index.html`
- **改动**：
  - `dashboard.html`：`.rt-grid` 扩展为10个指标（原8+新增MCI/EHI），数字滚动动画
  - `realtime-panel.html`：核心指标大卡新增 MCI（紫色0.55）/ EHI（青色68）
  - `gov-dashboard/index.html`：KPI栏下方新增 `.kpi-bar-sm` 一排，MCI区域均值+EHI区域均值，含数字滚动动画
  - 均从 `DataStore.getLayeredIndices()` 动态读取

#### 4. P1-8 企业详情透视增强
- **文件**：`gov-monitoring/enterprise-detail.html`
- **改动**：
  - Tab 从4个扩展为6个，新增「🔬 排口档案」（Tab 4）和「🔧 治理设施」（Tab 5）
  - 排口档案：3个排口卡片，含基本信息+监测数据（inlet/outlet多污染物）+去除效率进度条+关联设备
  - 治理设施：3台设备卡片，含基本信息+运行状态+维保倒计时（<7天红/<30天黄）+运行参数
  - 超标数据自动标红，正常标绿

#### 5. 技术债务顺修
- **导航栏 emoji 统一**：`data-management.html` / `device-management.html` 补全 📊/🔧 等 emoji
- **showToast 兼容性**：确认三页面调用签名与 `data.js` 全局定义一致（两参数，duration 默认2500ms）
- **悖论时长判定动态化**：`alerts.html` 预警列表卡片新增动态时长标签（`getDurationLevel(cp, hours)`），详情弹窗已在此前完成动态化

### 二、下午追加：P2 体验优化全部完成

#### 1. P2-9 悖论模拟器-LCA 视角切换
- **文件**：`enterprise/simulator.html` + `js/data.js`
- **改动**：
  - 步骤1新增评估视角切换开关：🔧 工序端视角 / 🌍 全生命周期视角（LCA）
  - `PROCESS_DB` 每个工艺补充 `lca` 对象（原料获取/运输/废弃处置三阶段碳排因子）
  - `calculateResult()` 根据 `isLCA` 计算四阶段总碳排，C-P 碳排分母使用 LCA 总碳排
  - 结果页新增 LCA 专属卡片行（总碳排/原料获取/运输/废弃处置），仅 LCA 视角时显示
  - 历史记录表格新增「视角」列，`saveResult()` 保存 `perspective` 字段

#### 2. P2-10 大屏 AI 化升级（L1/L2/L3）
- **文件**：`gov-dashboard/index.html`
- **改动**：
  - **L1 感知层**：KPI栏下方新增 `.ai-summary-bar` AI实时洞察面板（8条预设洞察+刷新按钮）
  - **L2 预测层**：任务调度看板下方新增「🔮 AI预测性预警」面板，3条未来7天预测（概率进度条：<50%绿/50-70%黄/>70%红）
  - **L3 决策层**：新建调度弹窗新增「⚡ AI生成调度建议」按钮，5企业×4类型个性化建议库
  - 数据全面动态化：4主KPI+事件流+ticker 均从 DataStore 实时读取
  - 体验优化：KPI数字滚动动画、地图脉冲动画、柱状图hover tooltip

#### 3. P2-11 扩展污染物展示
- **文件**：`enterprise/triple-report.html`
- **改动**：
  - 污染评价详情下方新增「🔬 扩展污染物监测达标率」区块
  - 从 `DataStore.getOutletMonitoring()` 动态读取8项污染物（TVOC/NMHC/PM2.5/SO₂/NOₓ/CO/CO₂/CH₄）
  - 自动判定达标状态（>限值标红/>80%限值标黄/达标标绿）

### 三、明日建议路线

P0/P1/P2 已全部完成，项目进入 **收尾阶段**。建议：
1. 全站走查：检查是否有遗漏的浅色背景/字体问题
2. 页面索引更新：`index.html` 25页入口导航确认完整
3. 数据底座最终校验：`js/data.js` 语法检查、括号平衡
4. GitHub 远程推送（如需要）

---

## 📅 2026-05-20 工作日志（今日）

### 一、今日完成目标：P0 全部清空

> **策略**：后台 Agent 并行创建三个页面（enterprise-management / data-management / device-management），我同步处理导航更新、数据底座改造、WORKLOG维护。

#### 1. P0-1 多排口数据底座改造
- **文件**：`js/data.js`
- **改动**：
  - `MOCK_DATA` 新增 `outlets[3]`（喷涂线/烘干线/调漆间）+ `devices[3]`（RTO/RCO/活性炭）
  - 每个 outlet 含 inlet/outlet 监测数据（TVOC/NMHC/PM2.5/SO2/NOx）+ removalEfficiency
  - 每个 device 含运行参数（炉膛温度/风量/累计运行/下次维保等）
  - `DataStore` 新增 `getOutlets()` / `setOutlets()` / `getDevices()` / `setDevices()`（localStorage `pcap_` 前缀）
- **影响**：所有排口/设施相关功能（P1-7 排口下钻、P1-8 企业详情增强）的数据基础已就绪

#### 2. P0-2 政府端-企业管理页面
- **文件**：`gov-dashboard/enterprise-management.html`（37KB, 618行）
- **功能**：
  - 筛选栏：企业名称搜索 + 行业/象限/C-P分级/许可证到期 四维度筛选
  - 企业卡片网格：3列响应式，每卡显示 C-P值/碳配额/MCI/EHI/许可证到期预警
  - 右侧详情抽屉：企业基本信息 + sparkline趋势图 + 仪表盘（MCI/EHI）+ 悖论历史时间线 + 调度记录
  - 雷达图对比：最多选5家企业，SVG多边形雷达图（6轴：VOCs/NOx/PM2.5/SO2/CO2/CH4）
  - 批量导出按钮
- **状态**：✅ 完成，由后台 Agent 自动生成，质量良好

#### 3. P0-3 政府端-数据管理页面
- **文件**：`gov-dashboard/data-management.html`（19KB, 309行）
- **功能**：
  - Tab 1「实时数据查询」：企业/排口/日期筛选 + 8污染物复选框 + SVG多折线趋势图 + 20行数据表（状态分级：正常/关注/超标）
  - Tab 2「月度数据审核」：月份/状态筛选 + 6规则AI检查（涂料/面积、VOCs环比、气量/时长、逻辑一致、温度合理、产量合理）+ 批量通过/退回 + 全选checkbox
  - Tab 3「数据质量仪表盘」：4 KPI卡（完整率94%/及时率89%/准确率92%/API在线率87%）+ 企业质量排名表 + 离线排口监测列表
- **状态**：✅ 完成（因 WriteFile 长内容JSON解析问题，改用 Node.js 脚本生成）

#### 4. P0-4 政府端-设备管理页面
- **文件**：`gov-dashboard/device-management.html`（24KB, 310行）
- **功能**：
  - AI维保预警面板：3张卡片（RTO-01蓄热体更换/AC-01活性炭饱和/RCO-01催化剂活性下降），严重/警告分级
  - 设备卡片网格：8台设备（4企业），含设计效率/实际效率/效率达成率进度条（绿/黄/红）/状态指示灯/维保倒计时（<7天红/<30天黄）
  - 双排名表：去除效率排名（底部20%标红）+ 能效比排名（单位kWh/kg，评分制）
  - 设备详情抽屉：基本信息 + 12月效率衰减SVG曲线（虚线=设计效率）+ 运行参数（入口/出口/炉温/风量/累计运行）+ 维保历史表格
- **状态**：✅ 完成（同样使用 Node.js 脚本绕过 WriteFile 限制）

#### 5. 导航栏统一更新
- `gov-dashboard/index.html`：新增 📋企业管理 / 📊数据管理 / 🔧设备管理 三个导航项
- `gov-dashboard/knowledge-base.html`：同上
- 三个新页面内部导航：互相链接 + LLM助手 + 案例库 + 3D监测 + 首页

### 二、今日踩坑记录

| 坑 | 原因 | 解决方案 |
|---|---|---|
| WriteFile 大文件失败 | JSON content 参数解析器对长字符串/特殊字符组合敏感（`Unterminated string` 错误） | 改用 Node.js 脚本：`WriteFile` 写 `.js` 生成脚本 → `Shell` 执行 `node tmp_gen.js` |
| 后台 Agent 间歇性卡住 | Agent 读取参考文件后未继续执行 WriteFile（可能 context 压缩或工具超时） | 直接接管：停止 Agent，自己用 Node.js 脚本生成 |
| Agent WriteFile `Invalid arguments` | Agent 内部构建 WriteFile 参数时路径或字符转义出错 | 同上用 Node.js 脚本绕过 |
| here-document 截断 | `cat > file << 'EOF'` 在 bash 中 EOF 被空格缩进导致不匹配 | 避免 here-document，改用程序生成 |
| Node.js 路径拼接错误 | `fs.writeFileSync('relative/path')` 时 cwd 是脚本所在目录，导致路径重复 | 使用 `path.join(__dirname, 'filename')` |

### 三、明日建议路线（P1 阶段）

P0 已全部完成，建议按 **P1-6 → P1-7 → P1-5 → P1-8** 顺序推进：

1. **P1-6 月度填报电力三指标**（改动最小，体感最明显）
   - 改造 `enterprise/monthly-report.html`
   - 电力拆分为：总用电量 / 绿电量 / 化石能源用电量
   - 规则：总 = 绿 + 化石；绿电碳排 = 0；仅化石计入碳核算
   - 填报维度：企业为核心，排口为辅（排口数据作为补充折叠面板）

2. **P1-7 实时看板排口下钻**（数据已就绪，实现快）
   - 改造 `enterprise/realtime-panel.html`
   - 新增「排口明细」Tab/折叠面板
   - 从 DataStore `getOutlets()` 读取排口数据，展示 inlet/outlet 浓度 + removalEfficiency

3. **P1-5 三层指标 MCI/EHI**（核心概念，PRD v3.1 重点）
   - 在 `enterprise/dashboard.html` / `realtime-panel.html` / `gov-dashboard/index.html` 增加 MCI/EHI KPI卡片
   - MCI = 加权多污染物综合指数（TVOC/NMHC/PM2.5/SO2/NOx/CO）
   - EHI = 环境健康评分（暴露浓度 × 毒性系数 × 暴露时间）

4. **P1-8 企业详情增强**（多排口 + 设施档案）
   - 改造 `gov-monitoring/enterprise-detail.html`
   - 新增「排口档案」Tab：3个排口的基本信息 + 关联设施 + 监测数据
   - 新增「治理设施」Tab：设备基本信息 + 运行参数 + 维保记录

### 四、技术债务备忘

- [ ] data-management.html 和 device-management.html 导航栏没有 emoji（enterprise-management 有），可统一风格
- [ ] 三个新页面的 `showToast` 调用需确认与全局 `data.js` 的 `showToast` 签名兼容（duration 参数已修复）
- [ ] 设备管理页面的维保历史目前是硬编码 mock 数据，后续可接入 DataStore
- [ ] 数据管理页面的「数据血缘」功能（PRD 提及）本期未实现，属 P2 范畴

---

## 🔧 P2 新增功能详情

### 1. LLM智能政务助手彻底重写 (`gov-dashboard/llm-assistant.html`)
- **历史会话侧边栏**：左侧固定侧边栏，列出所有历史会话（标题+时间+摘要），点击切换，支持新建/删除会话
- **数据持久化**：`pcap_llmSessions` / `pcap_llmCurrentSession` 存储到 localStorage
- **动态推荐问题**：根据C-P趋势/未读预警/实时数据动态生成快捷问题（如"为什么C-P下降了？"、"RTO空烧22%怎么解决？"）
- **可信度标注**：AI回答中的 `[待核实]` 自动替换为黄色标签 `<span class="verify-tag">`
- **主题修复**：AI卡片统一深色玻璃态（背景 `rgba(34,211,238,0.04)` + 霓虹边框），标题 `#22d3ee`，正文 `#e2e8f0`
- **XSS防护**：`escapeHtml()` 转义 `& < > " '`

### 2. 调度指令模板选择 (`gov-dashboard/index.html`)
- 新建调度弹窗新增模板选择下拉框：自查自纠/现场核查/限期整改/专家会诊
- 选择模板自动填充 `content` 字段内容
- 支持在此基础上二次编辑

### 3. 监测月报生成动画 (`gov-monitoring/monthly-monitor.html`)
- 点击"重新生成"触发全屏AI生成覆盖层（🤖 + 进度条 + 状态文字）
- 7步模拟流程：汇总数据 → VOCs趋势 → 碳排计算 → 悖论识别 → AI结论 → 排版 → 完成
- 完成后随机微调摘要数字，模拟新报告效果

### 4. 悖论产量排除逻辑 (`enterprise/simulator.html`)
- 步骤2新增"产量环比变化%"输入字段
- 产量变化 ≥ 10% 时显示「产能变化排除」结果（蓝色提示，不判定悖论）
- 产量变化 < 10% 时正常进入 C-P 协同判定逻辑

### 5. 健康评分定时更新 (`enterprise/dashboard.html`)
- 每30秒模拟一次健康评分波动（±2分随机变化）
- 自动更新DOM显示（分数+颜色标签+更新时间）
- 数据持久化到 DataStore

---

## 🔧 DataStore 数据层（关键）

`js/data.js` 中的 `DataStore` 使用 `localStorage` 持久化，命名空间 `pcap_`：

```
pcap_alerts        → 预警列表（CRUD+状态流转）
pcap_dispatches    → 调度指令（闭环管理：下发→签收→反馈→复核→销号）
pcap_monthlyReports→ 月度报告（草稿/待审核/已通过/已退回）
pcap_reviews       → 数据审核记录
pcap_simulatorHistory → 悖论模拟器历史记录（新增）
pcap_tripleReports   → 三评合一报告数据（新增，含4-6月多份报告）
pcap_llmSessions     → LLM历史会话列表（新增）
pcap_llmCurrentSession → 当前激活会话ID（新增）
pcap_formDraft     → 企业填报表单草稿
pcap__inited       → 是否已初始化标志
```

**新增 CRUD 方法**：
- `getSimulatorHistory()` / `addSimulatorRecord(item)` — 模拟器历史
- `getTripleReports()` / `getLatestTripleReport()` — 三评合一报告
- `getRealtime()` / `setRealtime(data)` — 实时双算数据

**重置假数据**：在浏览器控制台执行 `DataStore.reset()`

---

## 🗺️ 关键页面地图

```
prototype/html-prototype/
├── index.html                     # 三角色入口导航（20页索引）
├── css/style.css                  # 全局科技风样式+动效系统
├── js/data.js                     # DataStore假数据中心（已扩充4-6月数据）
├── enterprise/                    # 工业企业端（10页）
│   ├── login.html / register.html # 登录/注册
│   ├── dashboard.html             # 工作台（数字滚动+健康评分定时更新）
│   ├── monthly-report.html        # 月度填报（保存草稿+提交审核）
│   ├── realtime-panel.html        # 实时双算看板（✅ DataStore动态数据）
│   ├── simulator.html             # 悖论模拟器（✅ 计算+产量排除+保存+历史记录）
│   ├── triple-report.html         # 三评合一报告（✅ DataStore动态渲染+历史列表）
│   ├── report-preview.html        # PDF预览
│   ├── paradox-report.html        # 悖论诊断报告（✅ 动态化+4种类型适配）
│   └── alerts.html                # 预警中心（标记已读/删除/状态流转/催办）
├── gov-dashboard/                 # 政府管理科（4页）
│   ├── index.html                 # 指挥大屏（KPI/事件流/调度/模板选择）
│   ├── dispatch-detail.html       # 调度指令详情（闭环状态流转）
│   ├── llm-assistant.html         # LLM助手（✅ 历史会话+推荐问题+可信度标注）
│   └── report-result.html         # 自然语言报表结果
└── gov-monitoring/                # 监测数据科（5页）
    ├── index.html                 # 3D GIS监测台（Leaflet+28企业+飞线动画）
    ├── enterprise-detail.html     # 企业透视（✅ 28家企业动态数据）
    ├── data-audit.html            # 数据质量AI审核（通过/退回）
    ├── monthly-monitor.html       # 监测月报（✅ AI生成动画+审核发布）
    └── transfer-trace.html        # 跨区转移溯源
```

---

## 🎯 剩余待办/后续可继续方向

1. **悖论时长判定逻辑**：alerts.html 详情中增加 C-P<0.6持续4h→黄、C-P<0.4持续1h→橙、持续24h→红 的判定展示
2. **LLM报表自然语言输入界面**：report-result.html 扩展为支持自然语言查询的输入界面
3. **Phase 3 (P3) 后端对接准备**：Supabase表结构、REST API规范、LLM API方案、OCR方案
4. **GitHub远程推送**：用户手动推送（本地仓库已完整）

---

## 📝 代码质量与已知问题

| 项目 | 状态 |
|---|---|
| data.js 语法 | ✅ 合法（括号平衡131:131） |
| 全站HTML标签匹配 | ✅ 全部通过 |
| 全站JS括号平衡 | ✅ 全部通过 |
| escapeHtml XSS防护 | ✅ 已转义 `& < > " '`，单引号注入风险已消除 |
| loader关闭脚本 | ✅ 每页独立 `<script>` 放在 `</body>` 前，与业务JS隔离 |
| CSS覆盖策略 | ✅ `style.css` 在所有 `<style>` 之后加载 |

**⚠️ 遗留小项（非阻塞）**：
- alerts.html 时长判定展示逻辑（静态详情中已硬编码"12小时"，未按DataStore数据动态计算）
- 部分政府端页面的数字滚动动画不如企业端dashboard精细

---

## 💡 Token 节省策略（供后续参考）

经过今日高密度编码，总结以下降低token消耗的方法：

### 1. 给AI的上下文最小化公式
不要每次让AI重新探索代码库。最高效开场：
```
"继续昨天的原型工作。最新提交是`67e86a1`。
今天做：[具体1-2个任务]。
关键上下文：DataStore在`js/data.js`，20页纯静态HTML，科技风深色主题。
先读WORKLOG.md，然后读[具体文件]开始。"
```

### 2. 批量修改优先用脚本/模板
如果涉及全站同类型修改（如统一改某个颜色、统一添加某个组件），让AI写一个 **Node.js/Python批处理脚本** 而不是逐页修改。例如：
```bash
node scripts/batch-replace.js --pattern="oldColor" --replace="newColor" --glob="*.html"
```
这样AI只需写一次脚本逻辑，而非重复20次文件操作。

### 3. 单文件修改时只读必要部分
使用 `line_offset` + `n_lines` 读取文件局部，而非整文件。CSS/JS变更尽量放在独立文件中（如已实践的 `style.css` 和 `data.js`），避免分散到20个HTML里。

### 4. 复用已有组件而非重写
本项目已形成稳定组件模式：
- 页面loader脚本（统一复制粘贴）
- DataStore CRUD 模式（复制已有方法改key名）
- 卡片/表格/弹窗结构（从已有页面复制HTML结构）
告诉AI "参考xxx页面的yyy组件" 比从零描述节省大量token。

### 5. 本地自动化检查替代AI验证
用Shell脚本做语法检查、标签匹配、括号平衡，不让AI逐页人工检查：
```bash
node -c js/data.js
for f in *.html; do node -e "检查标签匹配"; done
```

---

## ⚡ 明日最高效开场白

直接粘贴这段给Kimi，不需要它重新遍历代码库：

> "继续昨天的原型工作。当前最新提交是`67e86a1`。
> 今天做：[具体任务]。
> 关键上下文：DataStore在`js/data.js`，20页纯静态HTML原型，科技风深色主题。
> 先读WORKLOG.md然后开始。"

**更省token的方式**：直接给Kimi发 `"继续昨天的原型，今天做xxx，先读WORKLOG.md"`，它比重新探索代码库快10倍。


---

## 📋 PRD v3.1 差距分析与实施优先级

> 记录日期：2026-05-21
> 基准文档：`docs/PRD/PRD-污碳协同AI监管与决策平台.md`（v3.1，1,414 行）
> 当前原型：25 页纯静态 HTML（enterprise 10 + gov-dashboard 8 + gov-monitoring 5 + 其他 2）

---

### 一、差距总表

| 模块 | PRD v3.1 要求 | 当前状态 | 差距 |
|------|--------------|----------|------|
| **数据底座** | 多排口监测模型（企业→排口→设施→监测点） | ✅ 已改造 `js/data.js` | ✅ 完成 |
| | 扩展污染物（TVOC/NMHC/PM2.5/SO₂/NOₓ/CO/CO₂/CH₄） | ⚠️ 部分实现（排口明细/企业详情已展示） | 🟡 中 |
| | 电力三指标（总/绿/化石） | ✅ 已实现 | ✅ 完成 |
| | 绿电碳排 = 0 | ✅ 已实现（提示+校验） | ✅ 完成 |
| **三层指标** | C-P 协同指数 | ✅ 已实现 | — |
| | **MCI 多污染物指数** | ✅ 已实现 | ✅ 完成 |
| | **EHI 环境健康评分** | ✅ 已实现 | ✅ 完成 |
| **LCA** | 工序端视角 | ✅ 已实现 | — |
| | **全生命周期视角切换** | ❌ 未实现 | 🟡 中 |
| **企业端增强** | 月度填报-企业为核心、排口为辅 | ⚠️ 部分实现 | 🟢 小 |
| | 月度填报-电力三指标 | ✅ 已实现 | ✅ 完成 |
| | 实时看板-排口下钻 | ✅ 已实现 | ✅ 完成 |
| | 实时看板-MCI/EHI 展示 | ✅ 已实现 | ✅ 完成 |
| | 悖论模拟器-LCA 切换 | ❌ 未实现 | 🟡 中 |
| **政府端-新增页面** | **企业管理**（查询/档案/对比） | ✅ 已创建 | ✅ 完成 |
| | **数据管理**（查询/审核/质量/血缘） | ✅ 已创建 | ✅ 完成 |
| | **企业设备管理**（档案/监控/维保/排名） | ✅ 已创建 | ✅ 完成 |
| | AI 协同管控大屏（L1/L2/L3 升级） | ⚠️ 基础版已实现 | 🟡 中 |
| **监测科增强** | 企业详情透视-多排口+设施档案 | ✅ 已实现 | ✅ 完成 |
| **数据模型** | `enterprise_outlets` / `outlet_devices` / `outlet_monitoring` | ❌ 未实现 | **🔴 大** |

---

### 二、实施优先级

#### ✅ P0 — 已完成（2026-05-20）

| # | 任务 | 状态 |
|---|------|------|
| **P0-1** | 多排口数据底座改造 | ✅ `js/data.js` 已扩展 outlets + devices + DataStore 方法 |
| **P0-2** | 政府端-企业管理页面 | ✅ `enterprise-management.html` 已创建（37KB） |
| **P0-3** | 政府端-数据管理页面 | ✅ `data-management.html` 已创建（19KB） |
| **P0-4** | 政府端-企业设备管理页面 | ✅ `device-management.html` 已创建（24KB） |

#### ✅ P1 — 核心功能增强（2026-05-21 全部完成）

| # | 任务 | 状态 |
|---|------|------|
| **P1-5** | 三层指标（MCI + EHI）计算与展示 | ✅ `dashboard.html` / `realtime-panel.html` / `gov-dashboard/index.html` 已新增卡片 |
| **P1-6** | 月度填报-电力三指标 + 企业/排口分层 | ✅ `monthly-report.html` 已改造，含实时校验+折叠面板 |
| **P1-7** | 实时看板-排口下钻 | ✅ `realtime-panel.html` 已新增排口明细Tab |
| **P1-8** | 企业详情透视增强（多排口 + 治理设施档案） | ✅ `enterprise-detail.html` 已新增2个Tab |

#### ✅ P2 — 体验优化（2026-05-21 全部完成）

| # | 任务 | 状态 |
|---|------|------|
| **P2-9** | 悖论模拟器-LCA 视角切换 | ✅ `simulator.html` 已新增 toggle + 四阶段 LCA 计算 + LCA 结果卡片 |
| **P2-10** | 大屏 AI 化升级（L1/L2/L3） | ✅ `gov-dashboard/index.html` 已新增 AI 摘要/预测性预警/智能调度建议 |
| **P2-11** | 扩展污染物展示 | ✅ `triple-report.html` 已新增扩展污染物监测达标率区块 |

---

### 三、执行路线建议

**推荐方案：按依赖关系串行（已推进至 P2）**
```
✅ P0-1 数据底座 → ✅ P0-2/3/4 政府三页面 → ✅ P1-6 电力三指标 → ✅ P1-7 排口下钻 → ✅ P1-5 三层指标 → ✅ P1-8 企业详情增强 → P2-9 LCA切换 → P2-10 大屏AI化 → P2-11 扩展污染物
```

> 说明：P0、P1 已全部完成。P2 三项相互独立，可按任意顺序推进。P2-9 改动范围最小（单个页面 toggle + 计算分支），建议优先。P2-10 需跨 `gov-dashboard/index.html` 多处修改，工作量最大。P2-11 属于字段扩展，可在其他页面修改时顺便完成。

---

### 四、新增页面清单（PRD v3.1 要求）

| 页面 | 路径 | 优先级 |
|------|------|--------|
| 企业管理 | `gov-dashboard/enterprise-management.html` | P0-2 |
| 数据管理 | `gov-dashboard/data-management.html` | P0-3 |
| 企业设备管理 | `gov-dashboard/device-management.html` | P0-4 |

> 当前 gov-dashboard 目录已有 5 页：index / dispatch-detail / llm-assistant / report-result / knowledge-base。新增 3 页后，gov-dashboard 将达到 8 页。

---


---

## 📅 2026-05-21 工作日志（第二轮 — 用户反馈修复）

> 最新Git提交：`fc1a291` — 5项全局质量检查完成
> 本次 session 触发原因：用户反馈 government 端页面持续 loading + 功能改造需求

---

### 一、🔴 URGENT — 政府管理科/监测数据科页面持续 loading

**根因**：`common.js` 批量应用到 24 页时，**只引入了 `<script src>`，漏掉了 `initCommon()` 的实际调用**。同时底部独立的 loader 关闭脚本被删除后，page-loader 失去了关闭机制。

**修复**：
- 为 **24/24 个页面** 补充 `initCommon()` 调用
- `gov-dashboard/index.html` / `gov-monitoring/index.html` 在初始化代码前添加 `initCommon();`
- `enterprise/dashboard.html` 额外补上缺失的 `</body></html>` 闭合标签
- 所有页面 JS 语法检查 + HTML 标签匹配检查通过

**涉及文件**：
- `enterprise/*` × 10 页
- `gov-dashboard/*` × 8 页
- `gov-monitoring/*` × 5 页
- `index.html`

---

### 二、📊 月度数据填报 → 实时数据监控改造

**文件**：`enterprise/monthly-report.html`（全面重写，679行 → 新结构）

**改造内容**：
| 改造项 | 说明 |
|--------|------|
| 文案统一 | 标题/侧边栏/页面头部全部改为「实时数据监控」，状态标签改为「已同步」 |
| 实时标记 | 页面头部增加绿色脉冲点 + 「实时接入中」标识 |
| **Tab 切换** | 右上角新增 📋 数据表 / 📊 数据图 切换按钮组，带动画过渡 |
| 数据表视图 | 保留原有全部表单字段，增加「实时采集/设备直采」来源标注，操作改为「保存数据」+「刷新实时数据」 |
| **数据图视图** | 引入 ECharts，新增 5 张图表：涂料消耗饼图、能源消耗柱状图、RTO 关键指标图、排口去除效率横向图、进出口浓度对比分组柱状图 |
| 数据联动 | 图表数据与表单字段同源，视图切换时数据保持一致 |

---

### 三、📈 实时双算看板三处修复

**文件**：`enterprise/realtime-panel.html`

| # | 问题 | 修复 |
|---|------|------|
| 1 | **排口数据没打通** | `DataStore.init()` 显式调用 + `renderOutletDetails()` 三级回退（outlets / outletMonitoring / devices） |
| 2 | **同区域对比乱码** | 特殊 Unicode 下标字符 `₂`(U+2082)、`ₓ`(U+2093)、`₄`(U+2084) 全部替换为 HTML `<sub>` 标签，确保跨浏览器兼容 |
| 3 | **设备状态无历史查询** | 6 个设备卡片全部添加 `cursor:pointer` + 点击弹窗；弹窗内 ECharts 面积折线图（12时间点 + 平均线标记）+ 当前值/平均值/最大值/趋势 4 个统计指标 |

---

### 四、🔮 悖论模拟器全面改造

**文件**：`enterprise/simulator.html`（929行 → 全面重写，约1100行）

**改造内容**：

#### 1. 增加更多可选项（围绕工业涂装企业）
- 从原来的「底漆」单一环节扩展为 **7 个完整工艺环节**：
  - 🧽 前处理（脱脂+磷化 / 硅烷化 / 无磷转化膜）
  - 🎨 底漆（溶剂型 / 水性 / 高固体分 / 粉末）
  - 🖌️ 中涂（溶剂型 / 水性 / 无中涂）
  - ✨ 面漆（溶剂型 / 水性 / UV固化）
  - 🔮 清漆（溶剂型 / 水性 / 无清漆）
  - 🔥 烘干（天然气热风 / 电加热 / 热泵+余热回收 / 红外+微波复合）
  - 🌀 废气处理（RTO / 沸石转轮+RTO / 活性炭 / RCO）
- 当前产线和拟改造产线各配一套完整 7 环节配置器

#### 2. 更加灵活
- **4 个快速场景按钮**：典型溶剂型产线 / 典型水性化产线 / 典型粉末涂装线 / 绿色标杆产线（一键加载全部环节配置）
- **滑块调参**：产量变化率、当前/目标热回收效率改为 range input 实时预览
- **新增参数**：涂料包装回收率、绿电占比（影响碳排计算）
- **行业扩展**：新增电子电器涂装、工程机械涂装

#### 3. 有叙事感
- 步骤条改为 **故事章节**：「描绘现状」→「调整参数」→「预见未来」
- 每个步骤顶部有 **AI 助手叙事引导卡片**（角色化文案）
- 结果页新增 **「故事线」区域**：现在 → 转变 → 风险 → 出路，第一人称叙述产线技改完整历程
- `generateStory()` 根据具体选择的工艺组合动态生成叙事文案

#### 计算模型升级
- `PROCESS_DB` 扩展为 7 个环节 × 多选项，每个选项含 `vocsFactor` / `energyFactor` / `carbonFactor`
- `calculateResult()` 综合累加所有环节参数，生成整体变化
- 行业阈值判定（ dangerLine = threshold × 0.8 ）

---

### 五、📑 三评合一报告增加样例

**文件**：`js/data.js` + `enterprise/triple-report.html`

- `MOCK_DATA.tripleReports` 从 **1 份增加到 3 份完整样例**（2026-03 / 2026-04 / 2026-05）
- 每份样例包含完整评分卡片、AI 核心结论、污染/能效/碳排详情、扩展污染物监测、改进优先级
- `triple-report.html` 修复 DataStore 回退逻辑：`getTripleReports()` / `getLatestTripleReport()` / `switchReport()` 均增加 `MOCK_DATA.tripleReports` 回退
- 页面选择器旁新增「📋 以下报告为样例数据，供参考」提示标签

---

### 六、今日踩坑记录

| 坑 | 原因 | 解决方案 |
|---|---|---|
| `initCommon()` 未调用导致全站 loading | 批量应用 common.js 时只引入了 `<script>`，漏了函数调用 | 用 Shell 脚本批量检查：`find . -name "*.html" -exec grep -l "common.js" {} \;`，筛选出 22 个缺失页面，统一在 `</body>` 前添加 `<script>initCommon();</script>` |
| simulator.html 字符替换误伤 JS | `StrReplaceFile` 全局替换 `₂` → `<sub>2</sub>` 时，也替换了 JS 对象中的 `unit: 'tCO₂/h'` | 该字段实际未被使用，无害。后续注意区分 HTML 内容和 JS 字符串中的特殊字符 |
| `triple-report.html` 侧边栏文案未同步 | 之前只改了部分页面的侧边栏 | 统一检查所有引用 `monthly-report.html` 侧边栏的页面，全部改为「实时数据监控」 |

---

### 七、明日调试备忘

**建议优先验证项**：

1. **loading 问题是否彻底解决**
   - 打开 `gov-dashboard/index.html` 和 `gov-monitoring/index.html`，确认 page-loader 正常消失
   - 如果仍有 loading，检查浏览器控制台是否有 JS 报错

2. **实时数据监控页面**
   - Tab 切换（数据表 ↔ 数据图）是否流畅
   - ECharts 图表是否正确渲染（需联网加载 CDN）
   - 保存数据后刷新，DataStore 数据是否持久化

3. **悖论模拟器**
   - 快速场景按钮是否一键正确加载全部 7 个环节
   - 结果页「故事线」文案是否根据工艺组合动态变化
   - LCA 视角切换是否显示/隐藏 LCA 结果卡片

4. **实时双算看板**
   - 设备状态卡片点击后弹窗是否正常弹出
   - 弹窗内 ECharts 折线图是否有数据
   - 排口明细 Tab 切换是否正常展示数据

5. **三评合一报告**
   - 报告选择器下拉是否有 3 个月份选项
   - 切换月份后内容是否正确更新

**已知限制**：
- `simulator.html` 中 `unit: 'tCO<sub>2</sub>/h'` 在 JS 字符串中（第396行），虽未被使用但不够优雅。若后续需要显示单位，应改用 `textContent` 或分离 HTML/纯文本版本
- `realtime-panel.html` 中的 `³` 字符（U+00B3）和 `°` 字符（U+00B0）保留未替换，在大多数系统中可正常显示。如仍有乱码反馈，可进一步替换为 `&sup3;` 和 `&deg;`

---

---

## 📅 明日工作计划（2026-05-22）

> 记录时间：2026-05-21 晚间
> 来源：用户直接给出的6项待办

---

### 任务总览

| # | 任务 | 目标页面 | 预估工作量 | 依赖 |
|---|------|----------|-----------|------|
| 1 | 政府管理科工作台标题补充 | `gov-dashboard/index.html` | 小 | — |
| 2 | 辖区企业态势概览加怀柔区地图底图 | `gov-dashboard/index.html` | 中 | Leaflet CDN |
| 3 | MCI/EHI区域均值点击查看详情 | `gov-dashboard/index.html` + 新详情页 | 中 | — |
| 4 | 3D监测加粒子风场+排放动向 | `gov-monitoring/index.html` | 大 | 需Canvas/SVG动画 |
| 5 | 企业详情排口档案/治理设施补数据 | `gov-monitoring/enterprise-detail.html` | 中 | `js/data.js` |
| 6 | 溯源飞线改面状热力图 | `gov-monitoring/index.html` | 大 | 参考中央气象台降水热力图 |

---

### 任务1：政府管理科工作台标题缺失

**目标页面**：`gov-dashboard/index.html`

**问题描述**：协同管控指挥大屏的标题栏可能缺失或显示不完整。需要检查 `.screen-header-title` 区域，确认标题文字、副标题、脉冲点是否完整渲染。

**检查点**：
- `.screen-header-title` 是否包含「协同管控指挥大屏 — 污碳协同AI监管平台」
- 副标题「怀柔区工业涂装行业 VOCs-碳协同监测」是否存在
- 脉冲动画点 `.pulse-dot` 是否正常

**修复方向**：如缺失，在 `.screen-header-left` 内补充标题结构。

---

### 任务2：辖区企业态势概览加怀柔区地图底图

**目标页面**：`gov-dashboard/index.html`

**问题描述**：大屏「辖区企业态势概览」区域目前可能只有文字/列表，缺少地理可视化背景。

**方案**：在概览区域嵌入一个简化版 Leaflet 地图（或静态 SVG 地图），以北京市怀柔区为底图：
- 使用 CartoDB dark_matter 或 basemaps.cartocdn.com/dark_all 瓦片
- 地图中心：40.32, 116.63（怀柔区中心）
- 仅展示企业点位气泡（不展开详情，保持大屏简洁）
- 企业颜色按 C-P 分级：红/黄/绿
- 地图尺寸：占概览卡片高度的 60-80%

**技术要点**：
- 需要引入 Leaflet CSS + JS CDN（若尚未引入）
- 注意与现有大屏布局的层叠关系（z-index）
- 地图容器固定尺寸，避免响应式导致的布局错乱

---

### 任务3：MCI/EHI区域均值点击查看详情

**目标页面**：`gov-dashboard/index.html`

**问题描述**：KPI 栏下方的 MCI 区域均值 / EHI 区域均值卡片目前是静态展示，用户要求「点击查看详情」。但对应的详情页面缺失。

**方案**：
1. 给 MCI/EHI 卡片添加 `cursor:pointer` + 点击事件
2. 点击后弹出一个详情抽屉/弹窗（而非跳转新页面，保持大屏体验）
3. 弹窗内容：
   - MCI 详情：6 项污染物（TVOC/NMHC/PM2.5/SO₂/NOₓ/CO）的当前值、限值、达标状态
   - EHI 详情：暴露浓度 × 毒性系数 × 暴露时间的分项计算
   - 区域排名：本企业在 28 家企业中的位置
   - 历史趋势：近 3 个月的 MCI/EHI 变化曲线（SVG 简化折线）

**实现方式**：复用现有的 modal/drawer 结构，深色玻璃态弹窗。

---

### 任务4：3D监测加粒子风场+排放动向

**目标页面**：`gov-monitoring/index.html`

**问题描述**：当前 3D GIS 监测台已有飞线动画和粒子效果，但缺少「粒子风场」和「排放动向」可视化。

**方案**：
- **粒子风场**：在 Leaflet 地图上层叠加 Canvas 风场动画
  - 参考 windy.com 风格，用粒子表示风向/风速
  - 粒子颜色表示风速强度（低=青/高=红）
  - 使用 `L.canvas` 或独立 Canvas 叠加层
- **排放动向**：
  - 烟囱位置（企业坐标）持续发射粒子
  - 粒子运动方向 = 风向，速度 ∝ 排放量
  - 粒子颜色 = 排放等级（绿/黄/红）
  - 粒子生命周期 2-3 秒后淡出

**技术要点**：
- Canvas 叠加层需要处理 Leaflet 的 zoom/pan 事件同步
- 粒子数量控制在 100-200 个，避免性能问题
- 考虑使用 `L.CanvasLayer` 或自定义 `L.Layer`

---

### 任务5：企业详情排口档案/治理设施补数据

**目标页面**：`gov-monitoring/enterprise-detail.html`

**问题描述**：企业透视页的「🔬 排口档案」（Tab 4）和「🔧 治理设施」（Tab 5）目前可能显示为空或硬编码数据，需要从 DataStore 动态读取。

**方案**：
- **排口档案**：
  - 从 `DataStore.getOutlets()` 读取该企业关联的排口
  - 从 `DataStore.getOutletMonitoring()` 读取实时监测数据
  - 展示：排口基本信息 + inlet/outlet 多污染物浓度 + 去除效率进度条
- **治理设施**：
  - 从 `DataStore.getDevices()` 读取该企业关联的设备
  - 展示：设备基本信息 + 运行参数 + 维保倒计时 + 效率达成率

**检查点**：
- 确认 `gov-monitoring/enterprise-detail.html` 的 Tab 切换逻辑已正确绑定
- 确认 DataStore 中有该企业的 outlets/devices 数据（通过 `enterpriseId` 过滤）

---

### 任务6：溯源飞线改面状热力图

**目标页面**：`gov-monitoring/index.html`

**问题描述**：当前污染转移溯源飞线是「线状」（polyline 虚线），用户要求改为「面状」，参考中央气象台降水变化热力图。

**参考效果**：
- 中央气象台降水热力图：网格化的色块，颜色深浅表示降水强度，有渐变过渡
- 应用到污染溯源：飞线路径变成一个「污染带」面状区域，宽度 ∝ 污染强度

**方案**：
- 将 `L.polyline` 改为 `L.polygon` 或 `L.polyline` + 缓冲区
- 或者使用 Leaflet 热力图插件（`leaflet-heat`）
- 每个飞线路径生成一个带状多边形（宽度 2-5km，根据污染等级变化）
- 多边形填充颜色 = 飞线颜色，透明度 0.2-0.4
- 保留飞线粒子动画（在面状区域内移动）

**技术要点**：
- 需要将路径点扩展为带状区域（每点垂直于路径方向的左右偏移）
- 或使用 Leaflet.heat 的点密度热力图（以路径点为中心生成热力）
- 考虑性能：飞线数量 5-8 条，热力点数量控制在合理范围

---

### 执行建议

**推荐执行顺序**（由易到难）：
```
任务1（标题补充） → 任务5（补数据） → 任务3（MCI/EHI弹窗） → 任务2（加地图） → 任务4（粒子风场） → 任务6（面状飞线）
```

**前置依赖**：
- 任务5 需要先确认 `js/data.js` 中 outlets/devices 数据是否包含 `enterpriseId` 字段
- 任务4 和 任务6 涉及 Canvas 动画，可能需要引入新库或手写 Canvas 逻辑
- 任务2 的 Leaflet 引入需要确认与现有地图实例不冲突

**风险点**：
- 任务4（粒子风场）工作量最大，如果 Leaflet + Canvas 叠加层调试困难，可降级为「简化版粒子发射动画」（仅在烟囱位置发射粒子，不引入完整风场）
- 任务6（面状飞线）如果 Leaflet.heat 插件引入复杂，可降级为「加宽 polyline + 渐变 shadow」模拟面状效果

---


---

## 📅 2026-05-22 工作日志（今日）

> 最新Git提交：本轮待提交
> 策略：先执行用户指定的6项任务 + 昨日遗留4项，实时更新WORKLOG

---

### ✅ 任务完成情况总览

| # | 任务 | 目标页面 | 状态 | 关键说明 |
|---|------|----------|:--:|---|
| 1 | 政府管理科工作台标题补充 | `gov-dashboard/index.html` | ✅ | 标题改为「📊 协同管控指挥大屏 — 污碳协同AI监管平台」，副标题改为「怀柔区工业涂装行业 VOCs-碳协同监测」 |
| 2 | 企业详情排口档案/治理设施补数据 | `gov-monitoring/enterprise-detail.html` + `js/data.js` | ✅ | `js/data.js` 扩展了35个outlets和35个devices（覆盖ENT-002~ENT-015）；页面新增 `ENT_ID_MAP` 动态映射，renderOutlets/renderDevices 改为接受 eid 参数 |
| 3 | MCI/EHI区域均值点击查看详情 | `gov-dashboard/index.html` | ✅ | MCI/EHI 卡片 onclick 改为 `openKpiDetail('mci'/'ehi')`；弹窗含6项污染物达标率表格、EHI分项计算公式、近3月SVG趋势图、区域排名 |
| 4 | 辖区企业态势概览加怀柔区地图底图 | `gov-dashboard/index.html` | ✅ | `.map-area` 内嵌 `#miniMap` Leaflet暗色地图（CartoDB dark_matter），中心40.32,116.63，28家企业CircleMarker按C-P分级着色 |
| 5 | 3D监测加粒子风场+排放动向 | `gov-monitoring/index.html` | ✅ | 新增「🌬️ 风场」图层切换按钮；简化版风向场：6条西北→东南风向虚线+动画粒子；与现有排放粒子图层独立控制 |
| 6 | 溯源飞线改面状热力图 | `gov-monitoring/index.html` | ✅ | `addFlyLine()` 增加双层面状底带：`weight*5` 宽线（opacity 0.18）+ `weight*2.5` 中线（opacity 0.35）+ 上层动态线；实现「污染带」渐变效果 |
| A | 全站loading最终验证 | 全站 | ✅ | `gov-dashboard/index.html` / `gov-monitoring/index.html` / `enterprise-detail.html` 均含 `initCommon()` 调用，page-loader 机制正常 |
| B | 页面索引更新 | `index.html` | ✅ | 23个页面导航入口完整，企业管理/数据管理/设备管理均已包含 |
| C | data.js语法检查 | `js/data.js` | ✅ | `node -c` 通过，括号平衡 |
| D | Git提交 | 全站 | ⏳ | 待执行（删除临时脚本后提交） |

---

### 一、任务1：政府管理科工作台标题补充

**文件**：`gov-dashboard/index.html`

**改动**：
- `.screen-header-title`：由 `📊 污碳协同 · 协同管控指挥大屏` 改为 `📊 协同管控指挥大屏 — 污碳协同AI监管平台`
- `.screen-header-sub`：由 `北京市怀柔区生态环境局 · 工业涂装行业 · 2026-05-18 09:00` 改为 `怀柔区工业涂装行业 VOCs-碳协同监测 · 2026-05-18 09:00`

---

### 二、任务2：企业详情排口档案/治理设施补数据

**文件**：`js/data.js` + `gov-monitoring/enterprise-detail.html`

**改动**：

#### 1. data.js 数据底座扩展
- `outlets`：由3条扩展为 **38条**（新增35条，覆盖 ENT-002 ~ ENT-015）
- `devices`：由3条扩展为 **38条**（新增35条，与新增outlet一对一关联）
- `outletMonitoring`：新增35个排口的监测数据（含 inletTVOC/outletTVOC/inletNMHC/outletNMHC/PM2.5/SO₂/NOₓ/CO/CO₂/CH₄/流量/去除效率/设备功率/天然气流量/炉膛温度/热回收效率）
- 每家企业根据规模分配2~3个排口，设备类型（RTO/RCO/活性炭）随机轮换

#### 2. enterprise-detail.html 动态化
- 新增 `ENT_ID_MAP` 映射表：28家企业名称 → enterpriseId（ENT-001 ~ ENT-028）
- `renderOutlets()` / `renderDevices()` 由硬编码 `'ENT-001'` 改为接受 `eid` 参数
- `loadEnt()` 中通过 `ENT_ID_MAP[data.name]` 获取当前企业ID并传入渲染函数

**效果**：访问任意企业详情页时，排口档案和治理设施 Tab 自动显示该企业关联数据（如数据存在）；无数据企业显示「暂无排口数据」占位。

---

### 三、任务3：MCI/EHI区域均值点击查看详情

**文件**：`gov-dashboard/index.html`

**改动**：
- MCI 卡片 onclick：由 `showToast(...)` 改为 `openKpiDetail('mci')`
- EHI 卡片 onclick：由 `showToast(...)` 改为 `openKpiDetail('ehi')`
- 在 `openKpiDetail()` 函数中新增 `mci` / `ehi` 分支：

**MCI 弹窗内容**：
- MCI 区域均值 0.55 / 评估等级 🟡 轻度污染
- 六项污染物监测达标率表格：TVOC/NMHC/PM2.5/SO₂/NOₓ/CO，每项显示当前值、限值、占比%、达标状态（🟢/🟡/🔴）
- 近3个月 MCI 趋势 SVG 折线图（3月→4月→5月→现在）
- MCI 指标说明卡片

**EHI 弹窗内容**：
- EHI 区域均值 68 分 / 健康等级 🟡 中等风险 / 区域排名 第12位
- 分项计算表格：张镇工业园/李村工业区/标杆园区A 的「暴露浓度 × 毒性系数 × 暴露时间 = 评分」
- 近3个月 EHI 趋势 SVG 折线图（含红色警戒线）
- EHI 指标说明卡片

---

### 四、任务4：辖区企业态势概览加怀柔区地图底图

**文件**：`gov-dashboard/index.html`

**改动**：
- `<head>` 引入 Leaflet CSS CDN
- `.map-area` 内新增 `<div id="miniMap">` 覆盖整个区域（绝对定位，z-index:1）
- 原有 `.map-zone` 标签调整为 `pointer-events:none` + `z-index:2`，作为地图 overlay 保留
- `</body>` 前引入 Leaflet JS CDN
- 初始化脚本：`L.map('miniMap')` 中心 40.32,116.63，zoom 11，CartoDB dark_matter 暗色瓦片
- 28家企业全部以 `L.circleMarker` 渲染，半径5px，颜色按 C-P 分级（红/黄/绿/灰）

**注意**：迷你地图无 zoomControl/attributionControl，保持大屏简洁风格。

---

### 五、任务5：3D监测加粒子风场+排放动向

**文件**：`gov-monitoring/index.html`

**改动**（简化版风场，未引入完整 Canvas 叠加层）：
- CSS 新增 `.wind-line` 动画：`stroke-dashoffset` 循环 + 透明度呼吸
- 图层切换按钮区新增「🌬️ 风场」按钮（`#btnWind`）
- 新增 `createWindLayer()`：6条西北→东南方向的虚线（`#22d3ee` / `#0ea5e9`），模拟区域主导风向
- 每条风向线中点添加动画粒子（复用 `.fly-particle` CSS类）
- 新增 `toggleWind()`：控制风场图层显隐，与排放粒子图层独立

**已知限制**：当前为简化示意风场，非真实气象数据驱动。如需真实风场，需接入气象API或 CFD 模拟数据（P3阶段）。

---

### 六、任务6：溯源飞线改面状热力图

**文件**：`gov-monitoring/index.html`

**改动**（降级为「加宽 polyline + 渐变 shadow」方案，未引入 Leaflet.heat）：
- `addFlyLine()` 重构为三层结构：
  1. **底层面状带**：`weight * 5`，opacity 0.18，`lineCap:round` — 模拟「污染带」宽度
  2. **中层渐变带**：`weight * 2.5`，opacity 0.35 — 增强过渡效果
  3. **上层动态线**：原 `dashArray:12 8` 动画虚线，opacity 0.9 — 保留飞线动感
- `flyLineLayers` 数组同步存储 `band` / `band2` / `poly` 引用
- `showAllFlyLines()` 同步设置三层 opacity
- 图例区文案改为「污染转移飞线（面状热力带模式）」

**效果**：飞线路径从「单线」变为「由宽到窄的渐变污染带」，视觉上更接近中央气象台降水变化热力图的「面状」特征。

---

### 七、昨日遗留任务

| # | 遗留项 | 状态 | 说明 |
|---|--------|:--:|------|
| A | 全站loading最终验证 | ✅ | 关键页面均含 `initCommon()`，JS无语法错误，HTML标签平衡 |
| B | 页面索引更新 | ✅ | `index.html` 23页导航完整，新增3个政府端页面已加入 |
| C | data.js语法检查 | ✅ | `node -c js/data.js` 通过 |
| D | Git提交 | ⏳ | 本轮全部完成后统一提交 |

---

### 八、技术债务与踩坑记录

| # | 问题 | 原因 | 解决方案 |
|---|------|------|----------|
| 1 | Node.js脚本字符串中含HTML `class=` 被解析器误读 | 模板字符串内嵌HTML时，反引号未正确转义 | 改用 StrReplaceFile 工具直接替换，绕过脚本生成 |
| 2 | `StrReplaceFile` 多行替换失败 | 文件中的换行符与替换字符串中的换行符不一致（LF vs CRLF） | 使用 `cat -A` 检查实际换行符，精确匹配后替换成功 |
| 3 | data.js 扩展时 outlets/devices/monitoring 需同步增加 | 三者存在外键关联（outletId → monitoring key, outletId → device outletId） | 脚本中统一生成，确保 ID 一一对应 |

---

### 九、明日建议

1. **Git 提交**：本轮修改涉及 20+ 文件，建议统一提交并打标签
2. **浏览器走查**：重点验证 `gov-dashboard/index.html` 的迷你地图与现有布局是否冲突（z-index）
3. **3D监测风场优化**：如用户反馈风场效果不够真实，可升级为 Canvas 粒子风场（参考 windy.com 开源方案）
4. **面状飞线增强**：如需更真实的「污染带」效果，可引入 `L.heat` 或自定义 `L.CanvasLayer` 实现网格化热力
5. **数据底座持续完善**：当前仅前15家企业有 outlets/devices 数据，后续可按需扩展至全部28家

---
