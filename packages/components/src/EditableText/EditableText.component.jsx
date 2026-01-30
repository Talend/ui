import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import Skeleton from '../Skeleton';
import InlineForm from './InlineForm.component';
import { PlainTextTitle } from './PlainTextTitle.component';
import theme from './EditableText.module.css';

import getDefaultT from '../translate';
import I18N_DOMAIN_COMPONENTS from '../constants';

export function EditableTextComponent({ editMode, loading, inProgress, ...rest }) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}
	const Component = editMode ? InlineForm : PlainTextTitle;
	const allyProps = {};
	if (inProgress) {
		allyProps['aria-label'] = rest.t('EDITABLE_TEXT_IN_PROGRESS', {
			defaultValue: 'Edit in progress',
		});
		allyProps['aria-busy'] = true;
	}

	return (
		<div
			className={classNames(theme['tc-editable-text'], 'tc-editable-text', {
				[theme['tc-editable-text-blink']]: inProgress,
				'tc-editable-text-blink': inProgress,
			})}
			{...allyProps}
		>
			<Component inProgress={inProgress} {...rest} />
		</div>
	);
}

EditableTextComponent.displayName = 'EditableText';

EditableTextComponent.propTypes = {
	componentClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	disabled: PropTypes.bool,
	editMode: PropTypes.bool,
	inProgress: PropTypes.bool,
	loading: PropTypes.bool,
	onEdit: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	t: PropTypes.func,
};

EditableTextComponent.defaultProps = {
	editMode: false,
	inProgress: false,
	loading: false,
	t: getDefaultT(),
};

/** @type Function */
const EditableTextComponentWithTranslation =
	withTranslation(I18N_DOMAIN_COMPONENTS)(EditableTextComponent);
export default EditableTextComponentWithTranslation;
