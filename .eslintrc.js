module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    extends: [
        // 'plugin:vue/base',
        'plugin:vue/recommended'
    ],
    rules: {
        'quotes': ['error', 'single'],
        'vue/max-attributes-per-line': ['error', {
            'singleline': 5,
            'multiline': {
                'max': 5,
                'allowFirstLine': true
            }
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'multiline': 'never'
        }],
        'vue/no-use-v-if-with-v-for': ['error', {
            'allowUsingIterationVar': true
        }],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'always',
                'normal': 'never',
                'component': 'never'
            },
            'svg': 'any',
            'math': 'any'
        }],
        'vue/no-v-html': 0,
        // 'semi': ['error', 'always'],
        // 'no-console': 'error',
        // 'arrow-parens': 0,
    },
    overrides: [{
        'files': ['*.vue'],
        'rules': {
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, {
                'baseIndent': 1,
                'switchCase': 1
            }]
        }
    }, {
        'files': ['*.js'],
        'rules': {
            'indent': ['error', 4, {
                'SwitchCase': 1
            }],
        }
    }]
};