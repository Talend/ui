import FormatValue from './FormatValue.component';

const meta = {
	title: 'Components/Formatter/FormatValue',
	component: FormatValue,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => (
		<FormatValue
			value={`   Show special     chars and newline
      `}
		/>
	),
};
