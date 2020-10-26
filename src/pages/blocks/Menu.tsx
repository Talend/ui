import React from 'react';
import Menu from '../../components/Menu';

export default function MenuExample() {
	return (
		<Menu variant="TDI">
			<Menu.Item iconBefore="information" href="#A" active>
				Link A
			</Menu.Item>
			<Menu.Item iconBefore="warning" href="#B">
				Link B
			</Menu.Item>
			<Menu.Item iconBefore="cross" href="#C">
				Link C
			</Menu.Item>
		</Menu>
	);
}
