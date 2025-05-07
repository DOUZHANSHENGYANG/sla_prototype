// 主要JS文件 - 智能学习助手原型

// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 动态更新状态栏时间
  updateStatusBarTime();
  setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
  
  // 处理表单提交
  setupFormSubmitHandlers();
  
  // 处理切换密码可见性
  setupPasswordToggle();
});

// 更新状态栏时间
function updateStatusBarTime() {
  const timeElements = document.querySelectorAll('.status-bar-time');
  if (timeElements.length > 0) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    timeElements.forEach(element => {
      element.textContent = timeString;
    });
  }
}

// 处理表单提交
function setupFormSubmitHandlers() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // 获取表单目标页面（如果有）
      const targetPage = form.dataset.targetPage;
      
      // 模拟表单提交和加载
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        // 禁用按钮并显示加载状态
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> 处理中...';
        
        // 模拟网络请求延迟
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // 如果有目标页面，则跳转
          if (targetPage) {
            window.location.href = targetPage;
          }
        }, 1000);
      }
    });
  });
}

// 处理密码可见性切换
function setupPasswordToggle() {
  const toggleBtns = document.querySelectorAll('.password-toggle');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = document.getElementById(this.dataset.target);
      
      if (input) {
        // 切换密码可见性
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        
        // 更新图标
        if (type === 'password') {
          this.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
          this.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
      }
    });
  });
}

// 模拟后退按钮功能
function goBack() {
  window.history.back();
}

// 模拟发送验证码
function sendVerificationCode(btnElement, phoneInputId) {
  const phoneInput = document.getElementById(phoneInputId);
  if (!phoneInput || !phoneInput.value.trim()) {
    alert('请输入手机号码');
    return;
  }
  
  // 禁用按钮并开始倒计时
  if (btnElement) {
    btnElement.disabled = true;
    let seconds = 60;
    btnElement.textContent = `${seconds}秒后重新发送`;
    
    const timer = setInterval(() => {
      seconds--;
      btnElement.textContent = `${seconds}秒后重新发送`;
      
      if (seconds <= 0) {
        clearInterval(timer);
        btnElement.disabled = false;
        btnElement.textContent = '获取验证码';
      }
    }, 1000);
  }
} 