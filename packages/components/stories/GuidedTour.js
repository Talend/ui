import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { GuidedTour } from '../src/index';

class ImportDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			finish: false,
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.beforeLoading();
		this.setState({ loading: true }, () => {
			setTimeout(() => {
				this.setState({ loading: false, finish: true }, () => {
					this.props.afterLoading();
					setTimeout(() => {
						this.props.afterFinish();
					}, 2000);
				});
			}, 3000);
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					<strong>Loading ⏳</strong>
					<br />
					<small>Note that controls are disabled</small>
				</div>
			);
		} else if (this.state.finish) {
			return <span>Finish ✅</span>;
		}
		return (
			<button className={'btn btn-info'} onClick={this.onClick}>
				Simulate import
			</button>
		);
	}
}

class GuidedTourContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			isOpen: true,
		};
		this.onRequestClose = this.onRequestClose.bind(this);
	}

	onRequestClose() {
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<GuidedTour
				steps={this.props.steps}
				onRequestClose={this.onRequestClose}
				isOpen={this.state.isOpen}
			/>
		);
	}
}

let body;

function toggleControlsVisibility(toggle) {
	const controls = body.querySelectorAll('[data-tour-elem="controls"] button');
	controls.forEach(control => {
		control.setAttribute('style', toggle ? 'display: block' : 'display: none');
	});
}

function beforeLoading() {
	toggleControlsVisibility(false);
}

function afterLoading() {
	toggleControlsVisibility(true);
}

// @see https://github.com/elrumordelaluz/reactour#steps
const steps = [
	{
		content: 'Hello world',
		stepInteraction: false,
	},
	{
		selector: '[data-tour="my-first-step"]',
		content: ({ goTo, step }) => (
			<ImportDemo
				beforeLoading={beforeLoading}
				afterLoading={afterLoading}
				afterFinish={() => goTo(step)}
			/>
		),
		action: elem => {
			body = elem.ownerDocument.body;
		},
	},
	{
		selector: '[data-tour="my-second-step"]',
		content: 'Place focus on an interactive element',
		position: 'bottom',
		action: elem => {
			elem.focus();
		},
	},
	{
		selector: '[data-tour="my-third-step"]',
		content: 'Highlighted text here',
		style: {
			backgroundColor: '#fdf3da',
		},
	},
	{
		selector: '[data-tour="my-fourth-step"]',
		content: 'And here it is just a bear',
	},
];

const getLayoutWithLoremIpsum = () => (
	<div
		style={{
			height: '100vh',
			width: '100vw',
			display: 'flex',
			flexWrap: 'wrap',
		}}
	>
		<header
			style={{
				height: '5rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '1rem',
				flexBasis: '100vw',
				background: '#eee',
			}}
		>
			<span>Lorem ipsum</span>
			<button data-tour="my-second-step" onClick={action('Button clicked')}>
				👤 User NAME
			</button>
		</header>
		<aside
			style={{
				flexBasis: '20vw',
				textTransform: 'uppercase',
			}}
		>
			<ul style={{}}>
				<li data-tour="my-first-step">Lorem</li>
				<li>Ipsum</li>
				<li>Dolor</li>
				<li>sit</li>
				<li>Amet</li>
			</ul>
		</aside>
		<main
			style={{
				padding: '1rem',
				flexBasis: '80vw',
			}}
		>
			<article>
				<h1>Lorem ipsum</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget blandit arcu. Aliquam
					eu varius tortor. Maecenas mollis erat sit amet massa viverra fermentum. Etiam vitae erat
					ut eros faucibus feugiat. Sed sit amet ante rutrum, convallis quam vitae, vulputate mi. Ut
					viverra ultricies posuere. Duis tempus nec eros et sodales.
				</p>

				<p>
					Proin porta tortor a ex vulputate finibus. Proin convallis turpis massa, eget tempus risus
					fringilla at. In egestas diam non ipsum convallis tempus. Donec finibus, leo eget ornare
					varius, lectus libero fringilla turpis, et tempus dui mi sit amet enim. Fusce arcu tortor,
					sollicitudin ac orci nec, viverra dapibus risus. Pellentesque at augue erat. Nullam mi
					felis, lobortis eu cursus sed, mattis a eros. Maecenas scelerisque pharetra ante in
					gravida. Integer eleifend leo diam, id ornare tortor dignissim sit amet. Nullam eget urna
					scelerisque, suscipit mi vel, rutrum leo. Phasellus ultricies at elit non ullamcorper.
					Phasellus lobortis rutrum ipsum, non aliquet nibh rutrum nec. Vivamus eleifend massa non
					velit finibus consectetur. Aenean egestas fermentum tortor.
				</p>

				<p>
					Sed vel orci a ipsum vulputate cursus. Orci varius natoque penatibus et magnis dis
					parturient montes, nascetur ridiculus mus. Donec tincidunt quam eu tellus auctor
					scelerisque. Ut pharetra neque vel neque fringilla elementum. Fusce eget ornare mi. Nunc
					vel dignissim nisl. <mark data-tour="my-third-step">Vestibulum ante ipsum</mark> primis in
					faucibus orci luctus et ultrices posuere cubilia Curae; Nam malesuada, sem nec elementum
					facilisis, lorem dolor bibendum nisl, in commodo diam arcu in urna. Integer molestie
					tincidunt neque, eu ultricies elit volutpat in. Pellentesque habitant morbi tristique
					senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus bibendum
					ultrices. Donec sed molestie enim.
				</p>

				<p>
					Curabitur erat eros, ornare quis libero nec, eleifend ultricies purus. Donec non nisi
					vehicula, elementum justo non, facilisis neque. Phasellus risus lectus, egestas eget purus
					sit amet, commodo porttitor velit. Ut justo enim, pharetra nec aliquet eget, tincidunt
					vulputate neque. Praesent libero est, ultrices nec felis quis, bibendum pellentesque
					turpis. Mauris scelerisque tristique nisi quis pharetra. Integer et posuere sem. Praesent
					aliquet ex ac dolor aliquet, viverra aliquet urna sagittis. Nulla eu vehicula ipsum.
					Praesent interdum sapien vel mi blandit aliquam. Pellentesque habitant morbi tristique
					senectus et netus et malesuada fames ac turpis egestas. Aenean sit amet augue dolor. Nunc
					a fermentum eros. Integer ac auctor nisl. Quisque volutpat arcu in purus ornare mollis.
				</p>

				<p>
					Pellentesque sed mattis libero. Proin elementum dictum finibus. Duis magna velit,
					vestibulum non neque at, feugiat ultrices sapien. Pellentesque maximus dolor a tellus
					euismod ultricies. Fusce non elit arcu. Cras vitae porttitor ex. Vivamus posuere nisl ac
					purus bibendum, id ultrices sapien rhoncus. Quisque pellentesque, nisl ac tincidunt
					scelerisque, eros ante commodo massa, eget mollis tellus leo eget augue. Integer sit amet
					lectus mi. Donec ut facilisis enim. In vehicula dapibus sem mattis pharetra. Sed eget enim
					rhoncus, eleifend ligula et, lacinia nunc. Pellentesque habitant morbi tristique senectus
					et netus et malesuada fames ac turpis egestas. Donec in convallis lorem, in laoreet mi.
					Sed tristique in nibh quis viverra.
				</p>
			</article>
		</main>
		<footer
			style={{
				height: '5rem',
				marginTop: 'auto',
				padding: '1rem',
				flexBasis: '100vw',
				alignItems: 'center',
				textAlign: 'center',
				background: '#eee',
			}}
		>
			<span data-tour="my-fourth-step">🧸 Lorem ispum</span>
		</footer>
	</div>
);

storiesOf('GuidedTour', module)
	.addDecorator(story => (
		<React.Fragment>
			{story()}
			{getLayoutWithLoremIpsum()}
		</React.Fragment>
	))
	.add('default', () => <GuidedTourContainer steps={steps} />);
