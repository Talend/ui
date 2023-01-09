/* eslint-disable no-console */
/* eslint-disable import/extensions */
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import _ from 'lodash';
import { createRequire } from 'module';
import { getPkgRootPath, fixWindowsPath } from '../utils/path-resolver.js';

const require = createRequire(import.meta.url);
const { template } = _;

const configSBPath = getPkgRootPath('@talend/scripts-config-storybook-lib');
const CWD = process.cwd();
const TMP_PATH = path.join(CWD, 'node_modules', '.cache', '.talend-storybook');
const TEMPLATE_SB_PATH = path.join(configSBPath, '.storybook-templates');
const USER_SB_PATH = path.join(CWD, '.storybook');

function copyFile(fileName) {
	const targetPath = path.join(TMP_PATH, fileName);

	const defaultFilePath = path.join(TEMPLATE_SB_PATH, fileName);
	const defaultFileExists = fs.existsSync(defaultFilePath);

	const userFilePath = path.join(USER_SB_PATH, fileName);
	const userFileExists = fs.existsSync(userFilePath);
	if (!defaultFileExists && userFileExists) {
		console.log(`Copy ${fileName} from user sb config`);
		fs.copyFileSync(userFilePath, targetPath);
	} else if (defaultFileExists) {
		if (fs.lstatSync(defaultFilePath).isDirectory()) {
			console.log(`Copy ${fileName} from default sb config`);
			fs.copyFileSync(defaultFilePath, targetPath);
		} else {
			console.log(`Merge ${fileName} user and default config`);
			const fileAsString = fs.readFileSync(defaultFilePath).toString();
			const compiledTemplate = template(fileAsString);
			const content = compiledTemplate({
				userFilePath: userFileExists ? fixWindowsPath(userFilePath) : undefined,
				userFileContent: userFileExists ? fs.readFileSync(userFilePath) : '',
			});
			fs.writeFileSync(targetPath, content);
		}
	}
}

export function getStorybookConfiguration() {
	// get default files and directories
	const defaultFilesAndFolders = fs.readdirSync(TEMPLATE_SB_PATH, { withFileTypes: true });
	const defaultFiles = defaultFilesAndFolders.filter(next => next.isFile()).map(({ name }) => name);
	const defaultDirectories = defaultFilesAndFolders
		.filter(next => next.isDirectory())
		.map(({ name }) => name);

	// get user files and directories
	const userFilesAndFolders = fs.existsSync(USER_SB_PATH)
		? fs.readdirSync(USER_SB_PATH, { withFileTypes: true })
		: [];
	const userFiles = userFilesAndFolders.filter(next => next.isFile()).map(({ name }) => name);
	const userDirectories = userFilesAndFolders
		.filter(next => next.isDirectory())
		.map(({ name }) => name);

	// create target tmp folder that will contain the configuration files
	if (fs.existsSync(TMP_PATH)) {
		fs.rmdirSync(TMP_PATH, { recursive: true, force: true });
	}
	fs.mkdirSync(TMP_PATH, { recursive: true });

	// copy all default and user folders
	defaultDirectories.forEach(folder => {
		fse.copySync(path.join(TEMPLATE_SB_PATH, folder), path.join(TMP_PATH, folder));
	});
	userDirectories.forEach(folder => {
		fse.copySync(path.join(USER_SB_PATH, folder), path.join(TMP_PATH, folder));
	});

	// create configuration files
	const files = [...new Set([...defaultFiles, ...userFiles])];
	files.forEach(copyFile);

	try {
		require.resolve('@talend/react-cmf');
	} catch (e) {
		fse.removeSync(path.join(TMP_PATH, 'cmf.js'));
	}

	return TMP_PATH;
}
