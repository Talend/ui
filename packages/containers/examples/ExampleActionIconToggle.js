import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';

import { ActionIconToggle } from '../src';

export function mapStateToProps(state) {
	return {
		opened: state.app.flags['action:icon:creator:flag'],
	};
}

function MyDrawer({ opened }) {
	return opened ? (
		<Drawer>
			<form>
				<div className="form-group">
					<input className="form-control" id="my-input" type="text" autoFocus />
					<label className="control-label" htmlFor="my-input">
						Your name
					</label>
				</div>
				<button
					className="btn btn-primary"
					onClick={e => {
						e.stopPropagation();
					}}
				>
					Submit
				</button>
			</form>
		</Drawer>
	) : null;
}
MyDrawer.propTypes = { opened: PropTypes.bool };
MyDrawer.displayName = 'MyDrawer';
const MyconnectedDrawer = cmfConnect({ mapStateToProps })(MyDrawer);

export default function ExampleActionIconToggle() {
	return (
		<div>
			<div style={{ padding: '3rem' }}>
				<p>Click on the icon toggle below</p>
				<ActionIconToggle actionId="action:icon:toggle" />
			</div>
			<MyconnectedDrawer />
		</div>
	);
}
