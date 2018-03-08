import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Skeleton from '../../Skeleton';
import TitleSubHeader from './TitleSubHeader.component';
import InlineFormSubHeader from './InlineFormSubHeader.component';
import theme from './InputTitleSubHeader.scss';
import Icon from '../../Icon';

function InputTitleSubHeader({
	title,
	iconId,
	editMode,
	loading = false,
	inProgress = false,
	...rest
}) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}
	const subheaderDetailsCn = classNames({
		[theme['tc-subheader-details']]: true,
		'tc-subheader-details': true,
		[theme['tc-subheader-details-blink']]: inProgress,
		'tc-subheader-details-blink': inProgress,
	});
	return (
		<div className={subheaderDetailsCn}>
			{iconId && (
				<Icon
					name={iconId}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			{editMode ? (
				<InlineFormSubHeader title={title} {...rest} />
			) : (
				<TitleSubHeader title={title} disabled={inProgress} {...rest} />
			)}
		</div>
	);
}

InputTitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	editMode: PropTypes.bool,
	iconId: PropTypes.string,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
};

InputTitleSubHeader.defaultProps = {
	editMode: false,
};

export { InputTitleSubHeader as default, InlineFormSubHeader, TitleSubHeader };
