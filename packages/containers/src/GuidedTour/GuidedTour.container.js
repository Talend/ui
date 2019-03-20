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

		const stepsFromState = this.props.state.get('steps');
		if (stepsFromState) {
			return stepsFromState.toJS();
		}

		return undefined;
	}

	closeTour() {
		this.showControls();

		this.props.setState({ show: false });
	}

	showControls() {
		this.setState({ controls: true });
	}

	hideControls() {
		this.setState({ controls: false });
	}

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
