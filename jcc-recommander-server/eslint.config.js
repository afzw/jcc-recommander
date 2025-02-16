const js = require('@eslint/js')
const ts = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const prettier = require('eslint-config-prettier') // Prettier 配置
const prettierPlugin = require('eslint-plugin-prettier') // Prettier 插件
const globals = require('globals')

module.exports = [
  js.configs.recommended, // ESLint 推荐规则（包含所有 ECMA 规范）
  {
    files: ['**/*.{js,,ts}'], // 指定文件匹配规则
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 解析器
      ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
      sourceType: 'commonjs', // 使用 ES 模块
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': ts, // 加载 TypeScript 插件
    },
  },
  {
    plugins: {
      prettier: prettierPlugin, // 添加 prettier 插件
    },
    rules: {
      'no-redeclare': 'off',
      ...prettier.rules, // Prettier 规则
      'prettier/prettier': 'error', // 将 Prettier 规则作为 ESLint 错误
    },
  },
]
