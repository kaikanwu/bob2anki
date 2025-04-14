// Translation
async function generateTranslation(text) {
  if ($option.translationProvider === "1") {
    return callOpenAITranslation(text);
  } else if ($option.translationProvider === "2") {
    return callOpenAITranslation(text);
  } else if ($option.translationProvider === "3") {
    return callOpenAITranslation(text);
  }
}

// TTS
async function generateTTS(text) {
  if ($option.ttsProvider === "1") {
    return generateOpenAITTS(text);
  } else if ($option.ttsProvider === "2") {
    return generateAzureTTS(text);
  }
}

// Translation: OpenAI
async function callOpenAITranslation(text) {
  $log.info(`Start callOpenAI text: ${text}`);
  return await $http.request({
    method: "POST",
    url: $option.translationApiBaseUrl + "/chat/completions",
    header: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + $option.translationApiKey,
    },
    body: {
      model: $option.translationModel,
      messages: [
        {
          role: "system",
          content: "你是一个翻译器",
        },
        {
          role: "user",
          content: text,
        },
      ],
      stream: false,
    },
  });
}

// TTS: OpenAI
async function generateOpenAITTS(text) {
  $log.info(`Start generateOpenAITTS: ${text}`);
  return await $http.request({
    method: "POST",
    url: $option.ttsApiBaseUrl + "/audio/speech",
    header: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + $option.ttsApiKey,
    },
    body: {
      model: "tts-1",
      input: text,
      voice: "alloy",
    },
  });
}

// TTS: Azure
async function generateAzureTTS(text) {
  $log.info(`Start Azure TTS: ${text}`);
  const ssml = `
       <speak version='1.0' xml:lang='en-US'>
           <voice xml:lang='en-US' xml:name='en-US-JennyNeural'>
               ${text}
           </voice>
       </speak>`;

  return await $http.request({
    method: "POST",
    url: "https://eastasia.tts.speech.microsoft.com/cognitiveservices/v1",
    header: {
      "Content-Type": "application/ssml+xml",
      "Ocp-Apim-Subscription-Key ": $option.ttsApiKey,
    },
    body: ssml,
  });
}

module.exports = {
  generateTranslation: generateTranslation,
  generateTTS: generateTTS,
};
