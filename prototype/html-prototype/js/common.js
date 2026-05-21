/**
 * ================================================================
 * 污碳协同AI监管平台 — 公共组件库 (common.js)
 * 职责：统一渲染 topbar / sidebar / page-loader，提供公共工具函数
 * 版本：v1.0
 * 用法：在每个 HTML 页面 <script src="../js/data.js"></script> 之后引入
 *       <script src="../js/common.js"></script>
 *       然后在页面底部调用 initCommon();
 * ================================================================
 */

/* ==================== 1. 公共组件渲染函数 ==================== */

/**
 * 渲染顶部导航栏（Topbar）
 * @param {Object} options
 * @param {string} [options.variant='enterprise'] - 类型: 'enterprise' | 'gov-manage' | 'gov-screen' | 'simple'
 * @param {string} [options.title='🌿 污碳协同AI监管平台'] - 标题/Logo 文字
 * @param {string} [options.orgName=''] - 机构/企业名称（显示在用户信息左侧）
 * @param {string} [options.userName=''] - 用户名
 * @param {string} [options.userRole=''] - 用户角色
 * @param {string} [options.avatar=''] - 头像文字（单字）
 * @param {Array}  [options.navItems] - 导航项数组（gov-screen / gov-manage 用），如 [{label:'🏠 首页',href:'index.html',active:true}]
 * @param {string} [options.subtitle=''] - 副标题（gov-screen 用）
 * @returns {string} HTML 字符串
 *
 * 使用方式：
 *   // 企业端（带 sidebar 的版本）
 *   document.body.insertAdjacentHTML('afterbegin', renderTopbar({
 *     variant: 'enterprise', orgName: '蓝天工业涂装有限公司', userName: '张环保', avatar: '张'
 *   }));
 *
 *   // 政府管理端（无 sidebar，顶部横向导航）
 *   document.body.insertAdjacentHTML('afterbegin', renderTopbar({
 *     variant: 'gov-manage', orgName: '怀柔区生态环境局', userName: '李管理', avatar: '李',
 *     navItems: [...]
 *   }));
 */
function renderTopbar(options) {
  const opts = Object.assign({
    variant: 'enterprise',
    title: '🌿 污碳协同AI监管平台',
    orgName: '',
    userName: '',
    userRole: '',
    avatar: '',
    navItems: null,
    subtitle: ''
  }, options);

  const safe = escapeHtml;
  const avatarChar = safe(opts.avatar || (opts.userName ? opts.userName.charAt(0) : '👤'));

  // ---- variant: gov-screen (大屏全屏头部) ----
  if (opts.variant === 'gov-screen') {
    const navHtml = (opts.navItems || []).map(it => {
      const cls = it.active ? 'active' : '';
      return `<a href="${safe(it.href || '#')}" class="${cls}">${safe(it.label)}</a>`;
    }).join('');
    return `
      <div class="screen-header">
        <div class="screen-header-left">
          <div>
            <div class="screen-header-title">
              <span class="pulse-dot"></span>
              ${safe(opts.title)}
            </div>
            ${opts.subtitle ? `<div class="screen-header-sub">${safe(opts.subtitle)}</div>` : ''}
          </div>
        </div>
        <div class="screen-nav">${navHtml}</div>
      </div>`;
  }

  // ---- variant: simple (只有 logo，无 user) ----
  if (opts.variant === 'simple') {
    return `
      <div class="topbar">
        <div class="logo">${safe(opts.title)}</div>
        <div class="user"></div>
      </div>`;
  }

  // ---- variant: enterprise / gov-manage（标准 topbar）----
  const navHtml = opts.navItems ? `
    <div class="screen-nav" style="margin-left:auto;margin-right:20px;">
      ${opts.navItems.map(it => {
        if (it.active) return `<span class="active">${safe(it.label)}</span>`;
        return `<a href="${safe(it.href || '#')}">${safe(it.label)}</a>`;
      }).join('')}
    </div>` : '';

  return `
    <div class="topbar">
      <div class="logo">${safe(opts.title)}</div>
      ${navHtml}
      <div class="user">
        ${opts.orgName ? `<span>${safe(opts.orgName)}</span>` : ''}
        ${opts.avatar !== false ? `<div class="avatar">${avatarChar}</div>` : ''}
        ${opts.userName ? `<span>${safe(opts.userName)}</span>` : ''}
      </div>
    </div>`;
}

