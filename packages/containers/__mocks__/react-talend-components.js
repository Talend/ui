import React from 'react';

module.exports = {
	AppHeaderBar: () => (<div className="tc-appheaderbar" />),
	Action: props => (<button className="tc-action">{props.label}</button>),
	Actions: () => (<div className="tc-actions" />),
	Notification: props => (<div className="tc-notifications" notifications={props.notifications} />),
	ObjectViewer: () => (<div className="tc-object-viewer" />),
	SidePanel: () => (<div className="tc-side-panel" />),
	List: () => (<div className="tc-list" />),
};
