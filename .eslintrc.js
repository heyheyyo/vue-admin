module.exports = {
  root: true,
  env: {
      node: '>= 8.0.0',
      browser: true
  },
  extends: ['plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-useless-escape': 'off' // 正則需要 => 如果遵照此規則將造成正則解讀上的困難
  },
  parserOptions: {
      parser: 'babel-eslint'
  }
};
