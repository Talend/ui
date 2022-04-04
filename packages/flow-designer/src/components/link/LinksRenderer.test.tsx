/* eslint-disable new-cap */
import React from 'react';
import renderer from 'react-test-renderer';
import { Map, OrderedMap } from 'immutable';

import LinksRenderer from './LinksRenderer.component';
import { LinkRecord, PortRecord, PositionRecord } from '../../constants/flowdesigner.model';
import {
	Id,
	LinkRecord as LinkRecordType,
	PortRecord as PortRecordType,
} from '../../customTypings/index.d';

const MockLink = () => <span>MockLink</span>;

describe('<LinksRenderer />', () => {
	it('renders correctly', () => {
		const links = Map<Id, LinkRecordType>().set(
			'id',
			new LinkRecord({
				id: 'id',
				sourceId: 'port1',
				targetId: 'port2',
				graphicalAttributes: Map({
					linkType: 'id',
				}),
			}),
		);
		const ports = OrderedMap<Id, PortRecordType>()
			.set(
				'port1',
				new PortRecord({
					id: 'port1',
					nodeId: 'nodeId',
					graphicalAttributes: Map({
						position: new PositionRecord({ x: 100, y: 100 }),
					}),
				}),
			)
			.set(
				'port2',
				new PortRecord({
					id: 'port2',
					nodeId: 'nodeId',
					graphicalAttributes: Map({
						position: new PositionRecord({ x: 200, y: 200 }),
					}),
				}),
			);
		const linkTypeMap = { id: { id: 'id', component: MockLink } };
		const tree = renderer
			.create(<LinksRenderer links={links} ports={ports} linkTypeMap={linkTypeMap} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
