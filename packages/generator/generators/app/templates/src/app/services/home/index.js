import { reducer, toggleSidePanel, isSidePanelDocked } from './home.service';

export const homeModule = { id: 'myapp-home', reducer };

export default {
	actionCreators: {
		toggleSidePanel,
	},
	selectors: {
		isSidePanelDocked,
	},
};
