import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReSelect from 'react-select';
import 'react-select/dist/react-select.css';
import FieldTemplate from '../FieldTemplate';
import theme from './Datalist.scss';

function getSelectedOptions(selectedValue, multiple) {
	if (!selectedValue) {
		return undefined;
	}
	if (multiple) {
		return selectedValue.map(option => option.value);
	}
	return selectedValue.value;
}

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.isMultiple = this.isMultiple.bind(this);
		this.state = {};
	}

	componentDidMount() {
		if (this.props.value && !this.props.schema.titleMap) {
			this.onFocus({ type: 'mount' });
		}
	}

	/**
	 * On change callback
	 * We call onFinish to trigger validation on datalist item selection
	 * @param event
	 * @param payload
	 */
	onChange(selectedValue) {
		const multiple = this.isMultiple();
		const options = this.getOptions();
		const payload = {
			schema: this.props.schema,
			value: getSelectedOptions(selectedValue, multiple),
		};
		if (payload.value && !multiple) {
			const found = options.find(option => option.value === selectedValue.value);
			if (!found) {
				this.setState(prevState => {
					if (!prevState.added) {
						// eslint-disable-next-line no-param-reassign
						prevState.added = [];
					}
					prevState.added.push(selectedValue);
				});
			}
		} else if (payload.value && multiple) {
			// TODO
		}
		const event = {
			type: 'change',
			target: {},
		};
		if (multiple) {
			event.target.options = options.map(option =>
				Object.assign({
					value: option.value,
					selected: selectedValue.find(v => v.value === option.value) !== undefined,
				}),
			);
		} else {
			event.target.value = payload.value;
		}
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	onFocus(event) {
		if (this.props.schema.triggers) {
			this.props.schema.triggers.forEach(trigger => {
				if (trigger.onEvent === 'focus') {
					this.setState({ isLoading: true });
					this.props.onTrigger(event, this.props).then(data => {
						this.setState({
							isLoading: false,
							...data,
						});
					});
				}
			});
		}
	}

	getOptions() {
		const isMultiple = this.isMultiple();
		let options = [];
		if (this.state.titleMap) {
			options = this.state.titleMap.map(option => ({
				value: option.value,
				label: option.name,
			}));
		} else if (this.props.schema.titleMap) {
			options = this.props.schema.titleMap.map(option => ({
				value: option.value,
				label: option.name,
			}));
		}
		if (this.state.added) {
			options.unshift(...this.state.added);
		}
		if (this.props.value && !isMultiple) {
			if (!options.find(option => option.value === this.props.value)) {
				options.push({ label: this.props.value, value: this.props.value });
			}
		} else if (this.props.value && isMultiple) {
			this.props.value.forEach(value => {
				if (!options.find(option => option.value === value)) {
					options.push({ label: this.props.value, value: this.props.value });
				}
			});
		}

		return options;
	}

	isMultiple() {
		return this.props.schema.schema.type === 'array';
	}

	render() {
		const options = this.getOptions();
		let noResultsText = 'No result found';
		if (this.state.isLoading) {
			noResultsText = 'Loading';
		}
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={this.props.schema.title}
				required={this.props.schema.required}
			>
				<ReSelect.Creatable
					isLoading={this.state.isLoading}
					noResultsText={noResultsText}
					className={classNames('tf-datalist', theme.override)}
					autoFocus={this.props.schema.autoFocus || false}
					id={`${this.props.id}`}
					disabled={this.props.schema.disabled || false}
					multi={this.isMultiple()}
					onFocus={this.onFocus}
					onChange={this.onChange}
					placeholder={this.props.schema.placeholder}
					readOnly={this.props.schema.readOnly || false}
					value={this.props.value}
					options={options}
				/>
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
		onTrigger: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			schema: PropTypes.shape({
				type: PropTypes.string,
			}),
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
			triggers: PropTypes.arrayOf(
				PropTypes.shape({
					onEvent: PropTypes.string,
				}),
			),
		}),
		value: PropTypes.string,
	};
}

export default Datalist;
