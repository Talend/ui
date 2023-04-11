import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { UIForm } from '../src/UIForm';

function CustomWidget(props) {
	const { value } = props;

	return (
		<div className="panel panel-info">
			<div className="panel-heading">
				<h3 className="panel-title">Custom widget</h3>
			</div>
			<div className="panel-body">
				Form was instantiated with a custom widget to display its selected value
				<code>{value}</code>.
			</div>
		</div>
	);
}

CustomWidget.propTypes = {
	value: PropTypes.string,
};

export default {
	title: 'Customization/Widget',
};

export function Default() {
	const widgets = { custom: CustomWidget };
	const schema = {
		jsonSchema: {
			title: 'Unknown widget',
			type: 'object',
			properties: {
				list: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					enumNames: ['One', 'Two', 'Three'],
				},
			},
		},
		properties: {
			list: 'two',
		},
		uiSchema: [
			{
				key: 'list',
				type: 'custom',
			},
		],
	};
	return (
		<UIForm
			widgets={widgets}
			data={schema}
			onChange={action('Change')}
			onSubmit={action('onSubmit')}
		/>
	);
}
