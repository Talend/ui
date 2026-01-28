import ConfirmDialog from './ConfirmDialog.component';

const defaultProps = {
	header: 'Hello world',
	show: true,
	validateAction: {
		label: 'OK',
		onClick: () => console.log('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: () => console.log('cancel'),
		className: 'btn-inverse',
	},
};

const propsWithoutHeader = {
	show: true,
	validateAction: {
		label: 'OK',
		onClick: () => console.log('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: () => console.log('cancel'),
		className: 'btn-inverse',
	},
};

const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	validateAction: {
		label: 'OK',
		onClick: () => console.log('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: () => console.log('cancel'),
		className: 'btn-inverse',
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: () => console.log('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: () => console.log('cancel'),
		className: 'btn-inverse',
	},
};

const withProgressBarProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: () => console.log('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: () => console.log('cancel'),
		className: 'btn-inverse',
	},
	progressValue: 66,
	progressLabel: '66%',
};

const children = <div>BODY content. You can put what ever you want here</div>;

const meta = {
	title: 'Components/Layout/Modals/ConfirmDialog',
	component: ConfirmDialog,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
		</div>
	),
};

export const WithoutHeader = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...propsWithoutHeader}>{children}</ConfirmDialog>
		</div>
	),
};

export const Small = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...smallProps}>{children}</ConfirmDialog>
		</div>
	),
};

export const Large = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...largeProps}>{children}</ConfirmDialog>
		</div>
	),
};

export const WithProgressBar = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...withProgressBarProps}>{children}</ConfirmDialog>
		</div>
	),
};

export const WithLotsOfContent = {
	render: () => {
		const rows = [];
		for (let index = 0; index < 50; index++) {
			rows.push(<p key={index}>The content dictate the height</p>);
		}
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...withProgressBarProps}>
					<div>{rows}</div>
				</ConfirmDialog>
			</div>
		);
	},
};

export const WithSecondaryActions = {
	render: () => {
		const propsWithMoreActions = {
			...defaultProps,
			header: 'Delete elements',
			validateAction: {
				label: 'Delete',
				onClick: () => console.log('ok'),
				bsStyle: 'danger',
			},
			secondaryActions: [
				{
					label: 'Show info',
					onClick: () => console.log('info'),
					bsStyle: 'info',
				},
			],
		};
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...propsWithMoreActions}>{children}</ConfirmDialog>
			</div>
		);
	},
};
