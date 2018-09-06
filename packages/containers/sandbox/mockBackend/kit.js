const url = require('url');
const forms = require('./mock/kit');

function getTriggerInfo(req) {
	return {
		...req.query,
		args: req.body,
	};
}

function basicAuth(args) {
	let comment;
	let status;
	if (!args['basicAuth.url']) {
		comment = 'no url';
		status = 'KO';
	} else if (!args['basicAuth.password']) {
		comment = 'no password';
		status = 'KO';
	} else if (!args['basicAuth.username']) {
		comment = 'no username';
		status = 'KO';
	}

	if (!status) {
		if (args['basicAuth.username'] === args['basicAuth.password']) {
			comment = 'Yes username === password';
			status = 'OK';
		} else {
			status = 'KO';
			comment = 'invalid credentials';
		}
	}
	return { comment, status };
}

function urlValidation({ arg0 }) {
	if (arg0) {
		const parsed = url.parse(arg0);
		if (!parsed.protocol) {
			return { comment: `no protocol: ${arg0}`, status: 'KO' };
		}
		if (!parsed.hostname) {
			return { comment: `no hostname: ${arg0}`, status: 'KO' };
		}
	}
	return { status: 'OK' };
}

function guessTableSchema() {
	return { status: 'OK' };
}

function reloadForm({ id }) {
	if (!id) {
		return add.ui;
	}
	return basic;
}

function suggestionForDemo() {
	return {
		items: [
			{ id: 'clafoutis', label: 'Clafoutis aux poires et aux fruits' },
			{ id: 'conchiglioni-au-thon', label: 'Conchiglioni au thon' },
			{ id: 'coquillettes-crevettes', label: 'coquillettes aux crevettes' },
			{ id: 'crumble', label: 'Crumble a la danette' },
			{ id: 'pomme-savane', label: 'Pomme savane' },
			{ id: 'tarte-au-citron', label: 'Tarte  au citron' },
		],
	};
}

function updateProperties({ type }) {
	switch (type) {
		case 'clafoutis':
		case 'pomme-savane':
		case 'crumble':
		case 'tarte-au-citron':
			return { data: 'yes !' };
		case 'coquillettes-crevettes':
			return { data: 'this is not a dessert !' };
		default:
			return { data: 'don t know that' };
	}
}

const TRIGGERS = {
	validation: {
		urlValidation,
	},
	healthcheck: {
		basicAuth,
	},
	schema: {
		guessTableSchema,
	},
	reloadForm: {
		'builtin::root::reloadFromId': reloadForm,
	},
	suggestions: {
		suggestionForDemo,
	},
	update: {
		updateProperties,
	},
};

function trigger(req) {
	const info = getTriggerInfo(req);
	return TRIGGERS[info.type][info.action](info.args);
}

module.exports = function addRoutes(app) {
	app.get('/api/v1/forms/:formId', (req, res) => {
		// eslint-disable-next-line global-require
		res.json(forms[req.params.formId]);
	});
	app.post('/api/v1/application/action', (req, res) => {
		res.json(trigger(req));
	});
};
