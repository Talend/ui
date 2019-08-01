import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../../Actions/ActionButton';
import { useColumnChooserContext } from '../columnChooser.context';
import theme from '../ColumnChooser.scss';
import Tooltip from '../../../../../Tooltip';

const SubmitButton = () => {
	const { id, t } = useColumnChooserContext();
	return (
		<ActionButton
			id={`${id}-submit-button`}
			type="submit"
			label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
		/>
	);
};

const ColumnChooserFooter = ({ children, className }) => {
	const { id } = useColumnChooserContext();
	return (
		<Tooltip.Footer
			id={id}
			className={
				(className, classNames(theme['tc-column-chooser-footer'], 'tc-column-chooser-footer'))
			}
		>
			{!children ? <SubmitButton /> : children}
		</Tooltip.Footer>
	);
};

ColumnChooserFooter.Submit = SubmitButton;
// ColumnChooserFooter.SelectAll = SelectAllCheckbox;

ColumnChooserFooter.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserFooter;
