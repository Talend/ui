import classnames from 'classnames';

export type ErrorProps = {
	hidden: boolean;
	errors: { code: string; message: string }[];
	id: string;
};

export default function Error({ hidden, errors, id }: ErrorProps) {
	const classNames = classnames({ 'sr-only': hidden });
	return (
		<div id={id} className={classNames} aria-hidden={hidden}>
			{errors.map((error, index) => (
				<span key={index} data-testid={error.code}>
					{error.message}
				</span>
			))}
		</div>
	);
}
