import FormatValue from './FormatValue.component';

export default {
	title: 'Components/Formatter/FormatValue',
};

export const Default = () => {
	return (
		<FormatValue
			value={`   Show special     chars and newline
      `}
		/>
	);
};
