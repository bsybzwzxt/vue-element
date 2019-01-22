module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        'browser': true,
        'node': true
    },
    extends: [
        // 'plugin:vue/base',
        'eslint:recommended',
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
        'vue/this-in-template': 'error',
        'vue/html-quotes': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',
        'vue/no-multi-spaces': 'error',
        'vue/mustache-interpolation-spacing': 'error',
        'vue/require-default-prop': 'error',
        'vue/singleline-html-element-content-newline': 'error',
        'vue/multiline-html-element-content-newline': 'error',
        'vue/attributes-order': 'error',
        'vue/order-in-components': 'error',
        'vue/attribute-hyphenation': 'error',
        'vue/no-template-shadow': 'error',
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