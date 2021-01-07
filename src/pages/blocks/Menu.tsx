import React from 'react';
import Menu from '../../components/Menu';

export default function MenuExample() {
	return (
		<Menu variant="TDI">
			<Menu.Item iconBefore="talend-info-circle" href="#A" active>
				Link A
			</Menu.Item>
			<Menu.Item iconBefore="talend-warning" href="#B">
				Link B
			</Menu.Item>
			<Menu.Item iconBefore="talend-cross" href="#C">
				Link C
			</Menu.Item>
		</Menu>
	);
}
