import React from 'react';
import Menu from '../../components/Layout/Menu';

export default function MenuExample() {
	return (
		<Menu>
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
