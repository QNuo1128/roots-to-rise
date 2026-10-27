"use strict";

// 手机导航：同步视觉状态与辅助技术所读取的展开状态。
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

// 三个篇章均依据策划书的阶段目标整理，不代表实际上线进度。
const stages = [
  { label: '第一篇章 · 破局与希望', title: '先让路通起来，让灯亮起来。', description: '从走访村民开始，修建通村公路、接通安全饮水与电网，改善住房条件，培育第一个稳定增收的产业。把每一项建设，落到每一户人家的日常里。' },
  { label: '第二篇章 · 扎根与生长', title: '日子稳下来，乡村长出新的可能。', description: '关注返贫风险，让种植与加工形成完整产业链。扩建学校、升级卫生室、完善污水与垃圾处理设施，为返乡青年创造创业机会，让发展的成果更加稳固。' },
  { label: '第三篇章 · 共建与共享', title: '让绿水青山，连接更广阔的未来。', description: '探索乡村旅游、智慧农业与电商助农，发展有地方特色的融合产业。通过跨村协作、区域品牌共建与数字化治理，让乡村从“自己好”走向“共同好”。' }
];
const tabs = [...document.querySelectorAll('[data-stage]')];
function selectStage(index, moveFocus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  const stage = stages[index];
  document.querySelector('#stage-label').textContent = stage.label;
  document.querySelector('#stage-title').textContent = stage.title;
  document.querySelector('#stage-description').textContent = stage.description;
  document.querySelector('#stage-panel').setAttribute('aria-labelledby', tabs[index].id);
  if (moveFocus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectStage(next, true);
    }
  });
});

