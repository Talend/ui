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

const SelectAllCheckbox = () => {
	const { id, onSelectAll, selectAll, t } = useColumnChooserContext();
	const onChange = () => {
		onSelectAll(!selectAll);
	};
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
					onChange={onChange}
					type="checkbox"
					checked={selectAll}
					value={selectAll}
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

const ColumnChooserFooter = ({ children, className }) => {
	const { id } = useColumnChooserContext();
	return (
		<Tooltip.Footer
			id={id}
			className={
				(className, classNames(theme['tc-column-chooser-footer'], 'tc-column-chooser-footer'))
			}
		>
			{!children ? DefaultFooterContent : children}
		</Tooltip.Footer>
	);
};

ColumnChooserFooter.Submit = SubmitButton;
ColumnChooserFooter.SelectAll = SelectAllCheckbox;

ColumnChooserFooter.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserFooter;
