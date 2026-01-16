import type { Meta, StoryObj } from '@storybook/react';
import FormatValue from './FormatValue.component';

type Story = StoryObj<typeof FormatValue>;

const meta: Meta<typeof FormatValue> = {
	title: 'Components/Formatter/FormatValue',
	component: FormatValue,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	render: () => (
		<FormatValue
			value={`   Show special     chars and newline
      `}
		/>
	),
};
