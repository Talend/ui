const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const shell = require('shelljs');

const error = require('./error');

function throwError(missingVar) {
	error(`
		In order to connect to XTM, you need to pass the ${missingVar} env variable.
		> API_URL=http://XXX CLIENT=YYY USER_ID=ZZZ PASSWORD=AAA talend-scripts i18n-upload
	`);
}

function getXTMVariables() {
	const { API_URL, CLIENT, CUSTOMER_ID, USER_ID, PASSWORD } = process.env;
	if (!API_URL) {
		throwError('API_URL');
	}
	if (!CLIENT) {
		throwError('CLIENT');
	}
	if (!CUSTOMER_ID) {
		throwError('CUSTOMER_ID');
	}
	if (!USER_ID) {
		throwError('API_URL');
	}
	if (!PASSWORD) {
		throwError('PASSWORD');
	}

	return {
		apiUrl: API_URL,
		client: CLIENT,
		customerId: CUSTOMER_ID,
		userId: USER_ID,
		password: PASSWORD,
	};
}

function handleError(res) {
	if (res.status < 200 || res.status >= 300) {
		return res.json().then(payload => {
			error(payload.reason);
		});
	}
	return res;
}

function login(data) {
	const { xtm } = data;

	console.log(`\nLogin with user ${xtm.userId}...`);

	const body = { client: xtm.client, userId: xtm.userId, password: xtm.password };
	return fetch(`${xtm.apiUrl}/auth/token`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
	})
		.then(handleError)
		.then(res => res.json())
		.then(res => (xtm.token = res.token))
		.then(() => console.log('Logged in successfully.'))
		.then(() => data);
}

function getProject(data) {
	const { projectName, xtm } = data;

	console.log(`\nFetch project ${projectName}...`);

	function filterProjectList(projects) {
		const uiProject = projects.find(({ name }) => name === projectName);
		if (!uiProject) {
			error(`${projectName} project not found`);
		}
		return uiProject;
	}

	return fetch(`${xtm.apiUrl}/projects?customerIds=${xtm.customerId}`, {
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
	})
		.then(handleError)
		.then(res => res.json())
		.then(filterProjectList)
		.then(project => (data.project = project))
		.then(() => {
			console.log('Project found');
			console.table(data.project);
		})
		.then(() => data);
}

function uploadFile(data) {
	const { filePath, project, xtm } = data;

	console.log(`\nUpload file ${filePath} to XTM project...`);

	const form = new FormData();
	form.append('matchType', 'MATCH_NAMES');
	form.append('files[0].file', fs.createReadStream(filePath));

	return fetch(`${xtm.apiUrl}/projects/${project.id}/files/upload`, {
		method: 'POST',
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
		body: form,
	})
		.then(handleError)
		.then(res => res.json())
		.then(res => console.table(res.jobs))
		.then(() => console.log(`Project has been updated with ${filePath}`))
		.then(() => data);
}

function downloadFile(data) {
	const { targetPath, project, xtm } = data;

	console.log(`\nDownload file from XTM project...`);

	return fetch(`${xtm.apiUrl}/projects/${project.id}/files/download?fileType=TARGET`, {
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
	})
		.then(handleError)
		.then(res => {
			shell.mkdir('-p', targetPath);
			const fileStream = fs.createWriteStream(`${targetPath}/i18n.zip`);
			return new Promise((resolve, reject) => {
				res.body.pipe(fileStream);
				res.body.on('error', err => {
					reject(err);
				});
				fileStream.on('finish', function() {
					resolve();
				});
			});
		})
		.then(() => console.log(`Translations downloaded to ${targetPath}/i18n.zip`))
		.then(() => data);
}

module.exports = {
	getXTMVariables,
	login,
	getProject,
	uploadFile,
	downloadFile,
};
