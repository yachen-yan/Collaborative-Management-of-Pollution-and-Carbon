with open('llm-assistant.html', 'a', encoding='utf-8') as f:
    f.write('''
  <script>
    const LLM_KEY = 'pcap_llm_sessions';
    const LLM_CUR = 'pcap_llm_current';
    let curId = null, sessions = [];

    function loadSess() {
      try { sessions = JSON.parse(localStorage.getItem(LLM_KEY) || '[]'); } catch(e){ sessions=[]; }
      curId = localStorage.getItem(LLM_CUR) || null;
      renderSess();
      if(curId) restoreSess(curId);
    }
    function saveSess() {
      localStorage.setItem(LLM_KEY, JSON.stringify(sessions));
      if(curId) localStorage.setItem(LLM_CUR, curId);
    }
    function newSession() {
      curId = 'SESS-' + Date.now();
      sessions.unshift({ id: curId, title: '新会话', time: new Date().toLocaleString('zh-CN'), msgs: [] });
      saveSess(); renderSess();
      document.getElementById('chatMessages').innerHTML = '';
      document.getElementById('welcomeArea').style.display = 'block';
    }
    function restoreSess(id) {
      const s = sessions.find(x => x.id === id);
      if(!s) return;
      curId = id;
      document.getElementById('welcomeArea').style.display = 'none';
      const body = document.getElementById('chatMessages');
      body.innerHTML = '';
      s.msgs.forEach(m => addMsg(m.role, m.html, false));
      renderSess();
    }
    function renderSess() {
      const list = document.getElementById('sessionList');
      if(!sessions.length){ list.innerHTML = '<div style="text-align:center;padding:20px;color:rgba(226,232,240,0.2);font-size:12px">暂无历史会话</div>'; return; }
      list.innerHTML = sessions.map(s => {
        const active = s.id === curId ? 'active' : '';
        const title = s.msgs.length > 0 ? (s.msgs.find(m => m.role === 'user')?.html.replace(/<[^>]+>/g,'').slice(0,18) || s.title) : s.title;
        return '<div class="session-item ' + active + '" onclick="restoreSess(' + JSON.stringify(s.id) + ')"><div class="session-item-title">' + title + '</div><div class="session-item-time">' + s.time + '</div></div>';
      }).join('');
    }
    function appendSess(role, html) {
      const s = sessions.find(x => x.id === curId);
      if(s){ s.msgs.push({role, html}); saveSess(); }
    }

    const presets = {
      policy: { q: 'RTO 燃烧室温度最低多少度？', a: '<p>根据相关技术标准，RTO 燃烧室温度要求如下：</p><div class="ai-card"><div class="ai-card-title">📖 法规依据</div><table class="ai-table"><tr><th>标准</th><th>条款</th><th>要求</th></tr><tr><td>《蓄热燃烧法工业有机废气治理工程技术规范》HJ 1093-2020</td><td>第 5.2.3 条</td><td>燃烧室温度 ≥ 760°C，确保 VOCs 分解效率 ≥ 99%</td></tr><tr><td>《工业涂装工序污染防治可行技术指南》HJ 1126-2020</td><td>第 4.2.3 条</td><td>RTO 运行温度 760-850°C 为正常区间</td></tr><tr><td>北京市 DB11/501-2023</td><td>补充条款</td><td>低于 760°C 持续 15 分钟以上视为不正常运行</td></tr></table><div class="ai-source">来源：<a href="#">HJ 1093-2020</a>、<a href="#">HJ 1126-2020</a>、<a href="#">DB11/501-2023</a> <span class="verify-tag">[待核实]</span> 请以正式文本为准</div></div><p>💡 <strong>补充说明</strong>：温度过高（>850°C）也可能导致能源浪费，建议将燃烧室温度控制在 <strong>760-800°C</strong> 的最佳效率区间。</p>' },
      attribution: { q: '为什么张镇工业园这两天协同指数掉了？', a: '<p>经 AI 溯源分析，张镇工业园协同指数从 0.68 降至 0.52 的主要原因如下：</p><div class="ai-card"><div class="ai-card-title">🔍 归因分析结果</div><p><strong>Step 1 - 时序异常定位：</strong>5月16日 14:00 出现突变点，协同指数单小时下降 0.12</p><p><strong>Step 2 - 维度分解：</strong>碳排维度贡献 78%，为主要下降原因；VOCs 维度贡献 15%</p><p><strong>Step 3 - 企业贡献排序：</strong></p><table class="ai-table"><tr><th>排名</th><th>企业</th><th>碳排增量</th><th>贡献度</th></tr><tr><td>1</td><td>蓝天工业涂装</td><td>+35%</td><td>42%</td></tr><tr><td>2</td><td>红星喷涂厂</td><td>+28%</td><td>31%</td></tr><tr><td>3</td><td>鑫达汽修</td><td>+18%</td><td>18%</td></tr></table><p><strong>Step 4 - 根因判定：</strong>3 家企业同时拉满 RTO 负荷求 VOCs 达标，天然气总耗环比增 28%</p></div><div class="ai-card"><div class="ai-card-title">💡 调度建议</div><p>建议错峰运行：</p><p>① 蓝天工业：8:00-12:00 集中喷涂</p><p>② 红星喷涂：13:00-17:00 集中喷涂</p><p>③ 鑫达汽修：18:00-22:00 集中喷涂</p><p>预计错峰后园区天然气消耗降低 <strong>22%</strong>，协同指数回升至 <strong>0.72</strong></p></div><div class="ai-source"><span class="verify-tag">[待核实]</span> 本分析基于实时双算数据，建议结合现场核查确认</div>' },
      report: { q: '生成上个月园区 减污增碳/减碳增污悖论 风险统计', a: '<p>已为您生成《2026年4月 张镇工业园 减污增碳/减碳增污悖论 风险统计报告》：</p><div class="ai-card"><div class="ai-card-title">📊 统计概览</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0"><div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#f87171">7</div><div style="font-size:11px;color:rgba(226,232,240,0.4)">减污增碳/减碳增污悖论 事件</div></div><div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fbbf24">5</div><div style="font-size:11px;color:rgba(226,232,240,0.4)">减污增碳</div></div><div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fbbf24">2</div><div style="font-size:11px;color:rgba(226,232,240,0.4)">减碳增污</div></div></div><table class="ai-table"><tr><th>企业</th><th>类型</th><th>C-P最低</th><th>持续时长</th><th>状态</th></tr><tr><td>蓝天工业涂装</td><td><span class="ai-tag red">减污增碳</span></td><td>0.35</td><td>36h</td><td>整改中</td></tr><tr><td>红星喷涂厂</td><td><span class="ai-tag red">减污增碳</span></td><td>0.38</td><td>24h</td><td>已销号</td></tr><tr><td>鑫达汽修</td><td><span class="ai-tag yellow">减碳增污</span></td><td>0.42</td><td>18h</td><td>整改中</td></tr><tr><td>金辉涂装</td><td><span class="ai-tag red">减污增碳</span></td><td>0.40</td><td>12h</td><td>已销号</td></tr></table></div><p>📈 <strong>趋势分析</strong>：4月 减污增碳/减碳增污悖论 事件较 3月增加 40%，主要原因为季节性订单增长导致 RTO 超负荷运行。建议加强错峰调度管理。</p><p><a href="report-result.html" style="color:#22d3ee">👉 查看完整可视化报表</a></p>' },
      schedule: { q: '建议三家企业的错峰运行方案', a: '<p>基于当前园区 3 家重点企业的生产数据和 RTO 负荷分析，AI 生成以下错峰方案：</p><div class="ai-card"><div class="ai-card-title">⏰ 错峰运行调度方案</div><table class="ai-table"><tr><th>企业</th><th>建议时段</th><th>RTO负荷</th><th>预计节能</th></tr><tr><td>蓝天工业涂装</td><td><strong>08:00 - 12:00</strong></td><td>85%</td><td>基准</td></tr><tr><td>红星喷涂厂</td><td><strong>13:00 - 17:00</strong></td><td>80%</td><td>-15% 天然气</td></tr><tr><td>鑫达汽修</td><td><strong>18:00 - 22:00</strong></td><td>75%</td><td>-12% 天然气</td></tr></table><p style="margin-top:10px"><strong>预期效果：</strong></p><p>• 园区天然气总耗预计降低 <strong>22%</strong></p><p>• 区域 C-P 协同指数预计从 0.52 回升至 <strong>0.72</strong></p><p>• 减少 减污增碳/减碳增污悖论 预警触发概率 <strong>65%</strong></p></div><p>⚠️ <strong>注意事项</strong>：需提前与企业确认产能排期可行性，建议给予 3-5 天过渡期。</p><div style="margin-top:10px"><button class="btn btn-primary" style="font-size:13px" onclick="alert(\'调度指令已生成草稿（本地演示）\')">📤 生成调度指令草稿</button></div>' }
    };

    function genQuickQs() {
      const rt = DataStore.getRealtime();
      const alerts = DataStore.getAlerts();
      const unread = alerts.filter(a => !a.read).length;
      const cp = rt.cpIndex;
      const qs = [];
      if (unread > 0) qs.push({k:'attribution',t:'🔍 为什么C-P协同指数下降了？'});
      else if (cp < 0.4) qs.push({k:'attribution',t:'🔍 C-P持续低于0.4，如何快速整改？'});
      else if (cp < 0.6) qs.push({k:'attribution',t:'🔍 协同失衡原因分析'});
      if (unread > 0) qs.push({k:'report',t:'📊 如何处理最新的减污增碳/减碳增污悖论预警？'});
      qs.push({k:'policy',t:'📚 RTO燃烧室温度最低多少度？'});
      qs.push({k:'schedule',t:'💡 建议三家企业的错峰运行方案'});
      const qg = document.getElementById('quickQuestions');
      qg.innerHTML = qs.slice(0,4).map(q => '<span class="quick-q" onclick="sendPreset(' + JSON.stringify(q.k) + ')">' + q.t + '</span>').join('');
    }

    function sendPreset(key) {
      if(!curId) newSession();
      document.getElementById('welcomeArea').style.display = 'none';
      const p = presets[key];
      addMsg('user', p.q);
      setTimeout(() => addMsg('ai', p.a), 600);
    }
    function sendMsg() {
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if(!text) return;
      if(!curId) newSession();
      document.getElementById('welcomeArea').style.display = 'none';
      addMsg('user', text);
      input.value = '';
      setTimeout(() => {
        addMsg('ai', '<p>🤖 我理解你的问题是：<strong>"' + text + '"</strong></p><p>作为原型演示，我已预置了 4 组典型问答。请从上方快捷问题中选择，或输入以下关键词触发：</p><p>• <strong>政策</strong> / <strong>RTO</strong> / <strong>温度</strong> → 政策秒查</p><p>• <strong>为什么</strong> / <strong>归因</strong> / <strong>掉了</strong> → 异常归因</p><p>• <strong>报表
