import React, { Component, PropTypes } from 'react';
import Typeahead from 'react-talend-components/lib/Typeahead';
import FieldTemplate from '../FieldTemplate';

import theme from './Datalist.scss';

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onBlur(event) {
		console.log('OnBlur', arguments);
	}

	onKeyDown(event) {
		console.log('onKeyDown', arguments);
	}

	onSelect() {
		console.log('OnSelect', arguments);
	}

	setValue() {

	}

	updateSuggestions() {

	}

	render() {
		const { id, isValid, errorMessage, onChange, schema, value } = props;
		const { autoFocus, description, disabled, placeholder, readOnly, title, type } = schema;

		return (
			<FieldTemplate
				description={description}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={title}
			>
				<Typeahead
					id={id}
					focusedItemIndex={this.state.focusedItemIndex}
					items={this.state.suggestions}
					onBlur={this.onBlur}
					onKeyDown={this.onKeyDown}
					onSelect={this.onSelect}
					value={value}
				/>
			</FieldTemplate>
		);
	}
}

Datalist.defaultProps = {};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.string,
	};
}

export default Datalist;
