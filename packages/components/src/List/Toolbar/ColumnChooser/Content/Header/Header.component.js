import React, { useContext } from 'react';
import classNames from 'classnames';
import theme from '../ColumnChooser.scss';
import { columnChooserContext } from '../columnChooser.context';

const TooltipHeader = props => {
	return (
		<header style={{ display: 'flex', padding: '0 20px', height: '30rem', minWidth: '40rem' }}>
			{props.children}
		</header>
	);
};

const Title = props => {
	const { t } = useContext(columnChooserContext);
	if (props.value) {
		return props.value;
	}
	return t('COLUMN_CHOOSER_HEADER_TITLE', {
		defaultValue: 'Modify columns position',
	});
};

const Header = props => {
	return (
		<header className={classNames(theme['tc-column-chooser-header'], 'tc-column-chooser-header')}>
			{props.default ? <Title /> : props.children}
		</header>
	);
};

Header.Title = Title;

export default Header;
