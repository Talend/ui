import { createContext, useContext } from 'react';

const columnChooserContext = createContext();

export const useColumnChooserContext = () => {
	const context = useContext(columnChooserContext);
	if (!context) {
		throw new Error(
			'[columnChooserContext]: you are using some column chooser components outside the column chooser context',
		);
	}
	return context;
};

const ColumnChooserProvider = columnChooserContext.Provider;

export { columnChooserContext, ColumnChooserProvider };
