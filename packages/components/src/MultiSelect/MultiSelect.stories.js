import React from 'react';
import { storiesOf } from '@storybook/react';

import MultiSelect from './MultiSelect.container';

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
				<form className="form">
					<div className="form-group">
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}}
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
						<label className="control-label" htmlFor="useless">
							another
						</label>
						<input className="form-control" type="text" id="useless" />
					</div>
				</form>
			</section>
		);
	}
}

storiesOf('Deprecated/MultiSelect', module).add('default', () => <Photos />);
