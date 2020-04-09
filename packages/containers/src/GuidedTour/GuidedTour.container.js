import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import GuidedTour from '@talend/react-components/lib/GuidedTour';

class GuidedTourContainer extends React.Component {
	static displayName = 'Container(GuidedTour)';

	static propTypes = {
		...cmfConnect.propTypes,
		show: PropTypes.bool,
		steps: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
		onClose: PropTypes.func,
	};

	state = {
		controls: true,
	};

	getSteps = () => {
		const { steps, t } = this.props;
		if (steps) {
			if (typeof steps === 'function') {
				return steps({
					showControls: this.showControls,
					hideControls: this.hideControls,
					t,
				});
			}
			return steps;
		}
		return undefined;
	};

	closeTour = () => {
		this.showControls();
		if (this.props.onClose) {
			this.props.onClose();
		}

		this.props.setState({ show: false });
	};

	showControls = () => {
		this.setState({ controls: true });
	};

	hideControls = () => {
		this.setState({ controls: false });
	};

	render() {
		const steps = this.getSteps();
		if (!steps || !steps.length) {
			return <React.Fragment />;
		}

		const { controls } = this.state;
		return (
			<GuidedTour
				isOpen={this.props.state.get('show')}
				steps={steps}
				onRequestClose={this.closeTour}
				showCloseButton={controls}
				showButtons={controls}
				disableKeyboardNavigation={!controls}
				disableAllInteractions={!controls}
				{...omit(this.props, cmfConnect.INJECTED_PROPS)}
			/>
		);
	}
}

export default GuidedTourContainer;
