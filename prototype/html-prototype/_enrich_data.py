import sys

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 丰富 simulatorHistory
old_sim = '''  simulatorHistory: [
    { id: "SIM-202605180915", time: "2026-05-18 09:15", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.75, cpAfter: 0.48, vocsChange: -60, gasChange: 35, carbonChange: 28, result: "trap" },
    { id: "SIM-202605101422", time: "2026-05-10 14:22", current: "溶剂型涂料（聚氨酯漆）", target: "粉末涂料", cpBefore: 0.72, cpAfter: 0.52, vocsChange: -85, gasChange: 55, carbonChange: 42, result: "trap" },
    { id: "SIM-202604281005", time: "2026-04-28 10:05", current: "溶剂型涂料（聚氨酯漆）", target: "高固体分涂料", cpBefore: 0.70, cpAfter: 0.68, vocsChange: -25, gasChange: 8, carbonChange: 5, result: "good" },
  ],'''
new_sim = '''  simulatorHistory: [
    { id: "SIM-202605180915", time: "2026-05-18 09:15", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.75, cpAfter: 0.48, vocsChange: -60, gasChange: 35, carbonChange: 28, result: "trap" },
    { id: "SIM-202605101422", time: "2026-05-10 14:22", current: "溶剂型涂料（聚氨酯漆）", target: "粉末涂料", cpBefore: 0.72, cpAfter: 0.52, vocsChange: -85, gasChange: 55, carbonChange: 42, result: "trap" },
    { id: "SIM-202605031530", time: "2026-05-03 15:30", current: "水性涂料（双组分）", target: "水性涂料（单组分）", cpBefore: 0.68, cpAfter: 0.71, vocsChange: -15, gasChange: -5, carbonChange: -3, result: "good" },
    { id: "SIM-202604281005", time: "2026-04-28 10:05", current: "溶剂型涂料（聚氨酯漆）", target: "高固体分涂料", cpBefore: 0.70, cpAfter: 0.68, vocsChange: -25, gasChange: 8, carbonChange: 5, result: "good" },
    { id: "SIM-202604151100", time: "2026-04-15 11:00", current: "溶剂型涂料（聚氨酯漆）", target: "水性涂料（单组分）", cpBefore: 0.74, cpAfter: 0.45, vocsChange: -58, gasChange: 32, carbonChange: 26, result: "trap" },
    { id: "SIM-202604080940", time: "2026-04-08 09:40", current: "高固体分涂料", target: "粉末涂料", cpBefore: 0.65, cpAfter: 0.58, vocsChange: -45, gasChange: 38, carbonChange: 22, result: "imbalance" },
  ],'''
content = content.replace(old_sim, new_sim)

# 2. 丰富 dispatches
old_disp = '''  dispatches: [
    { id: "DSP-20260518-001", type: "减污增碳/减碳增污悖论", title: "减污增碳/减碳增污悖论 风险整改通知", target: "蓝天工业涂装有限公司", deadline: "2026-05-25", status: "已下发", statusCode: "dispatched", step: 0, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-18 09:30", content: "C-P协同指数0.38持续12h低于阈值0.4，疑似RTO空烧。请立即排查并反馈整改措施。" },
    { id: "DSP-20260517-002", type: "data", title: "数据异常核查通知", target: "红星喷涂厂", deadline: "2026-05-22", status: "整改中", statusCode: "feedback", step: 2, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-17 14:00", content: "月度上报天然气/RTO时长比值偏离历史均值45%，请核实数据来源并重新上报。" },
    { id: "DSP-20260515-003", type: "permit", title: "排污许可证续期提醒", target: "鑫达汽修", deadline: "2026-06-15", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-15 10:00", content: "排污许可证将于30天后到期，请及时办理续期手续。" },
  ],'''
