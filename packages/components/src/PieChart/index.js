import PieChartButton from './PieChartButton.component';
import PieChartIcon, { PIECHART_SIZES } from './PieChartIcon.component';
import PieChart from './PieChart.component';

PieChart.Icon = PieChartIcon;
PieChart.Button = PieChartButton;
PieChart.SIZES = PIECHART_SIZES;

export default PieChart;

// TODO 6.0: remove those exports
export { PieChartButton, PieChartIcon, PIECHART_SIZES };
