import renderer from 'react-test-renderer';

import PortsRenderer from './PortsRenderer.component';
import { PortRecord } from '../../constants/flowdesigner.model';
import { PortRecordMap } from '../../customTypings/index.d';

const MockPort = () => <span>MockPort</span>;

describe('<PortsRenderer />', () => {
	it('renders correctly', () => {
		const ports: PortRecordMap = {
			id: new PortRecord({
				id: 'id',
				nodeId: 'nodeId',
				graphicalAttributes: { portType: 'id' },
			}),
		};
		const portTypeMap = {
			id: {
				id: 'id',
				component: MockPort,
			},
		};
		const tree = renderer
			.create(<PortsRenderer ports={ports} portTypeMap={portTypeMap} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
