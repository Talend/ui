import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../../Actions/ActionButton';
import SelectAllColumnsCheckbox from '../SelectAllColumnsCheckbox';
import { useColumnChooserContext } from '../columnChooser.context';
import theme from '../ColumnChooser.scss';
import Tooltip from '../../../../../Tooltip';

const SubmitButton = () => {
	const { id, t } = useColumnChooserContext();
	return (
		<ActionButton
			bsStyle="info"
			id={`${id}-submit-button`}
			label={t('COLUMN_CHOOSER_APPLY_BUTTON', { defaultValue: 'Apply' })}
			type="submit"
		/>
	);
};

const ColumnChooserFooter = ({ children = <SubmitButton />, className }) => {
	const { id } = useColumnChooserContext();
	return (
		<Tooltip.Footer
			id={id}
			className={
				(className, classNames(theme['tc-column-chooser-footer'], 'tc-column-chooser-footer'))
			}
		>
			{children}
		</Tooltip.Footer>
	);
};

ColumnChooserFooter.Submit = SubmitButton;
ColumnChooserFooter.SelectAll = SelectAllColumnsCheckbox;

ColumnChooserFooter.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserFooter;