/**
 * 渲染侧边栏导航（Sidebar）
 * @param {Object} options
 * @param {string} [options.activePage=''] - 当前活动页面的标识（与 items 中某项的 id 或 href 匹配）
 * @param {Array}  options.items - 导航项数组
 *        每项: { id, label, href, badge? }
 *        badge 可以是字符串或数字，会渲染在右侧
 * @param {string} [options.position='left'] - 位置，默认左侧
 * @returns {string} HTML 字符串
 *
 * 使用方式：
 *   document.body.insertAdjacentHTML('afterbegin', renderSidebar({
 *     activePage: 'dashboard',
 *     items: [
 *       { id: 'dashboard', label: '🏠 工作台', href: 'dashboard.html' },
 *       { id: 'monthly',   label: '📋 月度数据填报', href: 'monthly-report.html', badge: 2 }
 *     ]
 *   }));
 */
function renderSidebar(options) {
  const opts = Object.assign({
    activePage: '',
    items: [],
    position: 'left'
  }, options);

  const safe = escapeHtml;
  const itemsHtml = opts.items.map(it => {
    const isActive = (it.id === opts.activePage) ||
                     (it.href && it.href.includes(opts.activePage));
    const activeCls = isActive ? 'active' : '';
    const badgeHtml = it.badge ? `<span style="margin-left:auto;color:#f87171;font-size:11px">● ${safe(String(it.badge))}</span>` : '';
    return `<a href="${safe(it.href || '#')}" class="sidebar-item ${activeCls}" data-id="${safe(it.id || '')}">${safe(it.label)}${badgeHtml}</a>`;
  }).join('');

  return `<div class="sidebar"${opts.position !== 'left' ? ` style="${opts.position}:0;left:auto;"` : ''}>${itemsHtml}</div>`;
}

/**
 * 渲染页面加载动画（Page Loader）
 * @param {Object} options
 * @param {string} [options.text='INITIALIZING SYSTEM'] - 加载文字
 * @param {string} [options.id='pageLoader'] - DOM id
 * @returns {string} HTML 字符串
 */
function renderPageLoader(options) {
  const opts = Object.assign({ text: 'INITIALIZING SYSTEM', id: 'pageLoader' }, options);
  return `
    <div class="page-loader" id="${escapeHtml(opts.id)}">
      <div class="loader-ring"></div>
      <div class="loader-text">${escapeHtml(opts.text)}</div>
    </div>`;
}

/**
 * 渲染面包屑导航
 * @param {Array} items - 每项: { label, href? }，最后一项无 href 表示当前页
 * @returns {string} HTML 字符串
 */
function renderBreadcrumb(items) {
  if (!items || !items.length) return '';
  const safe = escapeHtml;
  const html = items.map((it, idx) => {
    const isLast = idx === items.length - 1;
    if (isLast || !it.href) {
      return `<span style="color:rgba(226,232,240,0.35)">${safe(it.label)}</span>`;
    }
    return `<a href="${safe(it.href)}" style="color:#22d3ee;text-decoration:none;">${safe(it.label)}</a>`;
  }).join('<span style="color:rgba(226,232,240,0.2);margin:0 8px;">/</span>');
  return `<div style="font-size:12px;margin-bottom:16px;">${html}</div>`;
}

/* ==================== 2. 公共初始化函数 ==================== */

/**
 * 统一初始化入口。
 * 每个页面在底部调用一次即可，替代以前分散在每个页面中的重复脚本。
 * @param {Object} [cfg] - 配置项
 * @param {boolean} [cfg.autoHideLoader=true] - 是否自动隐藏 pageLoader
 * @param {number}  [cfg.loaderDelay=500] - pageLoader 最小显示时长(ms)
 * @param {boolean} [cfg.checkDataStore=true] - 是否检查 DataStore
 * @param {boolean} [cfg.bindEsc=true] - 是否绑定 ESC 关闭弹窗/抽屉
 * @param {boolean} [cfg.globalErrorHandler=true] - 是否注册全局错误处理
 * @param {boolean} [cfg.injectStyles=true] - 是否注入公共 CSS 变量兜底
 */
