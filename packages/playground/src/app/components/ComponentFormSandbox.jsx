import { useState } from 'react';

import PropTypes from 'prop-types';

import { InlineMessageInformation } from '@talend/design-system';
import { cmfConnect } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';
import SubHeaderBar from '@talend/react-components/lib/SubHeaderBar';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import UIForm from '@talend/react-forms';

// test new behavior on non css module files
import './ComponentFormSandbox.scss';

const example = require('../../../mockBackend/mock/kit/example.json');

const { isComponentFormDirty } = ComponentForm.selectors;
const { setComponentFormDirtyState } = ComponentForm.actions;

const componentId = 'external';
const jsonSchema = {
	type: 'object',
	title: 'config',
	properties: {
		definitionURL: {
			type: 'string',
			enum: ['/api/v1/forms/example', '/api/v1/forms/validation'],
		},
		uiSpecPath: {
			type: 'string',
		},
		triggerURL: {
			type: 'string',
		},
	},
};

const uiSchema = [
	{
		key: 'definitionURL',
		title: 'definitionURL',
	},
	{
		key: 'uiSpecPath',
		title: 'uiSpecPath',
	},
	{
		key: 'triggerURL',
		title: 'triggerURL',
	},
];

function ComponentFormSandBox({ dirty, dispatch }) {
	const hasAPI = process.env.NODE_ENV === 'development';
	const [displayConfig, setConfig] = useState(false);
	const defaultFormProps = {
		definitionURL: '/api/v1/forms/example',
		uiSpecPath: 'ui',
		triggerURL: '/api/v1/application/action',
		definition: hasAPI ? undefined : example.ui, // do not fetch
		// data: hasAPI ? uispec : undefined,
	};
	const uispec = {
		jsonSchema,
		uiSchema,
		properties: defaultFormProps,
	};
	const [formProps, setFormProps] = useState(defaultFormProps);
	const right = [
		{
			label: `Reset (dirty=${dirty.toString()})`,
			onClick: () => dispatch(setComponentFormDirtyState(componentId, false)),
		},
		{
			label: 'Configure',
			icon: 'talend-cog',
			onClick: () => setConfig(!displayConfig),
		},
	];
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<SubHeaderBar
				title="ComponentForm"
				right={right}
				onGoBack={() => {
					window.location = '/';
				}}
			/>
			<div id="example">
				{!hasAPI && (
					<InlineMessageInformation
						title="You don t have backend API so we will use an ComponentForm as proxy to UIForm component"
						withBackground
					/>
				)}
				{displayConfig ? (
					<UIForm
						data={uispec}
						onSubmit={(event, data) => {
							// eslint-disable-next-line no-console
							console.log(event, data);
							setFormProps(data);
							setConfig(false);
						}}
					/>
				) : (
					<ComponentForm
						{...formProps}
						componentId={componentId}
						submitURL="/api/v1/forms"
						className="full-form"
						saga="ComponentForm#default"
					/>
				)}
			</div>
		</Layout>
	);
}
ComponentFormSandBox.displayName = 'ComponentFormSandBox';
ComponentFormSandBox.propTypes = {
	dirty: PropTypes.bool.isRequired,
	dispatch: PropTypes.func,
};

function mapStateToProps(state) {
	return { dirty: isComponentFormDirty(state, componentId) };
}

export default cmfConnect({ mapStateToProps, withDispatch: true })(ComponentFormSandBox);
