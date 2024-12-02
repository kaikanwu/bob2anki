// 添加笔记到 Anki
async function addToAnki(text, translateResult) {
    $log.info(`addToAnki 调用：${text} ${translateResult}`);
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
                    deckName: 'Default',
                    modelName: 'Basic',
                    fields: {
                        Front: text,
                        Back: translateResult,
                    },
                    options: {
                        allowDuplicate: false,
                        duplicateScope: 'deck',
                        duplicateScopeOptions: {
                            deckName: 'Default',
                            checkChildren: false,
                            checkAllModels: false,
                        },
                    },
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