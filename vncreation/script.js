// 标题生成函数
async function generateTitle() {
    const keyword = document.getElementById('keyword').value;
    const platform = document.getElementById('platform').value;
    
    // 显示加载状态
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading">Đang tạo tiêu đề... <div class="spinner"></div></div>';

    try {
        // 调用Netlify Function
        const response = await fetch('/.netlify/functions/generate-title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keyword: keyword,
                platform: platform
            })
        });

        const data = await response.json();
        
        // 显示结果
        resultDiv.innerHTML = data.titles.map(title => `
            <div class="title-card">
                <div class="title-text">${title}</div>
                <button class="copy-btn" onclick="copyText('${title}')">
                    <img src="https://i.ibb.co/0jZY7q3/viet-logo.png" width="15">
                    Copy
                </button>
            </div>
        `).join('');

    } catch (error) {
        resultDiv.innerHTML = `<div class="error">Lỗi kết nối, vui lòng thử lại sau!</div>`;
    }
}

// 复制功能
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Đã copy vào clipboard!');
    });
}

document.getElementById('generateButton').addEventListener('click', function() {
    const keyword = document.getElementById('keyword').value;  // 确保页面有对应的输入框
    const platform = document.getElementById('platform').value;  // 确保页面有对应的选择框

    fetch('/.netlify/functions/generate-title', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword, platform })
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';  // 清空之前的结果
        data.forEach(title => {
            const div = document.createElement('div');
            div.textContent = title;
            resultsContainer.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
});
