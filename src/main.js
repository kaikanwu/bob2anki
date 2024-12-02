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
var ai = require('./ai');
var anki = require('./anki');

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

function translate(query) {
    if (!query) {
        $log.error('query is empty');
        return;
    }
    // validate necessary config
    validateConfig(query);
    // 1. call AI's API
    ai.callAI(query.text)
        .then(response => {
            if (!response) {
                $log.error('API response is empty');
                throw new Error('API response is empty');
            }
            $log.info(`Full API response: ${JSON.stringify(response)}`);
            const result = response.data.choices[0].message.content;
            // 2. add to Anki
            anki.addToAnki(query.text, result);

            return result;
        })
        .then(result => {
            query.onCompletion({
                'result': {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: [result]
                }
            });
        })
        .catch(error => {
            $log.error(`API call failed: ${error}`);
            query.onCompletion({
                'result': {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: [`Error: ${error.message || error}`]
                }
            });
        });
}

function validateConfig(query) {
    if (!$option.apiBaseUrl || !$option.apiKey || !$option.ankiDeckName) {
        query.onCompletion({
            'result': {
                from: query.detectFrom,
                to: query.detectTo,
                toParagraphs: [`Error: Please check your config!`]
            }
        });
        return;
    }
}