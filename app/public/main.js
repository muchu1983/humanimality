document.addEventListener('DOMContentLoaded', function() {
    const bury_trigger = document.getElementById('bury_trigger');
    const bury_modal = document.getElementById('bury_modal');
    const bury_cancel_btn = document.getElementById('bury_cancel_btn');
    const bury_form = document.getElementById('bury_form');
    const buryInputField = document.getElementById('buryInputField');

    // 顯示輸入框
    bury_trigger.addEventListener('click', () => {
        console.log('click');
        bury_modal.classList.remove('hidden');
        buryInputField.focus();
    });

    // 隱藏輸入框
    const hideBuryModal = () => {
        bury_modal.classList.add('hidden');
        buryInputField.value = '';
    };

    // 監聽取消按鈕
    bury_cancel_btn.addEventListener('click', hideBuryModal);

    // 點擊背景關閉
    bury_modal.addEventListener('click', (e) => {
        if (e.target === bury_modal) hideBuryModal();
    });

    // 表單提交
    bury_form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const whose_tombstone = buryInputField.value.trim();
        console.log(whose_tombstone)
        if (!whose_tombstone) return;

        try {
            // 發送 POST 
            const response = await fetch('/bury', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bury_whose_tombstone: whose_tombstone
                })
            });

            // if (!response.ok) throw new Error('请求失败');

            // const data = await response.json();
            // console.log('提交成功:', data);
            // alert(`提交成功！ID: ${data.id}`);
            hideBuryModal();

        } catch (error) {
            console.error('错误:', error);
            alert('提交失败，请重试');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const worship_trigger = document.getElementById('worship_trigger');
    const worship_modal = document.getElementById('worship_modal');
    const worship_cancel_btn = document.getElementById('worship_cancel_btn');
    const worship_form = document.getElementById('worship_form');
    const worshipInputField = document.getElementById('worshipInputField');

    // 顯示輸入框
    worship_trigger.addEventListener('click', () => {
        console.log('click');
        worship_modal.classList.remove('hidden');
        worshipInputField.focus();
    });

    // 隱藏輸入框
    const hideWorshipModal = () => {
        worship_modal.classList.add('hidden');
        worshipInputField.value = '';
    };

    // 監聽取消按鈕
    worship_cancel_btn.addEventListener('click', hideWorshipModal);

    // 點擊背景關閉
    worship_modal.addEventListener('click', (e) => {
        if (e.target === worship_modal) hideWorshipModal();
    });

    // 表單提交
    worship_form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const whose_tombstone = worshipInputField.value.trim();
        console.log(whose_tombstone)
        if (!whose_tombstone) return;

        try {
            // 發送 POST 
            const response = await fetch('/worship', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    worship_whose_tombstone: whose_tombstone
                })
            });

            // if (!response.ok) throw new Error('请求失败');

            // const data = await response.json();
            // console.log('提交成功:', data);
            // alert(`提交成功！ID: ${data.id}`);
            hideWorshipModal();

        } catch (error) {
            console.error('错误:', error);
            alert('提交失败，请重试');
        }
    });
});