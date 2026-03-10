import renderer from 'react-test-renderer';

import LinksRenderer from './LinksRenderer.component';
import { LinkRecord, PortRecord, PositionRecord } from '../../constants/flowdesigner.model';
import { LinkRecordMap, PortRecordMap } from '../../customTypings/index.d';

const MockLink = () => <span>MockLink</span>;

describe('<LinksRenderer />', () => {
	it('renders correctly', () => {
		const links: LinkRecordMap = {
			id: new LinkRecord({
				id: 'id',
				sourceId: 'port1',
				targetId: 'port2',
				graphicalAttributes: { linkType: 'id' },
			}),
		};
		const ports: PortRecordMap = {
			port1: new PortRecord({
				id: 'port1',
				nodeId: 'nodeId',
				graphicalAttributes: { position: new PositionRecord({ x: 100, y: 100 }) },
			}),
			port2: new PortRecord({
				id: 'port2',
				nodeId: 'nodeId',
				graphicalAttributes: { position: new PositionRecord({ x: 200, y: 200 }) },
			}),
		};
		const linkTypeMap = { id: { id: 'id', component: MockLink } };
		const tree = renderer
			.create(<LinksRenderer links={links} ports={ports} linkTypeMap={linkTypeMap} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
