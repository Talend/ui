import { Component, ComponentType } from 'react';
import { LinkRecordMap, PortRecordMap } from '../../customTypings/index.d';

type Props = {
	links: LinkRecordMap;
	ports: PortRecordMap;
	linkTypeMap: Record<string, { component: ComponentType<any> }>;
};

class LinksRender extends Component<Props> {
	render() {
		const links = this.props.links.toArray();
		return (
			<g>
				{links.map(link => {
					const ConcreteLink = this.props.linkTypeMap[link.getLinkType()].component;
					const source = this.props.ports.get(link.sourceId);
					const target = this.props.ports.get(link.targetId);

					return <ConcreteLink link={link} source={source} target={target} key={link.id} />;
				})}
			</g>
		);
	}
}

export default LinksRender;
