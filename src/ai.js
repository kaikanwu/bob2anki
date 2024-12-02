async function callAI(text) {
    if ($option.provider === '1') {
        return callOpenAI(text);
    } else if ($option.provider === '2') {
        return callDeepSeek(text);
    }
}

async function callDeepSeek(text) {
    $log.info(`Start callDeepSeek text: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl,
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $option.apiKey
        },
        body: {
            "model": $option.model,
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

async function callOpenAI(text) {
    $log.info(`Start callOpenAI text: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl,
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $option.apiKey
        },
        body: {
            "model": $option.model,
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