const bodyParser = require('body-parser');
const url = require('url');
const add = require('./mock/add.json');
const basic = require('./mock/basic.json');
const components = require('./mock/components.json');
const servicenow = require('./mock/servicenow.json');

function getTriggerInfo(req) {
	return {
		...req.query,
		args: req.body,
	};
}

function basicAuth(args) {
	let comment;
	let status;
	if (!args['basicAuth.password']) {
		comment = 'no password';
		status = 'KO';
	}
	if (!args['basicAuth.username']) {
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

function urlValidation(args) {
	const parsed = url.parse(args.arg0);
	if (!parsed.protocol) {
		return { comment: `no protocol: ${args.arg0}`, status: 'KO' };
	}
	if (!parsed.hostname) {
		return { comment: `no hostname: ${args.arg0}`, status: 'KO' };
	}
	return { status: 'OK' };
}

function guessTableSchema() {
	return { status: 'OK' };
}

function reloadForm() {
	return basic;
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
};

function trigger(req) {
	const info = getTriggerInfo(req);
	return TRIGGERS[info.type][info.action](info.args);
}

module.exports = {
	mode: undefined,
	devServer: {
		before: function proxy(app) {
			app.use(bodyParser.json()); // for parsing application/json
			app.get('/api/v1/forms/add', (req, res) => {
				res.json(add);
			});
			app.get('/api/v1/application/index', (req, res) => {
				res.json(components);
			});
			app.get(
				'/api/v1/application/detail/c2VydmljZW5vdyNTZXJ2aWNlTm93I1NlcnZpY2VOb3dPdXRwdXQ',
				(req, res) => {
					res.json(servicenow);
				},
			);
			app.post('/api/v1/application/action', (req, res) => {
				res.json(trigger(req));
			});
		},
	},
};
