async function callAI(text) {
    if ($option.provider === '1') {
        return callOpenAI(text);
    } else if ($option.provider === '2') {
        return callDeepSeek(text);
    }
}
async function generateTTS(text) {
    if ($option.provider === '1') {
        return generateOpenAITTS(text);
    }
}

async function callOpenAI(text) {
    $log.info(`Start callOpenAI text: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl + "/chat/completions",
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

async function callDeepSeek(text) {
    $log.info(`Start callDeepSeek text: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl + "/chat/completions",
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

async function generateOpenAITTS(text) {
  
    $log.info(`Start generateOpenAITTS: ${text}`);
    return await $http.request({
        method: 'POST',
        url: $option.apiBaseUrl + "/audio/speech",
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $option.apiKey
        },
        body: {
            "model": "tts-1",
            "input": text,
            "voice": "alloy"
        },
    },
    );
}


module.exports = {
    callAI: callAI,
    generateTTS: generateTTS
}
