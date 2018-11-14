var path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		index: './js/compilations/index.js',
		global: './js/compilations/global.js',
		events: './js/compilations/events.js',
		account: './js/compilations/account.js'
	},
	output: {
		filename: '[name]_bundle.js',
		path: path.resolve(__dirname, 'output')
	},
	module: {
		rules: [
			{
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env', '@babel/preset-react' ]
						}
					}
				],
				include: [ path.resolve(__dirname, 'react') ],
				test: /\.js/
			}
		]
	}
};
