module.exports = {
	floca: {
		appName: 'Trader',
		entityName: 'Trade'
	},
	server: {
		active: false,
		port: 8080
	},
	harcon: {
		bender: {
			enabled: true
		},
		FireBender: {
			defs: require('./bending')
		}
	},
	radiation: {
		rest: {
			harconrpcPath: '/Trade'
		},
		websocket: {
			socketPath: '/Trade'
		}
	}
}
