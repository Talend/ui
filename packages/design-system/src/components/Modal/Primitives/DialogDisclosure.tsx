export type DialogDisclosurePropsType = React.HTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode | ((props: any) => React.ReactNode);
};

export function DialogDisclosure(props: DialogDisclosurePropsType) {
	const { children, ...rest } = props;

	return <button {...rest}>{children}</button>;
}
