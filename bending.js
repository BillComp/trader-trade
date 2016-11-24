module.exports = {
	'Client.watch': {
		type: 'series',
		primers: ['Assistant.registerWatcher', 'Storage.book'],
		validation: {},
		timeout: undefined
	},
	'Assistant.notify': {
		type: 'series',
		primers: ['Client.matchingTrades'],
		validation: {},
		timeout: undefined
	},
	'Client.trade': {
		type: 'series',
		primers: ['Assistant.secureGoods', 'Assistant.makeOffer'],
		validation: {},
		timeout: undefined
	},
	'Assistant.secureGoods': {
		type: 'series',
		primers: ['Finster.letterLading', 'Storage.book'],
		validation: {},
		timeout: undefined
	},
	'Client.offerAccepted': {
		type: 'series',
		primers: ['Finster.letterCredit',
			'Assistant.transact',
			'Client.gratulate'],
		validation: {},
		timeout: undefined
	},
	'Assistant.makeOffer': {
		type: 'series',
		primers: ['Trade.offer', 'Client.offerReceived'],
		validation: {},
		timeout: undefined
	}
}
