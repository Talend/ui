import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../../../../../Actions/ActionButton';
import { useColumnChooserContext } from '../columnChooser.context';
import RichLayout from '../../../../../Rich/RichLayout';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

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

const ColumnChooserFooter = ({ children = <SubmitButton />, className }) => (
	<RichLayout.Footer
		id="column-chooser-footer"
		className={(className, theme('tc-column-chooser-footer'))}
	>
		{children}
	</RichLayout.Footer>
);

ColumnChooserFooter.Submit = SubmitButton;

ColumnChooserFooter.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserFooter;
