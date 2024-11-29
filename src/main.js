/**
 * 由于各大服务商的语言代码都不大一样，
 * 所以我定义了一份 Bob 专用的语言代码，以便 Bob 主程序和插件之间互传语种。
 * Bob 语言代码列表 https://ripperhe.gitee.io/bob/#/plugin/addtion/language
 * 
 * 转换的代码建议以下面的方式实现，
 * `xxx` 代表服务商特有的语言代码，请替换为真实的，
 * 具体支持的语种数量请根据实际情况而定。
 * 
 * Bob 语言代码转服务商语言代码(以为 'zh-Hans' 为例): var lang = langMap.get('zh-Hans');
 * 服务商语言代码转 Bob 语言代码: var standardLang = langMapReverse.get('xxx');
 */

var items = [
    ['auto', 'auto'],
    ['auto', 'zh-Hans'],
    ['en', 'zh-Hans'],
    ['zh-Hans', 'en'],
    ['zh-Hant', 'en'],
    ['en', 'zh-Hans'],
];

var langMap = new Map(items);
var langMapReverse = new Map(items.map(([standardLang, lang]) => [lang, standardLang]));

function supportLanguages() {
    return items.map(([standardLang, lang]) => standardLang);
}

function translate(query, completion) {
    $log.info('translate 调用：', query.text);
    addToAnki('test-1', 'test-2')
        .then(ankiResult => {
            query.onCompletion({
                'result': {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: [`Success: ${ankiResult}`]
                }
            });
        })
        .catch(error => {
            $log.error('addToAnki 调用失败：', error);
            query.onCompletion({
                'result': {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: [`Error: ${error.message || error}`]
                }
            });
        });
}

// 添加笔记到 Anki
async function addToAnki(text, translateResult) {
    $log.info('addToAnki 调用：', text, translateResult);
   return await $http.request({
                method: 'POST',
                url: 'http://127.0.0.1:8765',
                header: {
                    'Content-Type': 'application/json'
                },
                body:{
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