function initCommon(cfg) {
  const config = Object.assign({
    autoHideLoader: true,
    loaderDelay: 500,
    checkDataStore: true,
    bindEsc: true,
    globalErrorHandler: true,
    injectStyles: true
  }, cfg);

  // 1. 注入公共 CSS 变量（确保颜色一致性，作为 style.css 的兜底）
  if (config.injectStyles) {
    injectCommonStyles();
  }

  // 2. 自动隐藏 pageLoader
  if (config.autoHideLoader) {
    if (document.readyState === 'complete') {
      _hideLoader(config.loaderDelay);
    } else {
      window.addEventListener('load', function () {
        _hideLoader(config.loaderDelay);
      });
    }
  }

  // 3. DataStore 可用性检查
  if (config.checkDataStore) {
    _checkDataStore();
  }

  // 4. ESC 快捷键：关闭弹窗、抽屉、模态框
  if (config.bindEsc) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        // 关闭常见弹窗/抽屉
        const selectors = [
          '.modal.show', '.modal.active', '.drawer.show', '.drawer.active',
          '.popup.show', '.popup.active', '.overlay.show'
        ];
        let closed = false;
        selectors.forEach(sel => {
          const el = document.querySelector(sel);
          if (el) {
            el.classList.remove('show', 'active');
            closed = true;
          }
        });
        if (closed) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
  }

  // 5. 全局错误处理（仅控制台提示，不阻断用户）
  if (config.globalErrorHandler) {
    window.addEventListener('error', function (e) {
      console.warn('[Common] 全局捕获错误:', e.message, '@', e.filename, e.lineno);
    });
    window.addEventListener('unhandledrejection', function (e) {
      console.warn('[Common] 未处理的 Promise 拒绝:', e.reason);
    });
  }

  // 6. 标记已初始化（供页面脚本判断）
  window.__commonJsInitialized = true;
}

/** 内部：隐藏 loader */
function _hideLoader(delay) {
  setTimeout(function () {
    const el = document.getElementById('pageLoader');
    if (el) el.classList.add('done');
  }, delay || 0);
}

/** 内部：检查 DataStore */
function _checkDataStore() {
  if (typeof DataStore === 'undefined') {
    console.warn('[Common] DataStore 未加载，请确认已引入 data.js');
    // 提供一个降级空实现，避免页面直接报错
    window.DataStore = {
      get: function (k, fallback) { return fallback; },
      set: function () { return false; },
      init: function () { }
    };
  }
}

/* ==================== 3. 公共工具函数 ==================== */

/**
 * HTML 实体编码，防止 XSS
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 格式化数字（千分位 + 固定小数位）
 * @param {number|string} num
 * @param {number} [digits=2] - 保留小数位数
 * @returns {string}
 */
function fmtNumber(num, digits) {
  if (num == null || num === '') return '-';
  const n = Number(num);
  if (isNaN(n)) return '-';
  const fixed = n.toFixed(digits === undefined ? 2 : digits);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * 根据数值和阈值返回对应的颜色对象
 * @param {number} value - 当前数值
 * @param {Array} thresholds - 阈值数组，按从优到劣排序
 *        例如：[{max:0.4, color:'#4ade80', label:'优', class:'tag-neon-green'},
 *              {max:0.6, color:'#fbbf24', label:'良', class:'tag-neon-yellow'},
 *              {max:0.8, color:'#fb923c', label:'差', class:'tag-neon-orange'},
 *              {max:Infinity,color:'#f87171',label:'极差',class:'tag-neon-red'}]
 * @returns {Object} {color, label, class}
 */
function getLevelColor(value, thresholds) {
  if (!thresholds || !thresholds.length) {
    return { color: '#94a3b8', label: '-', class: '' };
  }
  for (let i = 0; i < thresholds.length; i++) {
    if (value <= thresholds[i].max) {
      return thresholds[i];
    }
  }
  return thresholds[thresholds.length - 1];
}

/**
 * 数字滚动动画
 * @param {HTMLElement} el - 目标 DOM 元素
 * @param {number} target - 目标数值
 * @param {number} [duration=1200] - 动画时长(ms)
 * @param {string} [suffix=''] - 后缀，如 '%'、' t' 等
 */
function animateNumber(el, target, duration, suffix) {
  if (!el) return;
  const start = performance.now();
  const from = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  const to = Number(target);
  const dur = duration || 1200;
  const sfx = suffix || '';

  function frame(now) {
    const progress = Math.min((now - start) / dur, 1);
    // easeOutCubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = from + (to - from) * ease;
    // 根据目标值决定小数位
    const digits = Number.isInteger(to) ? 0 : 2;
    el.textContent = fmtNumber(current, digits) + sfx;
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay - 延迟毫秒数
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn
 * @param {number} interval - 间隔毫秒数
 * @returns {Function}
 */
function throttle(fn, interval) {
  let last = 0;
  return function () {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, arguments);
    }
  };
}

/**
 * 复制文本到剪贴板
 * @param {string} text
 * @returns {Promise<boolean>}
 */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return false; });
  }
  // fallback
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    return Promise.resolve(true);
  } catch (e) {
    return Promise.resolve(false);
  } finally {
    document.body.removeChild(ta);
  }
}

