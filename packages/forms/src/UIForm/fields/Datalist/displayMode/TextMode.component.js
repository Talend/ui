import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withTranslation } from 'react-i18next';
import callTrigger from '../../../trigger';
import { DID_MOUNT, FOCUS } from '../constants';
import { TextMode as FieldTemplate } from '../../FieldTemplate';
import { I18N_DOMAIN_FORMS } from '../../../../constants';
import getDefaultT from '../../../../translate';
import theme from './TextMode.scss';

class TextMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const onTrigger = (event, trigger) =>
			this.props.onTrigger(event, {
				trigger,
				schema: this.props.schema,
				errors: this.props.errors,
				properties: this.props.properties,
			});

		callTrigger(null, {
			eventNames: [DID_MOUNT, FOCUS],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		});
	}

	render() {
		const { id, schema, value, t } = this.props;
		const { title, options } = schema;
		let titleEntry;

		if (options && options.isMultiSection) {
			options.titleMap.find(section => {
				titleEntry = section.suggestions.find(entry => entry.value === value);
				return !!titleEntry;
			});
		} else {
			const titleMap = get(this.state, 'titleMap') || get(this.props, 'schema.titleMap') || [];
			titleEntry = titleMap.find(entry => entry.value === value);
		}

		let displayValue = (titleEntry && titleEntry.name) || value;
		if (value && this.state.isLoading) {
			displayValue = (
				<span className={theme.loading} aria-busy="true">
					{value} {`(${t('DATALIST_WIDGET_LOADING_LABELS', { defaultValue: 'loading labels' })})`}
				</span>
			);
		}

		return (
			<FieldTemplate id={id} label={title}>
				{displayValue}
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		errors: PropTypes.object,
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		properties: PropTypes.object,
		schema: PropTypes.shape({
			options: PropTypes.shape({
				isMultiSection: PropTypes.bool,
				titleMap: PropTypes.array,
			}),
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
			triggers: PropTypes.array,
			type: PropTypes.string,
		}),
		t: PropTypes.func,
		value: PropTypes.string,
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_FORMS)(TextMode);
