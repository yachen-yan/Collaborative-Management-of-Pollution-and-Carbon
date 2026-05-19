// ========== 假数据中心 + localStorage 持久化层 ==========
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
    { id: "ALT-20260518-001", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.38，已连续 12h 低于 0.4，疑似 RTO 空烧", time: "09:00", date: "05-18", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260517-003", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "C-P 协同指数 0.42，持续低于 0.6 超过 4h", time: "18:30", date: "05-17", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260515-002", type: "data", level: "warning", title: "数据异常预警", desc: "5月月度上报中天然气/RTO时长比值偏离历史均值 45%", time: "", date: "05-15", read: true, status: "整改中", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 2 },
    { id: "ALT-20260510-001", type: "permit", level: "info", title: "证件到期提醒", desc: "排污许可证将于 21 天后到期（2026-12-31）", time: "", date: "05-10", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
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

  减污增碳/减碳增污悖论Events: [
    { date: "05-18", type: "减污增碳", cpBefore: 0.55, cpAfter: 0.38, cause: "RTO 空烧时长占比升至 22%" },
    { date: "05-14", type: "减污增碳", cpBefore: 0.72, cpAfter: 0.61, cause: "天然气消耗环比激增 35%" },
    { date: "04-28", type: "减碳增污", cpBefore: 0.68, cpAfter: 0.52, cause: "RTO 温度设定过低" },
  ],

  // 调度指令（闭环管理）
  dispatches: [
    { id: "DSP-20260518-001", type: "减污增碳/减碳增污悖论", title: "减污增碳/减碳增污悖论 风险整改通知", target: "蓝天工业涂装有限公司", deadline: "2026-05-25", status: "已下发", statusCode: "dispatched", step: 0, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-18 09:30", content: "C-P协同指数0.38持续12h低于阈值0.4，疑似RTO空烧。请立即排查并反馈整改措施。" },
    { id: "DSP-20260517-002", type: "data", title: "数据异常核查通知", target: "红星喷涂厂", deadline: "2026-05-22", status: "整改中", statusCode: "feedback", step: 2, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-17 14:00", content: "月度上报天然气/RTO时长比值偏离历史均值45%，请核实数据来源并重新上报。" },
    { id: "DSP-20260515-003", type: "permit", title: "排污许可证续期提醒", target: "鑫达汽修", deadline: "2026-06-15", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-15 10:00", content: "排污许可证将于30天后到期，请及时办理续期手续。" },
  ],

  // 月度报告数据
  monthlyReports: [
    { id: "MR-202605-001", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "待提交", statusCode: "draft", submitAt: null, reviewResult: null },
    { id: "MR-202604-001", month: "2026-04", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-04-28 16:30", reviewResult: "通过" },
  ],

  // 数据审核记录
  reviews: [
    { id: "REV-20260518-001", reportId: "MR-202605-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-05-18 10:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260428-001", reportId: "MR-202604-001", enterprise: "红星喷涂厂", submitAt: "2026-04-28 14:00", status: "已通过", statusCode: "passed", checker: "李监测", result: "通过", comments: "数据完整，逻辑一致" },
    { id: "REV-20260425-001", reportId: "MR-202604-002", enterprise: "鑫达汽修", submitAt: "2026-04-25 09:30", status: "已退回", statusCode: "rejected", checker: "李监测", result: "退回", comments: "天然气数据与上月偏差过大，请核实" },
  ],

  // 悖论模拟器历史记录
  simulatorHistory: [
    { id: "SIM-202605180915", time: "2026-05-18 09:15", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.75, cpAfter: 0.48, vocsChange: -60, gasChange: 35, carbonChange: 28, result: "trap" },
    { id: "SIM-202605101422", time: "2026-05-10 14:22", current: "溶剂型涂料（聚氨酯漆）", target: "粉末涂料", cpBefore: 0.72, cpAfter: 0.52, vocsChange: -85, gasChange: 55, carbonChange: 42, result: "trap" },
    { id: "SIM-202604281005", time: "2026-04-28 10:05", current: "溶剂型涂料（聚氨酯漆）", target: "高固体分涂料", cpBefore: 0.70, cpAfter: 0.68, vocsChange: -25, gasChange: 8, carbonChange: 5, result: "good" },
  ],

  // 三评合一报告数据
  tripleReports: [
    { id: "TR-202605", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "已生成", statusCode: "generated", generatedAt: "2026-06-05 08:30", type: "自动生成",
      scores: { p: 82, e: 65, c: 58, cp: 0.52 },
      details: {
        pollution: [
          { name: "VOCs 达标率", value: "100%", score: 40, max: 40, color: "#52c41a" },
          { name: "去除效率", value: "94.2%", score: 28, max: 30, color: "#52c41a" },
          { name: "涂料结构优化", value: "14分", score: 14, max: 30, color: "#faad14", desc: "水性漆占比偏低" },
        ],
        energy: [
          { name: "热回收效率", value: "87%", score: 24, max: 40, color: "#faad14", desc: "<95%" },
          { name: "空烧控制", value: "18%", score: 15, max: 30, color: "#f5222d", desc: "空烧占比过高" },
          { name: "能源结构", value: "26分", score: 26, max: 30, color: "#faad14" },
        ],
        carbon: [
          { name: "碳排强度对标", value: "0.28", score: 20, max: 40, color: "#fa8c16", desc: "tCO₂/万m²，>P75" },
          { name: "配额余量", value: "68%", score: 22, max: 30, color: "#faad14" },
          { name: "减碳潜力", value: "16分", score: 16, max: 30, color: "#faad14" },
        ],
      },
      aiSummary: "本月整体评级为<strong>「一般」</strong>，存在明显短板。<strong>最优先改进项：减少 RTO 空烧</strong>。近30天内 RTO 空烧时长占比达 18%，导致天然气消耗环比增加 35%，碳排评价得分仅 58 分。污染评价 82 分表现良好，VOCs 达标率 100%，但协同分仅 52 分，C-P 协同指数 0.52 处于「差」等级。建议立即调整喷涂排班至集中时段，并检查蓄热体是否堵塞。",
      priorities: [
        { rank: 1, text: "<strong>减少 RTO 空烧</strong> — 调整喷涂排班至集中时段，目标空烧占比 < 5%", score: "+12分", color: "p1" },
        { rank: 2, text: "<strong>提升热回收效率</strong> — 检查蓄热体堵塞情况，清洗或更换蓄热体", score: "+8分", color: "p2" },
        { rank: 3, text: "<strong>提高水性涂料占比</strong> — 逐步替换溶剂型涂料，降低涂料隐含碳", score: "+6分", color: "p3" },
      ],
    },
  ],
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
      减污增碳/减碳增污悖论Alerts: alerts.filter(a => a.type === '减污增碳/减碳增污悖论' && !a.read).length,
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
function showToast(msg, type) {
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
  }, 2500);
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
