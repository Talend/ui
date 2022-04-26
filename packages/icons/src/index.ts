const FOLDERS = [
	'brands',
	'components',
	'core',
	'files',
	'flows',
	'operators',
	'processors',
	'products',
];

// @ts-ignore
const importLegacyIcon: Promise<any> = (folder: string, icon: string) => {
	return new Promise((resolve, reject) => {
		if (folder) {
			import(
				/* webpackMode: "lazy" */
				/* webpackChunkName: "legacy_icon" */
				`./svg/${folder}/${icon}.svg`
			)
				.then(
					legacyIcon =>
						// @ts-ignore
						// eslint-disable-next-line no-console
						console.debug('Legacy icon found in the specified folder', folder, legacyIcon) ||
						resolve(icon),
				)
				.catch(
					legacyIconErr =>
						// @ts-ignore
						// eslint-disable-next-line no-console
						console.error(
							`Icon "${icon}" does not exist in ${folder}.
							If you don't know the original folder name, keep it undefined.`,
							legacyIconErr,
						) || reject(legacyIconErr),
				);
		}
		return Promise.any(
			FOLDERS.map(
				legacyFolder =>
					import(
						/* webpackMode: "lazy" */
						/* webpackChunkName: "legacy_icon" */
						`./svg/${legacyFolder}/${icon}.svg`
					),
			),
		)
			.then(legacyIcon => resolve(legacyIcon))
			.catch(legacyIconErr => reject(legacyIconErr));
	});
};

// @ts-ignore
const importIcon = (size, icon) => {
	return new Promise((resolve, reject) =>
		import(
			/* webpackMode: "lazy" */
			/* webpackChunkName: "icon" */
			`./icon/${size}/${icon}.svg`
		)
			.then(
				newIcon =>
					// @ts-ignore
					// eslint-disable-next-line no-console
					console.debug('New icon found', newIcon) || resolve(newIcon),
			)
			.catch(
				newIconErr =>
					// @ts-ignore
					// eslint-disable-next-line no-console
					console.debug(newIconErr) ||
					// @ts-ignore
					importLegacyIcon(undefined, icon)
						.then(
							(fallbackIcon: any) =>
								// @ts-ignore
								// eslint-disable-next-line no-console
								console.debug('Legacy icon found', fallbackIcon) || resolve(fallbackIcon),
						)
						.catch(
							(legacyImportErr: any) =>
								// @ts-ignore
								// eslint-disable-next-line no-console
								console.error(legacyImportErr) || reject(legacyImportErr),
						),
			),
	);
};

export default {
	importIcon,
	importLegacyIcon,
};
