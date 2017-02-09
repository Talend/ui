import React from 'react';

const mock = {
	AppHeaderBar: () => (<div className="tc-appheaderbar" />),
	Action: props => (<button className="tc-action">{props.label}</button>),
	Actions: () => (<div className="tc-actions" />),
	CircularProgress: () => (<div className="tc-circular-project" />),
	Layout: () => (<div className="tc-layout" />),
	Notification: props => (<div className="tc-notifications" notifications={props.notifications} />),
	ObjectViewer: () => (<div className="tc-object-viewer" />),
	SidePanel: () => (<div className="tc-side-panel" />),
	List: () => (<div className="tc-list" />),
};

mock.Layout.propTypes = {};

module.exports = mock
