/* eslint-disable no-param-reassign */
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const error = require('./error');
const { printRunning, printSuccess } = require('./log');

function throwError(missingVar) {
	error(`
		In order to connect to XTM, you need to pass the ${missingVar} env variable.
		> XTM_API_URL=http://XXX XTM_CUSTOMER_ID=YYY XTM_TOKEN=ZZZ talend-scripts i18n-upload
	`);
}

function getXTMVariables() {
	const { XTM_API_URL, XTM_CUSTOMER_ID, XTM_TOKEN } = process.env;
	if (!XTM_API_URL) {
		throwError('XTM_API_URL');
	}
	if (!XTM_CUSTOMER_ID) {
		throwError('XTM_CUSTOMER_ID');
	}
	if (!XTM_TOKEN) {
		throwError('XTM_TOKEN');
	}

	return {
		apiUrl: XTM_API_URL,
		customerId: XTM_CUSTOMER_ID,
		token: XTM_TOKEN,
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

function getProject(data) {
	const { projectName } = data;
	const xtm = getXTMVariables();

	printRunning(`Fetch project ${projectName}...`);

	function filterProjectList(projects) {
		const uiProject = projects.find(({ name }) => name === projectName);
		if (!uiProject) {
			error(`${projectName} project not found`);
		}
		return uiProject;
	}
	return fetch(`${xtm.apiUrl}/projects?customerIds=${xtm.customerId}&status=STARTED`, {
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
	})
		.then(handleError)
		.then(res => res.json())
		.then(filterProjectList)
		.then(project => (data.project = project))
		.then(() => {
			printSuccess('Project found');
			console.table(data.project);
		})
		.then(() => data);
}

function uploadFile(data) {
	const { filePath, project } = data;
	const xtm = getXTMVariables();

	printRunning(`Upload file ${filePath} to XTM project...`);

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
		.then(() => printSuccess(`Project has been updated with ${filePath}`))
		.then(() => data);
}

function getFilesToDownload(data) {
	const { project, version } = data;

	if (!version) {
		return data;
	}

	printRunning(`Get files to download, matching version ${version}...`);
	const xtm = getXTMVariables();
	return fetch(`${xtm.apiUrl}/projects/${project.id}/status?fetchLevel=JOBS`, {
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
	})
		.then(handleError)
		.then(res => res.json())
		.then(({ jobs }) => {
			const filteredJobs = jobs.filter(({ fileName }) => fileName.startsWith(`${version}/`));
			printSuccess('Files to download');
			console.table(filteredJobs);

			const jobsChunks = [];
			while (filteredJobs.length) {
				jobsChunks.push(filteredJobs.splice(0, 100));
			}
			data.project.jobs = jobsChunks;
		})
		.then(() => data);
}

function downloadChunk(project, jobs, index, targetPath) {
	const xtm = getXTMVariables();
	let jobIds;
	if (jobs) {
		jobIds = jobs.map(({ jobId }) => `jobIds=${jobId}`).join('&');
	}

	const filePath = `${targetPath}/i18n_${index}.zip`;
	return fetch(`${xtm.apiUrl}/projects/${project.id}/files/download?fileType=TARGET&${jobIds}`, {
		headers: { Authorization: `XTM-Basic ${xtm.token}` },
	})
		.then(handleError)
		.then(res => {
			const fileStream = fs.createWriteStream(filePath);
			return new Promise((resolve, reject) => {
				res.body.pipe(fileStream);
				res.body.on('error', err => {
					reject(err);
				});
				fileStream.on('finish', () => {
					resolve();
				});
			});
		})
		.then(() => printSuccess(`Translations downloaded to ${filePath}`));
}

function downloadFiles(data) {
	const { targetPath, project } = data;

	printRunning('Download files from XTM project...');
	rimraf.sync(data.targetPath);
	mkdirp.sync(targetPath);

	let promise;
	if (project.jobs) {
		const fetchPromises = project.jobs.map((jobsChunk, index) =>
			downloadChunk(project, jobsChunk, index, targetPath),
		);
		promise = Promise.all(fetchPromises);
	} else {
		promise = downloadChunk(project);
	}

	return promise.then(() => printSuccess('All files downloaded with success')).then(() => data);
}

module.exports = {
	getFilesToDownload,
	getProject,
	uploadFile,
	downloadFiles,
};
