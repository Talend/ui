import React from 'react';
import Password from 'react-jsonschema-form/lib/components/widgets/PasswordWidget';
import classNames from 'classnames';
import { renderActions } from '../../Form';
import theme from './TogglePasswordWidget.scss';

export default class TogglePasswordWidget extends React.Component {

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.state = {
			type: 'password',
		};
	}

	onToggle() {
		this.setState({ type: this.state.type === 'text' ? 'password' : 'text' });
	}

	handleActionClick(onClick) { // eslint-disable-line class-methods-use-this
		if (onClick) {
			return () => onClick();
		}
		return () => {
		};
	}

	render() {
		const propsWithToggleType = {
			...this.props,
			type: this.state.type,
		};
		return (
			<div className={classNames(theme['btn-group'], 'btn-group')}>
				<Password {...propsWithToggleType} />
				{renderActions([{
					label: '',
					icon: propsWithToggleType.type === 'password' ? 'talend-locked' : 'talend-unlocked',
					onClick: this.onToggle,
				},
				], this.handleActionClick)}
			</div>
		);
	}
}
