export function switchTab(targetTabId) {
    // 获取所有Tab标签和对应的内容区域
    const tabItems = document.querySelectorAll('.tab-item');
    const playerTab = document.getElementById('player-tab');
    const playlistTab = document.getElementById('playlist-tab');
    const sourceTab = document.getElementById('source-tab');

    // 定义切换Tab的函数
    function switchTab(targetTabId) {
        // 隐藏所有内容区域
        playerTab.style.display = 'none';
        playlistTab.style.display = 'none';
        sourceTab.style.display = 'none';

        // 移除所有Tab的激活状态
        tabItems.forEach(item => {
            item.classList.remove('active');
        });

        // 显示目标内容区域，并激活对应的Tab标签
        switch (targetTabId) {
            case 'player-tab':
                playerTab.style.display = 'grid'; // 根据HTML结构使用grid布局
                break;
            case 'playlist-tab':
                playlistTab.style.display = 'grid';
                break;
            case 'source-tab':
                sourceTab.style.display = 'grid';
                break;
            default:
                playerTab.style.display = 'grid'; // 默认显示播放器标签页
        }

        // 找到对应的Tab标签并添加激活类
        const activeTab = document.querySelector(`[data-tab="${ targetTabId }"]`);
        activeTab.classList.add('active');
    }

    // 初始化：默认显示播放器标签页
    switchTab('player-tab');

    // 为所有Tab标签添加点击事件监听器
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTabId = item.dataset.tab; // 从data属性获取目标Tab的ID
            switchTab(targetTabId); // 调用切换函数
        });
    });
}