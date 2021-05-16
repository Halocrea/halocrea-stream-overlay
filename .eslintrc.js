module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'plugin:vue/vue3-recommended'
	],
	plugins: [
		'vue'
	],
	rules: {
		curly: [
			'error',
			'multi-or-nest'
		],
		indent: [
			'error',
			'tab',
			{
				VariableDeclarator: 1,
				ObjectExpression  : 'first',
				ArrayExpression   : 'first',
				ImportDeclaration : 'first',
				SwitchCase        : 1,
				ignoredNodes      : [
					'TemplateLiteral *'
				]
			}
		],
		'vue/html-indent': [
			'error',
			'tab'
		],
		'no-tabs': 'off',
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		],
		'key-spacing'    : 'off',
		'no-console'     : process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger'    : process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-labels'      : 'off',
		'no-multi-spaces': [
			'error',
			{
				exceptions: {
					AssignmentExpression: true,
					ImportDeclaration   : true,
					Property            : true,
					VariableDeclarator  : true
				}
			}
		],
		'no-extra-boolean-cast': 'off'
	}
}
