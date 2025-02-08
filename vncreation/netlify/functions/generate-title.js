const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { keyword, platform } = JSON.parse(event.body);
        console.log('Request Event:', JSON.stringify({ keyword, platform }, null, 2));

        const response = await axios.post('https://api.example.com/endpoint', {
            keyword,
            platform
        });

        console.log('API Response:', JSON.stringify(response.data, null, 2));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ error: error.message || 'Internal Server Error' })
        };
    }
};

// 越南特色提示词生成器
function buildVietPrompt(keyword, platform) {
    const platformRules = {
        'tiktok': 'Sử dụng các hashtag trending như #tiktokvietnam #viral',
        'facebook': 'Thêm cảm xúc mạnh như 😱❤️🔥',
        'zalo': 'Dùng ngôn ngữ thân mật kiểu "Bạn ơi..."'
    };
    
    return `Tạo 5 tiêu đề ${platform} về "${keyword}" với:
    - Độ dài dưới 50 ký tự
    - Có con số cụ thể (ví dụ: 3 cách, 5 phút)
    - ${platformRules[platform]}
    - Thêm ít nhất 2 emoji phù hợp
    - Hashtag: #${keyword.replace(/ /g, '')}`;
}

// 结果清洗
function processTitles(text) {
    return text.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+\.\s*/, ''));
}
