import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleSubHeader from './TitleSubHeader.component';
import InlineFormSubHeader from './InlineFormSubHeader.component';
import theme from './InputTitleSubHeader.scss';
import Icon from '../../Icon';

function InputTitleSubHeader({ title, iconId, editMode, ...rest }) {
	return (
		<div className={classNames(theme['tc-subheader-details'], 'tc-subheader-details')}>
			{iconId && (
				<Icon
					name={iconId}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			{editMode ? (
				<InlineFormSubHeader title={title} {...rest} />
			) : (
				<TitleSubHeader title={title} {...rest} />
			)}
		</div>
	);
}

InputTitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	editMode: PropTypes.bool.isRequired,
	iconId: PropTypes.string,
	editable: PropTypes.bool,
};

InputTitleSubHeader.defaultProps = {
	editMode: false,
	editable: false,
};

export { InputTitleSubHeader as default, InlineFormSubHeader, TitleSubHeader };
