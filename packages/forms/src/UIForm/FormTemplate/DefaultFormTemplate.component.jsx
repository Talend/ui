export default function DefaultFormTemplate({ widgetsRenderer, buttonsRenderer, children }) {
	return (
		<>
			{widgetsRenderer()}
			{children}
			{buttonsRenderer()}
		</>
	);
}