new_disp = '''  dispatches: [
    { id: "DSP-20260518-001", type: "减污增碳/减碳增污悖论", title: "减污增碳/减碳增污悖论 风险整改通知", target: "蓝天工业涂装有限公司", deadline: "2026-05-25", status: "已下发", statusCode: "dispatched", step: 0, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-18 09:30", content: "C-P协同指数0.38持续12h低于阈值0.4，疑似RTO空烧。请立即排查并反馈整改措施。" },
    { id: "DSP-20260517-002", type: "data", title: "数据异常核查通知", target: "红星喷涂厂", deadline: "2026-05-22", status: "整改中", statusCode: "feedback", step: 2, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-17 14:00", content: "月度上报天然气/RTO时长比值偏离历史均值45%，请核实数据来源并重新上报。" },
    { id: "DSP-20260516-004", type: "减污增碳/减碳增污悖论", title: "协同失衡整改通知", target: "永昌喷涂", deadline: "2026-05-23", status: "已签收", statusCode: "received", step: 1, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-16 11:00", content: "C-P协同指数0.39持续6h处于协同失衡区间，天然气消耗环比增加28%。请排查RTO运行参数并提交整改计划。" },
    { id: "DSP-20260512-005", type: "imbalance", title: "RTO能效优化建议", target: "鑫达汽修", deadline: "2026-05-20", status: "待复核", statusCode: "reviewed", step: 3, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-12 09:00", content: "热回收效率88%低于90%警戒线，建议清洗蓄热体或更换老化陶瓷。请提交整改报告。" },
    { id: "DSP-20260515-003", type: "permit", title: "排污许可证续期提醒", target: "鑫达汽修", deadline: "2026-06-15", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-15 10:00", content: "排污许可证将于30天后到期，请及时办理续期手续。" },
    { id: "DSP-20260510-006", type: "减污增碳/减碳增污悖论", title: "减污增碳陷阱整改通知", target: "金辉涂装", deadline: "2026-05-17", status: "已销号", statusCode: "closed", step: 4, steps: ["已下发","企业签收","整改反馈","监测科复核","已销号"], createdAt: "2026-05-10 14:00", content: "水性涂料切换后VOCs下降但天然气激增35%，C-P从0.72降至0.48。已整改完成，C-P回升至0.71。" },
  ],'''
content = content.replace(old_disp, new_disp)

# 3. 丰富 monthlyReports
old_mr = '''  monthlyReports: [
    { id: "MR-202605-001", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "待提交", statusCode: "draft", submitAt: null, reviewResult: null },
    { id: "MR-202604-001", month: "2026-04", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-04-28 16:30", reviewResult: "通过" },
  ],'''
new_mr = '''  monthlyReports: [
    { id: "MR-202605-001", month: "2026-05", enterprise: "蓝天工业涂装有限公司", status: "待提交", statusCode: "draft", submitAt: null, reviewResult: null },
    { id: "MR-202604-001", month: "2026-04", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-04-28 16:30", reviewResult: "通过" },
    { id: "MR-202603-001", month: "2026-03", enterprise: "蓝天工业涂装有限公司", status: "已通过", statusCode: "passed", submitAt: "2026-03-29 14:00", reviewResult: "通过" },
    { id: "MR-202602-001", month: "2026-02", enterprise: "蓝天工业涂装有限公司", status: "已退回", statusCode: "rejected", submitAt: "2026-02-28 10:00", reviewResult: "退回", reviewComment: "天然气数据与RTO运行时长不匹配，请核实后重新提交。" },
  ],'''
content = content.replace(old_mr, new_mr)

# 4. 丰富 reviews
old_rev = '''  reviews: [
    { id: "REV-20260518-001", reportId: "MR-202605-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-05-18 10:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260428-001", reportId: "MR-202604-001", enterprise: "红星喷涂厂", submitAt: "2026-04-28 14:00", status: "已通过", statusCode: "passed", checker: "李监测", result: "通过", comments: "数据完整，逻辑一致" },
    { id: "REV-20260425-001", reportId: "MR-202604-002", enterprise: "鑫达汽修", submitAt: "2026-04-25 09:30", status: "已退回", statusCode: "rejected", checker: "李监测", result: "退回", comments: "天然气数据与上月偏差过大，请核实" },
  ],'''
