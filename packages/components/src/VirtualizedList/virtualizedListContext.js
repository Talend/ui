import React, { useContext } from 'react';
import PropTypes from 'prop-types';

export const virtualizedListContext = React.createContext();

export function useVirtualizedListContext() {
	const context = useContext(virtualizedListContext);
	if (!context) {
		throw new Error(
			'@talend/react-components > VirtualizedList: you are using a sub component out of VirtualizedList.',
		);
	}
	return context;
}

export function ConsumerVirtualizedList({ children }) {
	const { Consumer } = virtualizedListContext;
	return (
		<Consumer>
			{value => {
				if (value) {
					return children(value);
				}
				throw new Error(
					'@talend/react-components > VirtualizedList: you are using a sub component out of VirtualizedList.',
				);
			}}
		</Consumer>
	);
}

ConsumerVirtualizedList.propTypes = {
	children: PropTypes.func.isRequired,
};
