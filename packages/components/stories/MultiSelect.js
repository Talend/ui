import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiSelect from '../src/MultiSelect';
import IconsProvider from '../src/IconsProvider';

function onSelect(value, title) {
	return {
		onSelect: action(`selec ${value} ${title}`),
	};
}

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
							photos
						</label>
						<MultiSelect
							id="storybook"
							options={this.state.photos}
							isLoading={this.state.loading}
							withCreateNew
						/>
					</div>
					<div className="form-group">
						<input className="form-control" type="text" id="useless" />
						<label className="control-label" htmlFor="useless">
							another
						</label>
					</div>
				</form>
			</section>
		);
	}
}

storiesOf('MultiSelect', module).add('default', () => <Photos />);
