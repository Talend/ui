import React from 'react';
import renderer from 'react-test-renderer';
import { Map, OrderedMap } from 'immutable';

import LinksRenderer from './LinksRenderer.component';
import { LinkRecord, PortRecord, PositionRecord } from '../../constants/flowdesigner.model';

const MockLink = () => (
	<span>MockLink</span>
);


describe('<LinksRenderer />', () => {
	it('renders correctly', () => {
		const links = new Map().set('id', new LinkRecord({
			id: 'id',
			sourceId: 'port1',
			targetId: 'port2',
			graphicalAttributes: new Map({
				linkType: 'id',
			}),
		}));
		const ports = new OrderedMap()
		.set('port1', new PortRecord({
			id: 'port1',
			graphicalAttributes: new Map({ position: new PositionRecord({ x: 100, y: 100 }) }),
		}))
		.set('port2', new PortRecord({
			id: 'port2',
			graphicalAttributes: new Map({ position: new PositionRecord({ x: 200, y: 200 }) }),
		}));
		const linkTypeMap = {
			id: { id: 'id', component: MockLink },
		};
		const tree = renderer.create(
			<LinksRenderer links={links} ports={ports} linkTypeMap={linkTypeMap} />,
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
