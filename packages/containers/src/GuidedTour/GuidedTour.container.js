import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import GuidedTour from '@talend/react-components/lib/GuidedTour';

class GuidedTourContainer extends React.Component {
	static displayName = 'Container(GuidedTour)';

	static propTypes = {
		...cmfConnect.propTypes,
		steps: PropTypes.oneOf([PropTypes.array, PropTypes.func]),
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
			controls: true,
		};
		this.getSteps = this.getSteps.bind(this);
		this.closeTour = this.closeTour.bind(this);
		this.showControls = this.showControls.bind(this);
		this.hideControls = this.hideControls.bind(this);
	}

	getSteps() {
		// if (this.props.steps === 'function') {
		// 	return this.props.steps({
		// 		showControls: this.showControls,
		// 		hideControls: this.hideControls,
		// 	});
		// }
		return this.props.steps;
	}

	closeTour() {
		this.showControls();
		this.setState({ isOpen: false });
	}

	showControls() {
		this.setState({ controls: true });
	}

	hideControls() {
		this.setState({ controls: false });
	}

	render() {
		const { controls, isOpen } = this.state;

		if (!this.props.steps) {
			return <React.Fragment />;
		}

		return (
			<GuidedTour
				steps={this.getSteps}
				onRequestClose={this.closeTour}
				isOpen={isOpen}
				showCloseButton={controls}
				showButtons={controls}
				showNavigation={controls}
				showNumber={controls}
				closeWithMask={controls}
				disableDotsNavigation={!controls}
				disableInteraction={!controls}
				disableKeyboardNavigation={!controls}
			/>
		);
	}
}

export default GuidedTourContainer;
