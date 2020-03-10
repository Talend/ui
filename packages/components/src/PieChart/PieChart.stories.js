import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionButton from '../Actions/ActionButton';
import PieChart from './PieChart.component';

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
		color: 'jaffa',
		percentage: 1,
	},
	{
		color: 'dove-gray',
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
		color: 'jaffa',
		percentage: 60,
	},
	{
		color: 'dove-gray',
		percentage: 2,
	},
];

const pieChartData3 = [
	{
		color: 'dove-gray',
		percentage: 0,
	},
];

const sizes = [20, 22, 25, 30, 35, 40, 45, 50];

const onClick = action('You clicked me');
const onMouseDown = action('You mousedown me');
const overlayComponent = <div>I am an overlay</div>;

const stories = storiesOf('Data/Dataviz/PieChart', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('PieChartIcon default', () => (
		<div>
			<p>Small :</p>
			<PieChart display="small" model={pieChartData1} />
			<p>custom size</p>
			<PieChart size={25} model={pieChartData1} />
			<p>Medium :</p>
			<PieChart display="medium" model={pieChartData1} />
			<p>Large : </p>
			<PieChart display="large" model={pieChartData1} />
			<p>X-Large : </p>
			<PieChart display="xlarge" model={pieChartData1} />
			<p>XX-Large : </p>
			<PieChart display="xxlarge" model={pieChartData1} />
			<p>with other data :</p>
			<PieChart display="medium" model={pieChartData2} />
			<p>without label :</p>
			<PieChart display="medium" model={pieChartData2} hideLabel />
			<p>without label to 0% :</p>
			<PieChart display="medium" model={pieChartData3} />
			<p>with tooltip :</p>
			<PieChart
				display="medium"
				model={pieChartData3}
				tooltip
				label="This is a tooltip"
				tooltipPlacement="right"
			/>
		</div>
	))
	.add('PieCharts with edge values', () => {
		const pieChartDataEdge1 = [
			{
				color: 'rio-grande',
				percentage: 99.2,
			},
			{
				color: 'chestnut-rose',
				percentage: 0.8,
			},
		];

		return (
			<div>
				<p> Greater than 99% :</p>
				<PieChart display="medium" model={pieChartDataEdge1} />
				<p> Less than 1% :</p>
				<PieChart display="medium" model={pieChartDataEdge1} labelIndex={1} />
			</div>
		);
	})
	.add('PieChart lot of sizes', () => (
		<div>
			{sizes.map(size => (
				<div key={size}>
					<p>{size}px</p>
					<PieChart size={size} model={pieChartData1} />
				</div>
			))}
		</div>
	))
	.add('PieChart	 lot of loading', () => (
		<div>
			<div>
				{sizes.map(size => (
					<div key={size}>
						<p>{size}px</p>
						<PieChart loading size={size} model={pieChartData1} />
					</div>
				))}
			</div>
		</div>
	))
	.add('PieChartButton default', () => (
		<div>
			<p>Small :</p>
			<PieChart display="small" model={pieChartData1} onClick={onClick} />
			<p>custom size</p>
			<PieChart size={25} model={pieChartData1} onClick={onClick} />
			<p>Medium :</p>
			<PieChart
				display="medium"
				model={pieChartData1}
				onClick={onClick}
				onMouseDown={onMouseDown}
			/>
			<p>Large : </p>
			<PieChart display="large" model={pieChartData1} onClick={onClick} />
			<p>with other data :</p>
			<PieChart display="medium" model={pieChartData2} onClick={onClick} />
			<p>without label :</p>
			<PieChart display="medium" model={pieChartData2} onClick={onClick} hideLabel />
			<p>without label to 0% :</p>
			<PieChart display="medium" model={pieChartData3} onClick={onClick} />
			<p>with overlay component</p>
			<PieChart
				display="medium"
				labelIndex={2}
				model={pieChartData2}
				overlayComponent={overlayComponent}
				overlayId="id-popover"
				onClick={onClick}
			/>
			<p>with a tooltip</p>
			<PieChart
				display="medium"
				model={pieChartData2}
				label="this is a tooltip"
				tooltip
				tooltipPlacement="right"
				onClick={onClick}
			/>
		</div>
	))
	.add('Loading state', () => {
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
						<PieChart display="small" model={pieChartData1} loading={this.state.loading} />
						<p>Medium :</p>
						<PieChart display="medium" model={pieChartData1} loading={this.state.loading} />
						<p>Large :</p>
						<PieChart display="large" model={pieChartData1} loading={this.state.loading} />
						<p>Small without label:</p>
						<PieChart
							display="small"
							hideLabel
							model={pieChartData1}
							loading={this.state.loading}
						/>
						<p>Medium without label:</p>
						<PieChart
							display="medium"
							hideLabel
							model={pieChartData1}
							loading={this.state.loading}
						/>
						<p>Large without label:</p>
						<PieChart
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
