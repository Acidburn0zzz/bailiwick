// Karma configuration
// Generated on Tue Apr 21 2015 17:57:48 GMT-0700 (PDT)

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: [
			'jspm',
			'jasmine-ajax',
			'jasmine'
		],
		jspm: {
			loadFiles: [
				'spec/**/*.spec.js'
			],
			serveFiles : [
				'src/**/*.js'
			]
		},
		exclude: [],
		preprocessors: {
			'spec/**/*.spec.js': ['babel'],
			'src/**/*.js': ['babel']
		},
		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
				modules: 'system',
				moduleIds: false,
				optional: [
					"es7.decorators"
				]
			}
		},
		reporters: ['story'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		client: {
			captureConsole: true
		},
		browsers: [
			// 'PhantomJS',
			'Chrome'
		],
		singleRun: true
	});
};
