import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataList from '@talend/react-components/lib/Datalist';
import FieldTemplate from '../FieldTemplate';
import theme from './Datalist.scss';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
	}

	/**
	 * on change callback
	 * @param event
	 * @param value
	 */
	onChange(event, payload) {
		this.props.onChange(event, { ...payload, schema: this.props.schema });
	}

	/**
	 * on finish callback
	 * @param event
	 * @param value
	 */
	onFinish(event, payload) {
		this.props.onFinish(event, { ...payload, schema: this.props.schema });
	}

	render() {
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={this.props.schema.title}
				required={this.props.schema.required}
			>
				<div className={theme['tf-datalist']}>
					<DataList
						autoFocus={this.props.schema.autoFocus || false}
						id={`${this.props.id}`}
						disabled={this.props.schema.disabled || false}
						multiSection={false}
						onFinish={this.onFinish}
						onChange={this.onChange}
						placeholder={this.props.schema.placeholder}
						readOnly={this.props.schema.readOnly || false}
						titleMap={this.props.schema.titleMap}
						value={this.props.value}
					/>
				</div>
			</FieldTemplate>
		);
	}
}

Datalist.displayName = 'Datalist field';
Datalist.defaultProps = {
	value: '',
};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			restricted: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}),
		value: PropTypes.string,
	};
}

export default Datalist;
