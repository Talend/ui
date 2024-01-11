import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { ButtonPrimary, Form } from '@talend/design-system';

import { getApplyDataFeature, getDataAttributesFrom } from '../../../helpers/usage.helpers';

const BadgeTextForm = ({
	id,
	onChange,
	onSubmit,
	value,
	feature,
	t,
	placeholder,
	minLength,
	maxLength,
	...rest
}) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);

	const onChangeText = event => {
		onChange(event, event.target.value);
	};

	return (
		<Form id={`${id}-text-area`} onSubmit={onSubmit}>
			<Form.Text
				id={`${id}-text`}
				onChange={onChangeText}
				placeholder={placeholder || t('TYPE_HERE', { defaultValue: 'Type here' })}
				type="text"
				value={value}
				minLength={minLength}
				maxLength={maxLength}
			/>
			<Form.Buttons>
				<ButtonPrimary
					type="submit"
					data-feature={applyDataFeature}
					{...getDataAttributesFrom(rest)}
				>
					{t('APPLY', { defaultValue: 'Apply' })}
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

BadgeTextForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeTextForm };
