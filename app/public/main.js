document.addEventListener('DOMContentLoaded', function() {
    const bury_trigger = document.getElementById('bury_trigger');
    const modal = document.getElementById('modal');
    const cancelBtn = document.getElementById('cancel_btn');
    const form = document.getElementById('myForm');
    const inputField = document.getElementById('inputField');

    // 顯示輸入框
    bury_trigger.addEventListener('click', () => {
        console.log('click');
        modal.classList.remove('hidden');
        inputField.focus();
    });

    // 隱藏輸入框
    const hideModal = () => {
        modal.classList.add('hidden');
        inputField.value = '';
    };

    // 監聽取消按鈕
    cancelBtn.addEventListener('click', hideModal);

    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    // 表單提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const whose_tombstone = inputField.value.trim();
        if (!whose_tombstone) return;

        try {
            // 發送 POST 
            const response = await fetch('/bury', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'bury_whose_tombstone',
                    body: whose_tombstone
                })
            });

            // if (!response.ok) throw new Error('请求失败');

            // const data = await response.json();
            // console.log('提交成功:', data);
            // alert(`提交成功！ID: ${data.id}`);
            hideModal();

        } catch (error) {
            console.error('错误:', error);
            alert('提交失败，请重试');
        }
    });
});