module.exports = {
    arrowParens: 'avoid', // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    jsxBracketSameLine: false,
    printWidth: 100, // 超过最大值换行
    proseWrap: 'preserve', // // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    semi: false, // 句尾省略分号
    singleQuote: true, // 使用单引号代替双引号
    tabWidth: 2, // 缩进字节数
    trailingComma: 'none',
    useTabs: false, // 缩进不使用tab，使用空格
    endOfLine: 'auto',
    htmlWhitespaceSensitivity: 'ignore',
}
