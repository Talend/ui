import React from 'react';

const mock = {
	AppHeaderBar: props => (<div className="tc-appheaderbar" {...props} />),
	Action: props => (<button className="tc-action" {...props} />),
	Actions: props => (<div className="tc-actions" {...props} />),
	CircularProgress: props => (<div className="tc-circular-project" {...props}/>),
	Layout: props => (
		<div className="tc-mock-layout">
			<div className="tc-mock-layout-sidepanel" {...props.sidepanel} />
			<div className="tc-mock-layout-list" {...props.list} />
			{props.children}
		</div>
	),
	Notification: props => (<div className="tc-notifications" notifications={props.notifications} />),
	ObjectViewer: props => (<div className="tc-object-viewer" {...props} />),
	SidePanel: props => (<div className="tc-side-panel" {...props} />),
	List: props => (<div className="tc-list" {...props} />),
};

mock.Layout.propTypes = {};

module.exports = mock;
