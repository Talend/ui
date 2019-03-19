# Guided Tour Container

## Usage

### Local Storage

Save component state in Local Storage by adding its path in your CMF module initialization in order to save user preferences.

```javascript
const storeCallback = cmf.localStorage.getStoreCallback(localStorageKey, [
	// ...paths to save like SidePanel or List,
	['cmf', 'components', 'Container(GuidedTour)'],
]);
```

### Container

`GuidedTour should be set in your main`App` component.

```javascript
export default function App(props) {
	return (
		<I18nextProvider i18n={i18n}>
			<AppLoader>
				<GuidedTour />
			</AppLoader>
		</I18nextProvider>
	);
}
```

### Steps

```javascript
export function* setSteps() {
	yield put(
		actions.components.mergeState('Container(GuidedTour)', 'default', {
			steps: [
				{
					selector: '#menu\\:datastores',
					content:
						'Here you can create and manage your Connections to systems that contain your Datasets, including SaaS applications, cloud storage, data lakes, databases, etc.',
				},
				{
					selector: '#menu\\:datasets',
					content:
						'Here you can browse through and manage the datasets you added.<br>A dataset holds the raw data that can be used as raw material without affecting your original data.',
				},
				{
					selector: '#menu\\:preparations',
					content:
						'Here you can browse through and manage the preparations you created.<br>A preparation is the outcome of the different steps applied to cleanse your data.',
				},
				{
					selector: '#preparation\\:add\\:open',
					content: 'Click here to add a preparation and start cleansing your data.',
				},
				{
					selector: '#menu\\:semantic',
					content:
						'Here you can browse through and manage the semantic types.<br>A semantic type defines the kind of information the data represents, and performs discovery and validation of your data.',
				},
			],
		}),
	);
}
```

*note* you can pass i18n keys as `content` instead.

### Sagas

| Name | Usage                                  | Description                                                 |
| ---- | -------------------------------------- | ----------------------------------------------------------- |
| Show | `{ type: Constants.GUIDED_TOUR_SHOW }` | Show the guided tour                                        |
| Hide | `{ type: Constants.GUIDED_TOUR_HIDE }` | Hide the guided tour (it's called while requesting onClose) |
