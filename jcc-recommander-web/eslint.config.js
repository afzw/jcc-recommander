import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin' // TypeScript 插件
import tsParser from '@typescript-eslint/parser' // TypeScript 解析器
import react from 'eslint-plugin-react' // React 插件
import prettier from 'eslint-config-prettier' // Prettier 配置
import prettierPlugin from 'eslint-plugin-prettier' // Prettier 插件
import globals from 'globals'

export default [
  js.configs.recommended, // ESLint 推荐规则（包含所有 ECMA 规范）
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // 指定文件匹配规则
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 解析器
      ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
      sourceType: 'module', // 使用 ES 模块
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react, // 加载 React 插件
      '@typescript-eslint': ts, // 加载 TypeScript 插件
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // 禁用 react-in-jsx-scope 规则
    },
  },
  {
    plugins: {
      prettier: prettierPlugin, // 添加 prettier 插件
    },
    rules: {
      ...prettier.rules, // Prettier 规则
      'prettier/prettier': 'error', // 将 Prettier 规则作为 ESLint 错误
    },
  },
]
