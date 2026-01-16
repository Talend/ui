import type { Meta, StoryObj } from '@storybook/react';
import Emphasis from './Emphasis.component';

type Story = StoryObj<typeof Emphasis>;

const meta: Meta<typeof Emphasis> = {
	title: 'Components/Design Principles/Typography/Emphasis',
	component: Emphasis,
	tags: ['autodocs'],
};

export default meta;

export const WithValue: Story = {
	render: () => (
		<div>
			<h1>With value</h1>
			<p>The emphasised text is returned (value = BroWn) :</p>
			<Emphasis value="BroWn" text="The quick brown fox jumps over the lazy dog" />

			<h1>Without value</h1>
			<p>The original text is returned :</p>
			<Emphasis text="The quick brown fox jumps over the lazy dog" />

			<h1>With multiple occurences</h1>
			<p>The emphasised text is returned (value = lazy) :</p>
			<Emphasis value="lazy" text="The lazy quick brown fox jumps over the lazy dog" />

			<h1>With multiple words</h1>
			<p>The emphasised text is returned (value = [lazy,fox,dog]) :</p>
			<Emphasis
				value={['lazy', 'fox', 'dog']}
				text="The lazy quick brown fox jumps over the lazy dog"
			/>

			<h1>With multiple substrings</h1>
			<p>The emphasised text is returned (value = [quick brown fox, lazy dog]) :</p>
			<Emphasis
				value={['quick brown fox', 'lazy dog']}
				text="The lazy quick brown fox jumps over the lazy dog"
			/>
		</div>
	),
};
