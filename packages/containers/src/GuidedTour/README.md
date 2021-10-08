# Guided Tour Container

## Usage

### Local Storage

Save component state in Local Storage by adding its path in your CMF module initialization (in order to save user preferences).

```javascript
const storeCallback = cmf.localStorage.getStoreCallback(localStorageKey, [
	// ...all paths to save like SidePanel or List,
	['cmf', 'components', 'Container(GuidedTour)'],
]);
```

### Container

`GuidedTour` should be set in your main `App` component.

```javascript
export default function App() {
	return (
		<AppLoader>
			<GuidedTour steps={getSteps()} />
		</AppLoader>
	);
}
```

### Steps

```javascript
export function getSteps() {
	return [
		{
			selector: '#menu\\:datastores',
			content: {
				header: t('GUIDEDTOUR_CONNECTIONS_TITLE', {
					defaultValue: 'Connections',
				}),
				body: t('GUIDEDTOUR_CONNECTIONS', {
					defaultValue:
						'Here you can create and manage your Connections to systems that contain your Datasets, including SaaS applications, cloud storage, data lakes, databases, etc.',
				}),
			},
		},
		{
			selector: '#menu\\:datasets',
			content: {
				header: t('GUIDEDTOUR_DATASETS_TITLE', {
					defaultValue: 'Datasets',
				}),
				body: () => (
					<div
						dangerouslySetInnerHTML={{
							__html: t('GUIDEDTOUR_DATASETS', {
								defaultValue:
									'Here you can browse through and manage the datasets you added.<br>A dataset holds the raw data that can be used as raw material without affecting your original data.',
							}),
						}}
					/>
				),
			},
		},
		{
			selector: '#menu\\:preparations',
			content: {
				header: t('GUIDEDTOUR_CONNECTIONS_TITLE', {
					defaultValue: 'Preparations',
				}),
				body: () => (
					<div
						dangerouslySetInnerHTML={{
							__html: t('GUIDEDTOUR_CONNECTIONS', {
								defaultValue:
									'Here you can browse through and manage the preparations you created.<br>A preparation is the outcome of the different steps applied to cleanse your data.',
							}),
						}}
					/>
				),
			},
		},
		{
			selector: '#menu\\:semantic',
			content: {
				header: t('GUIDEDTOUR_SEMANTIC_TYPES_TITLE', {
					defaultValue: 'Semantic types',
				}),
				body: () => (
					<div
						dangerouslySetInnerHTML={{
							__html: t('GUIDEDTOUR_SEMANTIC_TYPES', {
								defaultValue:
									'Here you can browse through and manage the semantic types.<br>A semantic type defines the kind of information the data represents, and performs discovery and validation of your data.',
							}),
						}}
					/>
				),
			},
		},
		{
			selector: '#preparation\\:add\\:open',
			content: {
				header: t('GUIDEDTOUR_PREPARATION_ADD_TITLE', {
					defaultValue: 'Add preparation',
				}),
				body: t('GUIDEDTOUR_PREPARATION_ADD', {
					defaultValue: 'Click here to add a preparation and start cleansing your data.',
				}),
			},
		},
	];
}
```

### Sagas

| Name | Usage                                  | Description                                                 |
| ---- | -------------------------------------- | ----------------------------------------------------------- |
| Show | `{ type: Constants.GUIDED_TOUR_SHOW }` | Show the guided tour                                        |
| Hide | `{ type: Constants.GUIDED_TOUR_HIDE }` | Hide the guided tour (it's called while requesting onClose) |
