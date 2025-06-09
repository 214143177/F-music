export function switchMode() {
    // 播放模式相关变量
    let playMode = 'random'; // 播放模式：random（随机）、loop（单曲循环）、sequence（顺序播放）
    const modeBtn = document.getElementById('modeBtn');
    const playlist = document.getElementById('playlist');
    const playlistItems = document.querySelectorAll('.playlist-item');

    // 初始化模式图标
    updateModeIcon();

    // 点击模式按钮切换模式
    modeBtn.addEventListener('click', () => {
        switch (playMode) {
            case 'random':
                playMode = 'loop';
                modeBtn.title = '单曲循环/顺序播放';
                break;
            case 'loop':
                playMode = 'sequence';
                modeBtn.title = '顺序播放/随机播放';
                break;
            case 'sequence':
                playMode = 'random';
                modeBtn.title = '随机播放/单曲循环';
                break;
        }
        updateModeIcon();
        showNotification(`播放模式：${ playMode === 'random' ? '随机' : playMode === 'loop' ? '单曲循环' : '顺序' }`);
    });

    // 更新模式图标
    function updateModeIcon() {
        switch (playMode) {
            case 'random':
                modeBtn.innerHTML = '<i class="fas fa-random"></i>'; // 随机图标
                break;
            case 'loop':
                modeBtn.innerHTML = '<i class="fas fa-redo-alt"></i>'; // 单曲循环图标
                break;
            case 'sequence':
                modeBtn.innerHTML = '<i class="fas fa-playlist-ol"></i>'; // 顺序播放图标
                break;
        }
    }

    // 播放逻辑中结合模式（示例：切换下一曲时判断模式）
    function playNextSong() {
        const currentActive = document.querySelector('.playlist-item.active');
        if (!currentActive) return;

        switch (playMode) {
            case 'random':
                // 随机选择下一曲
                const randomIndex = Math.floor(Math.random() * playlistItems.length);
                activateSong(playlistItems[randomIndex]);
                break;
            case 'loop':
                // 重复当前曲
                activateSong(currentActive);
                break;
            case 'sequence':
                // 顺序下一曲
                const currentIndex = Array.from(playlistItems).indexOf(currentActive);
                const nextIndex = (currentIndex + 1) % playlistItems.length;
                activateSong(playlistItems[nextIndex]);
                break;
        }
    }

    // 激活歌曲的函数（示例）
    function activateSong(item) {
        // 移除当前激活状态
        playlistItems.forEach(i => i.classList.remove('active'));
        // 添加激活状态
        item.classList.add('active');
        // 播放音乐逻辑（需结合音频标签实现）
        playMusic(item.dataset.src);
    }
}