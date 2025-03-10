import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  typescript: true,
  vue: true,
  ignores: [
  ],
  formatters: {
    css: true,
    html: true,
  },
})