new_rev = '''  reviews: [
    { id: "REV-20260518-001", reportId: "MR-202605-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-05-18 10:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260515-002", reportId: "MR-202605-002", enterprise: "红星喷涂厂", submitAt: "2026-05-15 11:00", status: "待审核", statusCode: "pending", checker: "", result: "", comments: "" },
    { id: "REV-20260428-001", reportId: "MR-202604-001", enterprise: "红星喷涂厂", submitAt: "2026-04-28 14:00", status: "已通过", statusCode: "passed", checker: "李监测", result: "通过", comments: "数据完整，逻辑一致" },
    { id: "REV-20260425-001", reportId: "MR-202604-002", enterprise: "鑫达汽修", submitAt: "2026-04-25 09:30", status: "已退回", statusCode: "rejected", checker: "李监测", result: "退回", comments: "天然气数据与上月偏差过大，请核实" },
    { id: "REV-20260320-003", reportId: "MR-202603-001", enterprise: "蓝天工业涂装有限公司", submitAt: "2026-03-29 14:00", status: "已通过", statusCode: "passed", checker: "王监测", result: "通过", comments: "数据质量良好，准予通过" },
  ],'''
content = content.replace(old_rev, new_rev)

# 5. 丰富 alerts
old_alerts = '''  alerts: [
    { id: "ALT-20260518-001", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.38，已连续 12h 低于 0.4，疑似 RTO 空烧", time: "09:00", date: "05-18", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260517-003", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "C-P 协同指数 0.42，持续低于 0.6 超过 4h", time: "18:30", date: "05-17", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260515-002", type: "data", level: "warning", title: "数据异常预警", desc: "5月月度上报中天然气/RTO时长比值偏离历史均值 45%", time: "", date: "05-15", read: true, status: "整改中", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 2 },
    { id: "ALT-20260510-001", type: "permit", level: "info", title: "证件到期提醒", desc: "排污许可证将于 21 天后到期（2026-12-31）", time: "", date: "05-10", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
  ],'''
new_alerts = '''  alerts: [
    { id: "ALT-20260518-001", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.38，已连续 12h 低于 0.4，疑似 RTO 空烧", time: "09:00", date: "05-18", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260517-003", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "C-P 协同指数 0.42，持续低于 0.6 超过 4h", time: "18:30", date: "05-17", read: false, status: "待签收", flow: ["预警生成","待企业签收","整改反馈","监测科复核","已销号"], currentStep: 0 },
    { id: "ALT-20260516-004", type: "threshold", level: "warning", title: "超阈值预警", desc: "RTO燃烧室温度793°C，超过建议上限800°C持续2h", time: "14:00", date: "05-16", read: true, status: "已签收", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 1 },
    { id: "ALT-20260515-002", type: "data", level: "warning", title: "数据异常预警", desc: "5月月度上报中天然气/RTO时长比值偏离历史均值 45%", time: "", date: "05-15", read: true, status: "整改中", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 2 },
    { id: "ALT-20260514-005", type: "减污增碳/减碳增污悖论", level: "critical", title: "减污增碳/减碳增污悖论 风险预警", desc: "C-P 协同指数 0.35，持续8h，燃烧室温度偏低", time: "08:00", date: "05-14", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
    { id: "ALT-20260512-006", type: "ledger", level: "info", title: "台账缺漏提醒", desc: "4月涂料消耗明细台账缺失粉末涂料用量记录", time: "", date: "05-12", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
    { id: "ALT-20260510-001", type: "permit", level: "info", title: "证件到期提醒", desc: "排污许可证将于 21 天后到期（2026-12-31）", time: "", date: "05-10", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
    { id: "ALT-20260508-007", type: "imbalance", level: "warning", title: "协同失衡预警", desc: "天然气消耗环比增加28%，VOCs去除率无显著提升", time: "16:00", date: "05-08", read: true, status: "已销号", flow: ["预警生成","企业已签收","整改反馈","监测科复核","已销号"], currentStep: 4 },
  ],'''
content = content.replace(old_alerts, new_alerts)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('data.js enriched successfully')
