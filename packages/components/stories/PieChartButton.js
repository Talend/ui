import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionButton from '../src/Actions/ActionButton';
import PieChartButton from '../src/PieChartButton';

const pieChartData1 = [
	{
		color: 'rio-grande',
		percentage: 50,
	},
	{
		color: 'chestnut-rose',
		percentage: 12,
	},
	{
		color: 'lightning-yellow',
		percentage: 1,
	},
	{
		color: 'slate-gray',
		percentage: 4,
	},
	{
		color: 'silver-chalice',
		percentage: 3,
	},
];

const pieChartData2 = [
	{
		color: 'rio-grande',
		percentage: 15,
	},
	{
		color: 'chestnut-rose',
		percentage: 15,
	},
	{
		color: 'lightning-yellow',
		percentage: 60,
	},
	{
		color: 'slate-gray',
		percentage: 2,
	},
];

const sizes = [20, 22, 25, 30, 35, 40, 45, 50];

const onClick = action('You clicked me');
const onMouseDown = action('You mousedown me');
const overlayComponent = <div>I am an overlay</div>;

const stories = storiesOf('PieChartButton', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.addWithInfo('default', () => (
		<div>
			<p>Small :</p>
			<PieChartButton display="small" model={pieChartData1} onClick={onClick} />
			<p>custom size</p>
			<PieChartButton size={25} model={pieChartData1} onClick={onClick} />
			<p>Medium :</p>
			<PieChartButton display="medium" model={pieChartData1} onMouseDown={onMouseDown} />
			<p>Large : </p>
			<PieChartButton display="large" model={pieChartData1} />
			<p>with other data :</p>
			<PieChartButton display="medium" model={pieChartData2} />
			<p>with without label :</p>
			<PieChartButton display="medium" model={pieChartData2} hideLabel />
			<p>with overlay component</p>
			<PieChartButton
				display="medium"
				labelIndex={2}
				model={pieChartData2}
				overlayComponent={overlayComponent}
				overlayId="id-popover"
				onClick={onClick}
			/>
			<p>with a tooltip</p>
			<PieChartButton
				display="medium"
				model={pieChartData2}
				label="this is a tooltip"
				tooltip
				tooltipPlacement="right"
				onClick={onClick}
			/>
		</div>
	))
	.addWithInfo('lot of sizes', () => (
		<div>
			{sizes.map(size => (
				<div key={size}>
					<p>{size}px</p>
					<PieChartButton size={size} model={pieChartData1} />
				</div>
			))}
		</div>
	))
	.addWithInfo('lot of loading', () => (
		<div>
			<div>
				{sizes.map(size => (
					<div key={size}>
						<p>{size}px</p>
						<PieChartButton loading size={size} model={pieChartData1} />
					</div>
				))}
			</div>
		</div>
	))
	.addWithInfo('Loading state', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.changeState = this.changeState.bind(this);
				this.state = { loading: true };
			}

			changeState() {
				this.setState(prevState => ({
					loading: !prevState.loading,
				}));
			}

			render() {
				return (
					<div>
						<ActionButton label="changestatus" onClick={this.changeState} />
						<p>Small :</p>
						<PieChartButton display="small" model={pieChartData1} loading={this.state.loading} />
						<p>Medium :</p>
						<PieChartButton display="medium" model={pieChartData1} loading={this.state.loading} />
						<p>Large :</p>
						<PieChartButton display="large" model={pieChartData1} loading={this.state.loading} />
						<p>Small without label:</p>
						<PieChartButton
							display="small"
							hideLabel
							model={pieChartData1}
							loading={this.state.loading}
						/>
						<p>Medium without label:</p>
						<PieChartButton
							display="medium"
							hideLabel
							model={pieChartData1}
							loading={this.state.loading}
						/>
						<p>Large without label:</p>
						<PieChartButton
							display="large"
							hideLabel
							model={pieChartData1}
							loading={this.state.loading}
						/>
						<p>after large</p>
					</div>
				);
			}
		}
		return <WithLayout />;
	});
