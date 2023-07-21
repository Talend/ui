import classNames from 'classnames';
import theme from './ViewLayout.module.scss';
import { ReactNode } from 'react';

function ViewLayout(props: ViewLayoutProps) {
	const { leftElement, middleElement, rightElement } = props.header;

	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<div className={classNames(theme['element-container'], theme.left)}>{leftElement}</div>
				<div className={classNames(theme['element-container'], theme.middle)}>{middleElement}</div>
				<div className={classNames(theme['element-container'], theme.right)}>{rightElement}</div>
			</div>
			<div className={classNames(theme['element-container'], theme.body)}>{props.bodyElement}</div>
		</div>
	);
}

type HeaderProps = {
	leftElement: ReactNode;
	middleElement: ReactNode;
	rightElement: ReactNode;
};

type ViewLayoutProps = {
	header: HeaderProps;
	bodyElement: ReactNode;
};

export default ViewLayout;
