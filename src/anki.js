async function addToAnki(text, translateResult, audioFile) {
    $log.info(`进入 addToAnki 调用，text: ${text}, translateResult: ${translateResult}, audioFile: ${audioFile}`);
    const audioFileName = `${Date.now()}.mp3`;
    return await $http.request({
        method: 'POST',
        url: 'http://127.0.0.1:8765',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            action: 'addNote',
            version: 6,
            params: {
                note: {
                    deckName: $option.ankiDeckName,
                    modelName: 'Basic',
                    fields: {
                        Front: text,
                        Back: translateResult,
                    },
                    options: {
                        allowDuplicate: false,
                        duplicateScope: 'deck',
                        duplicateScopeOptions: {
                            deckName: $option.ankiDeckName,
                            checkChildren: false,
                            checkAllModels: false,
                        },
                    },
                    audio: [{
                        data: audioFile,
                        filename: audioFileName,
                        fields: ["Front"]
                    }],
                    tags: [
                        'bob',
                    ],
                },
            },
        },
    });
}

module.exports = {
    addToAnki: addToAnki
}