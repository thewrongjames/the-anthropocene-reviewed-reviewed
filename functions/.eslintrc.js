module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  overrides: [
    {
      files: [
        '**/*.ts',
        '**/*.js'
      ],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error'
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error'
        ]
      }
    }
  ]
}
