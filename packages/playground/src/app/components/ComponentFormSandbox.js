import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import Layout from '@talend/react-components/lib/Layout';
import SubHeaderBar from '@talend/react-components/lib/SubHeaderBar';
import UIForm from '@talend/react-forms';
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
import theme from '../example.scss';

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
	const [displayConfig, setConfig] = React.useState(false);
	const [properties, setProperties] = React.useState({
		definitionURL: '/api/v1/forms/example',
		uiSpecPath: 'ui',
		triggerURL: '/api/v1/application/action',
		submitURL: '/api/v1/forms',
	});
	const uispec = {
		jsonSchema,
		uiSchema,
		properties,
	};
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
			<div id={theme.example}>
				{!hasAPI && (
					<>
						<p>
							You don t have backend API so we will use an ComponentForm as proxy to UIForm
							component
						</p>
						<ComponentForm
							{...properties}
							data={uispec}
							componentId={componentId}
							className="full-form"
							saga="ComponentForm#default"
						/>
					</>
				)}
				{displayConfig && hasAPI ? (
					<UIForm
						data={uispec}
						onSubmit={(event, data) => {
							console.log(event, data);
							setProperties(data);
							setConfig(false);
						}}
					/>
				) : (
					<ComponentForm
						{...properties}
						componentId={componentId}
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
