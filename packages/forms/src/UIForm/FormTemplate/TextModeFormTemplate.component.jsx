export default function TextModeFormTemplate({ widgetsRenderer, children }) {
	return (
		<>
			{widgetsRenderer()}
			{children}
		</>
	);
}
