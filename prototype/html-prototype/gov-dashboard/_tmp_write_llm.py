import json

html = r'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>LLM 智能政务助手 — 污碳协同AI监管平台</title>
  <script src="../js/data.js"></script>
  <style>
    body { background: #020617; color: #e2e8f0; }
    .topbar { background: linear-gradient(90deg, #1677ff 0%, #36cfc9 100%); }
    .main { margin-left: 0; margin-top: 64px; padding: 0; min-height: calc(100vh - 64px); display: flex; }
    .session-sidebar {
      width: 220px; background: rgba(2,6,23,0.95); border-right: 1px solid rgba(34,211,238,0.1);
      padding: 16px 12px; display: flex; flex-direction: column; flex-shrink: 0;
    }
    .session-sidebar-title { font-size: 13px; font-weight: 600; color: #22d3ee; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
    .session-new-btn {
      padding: 8px; border-radius: 6px; border: 1px solid rgba(34,211,238,0.2);
      background: rgba(34,211,238,0.08); color: #22d3ee; font-size: 12px; cursor: pointer;
      text-align: center; margin-bottom: 12px; transition: all 0.2s;
    }
    .session-new-btn:hover { background: rgba(34,211,238,0.15); border-color: rgba(34,211,238,0.35); }
    .session-list { flex: 1; overflow-y: auto; }
    .session-list::-webkit-scrollbar { width: 3px; }
    .session-list::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.2); }
    .session-item {
      padding: 8px 10px; border-radius: 6px; margin-bottom: 6px; cursor: pointer;
      font-size: 12px; color: rgba(226,232,240,0.5); border: 1px solid transparent;
      transition: all 0.2s; line-height: 1.5;
    }
    .session-item:hover { background: rgba(34,211,238,0.06); border-color: rgba(34,211,238,0.15); color: rgba(226,232,240,0.8); }
    .session-item.active { background: rgba(34,211,238,0.1); border-color: rgba(34,211,238,0.25); color: #22d3ee; }
    .session-item-title { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .session-item-time { font-size: 11px; color: rgba(226,232,240,0.25); margin-top: 2px; }
    .llm-wrap { flex: 1; display: flex; flex-direction: column; height: calc(100vh - 64px); padding: 16px 20px; }
    .llm-header { text-align: center; margin-bottom: 16px; }
    .llm-header-title { font-size: 18px; font-weight: 600; }
    .llm-header-sub { font-size: 12px; color: rgba(226,232,240,0.35); margin-top: 3px; }
    .llm-body { flex: 1; overflow-y: auto; padding: 0 12px; }
    .llm-body::-webkit-scrollbar { width: 5px; }
    .llm-body::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.15); border-radius: 3px; }
    .msg { display: flex; gap: 10px; margin-bottom: 16px; }
    .msg.user { flex-direction: row-reverse; }
    .msg-avatar {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 14px;
    }
    .msg-avatar.ai { background: linear-gradient(135deg, #0ea5e9, #22d3ee); color: #020617; }
    .msg-avatar.user { background: rgba(34,211,238,0.15); color: #22d3ee; border: 1px solid rgba(34,211,238,0.25); }
    .msg-bubble {
      max-width: 72%; padding: 12px 16px; border-radius: 10px; font-size: 13px; line-height: 1.8;
      position: relative;
    }
    .msg.ai .msg-bubble {
      background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.12);
      color: rgba(226,232,240,0.85); border-top-left-radius: 2px;
    }
    .msg.user .msg-bubble {
      background: linear-gradient(135deg, #0ea5e9, #1677ff); color: #fff; border-top-right-radius: 2px;
    }
    .msg-bubble strong { font-weight: 600; }
    .msg.ai .msg-bubble strong { color: #22d3ee; }
    .msg-time { font-size: 10px; color: rgba(226,232,240,0.2); margin-top: 3px; text-align: right; }
    .msg.user .msg-time { color: rgba(255,255,255,0.5); }
    .ai-card {
      background: rgba(34,211,238,0.06); border: 1px solid rgba(34,211,238,0.15); border-radius: 8px;
      padding: 12px 16px; margin: 8px 0; font-size: 13px; color: rgba(226,232,240,0.85);
    }
    .ai-card-title { font-weight: 600; color: #22d3ee; margin-bottom: 8px; }
    .ai-table { width: 100%; border-collapse: collapse; font-size: 12px; margin: 8px 0; }
    .ai-table th, .ai-table td {
      padding: 8px 10px; text-align: left;
      border-bottom: 1px solid rgba(34,211,238,0.1);
      color: rgba(226,232,240,0.8);
    }
    .ai-table th { background: rgba(34,211,238,0.08); font-weight: 600; color: #22d3ee; }
    .ai-table tr:hover { background: rgba(34,211,238,0.03); }
    .ai-source {
      font-size: 11px; color: rgba(226,232,240,0.3); margin-top: 8px; padding-top: 8px;
      border-top: 1px solid rgba(34,211,238,0.1);
    }
    .ai-source a { color: #22d3ee; }
    .ai-tag {
      display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin: 2px;
      background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.15); color: #22d3ee;
    }
    .ai-tag.red { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #f87171; }
    .ai-tag.yellow { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.2); color: #fbbf24; }
    .verify-tag {
      display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 11px;
      background: rgba(250,173,20,0.1); color: #fbbf24; border: 1px solid rgba(250,173,20,0.3);
      vertical-align: middle; margin-left: 4px;
    }
    .llm-input-bar {
      display: flex; gap: 10px; padding: 12px 16px;
      background: rgba(34,211,238,0.04); border: 1px solid rgba(34,211,238,0.1);
      border-radius: 10px; margin-top: 6px;
    }
    .llm-input {
      flex: 1; padding: 8px 14px; border: 1px solid rgba(34,211,238,0.15); border-radius: 6px;
      font-size: 13px; outline: none; background: rgba(2,6,23,0.6); color: #e2e8f0;
    }
    .llm-input:focus { border-color: #22d3ee; }
    .llm-input::placeholder { color: rgba(226,232,240,0.25); }
    .llm-send {
      padding: 8px 18px; background: linear-gradient(135deg, #0ea5e9, #1677ff); color: #fff;
      border: none; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;
      transition: all 0.2s;
    }
    .llm-send:hover { box-shadow: 0 0 16px rgba(14,165,233,0.4); transform: translateY(-1px); }
    .quick-questions {
      display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; justify-content: center;
    }
    .quick-q {
      padding: 5px 12px; background: rgba(34,211,238,0.05); border: 1px solid rgba(34,211,238,0.12);
      border-radius: 14px; font-size: 12px; cursor: pointer; color: rgba(226,232,240,0.5);
      transition: all 0.2s;
    }
    .quick-q:hover { border-color: #22d3ee; color: #22d3ee; background: rgba(34,211,238,0.1); box-shadow: 0 0 10px rgba(34,211,238,0.1); }
    .llm-welcome { text-align: center; padding: 30px 20px; }
    .llm-welcome-icon { font-size: 40px; margin-bottom: 10px; }
    .llm-welcome-title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
    .llm-welcome-desc { font-size: 12px; color: rgba(226,232,240,0.35); line-height: 1.8; }
    .llm-capability { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px; }
    .llm-cap-item {
      padding: 14px; background: rgba(34,211,238,0.04); border: 1px solid rgba(34,211,238,0.1);
      border-radius: 8px; transition: all 0.3s; cursor: pointer;
    }
    .llm-cap-item:hover { border-color: rgba(34,211,238,0.25); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.2), 0 0 12px rgba(34,211,238,0.06); }
    .llm-cap-icon { font-size: 22px; margin-bottom: 6px; }
    .llm-cap-title { font-size: 12px; font-weight: 600; }
    .llm-cap-desc { font-size: 11px; color: rgba(226,232,240,0.35); margin-top: 3px; }
  </style>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div class="bg-honeycomb"></div>
  <div class="page-loader" id="pageLoader"><div class="loader-ring"></div><div class="loader-text">INITIALIZING SYSTEM</div></div>
  <div class="topbar">
    <div class="logo">🌿 污碳协同AI监管平台</div>
    <div class="user"><span>怀柔区生态环境局</span><div class="avatar">李</div><span>李管理</span></div>
  </div>
  <div class="main">
    <div class="session-sidebar">
      <div class="session-sidebar-title">💬 历史会话</div>
      <button class="session-new-btn" onclick="newSession()">➕ 新建会话</button>
      <div class="session-list" id="sessionList"></div>
    </div>
    <div class="llm-wrap">
      <div class="llm-header">
        <div class="llm-header-title">🤖 LLM 智能政务助手</div>
        <div class="llm-header-sub">政策秒查 · 异常归因 · 决策建议 · 自然语言报表</div>
      </div>
      <div class="llm-body" id="chatBody">
        <div class="llm-welcome" id="welcomeArea">
          <div class="llm-welcome-icon">🤖</div>
          <div class="llm-welcome-title">我是你的 AI 环保助手</div>
          <div class="llm-welcome-desc">
            我可以帮你查询环保政策法规、分析 减污增碳/减碳增污悖论 异常根因、<br>
            生成统计报表、提供错峰调度建议等
          </div>
          <div class="llm-capability">
            <div class="llm-cap-item" onclick="sendPreset('policy')">
              <div class="llm-cap-icon">📚</div>
              <div class="llm-cap-title">政策秒查</div>
              <div class="llm-cap-desc">自然语言查询法规条款</div>
            </div>
            <div class="llm-cap-item" onclick="sendPreset('attribution')">
              <div class="llm-cap-icon">🔍</div>
              <div class="llm-cap-title">异常归因</div>
              <div class="llm-cap-desc">自动分析数据异常原因</div>
            </div>
            <div class="llm-cap-item" onclick="sendPreset('report')">
              <div class="llm-cap-icon">📊</div>
              <div class="llm-cap-title">智能报表</div>
              <div class="llm-cap-desc">口述需求自动生成图表</div>
            </div>
            <div class="llm-cap-item" onclick="sendPreset('schedule')">
              <div class="llm-cap-icon">💡</div>
              <div class="llm-cap-title">决策建议</div>
              <div class="llm-cap-desc">错峰调度等优化方案</div>
            </div>
          </div>
        </div>
        <div id="chatMessages"></div>
      </div>
      <div class="quick-questions" id="quickQuestions"></div>
      <div class="llm-input-bar">
        <input class="llm-input" id="chatInput" placeholder="输入你的问题，例如：查询VOCs排放标准" onkeypress="if(event.key==='Enter')sendMsg()">
        <button class="llm-send" onclick="sendMsg()">发送</button>
      </div>
    </div>
  </div>
'''

with open('llm-assistant.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Part 1 done')
