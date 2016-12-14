import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Notification, IconsProvider } from '../src/index';

class NotificationWrapper extends React.Component {
	constructor() {
		super();
		this.notifications = [
		];
		this.counter = 1;
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-1',
					message: 'This is a feedback of your operation1, This is a feedback of your operation1',
					action: {
						label: 'Haha',
						icon: 'talend-undo',
						onClick: action('click Haha'),
					},
				},
			]);
			this.setState({	a: 'A' });
		}, 500);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-2',
					type: 'error',
					message: 'This is a feedback of your operation2, This is a feedback of your operation1, This is a feedback of your operation1',
					action: {
						label: 'undo',
						icon: 'talend-undo',
						onClick: action('click undo'),
					},
				},
			]);
			this.setState({	b: 'B' });
		}, 1000);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-3',
					type: 'warning',
					message: 'This is a feedback of your operation3',
				},
			]);
			this.setState({	b: 'B' });
		}, 2000);
		setTimeout(() => {
			this.notifications = this.notifications.concat([
				{
					id: 'story-4',
					type: 'warning',
					message: 'This is a feedback of your operation4',
				},
			]);
			this.setState({	b: 'B' });
		}, 2500);
	}
	leaveFn(notification) {
		const index = this.notifications.indexOf(notification);
		if (index !== -1) {
			this.notifications.splice(index, 1);
			this.setState({ count: this.counter + 1 });
		}
	}
	render() {
		return (
			<Notification
				leaveFn={i => this.leaveFn(i)}
				notifications={this.notifications}
			/>
		);
	}
}

storiesOf('Notification', module)
	.addWithInfo('default', () => (
		<nav>
			<h1>Notification</h1>
			<IconsProvider />
			<h2>Definition</h2>
			<p>The Notification component display </p>
			<h2>Examples</h2>
			<NotificationWrapper />
		</nav>
	));
