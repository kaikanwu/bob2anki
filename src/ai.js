async function callAI(text) {
    if ($option.provider === '1') {
        $log.info(`Start callDeepSeek`);
        return callDeepSeek(text);
    }
}
async function callDeepSeek(text) {
    $log.info(`Start callAI text: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl,
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $option.apiKey
        },
        body: {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system",
                    "content": "你是一个翻译器"
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            "stream": false
        },
    },
    );
}
module.exports = {
    callAI: callAI
}