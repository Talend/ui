import type { ReactElement, PropsWithChildren } from 'react';

import Badge from './Badge';

import { StackHorizontal, StackItem } from '../../';

const StatusList = ({ children }: PropsWithChildren<any>) => {
	return (
		<StackHorizontal gap="XS" as="ul" role="list" align="center" margin={{ x: 0, y: 'M' }}>
			{children.map((child: ReactElement<typeof Badge>, key: number) => (
				<StackItem as="li" key={key}>
					{child}
				</StackItem>
			))}
		</StackHorizontal>
	);
};

export default StatusList;
