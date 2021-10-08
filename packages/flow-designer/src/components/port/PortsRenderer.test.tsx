import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import PortsRenderer from './PortsRenderer.component';
import { PortRecord } from '../../constants/flowdesigner.model';
import { Id, PortRecord as PortRecordType } from '../../customTypings/index.d';

const MockPort = () => <span>MockPort</span>;

describe('<PortsRenderer />', () => {
	it('renders correctly', () => {
		const ports = Map<Id, PortRecordType>().set(
			'id',
			new PortRecord({
				id: 'id',
				nodeId: 'nodeId',
				graphicalAttributes: Map({
					portType: 'id',
				}),
			}),
		);
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
