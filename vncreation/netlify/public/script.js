// 标题生成函数
async function generateTitle() {
    const keyword = document.getElementById('keyword').value;
    const platform = document.getElementById('platform').value;
    
    // 显示加载状态
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div class="loading">Đang tạo tiêu đề... <div class="spinner"></div></div>';

    try {
        // 调用Netlify Function
        const response = await fetch('/.netlify/functions/generate-title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword, platform })
        });

        const data = await response.json();
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';  // 清空之前的结果

        data.titles.forEach(title => {
            const div = document.createElement('div');
            div.textContent = title;
            resultsContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = 'Error loading titles.';
    }
}

// 复制功能
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Đã copy vào clipboard!');
    });
}

document.getElementById('generateButton').addEventListener('click', generateTitle);
