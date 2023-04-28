import { BrowserRouter, Link } from 'react-router-dom';
import { Breadcrumbs } from '@talend/design-system';

export default {
	component: Breadcrumbs,
};

export const Basic = () => (
	<Breadcrumbs
		items={[
			{
				label: 'Link example',
				href: '/',
			},
			{
				label: 'Label',
				href: '/here',
			},
		]}
	/>
);

export const Advanced = () => (
	<Breadcrumbs
		items={[
			{
				label: 'Link example',
				href: '/',
			},
			{
				label: 'Link example',
				href: '/here',
			},
			{
				label: 'Link example',
				href: '/there',
				target: '_blank',
			},
			{
				label: 'Link example',
				href: '/away',
			},
			{
				label: 'Link example that is much too long and should create an ellipsis if all is well',
				href: '/more',
			},
			{
				label: 'Label',
				href: '/here',
			},
		]}
	/>
);

export const Usage = () => (
	<BrowserRouter>
		<Breadcrumbs
			items={[
				{
					label: 'Link example',
					as: <Link to="/documentation" />,
				},
				{
					label: 'Other Link example',
					as: <Link to="/documentation" />,
				},
			]}
		/>
	</BrowserRouter>
);

export const FullWidth = () => (
	<BrowserRouter>
		<Breadcrumbs
			items={[
				{
					label: 'Link example with a label that is too long',
					as: <Link to="/documentation" />,
				},
				{
					label: 'Link example with a label that is still too long',
					as: <Link to="/documentation" />,
				},
				{
					label: 'Link example with a label that is yet again too long',
					href: '/documentation',
				},
				{
					label: 'Link example with a label that is still and forever too long',
					href: '/documentation',
				},
			]}
		/>
	</BrowserRouter>
);
