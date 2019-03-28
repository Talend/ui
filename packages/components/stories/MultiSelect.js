import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PropTypes from 'prop-types';

import MultiSelect from '../src/MultiSelect';
import IconsProvider from '../src/IconsProvider';

/**
 * ControlledMultiSelect reproduce the ComponentForm behaviors
 */
function ControlledMultiSelect(props) {
	const [selected, setSelected] = React.useState([]);
	const onChange = (event, values) => {
		action('changed', event, values);
		setSelected(values);
	};
	const missing = selected.filter(i => !props.options.find(o => o.value === i));
	let options = props.options;
	if (missing.length > 0) {
		options = props.options.concat(missing.map(v => ({value: v, name: v})));
	}
	return (
		<MultiSelect
			{...props}
			onChange={onChange}
			selected={selected}
			options={options}
		/>
	);
}
ControlledMultiSelect.propTypes = {
	options: PropTypes.array,
};

class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			photos: [],
		};
	}
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/photos')
			.then(resp => resp.json())
			.then(data => {
				this.setState({
					loading: false,
					photos: data.map(item => ({ id: item.id, value: item.id, name: item.title })),
				});
			});
	}
	render() {
		return (
			<section style={{ margin: 20 }}>
				<IconsProvider />
				<form className="form">
					<div className="form-group">
						<label className="control-label" htmlFor="storybook">
							uncontrolled
						</label>
						<MultiSelect
							id="storybook"
							options={this.state.photos}
							isLoading={this.state.loading}
							withCreateNew
						/>
					</div>
					<div className="form-group">
						<label className="control-label" htmlFor="controlled">
							controlled
						</label>
						<ControlledMultiSelect
							id="controlled"
							options={this.state.photos}
							isLoading={this.state.loading}
							withCreateNew
						/>
					</div>
				</form>
			</section>
		);
	}
}

storiesOf('MultiSelect', module).add('default', () => <Photos />);
