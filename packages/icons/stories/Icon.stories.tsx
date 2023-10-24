import Icon, { StyleIcon } from './Icon';
import { info as icons } from '../dist/info';

export default {
	title: 'Icons/Icon',
	component: Icon,
};

export const Usage = {
	args: {
		name: 'talend-box',
	},
	argTypes: {
		name: {
			options: Object.keys(icons),
			control: {
				type: 'select',
			},
		},
	},
};

export const All = props => {
	const names = Object.keys(icons);
	return (
		<div>
			<StyleIcon />
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{names.map(name => (
					<div
						key={name}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							margin: '1rem',
						}}
					>
						<Icon name={name} />
						<span style={{ fontSize: '2rem' }}>{name}</span>
					</div>
				))}
			</div>
		</div>
	);
};
