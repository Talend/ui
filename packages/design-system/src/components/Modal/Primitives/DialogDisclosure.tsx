export type DialogDisclosurePropsType = React.HTMLAttributes<HTMLButtonElement> & {};

export function DialogDisclosure(props: DialogDisclosurePropsType) {
	const { children, ...rest } = props;

	return <button {...rest}>{children}</button>;
}
