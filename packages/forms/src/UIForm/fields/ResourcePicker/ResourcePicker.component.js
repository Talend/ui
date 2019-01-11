import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { translate } from 'react-i18next';
import FieldTemplate from '../FieldTemplate';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

class ResourcePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { id, errorMessage, isValid, schema } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);

		const toolbar = {
			name: {
				onChange: () => 'Name filter changed',
				label: 'Toolbar name label',
				placeholder: 'Toolbar name placeholder',
			},
			sort: {
				onChange: () => 'Sort option changed',
				dateAsc: true,
			},
			state: {
				certified: true,
				onChange: () => 'State filter changed',
			},
		};

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
				required={schema.required}
				labelAfter
			>
				<ResourcePickerComponent toolbar={toolbar} />
			</FieldTemplate>
		);
	}
}

ResourcePicker.displayName = 'ResourcePicker field';
ResourcePicker.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	ResourcePicker.propTypes = {
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_FORMS)(ResourcePicker);
