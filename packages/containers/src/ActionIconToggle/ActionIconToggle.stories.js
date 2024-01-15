import PropTypes from 'prop-types';

import { cmfConnect } from '@talend/react-cmf';
import { Drawer } from '@talend/react-components';

import ActionIconToggle from '.';

export default {
	title: 'ActionIconToggle',
};

function mapStateToProps(state) {
	return {
		opened: state.app.flags['action:icon:creator:flag'],
	};
}

function MyDrawer({ opened }) {
	return opened ? (
		<Drawer>
			<form>
				<div>
					<input id="my-input" type="text" autoFocus />
					<label htmlFor="my-input">Your name</label>
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

export const Default = () => (
	<div>
		<div style={{ padding: '3rem' }}>
			<p>Click on the icon toggle below</p>
			<ActionIconToggle actionId="action-icon-toggle:toggle" />
		</div>
		<MyconnectedDrawer />
	</div>
);
