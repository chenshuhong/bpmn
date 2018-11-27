const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/umd/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'custom-modeler.js',
		libraryTarget: 'umd',
		globalObject: 'this',
		// libraryExport: 'default',
		library: 'CustomBpmnJS'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.(less|css)$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}
		]
	},
}
