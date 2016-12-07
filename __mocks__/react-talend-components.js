import React from 'react';

module.exports = {
	AppHeaderBar: () => (<div className="tc-appheaderbar" />),
	Action: props => (<button className="tc-action">{props.label}</button>),
	Actions: () => (<div className="tc-actions" />),
	SidePanel: () => (<div className="tc-side-panel" />),
};
