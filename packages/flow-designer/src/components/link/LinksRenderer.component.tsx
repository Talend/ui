import React from 'react';
import invariant from 'invariant';
import get from 'lodash/get';
import { LinkRecordMap, PortRecordMap, LinkRecord } from '../../customTypings/index.d';

type Props = {
	links: LinkRecordMap;
	ports: PortRecordMap;
	linkTypeMap: Object;
};

class LinksRender extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.renderLink = this.renderLink.bind(this);
	}

	renderLink(link: LinkRecord) {
		const ConcreteLink = get((this.props.linkTypeMap as any)[link.getLinkType()], 'component');
		const source = this.props.ports.get(link.sourceId);
		const target = this.props.ports.get(link.targetId);
		if (!ConcreteLink) {
			invariant(
				false,
				`<LinksRenderer /> the defined link type in your graph model
				hasn't been mapped into the dataflow configuration,
				check LinkType documentation`,
			);
		}
		return <ConcreteLink link={link} source={source} target={target} key={link.id} />;
	}

	render() {
		return <g>{this.props.links.valueSeq().map(this.renderLink)}</g>;
	}
}

export default LinksRender;
