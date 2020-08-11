import React from 'react';
import Button from '../Button';
import * as S from './Layout.style';

export default function Layout({
	header,
	aside,
	main,
	footer,
	hasScreenHeight,
	hasOverflow = true,
	...rest
}) {
	const [isAsideCollapsed, collapseAside] = React.useState(false);
	const Main = () => <S.Main className="layout__main">{main}</S.Main>;
	return (
		<S.Layout className="layout" {...rest}>
			{header && (
				<S.Header className="layout__header">
					{header}
				</S.Header>
			)}
			{aside ? (
				<S.LayoutGroup className="layout__group">
					<S.Aside isAsideCollapsed={isAsideCollapsed} className="layout__aside">
						<Button.Ghost onClick={() => collapseAside(prevState => !prevState)}>
							{isAsideCollapsed ? '>' : '<'}
						</Button.Ghost>
						{aside}
					</S.Aside>
					<Main />
				</S.LayoutGroup>
			) : (
				<Main />
			)}
			{footer && <S.Footer className="layout__footer">{footer}</S.Footer>}
		</S.Layout>
	);
}
