// Translation
async function generateTranslation(text) {
    if ($option.provider === '1') {
        return callOpenAITranslation(text);
    } else if ($option.provider === '2') {
        return callDeepSeekTranslation(text);
    }
}

// TTS
async function generateTTS(text) {
    if ($option.provider === '1') {
        return generateOpenAITTS(text);
    }
}

// Translation: OpenAI
async function callOpenAITranslation(text) {
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

// Translation: DeepSeek
async function callDeepSeekTranslation(text) {
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

// TTS: OpenAI
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
    generateTranslation: generateTranslation,
    generateTTS: generateTTS
}
