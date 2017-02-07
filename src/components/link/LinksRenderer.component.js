import React, { PropTypes } from 'react';
import invariant from 'invariant';
import { mapOf } from 'react-immutable-proptypes';
import { LinkType, PortType } from '../../constants/flowdesigner.proptypes';

class LinksRender extends React.Component {
	static propTypes = {
		links: mapOf(LinkType).isRequired,
		ports: mapOf(PortType).isRequired,
		linkTypeMap: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.renderLink = this.renderLink.bind(this);
	}

	renderLink(link) {
		const ConcreteLink = this.props.linkTypeMap[link.getLinkType()].component;
		const source = this.props.ports.get(link.sourceId);
		const target = this.props.ports.get(link.targetId);
		if (!ConcreteLink) {
			invariant(
				false,
				`<LinksRenderer />  the defined link type in your graph model hasn\'t been mapped into
				the dataflow configuration, check LinkType documentation`
			);
		}
		return (
			<ConcreteLink link={link} source={source} target={target} key={link.id} />
		);
	}

	render() {
		return (
			<g>
				{this.props.links.map(this.renderLink)}
			</g>
		);
	}
}

export default LinksRender;
