// timerModule.js
export class TimerModule {
    constructor({
        timerBtnId = 'timerBtn',
        timerModalId = 'timerModal',
        timerOptionsClass = 'timer-option',
        customTimeId = 'customTime',
        confirmCustomTimeId = 'confirmCustomTime',
        cancelTimerModalId = 'cancelTimerModal',
        notificationId = 'notification',
        onTimerEnd = () => { }
    } = {}) {
        // DOM 元素引用
        this.timerBtn = document.getElementById(timerBtnId);
        this.timerModal = document.getElementById(timerModalId);
        this.timerOptions = document.querySelectorAll(`.${ timerOptionsClass }`);
        this.customTimeInput = document.getElementById(customTimeId);
        this.confirmCustomTimeBtn = document.getElementById(confirmCustomTimeId);
        this.cancelTimerModalBtn = document.getElementById(cancelTimerModalId);
        this.notification = document.getElementById(notificationId);

        // 状态变量
        this.timerActive = false;
        this.timerDuration = 0;
        this.timerInterval = null;

        // 回调函数
        this.onTimerEnd = onTimerEnd;

        // 初始化事件监听
        this.initEventListeners();
    }

    // 初始化事件监听
    initEventListeners() {
        // 打开定时弹窗
        this.timerBtn.addEventListener('click', () => {
            if (!this.timerActive) {
                this.openTimerModal();
            } else {
                this.cancelTimer();
            }
        });

        // 预设时间选项
        this.timerOptions.forEach(option => {
            option.addEventListener('click', () => {
                const time = option.dataset.time;
                if (time === 'custom') {
                    this.showCustomTimeInput();
                } else {
                    this.startTimer(parseInt(time));
                    this.closeTimerModal();
                }
            });
        });

        // 确认自定义时间
        this.confirmCustomTimeBtn.addEventListener('click', () => {
            const minutes = parseInt(this.customTimeInput.value);
            if (!isNaN(minutes) && minutes > 0) {
                this.startTimer(minutes);
                this.closeTimerModal();
            } else {
                this.showNotification('请输入有效的分钟数');
            }
        });

        // 取消定时设置
        this.cancelTimerModalBtn.addEventListener('click', () => {
            this.closeTimerModal();
        });
    }

    // 打开定时弹窗
    openTimerModal() {
        this.timerModal.classList.add('active');
    }

    // 关闭定时弹窗
    closeTimerModal() {
        this.timerModal.classList.remove('active');
        this.hideCustomTimeInput();
        this.customTimeInput.value = '';
    }

    // 显示自定义时间输入
    showCustomTimeInput() {
        const customTimeContainer = this.customTimeInput.parentElement;
        customTimeContainer.style.display = 'block';
        this.customTimeInput.focus();
    }

    // 隐藏自定义时间输入
    hideCustomTimeInput() {
        const customTimeContainer = this.customTimeInput.parentElement;
        customTimeContainer.style.display = 'none';
    }

    // 启动定时器
    startTimer(minutes) {
        this.timerActive = true;
        this.timerDuration = minutes * 60; // 转换为秒
        this.timerBtn.classList.add('active');
        this.updateTimerDisplay();

        // 清除之前的定时器
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // 设置新的定时器
        this.timerInterval = setInterval(() => {
            this.timerDuration--;
            if (this.timerDuration <= 0) {
                this.cancelTimer();
                this.onTimerEnd(); // 触发回调
                this.showNotification('定时关闭已触发');
            }
            this.updateTimerDisplay();
        }, 1000);
    }

    // 取消定时器
    cancelTimer() {
        this.timerActive = false;
        this.timerBtn.classList.remove('active');
        clearInterval(this.timerInterval);
        this.timerDuration = 0;
        this.timerBtn.title = '定时';
        this.timerBtn.innerHTML = '<i class="fas fa-clock"></i>';
    }

    // 更新定时按钮显示
    updateTimerDisplay() {
        if (this.timerActive) {
            const minutes = Math.floor(this.timerDuration / 60);
            const seconds = this.timerDuration % 60;
            this.timerBtn.title = `剩余时间：${ minutes }:${ seconds.toString().padStart(2, '0') }`;
            this.timerBtn.innerHTML = `
          <i class="fas fa-clock"></i>
          <span style="font-size: 0.7rem; margin-left: 2px;">${ minutes }:${ seconds.toString().padStart(2, '0') }</span>
        `;
        }
    }

    // 显示通知
    showNotification(text) {
        if (this.notification) {
            this.notification.textContent = text;
            this.notification.classList.add('show');
            setTimeout(() => {
                this.notification.classList.remove('show');
            }, 3000);
        }
    }

    // 获取当前定时状态
    getStatus() {
        return {
            active: this.timerActive,
            remainingSeconds: this.timerDuration
        };
    }
  }