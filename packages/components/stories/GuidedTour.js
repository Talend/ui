import React from 'react';
import { storiesOf } from '@storybook/react';

import { GuidedTour } from '../src/index';

// @see https://github.com/elrumordelaluz/reactour
const steps = [
	{
		selector: '[data-tour="my-first-step"]',
		content: ({ goTo, inDOM }) => (
			<div>
				Lorem ipsum <button onClick={() => alert('Action')}>Action</button>
				<br />
				{inDOM && '🎉 Look at your step!'}
			</div>
		),
		action: node => {
			node.focus();
			console.log('yup, the target element is also focused!');
		},
	},
	{
		selector: '[data-tour="my-second-step"]',
		content: 'Lol',
	},
	{
		selector: '[data-tour="my-third-step"]',
		content: 'Highlighted text here',
		style: {
			backgroundColor: '#fdf3da',
		},
	},
];

storiesOf('GuidedTour', module)
	.addDecorator(story => (
		<div style={{ height: '100vh', width: '100vw', display: 'flex', flexWrap: 'wrap' }}>
			{story()}
			<header style={{ flexBasis: '100vw' }}>
				<h1>Lorem ipsum</h1>
			</header>
			<aside style={{ flexBasis: '20vw' }}>
				<ul style={{ textTransform: 'uppercase' }}>
					<li data-tour="my-first-step">Lorem</li>
					<li data-tour="my-second-step">Ipsum</li>
					<li>Dolor</li>
					<li>sit</li>
					<li>Amet</li>
				</ul>
			</aside>
			<main style={{ flexBasis: '80vw' }}>
				<article>
					<h2>Lorem ipsum</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget blandit arcu.
						Aliquam eu varius tortor. Maecenas mollis erat sit amet massa viverra fermentum. Etiam
						vitae erat ut eros faucibus feugiat. Sed sit amet ante rutrum, convallis quam vitae,
						vulputate mi. Ut viverra ultricies posuere. Duis tempus nec eros et sodales.
					</p>

					<p>
						Proin porta tortor a ex vulputate finibus. Proin convallis turpis massa, eget tempus
						risus fringilla at. In egestas diam non ipsum convallis tempus. Donec finibus, leo eget
						ornare varius, lectus libero fringilla turpis, et tempus dui mi sit amet enim. Fusce
						arcu tortor, sollicitudin ac orci nec, viverra dapibus risus. Pellentesque at augue
						erat. Nullam mi felis, lobortis eu cursus sed, mattis a eros. Maecenas scelerisque
						pharetra ante in gravida. Integer eleifend leo diam, id ornare tortor dignissim sit
						amet. Nullam eget urna scelerisque, suscipit mi vel, rutrum leo. Phasellus ultricies at
						elit non ullamcorper. Phasellus lobortis rutrum ipsum, non aliquet nibh rutrum nec.
						Vivamus eleifend massa non velit finibus consectetur. Aenean egestas fermentum tortor.
					</p>

					<p>
						Sed vel orci a ipsum vulputate cursus. Orci varius natoque penatibus et magnis dis
						parturient montes, nascetur ridiculus mus. Donec tincidunt quam eu tellus auctor
						scelerisque. Ut pharetra neque vel neque fringilla elementum. Fusce eget ornare mi. Nunc
						vel dignissim nisl. <mark data-tour="my-third-step">Vestibulum ante ipsum</mark> primis
						in faucibus orci luctus et ultrices posuere cubilia Curae; Nam malesuada, sem nec
						elementum facilisis, lorem dolor bibendum nisl, in commodo diam arcu in urna. Integer
						molestie tincidunt neque, eu ultricies elit volutpat in. Pellentesque habitant morbi
						tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse faucibus
						bibendum ultrices. Donec sed molestie enim.
					</p>

					<p>
						Curabitur erat eros, ornare quis libero nec, eleifend ultricies purus. Donec non nisi
						vehicula, elementum justo non, facilisis neque. Phasellus risus lectus, egestas eget
						purus sit amet, commodo porttitor velit. Ut justo enim, pharetra nec aliquet eget,
						tincidunt vulputate neque. Praesent libero est, ultrices nec felis quis, bibendum
						pellentesque turpis. Mauris scelerisque tristique nisi quis pharetra. Integer et posuere
						sem. Praesent aliquet ex ac dolor aliquet, viverra aliquet urna sagittis. Nulla eu
						vehicula ipsum. Praesent interdum sapien vel mi blandit aliquam. Pellentesque habitant
						morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean sit amet
						augue dolor. Nunc a fermentum eros. Integer ac auctor nisl. Quisque volutpat arcu in
						purus ornare mollis.
					</p>

					<p>
						Pellentesque sed mattis libero. Proin elementum dictum finibus. Duis magna velit,
						vestibulum non neque at, feugiat ultrices sapien. Pellentesque maximus dolor a tellus
						euismod ultricies. Fusce non elit arcu. Cras vitae porttitor ex. Vivamus posuere nisl ac
						purus bibendum, id ultrices sapien rhoncus. Quisque pellentesque, nisl ac tincidunt
						scelerisque, eros ante commodo massa, eget mollis tellus leo eget augue. Integer sit
						amet lectus mi. Donec ut facilisis enim. In vehicula dapibus sem mattis pharetra. Sed
						eget enim rhoncus, eleifend ligula et, lacinia nunc. Pellentesque habitant morbi
						tristique senectus et netus et malesuada fames ac turpis egestas. Donec in convallis
						lorem, in laoreet mi. Sed tristique in nibh quis viverra.
					</p>
				</article>
			</main>
			<footer style={{ flexBasis: '100vw', textAlign: 'center' }}>
				© Lorem ispum {new Date().getFullYear()}
			</footer>
		</div>
	))
	.add('default', () => <GuidedTour steps={steps} />);
