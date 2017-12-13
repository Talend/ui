import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleSubHeader from './TitleSubHeader.component';
import InlineFormSubHeader from './InlineFormSubHeader.component';
import theme from './InputTitleSubHeader.scss';
import Icon from '../../Icon';

function InputTitleSubHeader({ title, iconFile, editMode, ...rest }) {
	return (
		<div className={classNames(theme['tc-subheader-details'], 'tc-subheader-details')}>
			{iconFile && (
				<Icon
					name={iconFile}
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
	editMode: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	iconFile: PropTypes.string,
};

InputTitleSubHeader.defaultProps = {
	editMode: false,
};

export { InputTitleSubHeader as default, InlineFormSubHeader, TitleSubHeader };
