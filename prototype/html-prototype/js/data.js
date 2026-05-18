// ========== 假数据 ==========

const MOCK_DATA = {
  // 当前登录企业
  enterprise: {
    name: "蓝天工业涂装有限公司",
    industry: "汽车零部件涂装",
    contact: "张环保",
    phone: "138****5678",
    licenseNo: "91110108MA0012345",
    licenseExpire: "2026-12-31",
    carbonQuota: 8500,
  },

  // 污碳协同健康评分
  healthScore: {
    score: 68,
    level: "一般", // 优秀/良好/一般/较差
    color: "#fa8c16",
    pollution: 82,
    energy: 65,
    carbon: 58,
    synergy: 52,
    updateTime: "2026-05-18 09:00",
  },

  // C-P 协同指数趋势（近7天）
  cpTrend: {
    dates: ["05-12","05-13","05-14","05-15","05-16","05-17","05-18"],
    values: [0.72, 0.68, 0.61, 0.55, 0.48, 0.42, 0.38],
    threshold: 0.5,
  },

  // 实时双算指标
  realtime: {
    vocsRate: 12.5, // kg/h
    vocsEfficiency: 94.2, // %
    vocsIntensity: 8.3, // kg/万m²
    carbonTotal: 0.42, // tCO₂/h
    carbonIntensity: 0.28, // tCO₂/万m²
    cpIndex: 0.38,
    gasFlow: 1200, // Nm³/h
    chamberTemp: 785, // °C
    updateTime: "2026-05-18 09:00",
  },

  // 四象限气泡（企业自身 + 同区域脱敏参考）
  quadrantBubbles: [
    { label: "本企业", x: 0.28, y: 0.38, size: 48, color: "#f5222d", zIndex: 10 },
    { label: "行业均值", x: 0.35, y: 0.62, size: 36, color: "#faad14", zIndex: 5 },
    { label: "标杆企业A", x: 0.22, y: 0.85, size: 40, color: "#52c41a", zIndex: 5 },
    { label: "标杆企业B", x: 0.25, y: 0.78, size: 34, color: "#52c41a", zIndex: 5 },
    { label: "同类企业C", x: 0.38, y: 0.45, size: 32, color: "#fa8c16", zIndex: 5 },
  ],

  // 预警列表
  alerts: [
    {
      id: "ALT-20260518-001",
      type: "paradox",
      level: "critical",
      title: "Paradox 风险预警",
      desc: "C-P 协同指数 0.38，已连续 12h 低于 0.4，疑似 RTO 空烧",
      time: "09:00",
      read: false,
    },
    {
      id: "ALT-20260517-003",
      type: "imbalance",
      level: "warning",
      title: "协同失衡预警",
      desc: "C-P 协同指数 0.42，持续低于 0.6 超过 4h",
      time: "昨日 18:30",
      read: false,
    },
    {
      id: "ALT-20260515-002",
      type: "data",
      level: "warning",
      title: "数据异常预警",
      desc: "5月月度上报中天然气/RTO时长比值偏离历史均值 45%",
      time: "05-15",
      read: true,
    },
    {
      id: "ALT-20260510-001",
      type: "permit",
      level: "info",
      title: "证件到期提醒",
      desc: "排污许可证将于 21 天后到期（2026-12-31）",
      time: "05-10",
      read: true,
    },
  ],

  // 快捷入口
  quickLinks: [
    { icon: "📋", title: "月度数据填报", desc: "5月数据待提交", color: "#1677ff", bg: "#e6f4ff" },
    { icon: "📊", title: "实时双算看板", desc: "最新计算 09:00", color: "#52c41a", bg: "#f6ffed" },
    { icon: "🔮", title: "悖论模拟器", desc: "涂装技改预评估", color: "#722ed1", bg: "#f9f0ff" },
    { icon: "📑", title: "三评合一报告", desc: "5月报告已生成", color: "#faad14", bg: "#fffbe6" },
  ],

  // 待办任务
  todos: [
    { title: "提交5月月度运行数据", deadline: "05-20", urgent: true },
    { title: "回复 paradox 预警整改说明", deadline: "05-19", urgent: true },
    { title: "上传排污许可执行报告", deadline: "05-25", urgent: false },
  ],

  //  paradox 事件
  paradoxEvents: [
    { date: "05-18", type: "减污增碳", cpBefore: 0.55, cpAfter: 0.38, cause: "RTO 空烧时长占比升至 22%" },
    { date: "05-14", type: "减污增碳", cpBefore: 0.72, cpAfter: 0.61, cause: "天然气消耗环比激增 35%" },
    { date: "04-28", type: "减碳增污", cpBefore: 0.68, cpAfter: 0.52, cause: "RTO 温度设定过低" },
  ],
};

// 辅助函数：根据C-P指数返回等级信息
function getCpLevel(index) {
  if (index >= 0.8) return { label: "优", color: "#52c41a", class: "tag-green" };
  if (index >= 0.6) return { label: "良", color: "#faad14", class: "tag-yellow" };
  if (index >= 0.4) return { label: "差", color: "#fa8c16", class: "tag-orange" };
  return { label: "极差", color: "#f5222d", class: "tag-red" };
}

// 辅助函数：格式化日期
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
