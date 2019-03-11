import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import { List } from 'immutable';
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
		this.closeTour = this.closeTour.bind(this);
		this.showControls = this.showControls.bind(this);
		this.hideControls = this.hideControls.bind(this);
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
		const state = this.props.state;
		const steps = state.get('steps', List());

		if (!steps) {
			return <React.Fragment />;
		}

		return (
			<GuidedTour
				steps={steps.toJS()}
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