/* ==================== 4. 公共 CSS 变量注入 ==================== */

/**
 * 动态注入公共 CSS 变量与兜底样式。
 * 作用：确保即使某个页面漏引 style.css，基础颜色/字体仍然一致。
 * 注意：style.css 中的定义优先级更高（因为它是静态文件，会被后加载的覆盖）。
 */
function injectCommonStyles() {
  if (document.getElementById('common-injected-styles')) return; // 避免重复注入

  const style = document.createElement('style');
  style.id = 'common-injected-styles';
  style.textContent = `
    /* ---- common.js 注入的兜底变量 ---- */
    :root {
      --neon-cyan: #22d3ee;
      --neon-blue: #0ea5e9;
      --neon-green: #4ade80;
      --neon-red: #f87171;
      --neon-yellow: #fbbf24;
      --neon-purple: #a78bfa;
      --bg-dark: #020617;
      --text-primary: #f1f5f9;
      --text-secondary: rgba(241,245,249,0.6);
      --text-muted: rgba(241,245,249,0.35);
    }
    body {
      font-family: "PingFang SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif;
      background: var(--bg-dark);
      color: var(--text-primary);
    }
    a { text-decoration: none; color: inherit; }

    /* 脉冲点（大屏头部常用） */
    .pulse-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--neon-cyan);
      box-shadow: 0 0 8px var(--neon-cyan), 0 0 20px rgba(34,211,238,0.4);
      animation: pulseDot 2s ease-in-out infinite;
    }
    @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.4} }
  `;
  document.head.appendChild(style);
}

/* ==================== 5. 预设导航配置（供各页面快速引用） ==================== */

/**
 * 预设导航菜单配置，减少每个页面重复写导航数组。
 * 页面中可直接：renderSidebar({ activePage: 'dashboard', items: NAV_ENTERPRISE })
 */
const NAV_ENTERPRISE = [
  { id: 'dashboard', label: '🏠 工作台', href: 'dashboard.html' },
  { id: 'monthly', label: '📋 月度数据填报', href: 'monthly-report.html' },
  { id: 'realtime', label: '📊 实时双算看板', href: 'realtime-panel.html' },
  { id: 'simulator', label: '🔮 悖论模拟器', href: 'simulator.html' },
  { id: 'triple', label: '📑 三评合一报告', href: 'triple-report.html' },
  { id: 'alerts', label: '🔔 预警中心', href: 'alerts.html', badge: 0 }  // badge 由页面动态更新
];

const NAV_GOV_MANAGE = [
  { id: 'index', label: '📊 指挥大屏', href: 'index.html' },
  { id: 'llm', label: '🤖 LLM助手', href: 'llm-assistant.html' },
  { id: 'knowledge', label: '📚 案例库', href: 'knowledge-base.html' },
  { id: 'enterprise', label: '📋 企业管理', href: 'enterprise-management.html' },
  { id: 'data', label: '📊 数据管理', href: 'data-management.html' },
  { id: 'device', label: '🔧 设备管理', href: 'device-management.html' }
];

const NAV_GOV_SCREEN = [
  { label: '🏠 首页', href: '../index.html' },
  { label: '📊 指挥大屏', href: 'index.html', active: true },
  { label: '🤖 LLM助手', href: 'llm-assistant.html' },
  { label: '📚 案例库', href: 'knowledge-base.html' },
  { label: '📋 企业管理', href: 'enterprise-management.html' },
  { label: '📊 数据管理', href: 'data-management.html' },
  { label: '🔧 设备管理', href: 'device-management.html' },
  { label: '🌐 3D监测', href: '../gov-monitoring/index.html' }
];

const NAV_GOV_MONITORING = [
  { label: '🏠 首页', href: '../index.html' },
  { label: '📊 指挥大屏', href: '../gov-dashboard/index.html' },
  { label: '🤖 LLM助手', href: '../gov-dashboard/llm-assistant.html' },
  { label: '📚 案例库', href: '../gov-dashboard/knowledge-base.html' },
  { label: '🌐 3D监测', href: 'index.html', active: true }
];

/* ==================== 6. DOM Ready 快捷助手 ==================== */

/**
 * DOM 就绪后执行（类似 jQuery.ready）
 * @param {Function} callback
 */
function onReady(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
