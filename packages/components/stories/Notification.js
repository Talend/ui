import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { Notification, IconsProvider } from '../src/index';

const icons = {
	'talend-cross': talendIcons['talend-cross'],
	'talend-undo': talendIcons['talend-undo'],
};

class NotificationWrapper extends React.Component {
	constructor() {
		super();
		this.notifications = [];
		this.state = { counter: 1 };
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-1',
					type: 'error',
					title: 'Story 1 example title',
					message: 'This is a feedback of your operation1, This is a feedback of your operation1, This is a feedback of your operation1',
					action: {
						label: 'Haha',
						icon: 'talend-undo',
						onClick: action('click Haha'),
					},
				},
			]);
			this.setState({ counter: this.state.counter + 1 });
		}, 500);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-2',
					type: 'error',
					title: 'Story 2 example title ',
					message: [
						'This is a feedback of your operation2',
						'This is a feedback of your operation1, This is a feedback of your operation1',
						'This is a feedback of your operation1, This is a feedback of your operation1',
						'This is a feedback of your operation1, This is a feedback of your operation1',
						'This is a feedback of your operation1, This is a feedback of your operation1',
						'This is a feedback of your operation1, This is a feedback of your operation1',
					],
					action: {
						label: 'undo',
						icon: 'talend-undo',
						onClick: action('click undo'),
					},
				},
			]);
			this.setState({ counter: this.state.counter + 1 });
		}, 1000);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-3',
					type: 'warning',
					message: ['This is a feedback of your operation3', 'details'],
				},
			]);
			this.setState({ counter: this.state.counter + 1 });
		}, 2000);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-4',
					type: 'warning',
					message: 'This is a feedback of your operation4',
				},
			]);
			this.setState({ counter: this.state.counter + 1 });
		}, 2500);
	}
	leaveFn(notification) {
		const index = this.notifications.indexOf(notification);
		if (index !== -1) {
			this.notifications.splice(index, 1);
			this.setState({ counter: this.state.counter - 1 });
		}
	}
	render() {
		return <Notification leaveFn={i => this.leaveFn(i)} notifications={this.notifications} />;
	}
}

storiesOf('Notification', module).addWithInfo('default', () => (
	<nav>
		<h1>Notification</h1>
		<IconsProvider defaultIcons={icons} />
		<h2>Definition</h2>
		<p>
			The Notification component display notification
			<ul>
				<li>Type: info, error, warning</li>
				<li>Slide in, auto slide out after timeout(except error)</li>
				<li>Timerbar show remaining time before slide out</li>
				<li>Hover or click to pin</li>
			</ul>
		</p>
		<h2>Examples</h2>
		<NotificationWrapper />
	</nav>
));
