import React, { useContext } from 'react';
// import Prop,Types from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../../Actions/ActionButton';
import { columnChooserContext } from '../columnChooser.context';
import theme from '../ColumnChooser.scss';

const SubmitButton = () => {
	const { id, t } = useContext(columnChooserContext);
	return (
		<ActionButton
			id={`${id}-submit-button`}
			type="submit"
			label={t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
		/>
	);
};

const SelectAllCheckbox = ({ customSelectAll }) => {
	const { id, onSelectAll, stateColumnChooser, t } = useContext(columnChooserContext);
	const value = customSelectAll || stateColumnChooser.selectAll;
	return (
		<span
			className={classNames(
				theme['tc-column-chooser-footer-select-all'],
				'tc-column-chooser-footer-select-all',
			)}
		>
			<span>
				<input
					id={`${id}-select-all-checkbox-input`}
					name="selectAll"
					aria-label={t('COLUMN_CHOOSER_FOOTER_SELECT_ALL_INPUT', {
						defaultValue: 'select all columns',
					})}
					onChange={event => onSelectAll(event, !value)}
					type="checkbox"
					checked={value}
					value={value}
					className={classNames(
						theme['tc-column-chooser-footer-select-all-checkbox'],
						'tc-column-chooser-footer-select-all-checkbox',
					)}
				/>
			</span>
			<label
				id={`${id}-select-all-checkbox-label`}
				className={classNames(
					theme['tc-column-chooser-footer-select-all-label'],
					'tc-column-chooser-footer-select-all-label',
				)}
				htmlFor="selectAll"
			>
				{t('COLUMN_CHOOSER_FOOTER_SELECT_ALL_LABEL', { defaultValue: 'Select All' })}
			</label>
		</span>
	);
};

const DefaultFooterContent = (
	<React.Fragment>
		<SelectAllCheckbox />
		<SubmitButton />
	</React.Fragment>
);

const TooltipFooter = props => {
	return (
		<footer style={{ display: 'flex', padding: '0 20px', height: '30rem', minWidth: '40rem' }}>
			{props.children}
		</footer>
	);
};

const Footer = props => {
	return (
		<footer className={classNames(theme['tc-column-chooser-footer'], 'tc-column-chooser-footer')}>
			{props.default ? DefaultFooterContent : props.children}
		</footer>
	);
};

Footer.SubmitButton = SubmitButton;
Footer.SelectAllCheckbox = SelectAllCheckbox;

Footer.propTypes = {};

export default Footer;
