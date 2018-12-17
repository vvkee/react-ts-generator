module.exports = {
  presets: [['@babel/env', { 'modules': false }], '@babel/react', '@babel/typescript'],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-transform-typescript',
    ['module-resolver', {
      'root': ['./src'],
      'alias': {
        '<%=project_name%>': '../src'
      }
    }]
  ]
}
