export function showConfirmDialog(state, action) {
	// adding conf and showing modal
	const path = ['CMFContainer(ConfirmDialog)', 'ConfirmDialog'];
	const [containerName, dialogKey] = path;
	return {
		...state,
		cmf: {
			...state.cmf,
			components: {
				...state.cmf.components,
				[containerName]: {
					...(state.cmf.components[containerName] ?? {}),
					[dialogKey]: { ...action.confirmDialogConf, show: true },
				},
			},
		},
	};
}

export function hideConfirmDialog(state) {
	// hiding the modal
	const containerName = 'CMFContainer(ConfirmDialog)';
	const dialogKey = 'ConfirmDialog';
	return {
		...state,
		cmf: {
			...state.cmf,
			components: {
				...state.cmf.components,
				[containerName]: {
					...(state.cmf.components[containerName] ?? {}),
					[dialogKey]: {
						...(state.cmf.components[containerName]?.[dialogKey] ?? {}),
						show: false,
					},
				},
			},
		},
	};
}
