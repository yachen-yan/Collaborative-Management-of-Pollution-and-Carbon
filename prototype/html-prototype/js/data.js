// ========== 假数据中心 + localStorage 持久化层 ========// ========== 假数据中心 + localStorage 持久化层 ==========
// 支持 CRUD、闭环状态流转、跨页面数据共享

const MOCK_DATA = {
  enterprise: {
    name: "蓝天工业涂装有限公司",
    industry: "汽车零部件涂装",
    contact: "张环保",
    phone: "138****5678",
    licenseNo: "91110108MA0012345",
    licenseExpire: "2026-12-31",
    carbonQuota: 8500,
  },

  healthScore: {
    score: 68,
    level: "一般",
    color: "#fa8c16",
    pollution: 82,
    energy: 65,
    carbon: 58,
    synergy: 52,
    updateTime: "2026-05-18 09:00",
  },

  cpTrend: {
    dates: ["05-12","05-13","05-14","05-15","05-16","05-17","05-18"],
    values: [0.72, 0.68, 0.61, 0.55, 0.48, 0.42, 0.38],
    threshold: 0.5,
  },

  realtime: {
    vocsRate: 12.5,
    vocsEfficiency: 94.2,
    vocsIntensity: 8.3,
    carbonTotal: 0.42,
    carbonIntensity: 0.28,
    cpIndex: 0.38,
    gasFlow: 1200,
    chamberTemp: 785,
    updateTime: "2026-05-18 09:00",
  },

  quadrantBubbles: [
    { label: "本企业", x: 0.28, y: 0.38, size: 48, color: "#f5222d", zIndex: 10 },
    { label: "行业均值", x: 0.35, y: 0.62, size: 36, color: "#faad14", zIndex: 5 },
    { label: "标杆企业A", x: 0.22, y: 0.85, size: 40, color: "#52c41a", zIndex: 5 },
    { label: "标杆企业B", x: 0.25, y: 0.78, size: 34, color: "#52c41a", zIndex: 5 },
    { label: "同类企业C", x: 0.38, y: 0.45, size: 32, color: "#fa8c16", zIndex: 5 },
  ],

  alerts: [
    { id: "ALT-20260518-001", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.38，已连续 12h 低于 0.4，疑似 RTO 空烧", time: "09:00", date: "05-18", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0, cpValue: 0.38, durationHours: 12, vocsRate: 12.5, gasFlow: 1200, temp: 785, emptyBurnPct: 22, outputChange: 3, rootCause: "RTO 空烧时长占比过高（22%）。入口 VOCs 浓度 485 mg/m³ 处于较低水平，但天然气流量维持 1200 Nm³/h 的高位运行。近3日喷涂作业分散在4个时段，RTO启停频繁导致空烧累积。" },
    { id: "ALT-20260517-003", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "C-P 协同指数 0.42，持续低于 0.6 超过 4h", time: "18:30", date: "05-17", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0, cpValue: 0.42, durationHours: 4, vocsRate: 15.2, gasFlow: 980, temp: 810, emptyBurnPct: 8, outputChange: 2, rootCause: "天然气消耗环比增加28%，但VOCs去除率无明显提升，存在能源浪费。" },
    { id: "ALT-20260516-004", type: "threshold", level: "warning", title: "超阈值预警", desc: "RTO燃烧室温度793°C，超过建议上限800°C持续2h", time: "14:00", date: "05-16", read: true, status: "已签收", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 1 },
    { id: "ALT-20260515-002", type: "data", level: "warning", title: "数据异常预警", desc: "5月月度上报中天然气/RTO时长比值偏离历史均值 45%", time: "", date: "05-15", read: true, status: "整改中", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 2 },
    { id: "ALT-20260514-005", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.35，持续8h，燃烧室温度偏低", time: "08:00", date: "05-14", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4, cpValue: 0.35, durationHours: 8, vocsRate: 10.8, gasFlow: 1350, temp: 720, emptyBurnPct: 18, outputChange: -2, rootCause: "燃烧室温度偏低（720°C），导致VOCs分解效率下降，为维持去除率天然气流量被迫提升至1350 Nm³/h。" },
    { id: "ALT-20260512-006", type: "ledger", level: "info", title: "台账缺漏提醒", desc: "4月涂料消耗明细台账缺失粉末涂料用量记录", time: "", date: "05-12", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
    { id: "ALT-20260510-001", type: "permit", level: "info", title: "证件到期提醒", desc: "排污许可证将于 21 天后到期（2026-12-31）", time: "", date: "05-10", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
    { id: "ALT-20260508-007", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "天然气消耗环比增加28%，VOCs去除率无显著提升", time: "16:00", date: "05-08", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4, cpValue: 0.51, durationHours: 6, vocsRate: 14.5, gasFlow: 1050, temp: 790, emptyBurnPct: 10, outputChange: 5, rootCause: "天然气流量计可能存在读数偏差，建议现场核查校准。" },
  ],

  quickLinks: [
    { icon: "📋", title: "月度数据填报", desc: "5月数据待提交", color: "#22d3ee", bg: "rgba(34,211,238,0.08)" },
    { icon: "📊", title: "实时双算看板", desc: "最新计算 09:00", color: "#4ade80", bg: "rgba(74,222,128,0.08)" },
    { icon: "🔮", title: "悖论模拟器", desc: "涂装技改预评估", color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
    { icon: "📑", title: "三评合一报告", desc: "5月报告已生成", color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  ],

  todos: [
    { title: "提交5月月度运行数据", deadline: "05-20", urgent: true },
    { title: "回复 减污增碳/减碳增污悖论 预警整改说明", deadline: "05-19", urgent: true },
    { title: "上传排污许可执行报告", deadline: "05-25", urgent: false },
  ],

  "减污增碳/减碳增污悖论Events": [
    { date: "05-18", type: "减污增碳", cpBefore: 0.55, cpAfter: 0.38, cause: "RTO 空烧时长占比升至 22%" },
    { date: "05-14", type: "减污增碳", cpBefore: 0.72, cpAfter: 0.61, cause: "天然气消耗环比激增 35%" },
    { date: "04-28", type: "减碳增污", cpBefore: 0.68, cpAfter: 0.52, cause: "RTO 温度设定过低" },
  ],

  // 调度指令（闭环管理）
  dispatches: [
    { id: "DSP-20260518-001", type: "减污增碳/减碳增污悖论", title: "减污增碳/减碳增污悖论 风险整改通知", target: "蓝天工业涂装有限公司", deadline: "2026-05-25", status: "已下发", statusCode: "dispatched", step: 0, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-18 09:30", content: "C-P协同指数0.38持续12h低于阈值0.4，疑似RTO空烧。请立即排查并反馈整改措施。" },
    { id: "DSP-20260517-002", type: "data", title: "数据异常核查通知", target: "红星喷涂厂", deadline: "2026-05-22", status: "整改中", statusCode: "feedback", step: 2, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-17 14:00", content: "月度上报天然气/RTO时长比值偏离历史均值45%，请核实数据来源并重新上报。" },
    { id: "DSP-20260516-004", type: "减污增碳/减碳增污悖论", title: "协同失衡整改通知", target: "永昌喷涂", deadline: "2026-05-23", status: "已签收", statusCode: "received", step: 1, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-16 11:00", content: "C-P协同指数0.39持续6h处于协同失衡区间，天然气消耗环比增加28%。请排查RTO运行参数并提交整改计划。" },
    { id: "DSP-20260512-005", type: "imbalance", title: "RTO能效优化建议", target: "鑫达汽修", deadline: "2026-05-20", status: "待复核", statusCode: "reviewed", step: 3, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-12 09:00", content: "热回收效率88%低于90%警戒线，建议清洗蓄热体或更换老化陶瓷。请提交整改报告。" },
    { id: "DSP-20260515-003", type: "permit", title: "排污许可证续期提醒", target: "鑫达汽修", deadline: "2026-06-15", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-15 10:00", content: "排污许可证将于30天后到期，请及时办理续期手续。" },
    { id: "DSP-20260510-006", type: "减污增碳/减碳增污悖论", title: "减污增碳陷阱整改通知", target: "金辉涂装", deadline: "2026-05-17", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-10 14:00", content: "水性涂料切换后VOCs下降但天然气激增35%，C-P从0.72降至0.48。已整改完成，C-P回升至0.71。" },
  ],

  // 月度报告数据
  monthlyReports: [
    { id: "MR-202605-001", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "待提交", statusCode: "draft", submitAt: null, reviewResult: null },
    { id: "MR-202604-001", month: "2026-04", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-04-28 16:30", reviewResult: "通过" },
    { id: "MR-202603-001", month: "2026-03", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-03-29 14:00", reviewResult: "通过" },
    { id: "MR-202602-001", month: "2026-02", enterprise: "蓝天工业涂装有限公司", status: "已退回", statusCode: "rejected", submitAt: "2026-02-28 10:00", reviewResult: "退回", reviewComment: "天然气数据与RTO运行时长不匹配，请核实后重新提交。" },
  ],

  // 数据审核记录
  reviews: [
    { id: "REV-20260518-001", reportId: "MR-202605-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-05-18 10:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260515-002", reportId: "MR-202605-002", enterprise: "红星喷涂厂", submitAt: "2026-05-15 11:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260428-001", reportId: "MR-202604-001", enterprise: "红星喷涂厂", submitAt: "2026-04-28 14:00", status: "已通过", statusCode: "passed", checker: "李监测", result: "通过", comments: "数据完整，逻辑一致" },
    { id: "REV-20260425-001", reportId: "MR-202604-002", enterprise: "鑫达汽修", submitAt: "2026-04-25 09:30", status: "已退回", statusCode: "rejected", checker: "李监测", result: "退回", comments: "天然气数据与上月偏差过大，请核实" },
    { id: "REV-20260320-003", reportId: "MR-202603-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-03-29 14:00", status: "已通过", statusCode: "passed", checker: "王监测", result: "通过", comments: "数据质量良好，准予通过" },
  ],

  // 悖论模拟器历史记录
  simulatorHistory: [
    { id: "SIM-202605180915", time: "2026-05-18 09:15", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.75, cpAfter: 0.48, vocsChange: -60, gasChange: 35, carbonChange: 28, result: "trap", perspective: "process" },
    { id: "SIM-202605101422", time: "2026-05-10 14:22", current: "溶剂型涂料（聚氨酯漆）", target: "粉末涂料", cpBefore: 0.72, cpAfter: 0.52, vocsChange: -85, gasChange: 55, carbonChange: 42, result: "trap", perspective: "lca" },
    { id: "SIM-202605031530", time: "2026-05-03 15:30", current: "水性涂料（双组分）", target: "水性涂料（单组分）", cpBefore: 0.68, cpAfter: 0.71, vocsChange: -15, gasChange: -5, carbonChange: -3, result: "good", perspective: "process" },
    { id: "SIM-202604281005", time: "2026-04-28 10:05", current: "溶剂型涂料（聚氨酯漆）", target: "高固体分涂料", cpBefore: 0.70, cpAfter: 0.68, vocsChange: -25, gasChange: 8, carbonChange: 5, result: "good", perspective: "process" },
    { id: "SIM-202604151100", time: "2026-04-15 11:00", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.74, cpAfter: 0.45, vocsChange: -58, gasChange: 32, carbonChange: 26, result: "trap", perspective: "lca" },
    { id: "SIM-202604080940", time: "2026-04-08 09:40", current: "高固体分涂料", target: "粉末涂料", cpBefore: 0.65, cpAfter: 0.58, vocsChange: -45, gasChange: 38, carbonChange: 22, result: "imbalance", perspective: "process" },
  ],

  // 三评合一报告数据（含多月份样例）
  tripleReports: [
    { id: "TR-202605", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "已生成", statusCode: "generated", generatedAt: "2026-06-05 08:30", type: "自动生成",
      scores: { p: 82, e: 65, c: 58, cp: 0.52 },
      details: {
        pollution: [
          { name: "VOCs 达标率", value: "100%", score: 40, max: 40, color: "#4ade80" },
          { name: "去除效率", value: "94.2%", score: 28, max: 30, color: "#4ade80" },
          { name: "涂料结构优化", value: "14分", score: 14, max: 30, color: "#fbbf24", desc: "水性漆占比偏低" },
        ],
        energy: [
          { name: "热回收效率", value: "87%", score: 24, max: 40, color: "#fbbf24", desc: "<95%" },
          { name: "空烧控制", value: "18%", score: 15, max: 30, color: "#f87171", desc: "空烧占比过高" },
          { name: "能源结构", value: "26分", score: 26, max: 30, color: "#fbbf24" },
        ],
        carbon: [
          { name: "碳排强度对标", value: "0.28", score: 20, max: 40, color: "#fbbf24", desc: "tCO₂/万m²，>P75" },
          { name: "配额余量", value: "68%", score: 22, max: 30, color: "#fbbf24" },
          { name: "减碳潜力", value: "16分", score: 16, max: 30, color: "#fbbf24" },
        ],
      },
      aiSummary: "本月整体评级为<strong>「一般」</strong>，存在明显短板。<strong>最优先改进项：减少 RTO 空烧</strong>。近30天内 RTO 空烧时长占比达 18%，导致天然气消耗环比增加 35%，碳排评价得分仅 58 分。污染评价 82 分表现良好，VOCs 达标率 100%，但协同分仅 52 分，C-P 协同指数 0.52 处于「差」等级。建议立即调整喷涂排班至集中时段，并检查蓄热体是否堵塞。",
      priorities: [
        { rank: 1, text: "<strong>减少 RTO 空烧</strong> — 调整喷涂排班至集中时段，目标空烧占比 < 5%", score: "+12分", color: "p1" },
        { rank: 2, text: "<strong>提升热回收效率</strong> — 检查蓄热体堵塞情况，清洗或更换蓄热体", score: "+8分", color: "p2" },
        { rank: 3, text: "<strong>提高水性涂料占比</strong> — 逐步替换溶剂型涂料，降低涂料隐含碳", score: "+6分", color: "p3" },
      ],
    },
    { id: "TR-202604", month: "2026-04", enterprise: "蓝天工业涂装有限公司", status: "已生成", statusCode: "generated", generatedAt: "2026-05-05 09:15", type: "自动生成",
      scores: { p: 85, e: 68, c: 62, cp: 0.58 },
      details: {
        pollution: [
          { name: "VOCs 达标率", value: "100%", score: 40, max: 40, color: "#4ade80" },
          { name: "去除效率", value: "93.8%", score: 27, max: 30, color: "#4ade80" },
          { name: "涂料结构优化", value: "18分", score: 18, max: 30, color: "#fbbf24", desc: "水性漆占比偏低" },
        ],
        energy: [
          { name: "热回收效率", value: "89%", score: 26, max: 40, color: "#fbbf24", desc: "<95%" },
          { name: "空烧控制", value: "14%", score: 18, max: 30, color: "#fbbf24", desc: "空烧占比偏高" },
          { name: "能源结构", value: "24分", score: 24, max: 30, color: "#fbbf24" },
        ],
        carbon: [
          { name: "碳排强度对标", value: "0.26", score: 22, max: 40, color: "#fbbf24", desc: "tCO₂/万m²，>P75" },
          { name: "配额余量", value: "72%", score: 24, max: 30, color: "#fbbf24" },
          { name: "减碳潜力", value: "16分", score: 16, max: 30, color: "#fbbf24" },
        ],
      },
      aiSummary: "本月整体评级为<strong>「一般」</strong>，较上月略有改善。RTO 空烧时长占比从 22% 降至 14%，碳排评价提升至 62 分。污染评价保持 85 分优良水平。但 C-P 协同指数 0.58 仍处于警戒区间，建议继续优化喷涂排班并推进水性涂料替代。",
      priorities: [
        { rank: 1, text: "<strong>继续降低 RTO 空烧</strong> — 空烧占比已从 22% 降至 14%，目标 < 5%", score: "+10分", color: "p1" },
        { rank: 2, text: "<strong>推进水性涂料替代</strong> — 水性漆占比每提升 10%，VOCs 可降低 5-8%", score: "+7分", color: "p2" },
        { rank: 3, text: "<strong>优化能源结构</strong> — 提升绿电采购比例至 30% 以上", score: "+5分", color: "p3" },
      ],
    },
    { id: "TR-202603", month: "2026-03", enterprise: "蓝天工业涂装有限公司", status: "已生成", statusCode: "generated", generatedAt: "2026-04-05 08:45", type: "自动生成",
      scores: { p: 78, e: 60, c: 55, cp: 0.48 },
      details: {
        pollution: [
          { name: "VOCs 达标率", value: "100%", score: 40, max: 40, color: "#4ade80" },
          { name: "去除效率", value: "92.5%", score: 25, max: 30, color: "#fbbf24", desc: "接近临界值" },
          { name: "涂料结构优化", value: "13分", score: 13, max: 30, color: "#f87171", desc: "水性漆占比过低" },
        ],
        energy: [
          { name: "热回收效率", value: "84%", score: 22, max: 40, color: "#fbbf24", desc: "<95%" },
          { name: "空烧控制", value: "22%", score: 12, max: 30, color: "#f87171", desc: "空烧占比严重超标" },
          { name: "能源结构", value: "26分", score: 26, max: 30, color: "#fbbf24" },
        ],
        carbon: [
          { name: "碳排强度对标", value: "0.30", score: 18, max: 40, color: "#f87171", desc: "tCO₂/万m²，>P90" },
          { name: "配额余量", value: "62%", score: 20, max: 30, color: "#fbbf24" },
          { name: "减碳潜力", value: "17分", score: 17, max: 30, color: "#fbbf24" },
        ],
      },
      aiSummary: "本月整体评级为<strong>「较差」</strong>，碳排评价仅 55 分，处于行业底部 10%。RTO 空烧时长占比高达 22%，天然气消耗激增，是碳排超标的主因。污染评价 78 分勉强达标，去除效率 92.5% 已接近 90% 临界值。建议立即启动应急响应，将喷涂排班调整为集中时段，并检查 RTO 蓄热体状况。",
      priorities: [
        { rank: 1, text: "<strong>紧急：降低 RTO 空烧</strong> — 空烧占比 22% 严重超标，需立即调整排班", score: "+15分", color: "p1" },
        { rank: 2, text: "<strong>检查 RTO 蓄热体</strong> — 去除效率下降可能因蓄热体堵塞或老化", score: "+8分", color: "p2" },
        { rank: 3, text: "<strong>提升去除效率</strong> — 优化燃烧室温度控制，确保稳定在 760°C 以上", score: "+6分", color: "p3" },
      ],
    },
  ],

  // ========== 多排口监测数据（v3.1 新增）==========
  outlets: [
    { id: "OUT-001", enterpriseId: "ENT-001", outletCode: "P-01", outletName: "喷涂线废气排口", outletType: "organized", stackHeight: 15, stackDiameter: 0.8, designFlowRate: 25000, status: "online" },
    { id: "OUT-002", enterpriseId: "ENT-001", outletCode: "P-02", outletName: "烘干线废气排口", outletType: "organized", stackHeight: 12, stackDiameter: 0.6, designFlowRate: 18000, status: "online" },
    { id: "OUT-003", enterpriseId: "ENT-001", outletCode: "P-03", outletName: "调漆间排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 8000, status: "online" },
    { id: "OUT-004", enterpriseId: "ENT-002", outletCode: "P-01", outletName: "主排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 26698, status: "online" },
    { id: "OUT-005", enterpriseId: "ENT-002", outletCode: "P-02", outletName: "辅助排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 25367, status: "online" },
    { id: "OUT-006", enterpriseId: "ENT-002", outletCode: "P-03", outletName: "综合排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 25255, status: "online" },
    { id: "OUT-007", enterpriseId: "ENT-003", outletCode: "P-01", outletName: "涂装废气排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 23011, status: "online" },
    { id: "OUT-008", enterpriseId: "ENT-003", outletCode: "P-02", outletName: "烘干废气排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 20134, status: "online" },
    { id: "OUT-009", enterpriseId: "ENT-004", outletCode: "P-01", outletName: "喷涂线排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 28740, status: "online" },
    { id: "OUT-010", enterpriseId: "ENT-004", outletCode: "P-02", outletName: "烘干线排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 20573, status: "online" },
    { id: "OUT-011", enterpriseId: "ENT-004", outletCode: "P-03", outletName: "调漆间排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 20679, status: "online" },
    { id: "OUT-012", enterpriseId: "ENT-005", outletCode: "P-01", outletName: "主排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 22640, status: "online" },
    { id: "OUT-013", enterpriseId: "ENT-005", outletCode: "P-02", outletName: "辅助排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 25829, status: "online" },
    { id: "OUT-014", enterpriseId: "ENT-006", outletCode: "P-01", outletName: "涂装废气排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 21930, status: "online" },
    { id: "OUT-015", enterpriseId: "ENT-006", outletCode: "P-02", outletName: "烘干废气排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 28881, status: "online" },
    { id: "OUT-016", enterpriseId: "ENT-006", outletCode: "P-03", outletName: "综合排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 29328, status: "online" },
    { id: "OUT-017", enterpriseId: "ENT-007", outletCode: "P-01", outletName: "喷涂线排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 29485, status: "online" },
    { id: "OUT-018", enterpriseId: "ENT-007", outletCode: "P-02", outletName: "烘干线排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 23034, status: "online" },
    { id: "OUT-019", enterpriseId: "ENT-008", outletCode: "P-01", outletName: "主排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 24252, status: "online" },
    { id: "OUT-020", enterpriseId: "ENT-008", outletCode: "P-02", outletName: "辅助排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 23088, status: "online" },
    { id: "OUT-021", enterpriseId: "ENT-008", outletCode: "P-03", outletName: "综合排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 23906, status: "online" },
    { id: "OUT-022", enterpriseId: "ENT-009", outletCode: "P-01", outletName: "涂装废气排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 29064, status: "online" },
    { id: "OUT-023", enterpriseId: "ENT-009", outletCode: "P-02", outletName: "烘干废气排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 21891, status: "online" },
    { id: "OUT-024", enterpriseId: "ENT-010", outletCode: "P-01", outletName: "喷涂线排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 22421, status: "online" },
    { id: "OUT-025", enterpriseId: "ENT-010", outletCode: "P-02", outletName: "烘干线排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 16414, status: "online" },
    { id: "OUT-026", enterpriseId: "ENT-010", outletCode: "P-03", outletName: "调漆间排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 20796, status: "online" },
    { id: "OUT-027", enterpriseId: "ENT-011", outletCode: "P-01", outletName: "主排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 27246, status: "online" },
    { id: "OUT-028", enterpriseId: "ENT-011", outletCode: "P-02", outletName: "辅助排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 29364, status: "online" },
    { id: "OUT-029", enterpriseId: "ENT-012", outletCode: "P-01", outletName: "涂装废气排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 25871, status: "online" },
    { id: "OUT-030", enterpriseId: "ENT-012", outletCode: "P-02", outletName: "烘干废气排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 18556, status: "online" },
    { id: "OUT-031", enterpriseId: "ENT-012", outletCode: "P-03", outletName: "综合排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 28975, status: "online" },
    { id: "OUT-032", enterpriseId: "ENT-013", outletCode: "P-01", outletName: "喷涂线排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 19719, status: "online" },
    { id: "OUT-033", enterpriseId: "ENT-013", outletCode: "P-02", outletName: "烘干线排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 26415, status: "online" },
    { id: "OUT-034", enterpriseId: "ENT-014", outletCode: "P-01", outletName: "主排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 21155, status: "online" },
    { id: "OUT-035", enterpriseId: "ENT-014", outletCode: "P-02", outletName: "辅助排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 24586, status: "online" },
    { id: "OUT-036", enterpriseId: "ENT-014", outletCode: "P-03", outletName: "综合排口", outletType: "organized", stackHeight: 16, stackDiameter: 0.8, designFlowRate: 16413, status: "online" },
    { id: "OUT-037", enterpriseId: "ENT-015", outletCode: "P-01", outletName: "涂装废气排口", outletType: "organized", stackHeight: 10, stackDiameter: 0.4, designFlowRate: 24953, status: "online" },
    { id: "OUT-038", enterpriseId: "ENT-015", outletCode: "P-02", outletName: "烘干废气排口", outletType: "organized", stackHeight: 13, stackDiameter: 0.6, designFlowRate: 19670, status: "online" }
  ],

  devices: [
    { id: "DEV-001", outletId: "OUT-001", enterpriseId: "ENT-001", deviceCode: "RTO-01", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-25000", designCapacity: 25000, designEfficiency: 95, commissioningDate: "2023-06-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-10", nextMaintenance: "2026-06-10" },
    { id: "DEV-002", outletId: "OUT-002", enterpriseId: "ENT-001", deviceCode: "RCO-01", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-18000", designCapacity: 18000, designEfficiency: 92, commissioningDate: "2024-01-20", warrantyExpire: "2027-01-20", status: "online", lastMaintenance: "2026-04-05", nextMaintenance: "2026-07-05" },
    { id: "DEV-003", outletId: "OUT-003", enterpriseId: "ENT-001", deviceCode: "AC-01", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "AC-8000", designCapacity: 8000, designEfficiency: 85, commissioningDate: "2022-09-01", warrantyExpire: "2025-09-01", status: "online", lastMaintenance: "2026-02-20", nextMaintenance: "2026-05-20" },
    { id: "DEV-004", outletId: "OUT-004", enterpriseId: "ENT-002", deviceCode: "RTO-04", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-26698", designCapacity: 26698, designEfficiency: 96, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-005", outletId: "OUT-005", enterpriseId: "ENT-002", deviceCode: "RCO-05", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-25367", designCapacity: 25367, designEfficiency: 91, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-006", outletId: "OUT-006", enterpriseId: "ENT-002", deviceCode: "activated_carbon-06", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-25255", designCapacity: 25255, designEfficiency: 85, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-007", outletId: "OUT-007", enterpriseId: "ENT-003", deviceCode: "RTO-07", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-23011", designCapacity: 23011, designEfficiency: 88, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-008", outletId: "OUT-008", enterpriseId: "ENT-003", deviceCode: "RCO-08", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-20134", designCapacity: 20134, designEfficiency: 86, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-009", outletId: "OUT-009", enterpriseId: "ENT-004", deviceCode: "RTO-09", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-28740", designCapacity: 28740, designEfficiency: 88, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-010", outletId: "OUT-010", enterpriseId: "ENT-004", deviceCode: "RCO-10", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-20573", designCapacity: 20573, designEfficiency: 92, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-011", outletId: "OUT-011", enterpriseId: "ENT-004", deviceCode: "activated_carbon-11", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-20679", designCapacity: 20679, designEfficiency: 95, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-012", outletId: "OUT-012", enterpriseId: "ENT-005", deviceCode: "RTO-12", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-22640", designCapacity: 22640, designEfficiency: 89, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-013", outletId: "OUT-013", enterpriseId: "ENT-005", deviceCode: "RCO-13", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-25829", designCapacity: 25829, designEfficiency: 96, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-014", outletId: "OUT-014", enterpriseId: "ENT-006", deviceCode: "RTO-14", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-21930", designCapacity: 21930, designEfficiency: 93, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-015", outletId: "OUT-015", enterpriseId: "ENT-006", deviceCode: "RCO-15", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-28881", designCapacity: 28881, designEfficiency: 92, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-016", outletId: "OUT-016", enterpriseId: "ENT-006", deviceCode: "activated_carbon-16", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-29328", designCapacity: 29328, designEfficiency: 96, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-017", outletId: "OUT-017", enterpriseId: "ENT-007", deviceCode: "RTO-17", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-29485", designCapacity: 29485, designEfficiency: 90, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-018", outletId: "OUT-018", enterpriseId: "ENT-007", deviceCode: "RCO-18", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-23034", designCapacity: 23034, designEfficiency: 89, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-019", outletId: "OUT-019", enterpriseId: "ENT-008", deviceCode: "RTO-19", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-24252", designCapacity: 24252, designEfficiency: 92, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-020", outletId: "OUT-020", enterpriseId: "ENT-008", deviceCode: "RCO-20", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-23088", designCapacity: 23088, designEfficiency: 86, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-021", outletId: "OUT-021", enterpriseId: "ENT-008", deviceCode: "activated_carbon-21", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-23906", designCapacity: 23906, designEfficiency: 87, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-022", outletId: "OUT-022", enterpriseId: "ENT-009", deviceCode: "RTO-22", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-29064", designCapacity: 29064, designEfficiency: 96, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-023", outletId: "OUT-023", enterpriseId: "ENT-009", deviceCode: "RCO-23", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-21891", designCapacity: 21891, designEfficiency: 85, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-024", outletId: "OUT-024", enterpriseId: "ENT-010", deviceCode: "RTO-24", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-22421", designCapacity: 22421, designEfficiency: 94, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-025", outletId: "OUT-025", enterpriseId: "ENT-010", deviceCode: "RCO-25", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-16414", designCapacity: 16414, designEfficiency: 91, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-026", outletId: "OUT-026", enterpriseId: "ENT-010", deviceCode: "activated_carbon-26", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-20796", designCapacity: 20796, designEfficiency: 92, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-027", outletId: "OUT-027", enterpriseId: "ENT-011", deviceCode: "RTO-27", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-27246", designCapacity: 27246, designEfficiency: 90, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-028", outletId: "OUT-028", enterpriseId: "ENT-011", deviceCode: "RCO-28", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-29364", designCapacity: 29364, designEfficiency: 88, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-029", outletId: "OUT-029", enterpriseId: "ENT-012", deviceCode: "RTO-29", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-25871", designCapacity: 25871, designEfficiency: 96, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-030", outletId: "OUT-030", enterpriseId: "ENT-012", deviceCode: "RCO-30", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-18556", designCapacity: 18556, designEfficiency: 88, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-031", outletId: "OUT-031", enterpriseId: "ENT-012", deviceCode: "activated_carbon-31", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-28975", designCapacity: 28975, designEfficiency: 94, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-032", outletId: "OUT-032", enterpriseId: "ENT-013", deviceCode: "RTO-32", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-19719", designCapacity: 19719, designEfficiency: 96, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-033", outletId: "OUT-033", enterpriseId: "ENT-013", deviceCode: "RCO-33", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-26415", designCapacity: 26415, designEfficiency: 94, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-034", outletId: "OUT-034", enterpriseId: "ENT-014", deviceCode: "RTO-34", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-21155", designCapacity: 21155, designEfficiency: 86, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-035", outletId: "OUT-035", enterpriseId: "ENT-014", deviceCode: "RCO-35", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-24586", designCapacity: 24586, designEfficiency: 93, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" },
    { id: "DEV-036", outletId: "OUT-036", enterpriseId: "ENT-014", deviceCode: "activated_carbon-36", deviceType: "activated_carbon", manufacturer: "某净化设备", model: "activated_carbon-16413", designCapacity: 16413, designEfficiency: 91, commissioningDate: "2023-03-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-03-05", nextMaintenance: "2026-08-10" },
    { id: "DEV-037", outletId: "OUT-037", enterpriseId: "ENT-015", deviceCode: "RTO-37", deviceType: "RTO", manufacturer: "某环保科技", model: "RTO-24953", designCapacity: 24953, designEfficiency: 94, commissioningDate: "2023-01-15", warrantyExpire: "2026-06-15", status: "online", lastMaintenance: "2026-01-15", nextMaintenance: "2026-06-20" },
    { id: "DEV-038", outletId: "OUT-038", enterpriseId: "ENT-015", deviceCode: "RCO-38", deviceType: "RCO", manufacturer: "某节能设备", model: "RCO-19670", designCapacity: 19670, designEfficiency: 86, commissioningDate: "2023-02-15", warrantyExpire: "2027-06-15", status: "online", lastMaintenance: "2026-02-10", nextMaintenance: "2026-07-15" }
  ],

  outletMonitoring: {
    "OUT-001": { inletTVOC: 485, outletTVOC: 28, inletNMHC: 420, outletNMHC: 25, outletPM25: 15, outletSO2: 3.1, outletNOx: 28, outletCO: 12, outletCO2: 420, outletCH4: 0.4, flowRate: 24800, removalEfficiency: 94.2, devicePowerKw: 45, deviceGasNm3h: 1200, chamberTemp: 785, heatRecoveryEff: 87, isEmptyBurn: true },
    "OUT-002": { inletTVOC: 320, outletTVOC: 22, inletNMHC: 280, outletNMHC: 18, outletPM25: 8, outletSO2: 1.8, outletNOx: 18, outletCO: 8, outletCO2: 310, outletCH4: 0.2, flowRate: 17500, removalEfficiency: 93.5, devicePowerKw: 32, deviceGasNm3h: 800, chamberTemp: 760, heatRecoveryEff: 91, isEmptyBurn: false },
    "OUT-003": { inletTVOC: 180, outletTVOC: 35, inletNMHC: 150, outletNMHC: 30, outletPM25: 22, outletSO2: 4.2, outletNOx: 15, outletCO: 6, outletCO2: 180, outletCH4: 0.6, flowRate: 7500, removalEfficiency: 80.0, devicePowerKw: 18, deviceGasNm3h: 0, chamberTemp: 0, heatRecoveryEff: 0, isEmptyBurn: false },
    "OUT-004": { inletTVOC: 437, outletTVOC: 35, inletNMHC: 371, outletNMHC: 32, outletPM25: 22, outletSO2: 2.3, outletNOx: 15, outletCO: 9, outletCO2: 315, outletCH4: 0.2, flowRate: 26698, removalEfficiency: 92.0, devicePowerKw: 37, deviceGasNm3h: 561, chamberTemp: 722, heatRecoveryEff: 88, isEmptyBurn: true },
    "OUT-005": { inletTVOC: 274, outletTVOC: 41, inletNMHC: 233, outletNMHC: 37, outletPM25: 9, outletSO2: 2.7, outletNOx: 11, outletCO: 6, outletCO2: 444, outletCH4: 0.2, flowRate: 25367, removalEfficiency: 85.0, devicePowerKw: 22, deviceGasNm3h: 692, chamberTemp: 819, heatRecoveryEff: 91, isEmptyBurn: false },
    "OUT-006": { inletTVOC: 376, outletTVOC: 19, inletNMHC: 320, outletNMHC: 17, outletPM25: 10, outletSO2: 4.0, outletNOx: 33, outletCO: 8, outletCO2: 407, outletCH4: 0.3, flowRate: 25255, removalEfficiency: 95.0, devicePowerKw: 20, deviceGasNm3h: 1016, chamberTemp: 790, heatRecoveryEff: 94, isEmptyBurn: false },
    "OUT-007": { inletTVOC: 286, outletTVOC: 51, inletNMHC: 243, outletNMHC: 46, outletPM25: 6, outletSO2: 3.7, outletNOx: 14, outletCO: 11, outletCO2: 294, outletCH4: 0.5, flowRate: 23011, removalEfficiency: 82.0, devicePowerKw: 29, deviceGasNm3h: 1062, chamberTemp: 764, heatRecoveryEff: 84, isEmptyBurn: false },
    "OUT-008": { inletTVOC: 394, outletTVOC: 55, inletNMHC: 335, outletNMHC: 50, outletPM25: 11, outletSO2: 3.7, outletNOx: 32, outletCO: 12, outletCO2: 378, outletCH4: 0.3, flowRate: 20134, removalEfficiency: 86.0, devicePowerKw: 53, deviceGasNm3h: 463, chamberTemp: 764, heatRecoveryEff: 75, isEmptyBurn: false },
    "OUT-009": { inletTVOC: 223, outletTVOC: 11, inletNMHC: 190, outletNMHC: 10, outletPM25: 9, outletSO2: 4.1, outletNOx: 25, outletCO: 13, outletCO2: 311, outletCH4: 0.4, flowRate: 28740, removalEfficiency: 95.0, devicePowerKw: 43, deviceGasNm3h: 596, chamberTemp: 737, heatRecoveryEff: 77, isEmptyBurn: true },
    "OUT-010": { inletTVOC: 263, outletTVOC: 24, inletNMHC: 224, outletNMHC: 22, outletPM25: 21, outletSO2: 4.5, outletNOx: 33, outletCO: 5, outletCO2: 202, outletCH4: 0.1, flowRate: 20573, removalEfficiency: 91.0, devicePowerKw: 39, deviceGasNm3h: 1109, chamberTemp: 742, heatRecoveryEff: 93, isEmptyBurn: false },
    "OUT-011": { inletTVOC: 368, outletTVOC: 44, inletNMHC: 313, outletNMHC: 40, outletPM25: 6, outletSO2: 1.5, outletNOx: 21, outletCO: 8, outletCO2: 385, outletCH4: 0.2, flowRate: 20679, removalEfficiency: 88.0, devicePowerKw: 38, deviceGasNm3h: 1183, chamberTemp: 721, heatRecoveryEff: 77, isEmptyBurn: true },
    "OUT-012": { inletTVOC: 213, outletTVOC: 13, inletNMHC: 181, outletNMHC: 12, outletPM25: 22, outletSO2: 1.2, outletNOx: 20, outletCO: 4, outletCO2: 420, outletCH4: 0.6, flowRate: 22640, removalEfficiency: 94.0, devicePowerKw: 35, deviceGasNm3h: 698, chamberTemp: 803, heatRecoveryEff: 83, isEmptyBurn: false },
    "OUT-013": { inletTVOC: 254, outletTVOC: 18, inletNMHC: 216, outletNMHC: 16, outletPM25: 12, outletSO2: 3.7, outletNOx: 22, outletCO: 11, outletCO2: 269, outletCH4: 0.4, flowRate: 25829, removalEfficiency: 93.0, devicePowerKw: 46, deviceGasNm3h: 424, chamberTemp: 772, heatRecoveryEff: 80, isEmptyBurn: false },
    "OUT-014": { inletTVOC: 424, outletTVOC: 51, inletNMHC: 360, outletNMHC: 46, outletPM25: 14, outletSO2: 1.6, outletNOx: 31, outletCO: 12, outletCO2: 346, outletCH4: 0.5, flowRate: 21930, removalEfficiency: 88.0, devicePowerKw: 21, deviceGasNm3h: 1178, chamberTemp: 774, heatRecoveryEff: 92, isEmptyBurn: false },
    "OUT-015": { inletTVOC: 544, outletTVOC: 98, inletNMHC: 462, outletNMHC: 88, outletPM25: 13, outletSO2: 1.1, outletNOx: 33, outletCO: 13, outletCO2: 261, outletCH4: 0.5, flowRate: 28881, removalEfficiency: 82.0, devicePowerKw: 44, deviceGasNm3h: 1060, chamberTemp: 753, heatRecoveryEff: 87, isEmptyBurn: false },
    "OUT-016": { inletTVOC: 446, outletTVOC: 49, inletNMHC: 379, outletNMHC: 44, outletPM25: 10, outletSO2: 4.0, outletNOx: 33, outletCO: 10, outletCO2: 369, outletCH4: 0.2, flowRate: 29328, removalEfficiency: 89.0, devicePowerKw: 29, deviceGasNm3h: 501, chamberTemp: 784, heatRecoveryEff: 90, isEmptyBurn: false },
    "OUT-017": { inletTVOC: 311, outletTVOC: 47, inletNMHC: 264, outletNMHC: 42, outletPM25: 19, outletSO2: 1.0, outletNOx: 13, outletCO: 7, outletCO2: 368, outletCH4: 0.5, flowRate: 29485, removalEfficiency: 85.0, devicePowerKw: 24, deviceGasNm3h: 931, chamberTemp: 763, heatRecoveryEff: 83, isEmptyBurn: false },
    "OUT-018": { inletTVOC: 264, outletTVOC: 24, inletNMHC: 224, outletNMHC: 22, outletPM25: 9, outletSO2: 4.9, outletNOx: 18, outletCO: 13, outletCO2: 384, outletCH4: 0.4, flowRate: 23034, removalEfficiency: 91.0, devicePowerKw: 34, deviceGasNm3h: 1127, chamberTemp: 728, heatRecoveryEff: 90, isEmptyBurn: true },
    "OUT-019": { inletTVOC: 248, outletTVOC: 30, inletNMHC: 211, outletNMHC: 27, outletPM25: 18, outletSO2: 2.4, outletNOx: 25, outletCO: 4, outletCO2: 368, outletCH4: 0.6, flowRate: 24252, removalEfficiency: 88.0, devicePowerKw: 37, deviceGasNm3h: 1169, chamberTemp: 747, heatRecoveryEff: 78, isEmptyBurn: false },
    "OUT-020": { inletTVOC: 282, outletTVOC: 51, inletNMHC: 240, outletNMHC: 46, outletPM25: 21, outletSO2: 1.1, outletNOx: 24, outletCO: 10, outletCO2: 225, outletCH4: 0.4, flowRate: 23088, removalEfficiency: 82.0, devicePowerKw: 38, deviceGasNm3h: 1192, chamberTemp: 776, heatRecoveryEff: 81, isEmptyBurn: false },
    "OUT-021": { inletTVOC: 375, outletTVOC: 64, inletNMHC: 319, outletNMHC: 58, outletPM25: 20, outletSO2: 3.0, outletNOx: 32, outletCO: 10, outletCO2: 228, outletCH4: 0.2, flowRate: 23906, removalEfficiency: 83.0, devicePowerKw: 42, deviceGasNm3h: 822, chamberTemp: 784, heatRecoveryEff: 88, isEmptyBurn: true },
    "OUT-022": { inletTVOC: 250, outletTVOC: 20, inletNMHC: 213, outletNMHC: 18, outletPM25: 6, outletSO2: 3.3, outletNOx: 26, outletCO: 8, outletCO2: 216, outletCH4: 0.3, flowRate: 29064, removalEfficiency: 92.0, devicePowerKw: 27, deviceGasNm3h: 745, chamberTemp: 754, heatRecoveryEff: 88, isEmptyBurn: false },
    "OUT-023": { inletTVOC: 294, outletTVOC: 32, inletNMHC: 250, outletNMHC: 29, outletPM25: 16, outletSO2: 2.3, outletNOx: 13, outletCO: 12, outletCO2: 216, outletCH4: 0.4, flowRate: 21891, removalEfficiency: 89.0, devicePowerKw: 34, deviceGasNm3h: 1236, chamberTemp: 750, heatRecoveryEff: 78, isEmptyBurn: false },
    "OUT-024": { inletTVOC: 534, outletTVOC: 85, inletNMHC: 454, outletNMHC: 77, outletPM25: 13, outletSO2: 4.8, outletNOx: 15, outletCO: 13, outletCO2: 252, outletCH4: 0.1, flowRate: 22421, removalEfficiency: 84.0, devicePowerKw: 53, deviceGasNm3h: 653, chamberTemp: 720, heatRecoveryEff: 93, isEmptyBurn: false },
    "OUT-025": { inletTVOC: 515, outletTVOC: 77, inletNMHC: 438, outletNMHC: 69, outletPM25: 7, outletSO2: 2.0, outletNOx: 33, outletCO: 11, outletCO2: 229, outletCH4: 0.4, flowRate: 16414, removalEfficiency: 85.0, devicePowerKw: 24, deviceGasNm3h: 437, chamberTemp: 727, heatRecoveryEff: 88, isEmptyBurn: false },
    "OUT-026": { inletTVOC: 492, outletTVOC: 39, inletNMHC: 418, outletNMHC: 35, outletPM25: 9, outletSO2: 2.5, outletNOx: 13, outletCO: 11, outletCO2: 413, outletCH4: 0.6, flowRate: 20796, removalEfficiency: 92.0, devicePowerKw: 37, deviceGasNm3h: 788, chamberTemp: 750, heatRecoveryEff: 92, isEmptyBurn: true },
    "OUT-027": { inletTVOC: 257, outletTVOC: 15, inletNMHC: 218, outletNMHC: 14, outletPM25: 12, outletSO2: 3.5, outletNOx: 12, outletCO: 11, outletCO2: 411, outletCH4: 0.3, flowRate: 27246, removalEfficiency: 94.0, devicePowerKw: 42, deviceGasNm3h: 1371, chamberTemp: 790, heatRecoveryEff: 80, isEmptyBurn: false },
    "OUT-028": { inletTVOC: 527, outletTVOC: 47, inletNMHC: 448, outletNMHC: 42, outletPM25: 21, outletSO2: 3.2, outletNOx: 25, outletCO: 6, outletCO2: 259, outletCH4: 0.4, flowRate: 29364, removalEfficiency: 91.0, devicePowerKw: 39, deviceGasNm3h: 1342, chamberTemp: 798, heatRecoveryEff: 92, isEmptyBurn: false },
    "OUT-029": { inletTVOC: 509, outletTVOC: 66, inletNMHC: 433, outletNMHC: 59, outletPM25: 6, outletSO2: 2.0, outletNOx: 17, outletCO: 6, outletCO2: 218, outletCH4: 0.3, flowRate: 25871, removalEfficiency: 87.0, devicePowerKw: 49, deviceGasNm3h: 1162, chamberTemp: 784, heatRecoveryEff: 92, isEmptyBurn: false },
    "OUT-030": { inletTVOC: 374, outletTVOC: 60, inletNMHC: 318, outletNMHC: 54, outletPM25: 10, outletSO2: 4.0, outletNOx: 20, outletCO: 12, outletCO2: 384, outletCH4: 0.3, flowRate: 18556, removalEfficiency: 84.0, devicePowerKw: 42, deviceGasNm3h: 1012, chamberTemp: 763, heatRecoveryEff: 81, isEmptyBurn: true },
    "OUT-031": { inletTVOC: 238, outletTVOC: 33, inletNMHC: 202, outletNMHC: 30, outletPM25: 9, outletSO2: 3.9, outletNOx: 18, outletCO: 11, outletCO2: 414, outletCH4: 0.4, flowRate: 28975, removalEfficiency: 86.0, devicePowerKw: 36, deviceGasNm3h: 617, chamberTemp: 745, heatRecoveryEff: 89, isEmptyBurn: false },
    "OUT-032": { inletTVOC: 307, outletTVOC: 18, inletNMHC: 261, outletNMHC: 16, outletPM25: 7, outletSO2: 1.8, outletNOx: 29, outletCO: 12, outletCO2: 417, outletCH4: 0.4, flowRate: 19719, removalEfficiency: 94.0, devicePowerKw: 31, deviceGasNm3h: 747, chamberTemp: 818, heatRecoveryEff: 78, isEmptyBurn: false },
    "OUT-033": { inletTVOC: 284, outletTVOC: 26, inletNMHC: 241, outletNMHC: 23, outletPM25: 6, outletSO2: 3.9, outletNOx: 22, outletCO: 5, outletCO2: 287, outletCH4: 0.6, flowRate: 26415, removalEfficiency: 91.0, devicePowerKw: 47, deviceGasNm3h: 1211, chamberTemp: 771, heatRecoveryEff: 91, isEmptyBurn: false },
    "OUT-034": { inletTVOC: 386, outletTVOC: 50, inletNMHC: 328, outletNMHC: 45, outletPM25: 15, outletSO2: 2.3, outletNOx: 20, outletCO: 10, outletCO2: 303, outletCH4: 0.5, flowRate: 21155, removalEfficiency: 87.0, devicePowerKw: 45, deviceGasNm3h: 608, chamberTemp: 818, heatRecoveryEff: 93, isEmptyBurn: false },
    "OUT-035": { inletTVOC: 311, outletTVOC: 56, inletNMHC: 264, outletNMHC: 50, outletPM25: 16, outletSO2: 1.7, outletNOx: 21, outletCO: 11, outletCO2: 327, outletCH4: 0.1, flowRate: 24586, removalEfficiency: 82.0, devicePowerKw: 50, deviceGasNm3h: 1358, chamberTemp: 787, heatRecoveryEff: 90, isEmptyBurn: true },
    "OUT-036": { inletTVOC: 376, outletTVOC: 45, inletNMHC: 320, outletNMHC: 41, outletPM25: 16, outletSO2: 3.6, outletNOx: 34, outletCO: 9, outletCO2: 440, outletCH4: 0.4, flowRate: 16413, removalEfficiency: 88.0, devicePowerKw: 44, deviceGasNm3h: 516, chamberTemp: 733, heatRecoveryEff: 84, isEmptyBurn: false },
    "OUT-037": { inletTVOC: 368, outletTVOC: 26, inletNMHC: 313, outletNMHC: 23, outletPM25: 16, outletSO2: 4.5, outletNOx: 30, outletCO: 10, outletCO2: 362, outletCH4: 0.1, flowRate: 24953, removalEfficiency: 93.0, devicePowerKw: 51, deviceGasNm3h: 552, chamberTemp: 737, heatRecoveryEff: 92, isEmptyBurn: false },
    "OUT-038": { inletTVOC: 276, outletTVOC: 44, inletNMHC: 235, outletNMHC: 40, outletPM25: 14, outletSO2: 3.5, outletNOx: 12, outletCO: 10, outletCO2: 363, outletCH4: 0.4, flowRate: 19670, removalEfficiency: 84.0, devicePowerKw: 53, deviceGasNm3h: 491, chamberTemp: 755, heatRecoveryEff: 77, isEmptyBurn: false }
  },

  electricity: { totalKwh: 125000, greenKwh: 25000, fossilKwh: 100000, greenPct: 20 },

  layeredIndices: { cpIndex: 0.38, mciIndex: 0.55, ehiScore: 68 },
};

// ========== DataStore 持久化层 ==========
const DataStore = {
  _prefix: 'pcap_',
  _key(k) { return this._prefix + k; },

  get(key, fallback) {
    try {
      const raw = localStorage.getItem(this._key(key));
      return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
    } catch(e) { return fallback !== undefined ? fallback : null; }
  },

  set(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
  },

  init() {
    const inited = this.get('_inited');
    if (!inited) {
      for (const k of Object.keys(MOCK_DATA)) {
        this.set(k, MOCK_DATA[k]);
      }
      this.set('_inited', true);
      this.set('_version', '1.0');
    }
  },

  // === Alerts CRUD ===
  getAlerts() { return this.get('alerts', []); },
  setAlerts(list) { this.set('alerts', list); },
  updateAlert(id, patch) {
    const list = this.getAlerts();
    const idx = list.findIndex(a => a.id === id);
    if (idx >= 0) { list[idx] = { ...list[idx], ...patch }; this.setAlerts(list); }
    return idx >= 0;
  },
  deleteAlert(id) {
    const list = this.getAlerts().filter(a => a.id !== id);
    this.setAlerts(list);
    return true;
  },
  addAlert(item) {
    const list = this.getAlerts();
    item.id = item.id || ('ALT-' + Date.now());
    list.unshift(item);
    this.setAlerts(list);
    return item;
  },

  // === Dispatches CRUD（闭环管理）===
  getDispatches() { return this.get('dispatches', []); },
  setDispatches(list) { this.set('dispatches', list); },
  updateDispatch(id, patch) {
    const list = this.getDispatches();
    const idx = list.findIndex(d => d.id === id);
    if (idx >= 0) { list[idx] = { ...list[idx], ...patch }; this.setDispatches(list); }
    return idx >= 0;
  },
  advanceDispatch(id) {
    const list = this.getDispatches();
    const idx = list.findIndex(d => d.id === id);
    if (idx >= 0 && list[idx].step < list[idx].steps.length - 1) {
      list[idx].step += 1;
      list[idx].status = list[idx].steps[list[idx].step];
      list[idx].statusCode = ['dispatched','received','feedback','reviewed','closed'][list[idx].step];
      this.setDispatches(list);
      return list[idx];
    }
    return null;
  },

  // === Monthly Reports ===
  getMonthlyReports() { return this.get('monthlyReports', []); },
  setMonthlyReports(list) { this.set('monthlyReports', list); },
  updateMonthlyReport(id, patch) {
    const list = this.getMonthlyReports();
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) { list[idx] = { ...list[idx], ...patch }; this.setMonthlyReports(list); }
    return idx >= 0;
  },

  // === Reviews ===
  getReviews() { return this.get('reviews', []); },
  setReviews(list) { this.set('reviews', list); },
  updateReview(id, patch) {
    const list = this.getReviews();
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) { list[idx] = { ...list[idx], ...patch }; this.setReviews(list); }
    return idx >= 0;
  },

  // === Simulator History ===
  getSimulatorHistory() { return this.get('simulatorHistory', []); },
  setSimulatorHistory(list) { this.set('simulatorHistory', list); },
  addSimulatorRecord(item) {
    const list = this.getSimulatorHistory();
    item.id = item.id || ('SIM-' + Date.now());
    list.unshift(item);
    this.setSimulatorHistory(list);
    return item;
  },

  // === Triple Reports ===
  getTripleReports() { return this.get('tripleReports', []); },
  setTripleReports(list) { this.set('tripleReports', list); },
  getLatestTripleReport() {
    const list = this.getTripleReports();
    return list.length > 0 ? list[0] : null;
  },

  // === Realtime Data ===
  getRealtime() { return this.get('realtime', MOCK_DATA.realtime); },
  setRealtime(data) { this.set('realtime', { ...this.getRealtime(), ...data }); },

  // === Stats ===
  getStats() {
    const alerts = this.getAlerts();
    const dispatches = this.getDispatches();
    return {
      unreadAlerts: alerts.filter(a => !a.read).length,
      "减污增碳/减碳增污悖论Alerts": alerts.filter(a => a.type === '减污增碳/减碳增污悖论' && !a.read).length,
      pendingDispatches: dispatches.filter(d => d.statusCode !== 'closed').length,
      closedDispatches: dispatches.filter(d => d.statusCode === 'closed').length,
      closureRate: Math.round((dispatches.filter(d => d.statusCode === 'closed').length / dispatches.length) * 100) || 0,
    };
  },

  // === Reset ===
  reset() {
    for (const k of Object.keys(MOCK_DATA)) {
      this.set(k, MOCK_DATA[k]);
    }
    this.set('_inited', true);
  },

  // === Outlets / Devices / Monitoring (v3.1 新增) ===
  getOutlets() { return this.get('outlets', []); },
  setOutlets(list) { this.set('outlets', list); },
  getOutletById(id) { return this.getOutlets().find(o => o.id === id); },
  getOutletsByEnterprise(eid) { return this.getOutlets().filter(o => o.enterpriseId === eid); },

  getDevices() { return this.get('devices', []); },
  setDevices(list) { this.set('devices', list); },
  getDeviceById(id) { return this.getDevices().find(d => d.id === id); },
  getDevicesByOutlet(oid) { return this.getDevices().filter(d => d.outletId === oid); },
  getDevicesByEnterprise(eid) { return this.getDevices().filter(d => d.enterpriseId === eid); },

  getOutletMonitoring() { return this.get('outletMonitoring', {}); },
  setOutletMonitoring(data) { this.set('outletMonitoring', data); },
  getOutletData(outletId) { return this.getOutletMonitoring()[outletId] || null; },

  getElectricity() { return this.get('electricity', MOCK_DATA.electricity); },
  setElectricity(data) { this.set('electricity', { ...this.getElectricity(), ...data }); },

  getLayeredIndices() { return this.get('layeredIndices', MOCK_DATA.layeredIndices); },
  setLayeredIndices(data) { this.set('layeredIndices', { ...this.getLayeredIndices(), ...data }); },

  // === MCI / EHI 计算（v3.1 新增）===
  calcMCI(outletData) {
    // 简化版 MCI：基于各污染物达标率加权
    const weights = { tvoc: 0.40, nox: 0.25, pm25: 0.20, so2: 0.15 };
    const limits = { tvoc: 120, nox: 150, pm25: 30, so2: 50 }; // mg/m3 或 ug/m3
    let score = 0;
    if (outletData.outletTVOC !== undefined) score += weights.tvoc * Math.max(0, 1 - outletData.outletTVOC / limits.tvoc);
    if (outletData.outletNOx !== undefined) score += weights.nox * Math.max(0, 1 - outletData.outletNOx / limits.nox);
    if (outletData.outletPM25 !== undefined) score += weights.pm25 * Math.max(0, 1 - outletData.outletPM25 / limits.pm25);
    if (outletData.outletSO2 !== undefined) score += weights.so2 * Math.max(0, 1 - outletData.outletSO2 / limits.so2);
    // NOx 惩罚项
    const noxPenalty = Math.max(0, (outletData.outletNOx || 0) / limits.nox - 0.8) * 0.5;
    return Math.max(0, Math.min(1, score * (1 - noxPenalty)));
  },

  calcEHI(outletData) {
    // 简化版 EHI：0-100 环境健康评分
    const limits = { tvoc: 120, nmhc: 100, pm25: 30, so2: 50, nox: 150, co2: 500 };
    const weights = { tvoc: 0.30, nox: 0.20, pm25: 0.15, so2: 0.10, co2: 0.20, ch4: 0.05 };
    let score = 0;
    if (outletData.outletTVOC !== undefined) score += weights.tvoc * Math.max(0, 100 - 100 * outletData.outletTVOC / limits.tvoc);
    if (outletData.outletNMHC !== undefined) score += weights.nox * Math.max(0, 100 - 100 * outletData.outletNMHC / limits.nmhc);
    if (outletData.outletPM25 !== undefined) score += weights.pm25 * Math.max(0, 100 - 100 * outletData.outletPM25 / limits.pm25);
    if (outletData.outletSO2 !== undefined) score += weights.so2 * Math.max(0, 100 - 100 * outletData.outletSO2 / limits.so2);
    if (outletData.outletNOx !== undefined) score += weights.nox * Math.max(0, 100 - 100 * outletData.outletNOx / limits.nox);
    if (outletData.outletCO2 !== undefined) score += weights.co2 * Math.max(0, 100 - 100 * outletData.outletCO2 / limits.co2);
    if (outletData.outletCH4 !== undefined) score += weights.ch4 * Math.max(0, 100 - 100 * outletData.outletCH4 / 2.0);
    return Math.round(Math.max(0, Math.min(100, score)));
  }
};

// 页面加载时自动初始化
if (typeof window !== 'undefined') {
  DataStore.init();
}

// ========== 辅助函数 ==========
function getCpLevel(index) {
  if (index >= 0.8) return { label: "优", color: "#4ade80", class: "tag-neon-green" };
  if (index >= 0.6) return { label: "良", color: "#fbbf24", class: "tag-neon-yellow" };
  if (index >= 0.4) return { label: "差", color: "#fb923c", class: "tag-neon-orange" };
  return { label: "极差", color: "#f87171", class: "tag-neon-red" };
}

function fmtDate(d) {
  const now = new Date("2026-05-18");
  const target = new Date("2026-" + d);
  const diff = Math.floor((target - now) / (1000*60*60*24));
  if (diff === 0) return "今天";
  if (diff === 1) return "明天";
  if (diff === -1) return "昨天";
  if (diff > 0) return `${diff}天后`;
  return d;
}

// 全局 Toast 提示
function showToast(msg, type, duration) {
  const toast = document.createElement('div');
  const colors = { success: '#4ade80', error: '#f87171', warn: '#fbbf24', info: '#22d3ee' };
  toast.style.cssText = `
    position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
    background: rgba(15,23,42,0.9); border: 1px solid ${colors[type] || colors.info};
    color: ${colors[type] || colors.info}; padding: 10px 24px; border-radius: 8px;
    font-size: 14px; z-index: 9999; backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 20px ${colors[type] || colors.info}20;
    animation: fadeInDown 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOutUp 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration || 2500);
}

// 添加 fadeInDown / fadeOutUp 动画到全局样式（如果页面有 style 标签则插入）
if (typeof document !== 'undefined') {
  const animStyle = document.createElement('style');
  animStyle.textContent = `
    @keyframes fadeInDown { from { opacity:0; transform:translate(-50%,-20px);} to { opacity:1; transform:translate(-50%,0);} }
    @keyframes fadeOutUp { from { opacity:1; transform:translate(-50%,0);} to { opacity:0; transform:translate(-50%,-20px);} }
  `;
  document.head.appendChild(animStyle);
}
