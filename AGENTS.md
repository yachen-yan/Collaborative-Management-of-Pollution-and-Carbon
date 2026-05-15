# 污碳协同AI监管与决策平台 — Agent 指南

## 项目定位

最小可行产品（MVP），聚焦**工业涂装行业**的 VOCs 与碳排放协同监测预警。

核心闭环：数据采集 → 实时双算引擎（污算子/碳算子/协同算子）→ AI 悖论识别 → 智能预警 → 因果归因 → 决策支持。

## 目录结构

```
.
├── docs/                          # 文档中心
│   ├── PRD/                       # 产品需求文档
│   │   └── PRD-污碳协同AI监管与决策平台.md
│   ├── API/                       # 接口文档
│   ├── design/                    # UI/UX 设计稿、原型文件
│   └── architecture/              # 架构设计文档
│
├── frontend/                      # 前端工程（3个独立应用）
│   ├── enterprise/                # 工业企业端（Web 工作台）
│   ├── gov-dashboard/             # 政府管理科（协同管控指挥大屏 + LLM 助手）
│   └── gov-monitoring/            # 监测数据科（3D GIS 监测台）
│
├── backend/                       # 后端工程
│   ├── api/                       # REST API 服务（用户/企业/数据/报告）
│   ├── calc-engine/               # 实时双算引擎（污算子/碳算子/协同算子）
│   ├── ai-services/               # AI 服务（悖论识别、因果归因、LLM RAG）
│   └── scheduler/                 # 定时任务（预警调度、月报生成、数据清洗）
│
├── database/                      # 数据库
│   ├── migrations/                # Supabase 迁移脚本
│   ├── seeds/                     # 种子数据
│   └── schemas/                   # 表结构定义（SQL）
│
├── prototype/                     # 原型演示文件
│   ├── figma/                     # Figma / Axure / 即时设计 源文件
│   └── assets/                    # 原型素材（图标、截图、底图）
│
├── infra/                         # 基础设施
│   ├── docker/                    # Docker Compose 配置
│   └── k8s/                       # Kubernetes 配置（预留）
│
└── scripts/                       # 工具脚本（数据导入、批量操作等）
```

## 技术栈（暂定）

| 层级 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| UI 组件库 | Ant Design 5.x |
| 3D GIS | CesiumJS + Three.js |
| 可视化 | ECharts / D3.js |
| 后端 | Node.js (NestJS) 或 Python (FastAPI) — 待确认 |
| 数据库 | Supabase (PostgreSQL + PostGIS) |
| 实时计算 | Apache Kafka + Flink（或简化版定时任务） |
| AI/LLM | 自研规则引擎 + OpenAI API / 国产大模型 API |
| 部署 | Docker + Nginx |

## 编码规范

- 统一使用 **UTF-8** 编码
- 文件名使用中英文混合时，中文部分放在前面便于排序，如：`企业端-登录页.tsx`
- 提交信息使用中文，格式：`[模块] 简短描述`，例如：`[企业端] 完成月度填报表单`
- 环境变量统一放在 `infra/docker/.env`，不提交到版本控制

## 开发原则

1. **MVP 优先**：PRD 第 12 节 "本期不实现功能" 列表中的内容暂不开发
2. **Phase 推进**：按 Phase 1 → Phase 2 → Phase 3 顺序交付，每 Phase 验收后再进入下一阶段
3. **数据驱动**：所有业务规则以 PRD 中的公式和阈值为标准，确保计算结果可复核
4. **AI 标注**：LLM 生成内容需标注可信度，不确定处标记 `[待核实]`

## 数据底座关键表

- `enterprises` — 企业信息
- `monthly_reports` — 月度运行数据上报
- `daily_metrics` — 每日运行指标（API 直采）
- `real_time_calcs` — 实时双算计算结果
- `triple_eval_reports` — 三评合一报告
- `monitoring_alerts` — 预警记录
- `dispatch_tasks` — 调度任务
- `knowledge_base` — 知识库
- `supply_chain_links` — 供应链关联
- `llm_conversations` — LLM 对话记录

## 联系方式

项目所有文件统一保存在：`d:\测试-污碳协同AI监管平台设计`
