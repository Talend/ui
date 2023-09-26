import theme from './Status.module.scss';
import { StatusValue } from './Statuses.types';

type StatusProps = { icon: string; label: string; link?: string; status?: StatusValue };

export function Status({ icon, label, link, status }: StatusProps) {
	let attrs;
	if (link) {
		attrs = {
			href: link,
			target: '_blank',
			rel: 'noopener noreferrer',
		};
	}

	return (
		<a className={theme.badge} {...attrs}>
			<span>
				<img src={icon} alt={`${label} icon`} />
				{label}
			</span>
			<span className={theme[`status-${status}`]}>{status}</span>
		</a>
	);
}
