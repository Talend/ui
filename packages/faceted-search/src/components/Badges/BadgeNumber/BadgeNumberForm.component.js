import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { ButtonPrimary, Form } from '@talend/design-system';
import { getDataAttrFromProps } from '@talend/utils';

import { getApplyDataFeature } from '../../../helpers/usage.helpers';

const BadgeNumberForm = ({ id, onChange, onSubmit, value, feature, t, ...rest }) => {
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const onChangeText = event => onChange(event, event.target.value);

	return (
		<Form id={`${id}-number`} onSubmit={onSubmit}>
			<Form.Number
				id={`${id}-input`}
				placeholder={t('TYPE_HERE', { defaultValue: 'Type here' })}
				onChange={onChangeText}
				value={value}
			/>
			<Form.Buttons padding={{ x: 0, bottom: 0, top: 'M' }}>
				<ButtonPrimary
					type="submit"
					data-feature={applyDataFeature}
					{...getDataAttrFromProps(rest)}
				>
					{t('APPLY', { defaultValue: 'Apply' })}
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

BadgeNumberForm.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeNumberForm };
