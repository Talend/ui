import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { I18nextProvider, translate } from 'react-i18next';
import i18n, { LanguageSwitcher } from './config/i18n';

import { GuidedTour } from '../src/index';
import I18N_DOMAIN_COMPONENTS from '../src/constants';

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
					}, 500);
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
		return (
			<GuidedTour
				steps={this.props.getSteps({
					showControls: this.showControls,
					hideControls: this.hideControls,
					t: this.props.t,
				})}
				onRequestClose={this.closeTour}
				isOpen={isOpen}
				showCloseButton={controls}
				showButtons={controls}
				disableKeyboardNavigation={!controls}
				disableAllInteractions={!controls}
			/>
		);
	}
}

const TranslatedGuidedTourContainer = translate(I18N_DOMAIN_COMPONENTS)(GuidedTourContainer);

// @see https://github.com/elrumordelaluz/reactour#steps
function getSteps({ hideControls, showControls, t }) {
	return [
		{
			selector: '[data-tour="language-switcher"]',
			content: {
				header: 'Hello world',
				body: () => (
					<div
						dangerouslySetInnerHTML={{
							__html: t('GUIDEDTOUR_HELLO_WORD_HTML', {
								defaultValue: 'Hello world<br>You can switch language',
							}),
						}}
					/>
				),
			},
			stepInteraction: true,
			position: 'top',
		},
		{
			selector: '[data-tour="my-first-step"]',
			content: {
				header: 'My first element',
				body: ({ goTo, step }) => (
					<ImportDemo
						beforeLoading={hideControls}
						afterLoading={showControls}
						afterFinish={() => goTo(step)}
					/>
				),
			},
		},
		{
			selector: '[data-tour="my-second-step"]',
			content: {
				header: 'My second element',
				body: 'Place focus on an interactive element',
			},
			position: 'bottom',
			action: elem => {
				elem.focus();
			},
		},
		{
			selector: '[data-tour="my-third-step"]',
			content: {
				header: 'My third element',
				body: 'Highlighted text here',
			},
			style: {
				backgroundColor: '#fdf3da',
			},
		},
		{
			selector: '[data-tour="my-fourth-step"]',
			content: {
				body: 'And here it is just a bear',
			},
		},
	];
}

const getLayoutWithLoremIpsum = () => (
	<div
		style={{
			height: '100vh',
			width: '100vw',
			display: 'flex',
			flexWrap: 'wrap',
			overflowX: 'hidden',
		}}
	>
		<header
			style={{
				height: '5rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '1rem 2rem',
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
				flexBasis: '19vw',
				paddingTop: '3rem',
				textTransform: 'uppercase',
			}}
		>
			<ul>
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
				flexBasis: '79vw',
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
			</article>
		</main>
		<footer
			style={{
				height: '5rem',
				marginTop: 'auto',
				padding: '1rem 2rem',
				flexBasis: '100vw',
				alignItems: 'center',
				textAlign: 'right',
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
			<LanguageSwitcher />
			<I18nextProvider i18n={i18n}>
				<React.Fragment>
					{story()}
					{getLayoutWithLoremIpsum()}
				</React.Fragment>
			</I18nextProvider>
		</React.Fragment>
	))
	.add('default', () => <TranslatedGuidedTourContainer getSteps={getSteps} />);
