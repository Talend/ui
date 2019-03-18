import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import GuidedTour from '@talend/react-components/lib/GuidedTour';
import Constants from './GuidedTour.constants';

class GuidedTourContainer extends React.Component {
	static displayName = 'Container(GuidedTour)';

	static propTypes = {
		...cmfConnect.propTypes,
		show: PropTypes.bool,
		steps: PropTypes.oneOf([PropTypes.array, PropTypes.func]),
		onClose: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			controls: true,
		};
		this.closeTour = this.closeTour.bind(this);
		this.showControls = this.showControls.bind(this);
		this.hideControls = this.hideControls.bind(this);
	}

	getSteps() {
		const state = this.props && this.props.state;
		const steps = state && state.get('steps');

		if (steps) {
			return steps.toJS();
		}

		return undefined;
	}

	isOpen() {
		const state = this.props && this.props.state;
		return state && state.get('show');
	}

	closeTour() {
		this.showControls();
		this.props.dispatch({ type: Constants.GUIDED_TOUR_HIDE });
		const state = this.props && this.props.state;
		const onRequestClose = state.get('onClose');
		if (state && typeof onRequestClose === 'function') {
			onRequestClose();
		}
	}

	showControls() {
		this.setState({ controls: true });
	}

	hideControls() {
		this.setState({ controls: false });
	}

	render() {
		const { controls } = this.state;

		const steps = this.getSteps();
		if (!steps || !steps.length) {
			return <React.Fragment />;
		}

		const isOpen = this.isOpen();

		return (
			<GuidedTour
				isOpen={isOpen}
				steps={steps}
				onRequestClose={this.closeTour}
				showCloseButton={controls}
				showButtons={controls}
				showNavigation={controls}
				showNumber={controls}
				closeWithMask={controls}
				disableDotsNavigation={!controls}
				disableInteraction={!controls}
				disableKeyboardNavigation={!controls}
				{...omit(this.props, cmfConnect.INJECTED_PROPS)}
			/>
		);
	}
}

export default GuidedTourContainer;
