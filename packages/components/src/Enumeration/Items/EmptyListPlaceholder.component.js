import classNames from 'classnames';
import { propTypes } from '../Enumeration.propTypes';
import { DISPLAY_MODE_DEFAULT } from '../displayModes';
import theme from './EmptyListPlaceholder.module.scss';

export function EmptyListPlaceholder({ displayMode, t }) {
	return (
		<p
			className={classNames({
				[theme['tc-enumeration-hint']]: true,
				'tc-enumeration-hint': true,
			})}
		>
			{displayMode === DISPLAY_MODE_DEFAULT
				? t('ENUMERATION_EMPTY_LIST', { defaultValue: 'The list is empty' })
				: t('ENUMERATION_EMPTY_PLACEHOLDER_SEARCH', { defaultValue: 'No results' })}
		</p>
	);
}

EmptyListPlaceholder.propTypes = {
	displayMode: propTypes.displayMode,
	t: propTypes.t,
};
