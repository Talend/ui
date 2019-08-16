/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import DateTime from '../DateTime';


const PROPS_TO_OMIT_FOR_INPUT = [
	'dateFormat',
	'formMode',
	'id',
	'required',
	'selectedDateTime',
	'useSeconds',
	'useTime',
	'useUTC',
	'onBlur',
	'onChange',
	'onClick',
	'onFocus',
	'onKeyDown',
	'formManagement',
	'showPicker',
	'setRef',
	'setContainerRef',
];

export const INPUT_PICKER_PROPTYPES = {
	id: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
	formMode: PropTypes.bool,
};

export default function createInputPicker({ part, theme, Picker }) {
	return class InputPicker extends React.Component {
		static propTypes = {
			...INPUT_PICKER_PROPTYPES,
			formManagement: PropTypes.object,
		};

		constructor(props) {
			super(props);
			this.popoverId = `input-${part}-picker-${props.id || uuid.v4()}`;
		}

		getPopperPlacement() {
			const input = this.inputRef;
			if (input) {
				const inputDimensions = input.getBoundingClientRect();
				if (inputDimensions.left > window.innerWidth / 2) {
					return 'bottom-end';
				}
			}
			return 'bottom-start';
		}

		render() {
			const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);
			const picker = [
				<DateTime.Input
					{...inputProps}
					id={`${this.props.id}-${part}-input`}
					key="input"
					inputRef={ref => {
						this.inputRef = ref;
						this.props.setRef(ref);
					}}
					part={part}
				/>,
				this.props.showPicker && (
					<Popper
						key="popper"
						modifiers={{
							hide: {
								enabled: false,
							},
							preventOverflow: {
								enabled: false,
							},
						}}
						placement={this.getPopperPlacement()}
						positionFixed
						referenceElement={this.inputRef}
					>
						{({ ref, style }) => (
							<div id={this.popoverId} className={theme.popper} style={style} ref={ref}>
								<Picker {...this.props} />
								{this.props.formMode && <DateTime.Validation />}
							</div>
						)}
					</Popper>
				),
			].filter(Boolean);

			return (
				<FocusManager
					className="focus-manager"
					divRef={ref => {
						this.containerRef = ref;
						this.props.setContainerRef(ref);
					}}
					onClick={this.props.onClick}
					onFocusIn={this.props.onFocus}
					onFocusOut={event => {
						this.props.onBlur(event, this.props.formManagement, part);
					}}
					onKeyDown={event => {
						this.props.onKeyDown(event, this.props.formManagement, part);
					}}
				>
					{picker}
				</FocusManager>
			);
		}
	};
}

