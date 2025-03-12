document.addEventListener('DOMContentLoaded', function() {
    const bury_trigger = document.getElementById('bury_trigger');
    const modal = document.getElementById('modal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('myForm');
    const inputField = document.getElementById('inputField');

    // 显示模态框
    bury_trigger.addEventListener('click', () => {
        console.log('click');
        modal.classList.remove('hidden');
        inputField.focus();
    });

    // 隐藏模态框
    const hideModal = () => {
        modal.classList.add('hidden');
        inputField.value = '';
    };

    // 取消按钮
    cancelBtn.addEventListener('click', hideModal);

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const content = inputField.value.trim();
        if (!content) return;

        try {
            // 发送 POST 请求
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: content,
                    body: '示例内容',
                    userId: 1
                })
            });

            if (!response.ok) throw new Error('请求失败');

            const data = await response.json();
            console.log('提交成功:', data);
            alert(`提交成功！ID: ${data.id}`);
            hideModal();

        } catch (error) {
            console.error('错误:', error);
            alert('提交失败，请重试');
        }
    });
});