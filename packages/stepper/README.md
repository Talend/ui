# Stepper

## What it does

This component provides a service to show progress when we have long loading steps.  
The main purpose is to have this workflow ->
-   Init the steps with labels & set events to fail / success
-   When you have some progress in the app, you have dispatchers available

Here, it will not make the process work by itself, it's an api that provide tools to update the state

## Bootstrap

First of all, you have to register the module in your application, it's the default export of the module :

```javascript
// index.js file
import StepperModule from '@talend/react-stepper';

export default {
	id: 'MyModuleName',
	// ... Modules stuff
	modules: [StepperModule, ...myOtherModules],
};
```

## Initialize

After bootstrapping the module, there is a reducer listening the events.
StepperService provides some actionCreators to manage the loading state.
For each of these action creators, some parameters are required: the resourceType & the resourceId. Theses parameters allow the Stepper service to identify each loading with uniqueness.

## What is a step

A step is an object that matches this typescript interface :

```typescript
interface Step {
	label: string; // displayed aside the icon
	message: string; // displayed as a description for what could go wrong
	status: LOADING_STEP_STATUSES; // match the icon to show
	loadingOn: string[] | string; // list of event for set to loading state
	failureOn: string[] | string; // list of event for set to failure state
	successOn: string[] | string; // list of event for set to success state
}
```

## Action Creators

### initStepper

This action is used to bootstrap a loading resourceType / resourceId. Steps are required to do so

```javascript
import { StepperActions, StepperConstants } from '@talend/react-stepper';

const steps = [
	{
		label: 'Fetch Sample',
		status: StepperConstants.LOADING_STEP_STATUSES.LOADING,
		failureOn: ['FETCH_SAMPLE_ACCESS_FAILURE', 'SAMPLE_FETCHING_FAILURE'],
		successOn: 'SAMPLE_FETCHED',
	},
	{
		label: 'Update Sample',
		failureOn: ['SAMPLE_UPDATE_FAILURE', 'SAMPLE_REFRESH_FAILURE'],
		loadingOn: 'SAMPLE_FETCHED',
		successOn: 'SAMPLE_REFRESHED',
	},
	{
		label: 'Update Quality',
		failureOn: 'SAMPLE_QUALITY_FAILURE',
		loadingOn: 'SAMPLE_REFRESHED',
		successOn: 'SAMPLE_QUALITY_SUCCESS',
	},
];

StepperActions.initStepper('dataset', 'id12', steps);
```

### removeStepper

This action is used when a loading is over and we want to remove it from the store
it requires only the resourceType & the resourceId

```javascript
StepperActions.removeStepper('dataset', 'id12');
```

### proceedLoadingEvent

This action is used when an event has to be processed, the workflow for a dispatched event is :

-   If a step has a successOn as event, the current step status is set to success
-   If a step has a loadingOn as event, the current step status is set to loading
-   If a step has a failureOn as event, the current step status is set to failure & all the steps that are not in success status are set to aborted

A message can be also passed to the failure event to display a label below the current fail step

```javascript
const failAction = StepperActions.proceedLoadingEvent(
	'dataset',
	'id12',
	'FETCH_SAMPLE_ACCESS_FAILURE',
	'This call has failed because the remote engine is not working',
);
```

## Selectors

### isResourceLoading

You may want to know for some use cases if a loading step is currently in loading state, it will return a boolean to say if it's finished.
⚠️ In the current API, if there is an error, the steps are considered finished even if the component is still rendered
To have this information, you can use `isResourceLoading` selector :

```javascript
import { StepperSelectors } from '@talend/react-stepper';

function mapStateToProps(store) {
	const isLoading = StepperSelectors.isResourceLoading(store, 'dataset', 'id12');
}
```

### getStepsForResource

For some use cases, you may want to get the current state of the steps. 
It could be to know if the loading step has ended but with an error or to count how many steps are done...
It will return the step with the same given model shape at init.

```javascript
import { StepperSelectors } from '@talend/react-stepper';

function mapStateToProps(store) {
	const steps = StepperSelectors.getStepsForResource(store, 'dataset', 'id12');
}
```

## Utils

### isAllSuccessful

Take a list of steps in parameter and tell if all the steps are in a success state

```javascript
import { StepperUtils } from '@talend/react-stepper';

// ... get the steps
const steps = StepperUtils.isAllSuccessful(steps);
```

### isErrorInSteps

Take a list of steps in parameter and tell if there is an error in the steps

```javascript
import { StepperUtils } from '@talend/react-stepper';

// ... get the steps
const steps = StepperUtils.isErrorInSteps(steps);
```

### isStepsLoading

Take a list of steps in parameter and tell if the loading steps is still loading

```javascript
import { StepperUtils } from '@talend/react-stepper';

// ... get the steps
const steps = StepperUtils.isStepsLoading(steps);
```
