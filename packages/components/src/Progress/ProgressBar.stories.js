import Progress from './Progress.component';

const containerStyle = {
	border: '1px solid black',
	width: '450px',
	height: '200px',
};

export default {
	title: 'Components/Messaging & Communication/ProgressBar',
};

export const Percent = () => (
	<div>
		<h1>Action</h1>
		<h2>Definition</h2>
		<p>
			The component displays a progress bar at the top of the window.
			<br />
			<a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
				Spec
			</a>
		</p>
		<h2>Examples</h2>
		Look above and put the mouse on it
		<Progress id="my-progress" percent={75} tooltip="Hey ! Already 75% !" />
	</div>
);

export const Infinite = () => (
	<div>
		<h1>Action</h1>
		<h2>Definition</h2>
		<p>
			The component displays an infinite progress bar at the top of the window.
			<br />
			<a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
				Spec
			</a>
		</p>
		<h2>Examples</h2>
		Look above and put the mouse on it
		<Progress id="my-progress" infinite tooltip="Hey !" />
	</div>
);

export const Contained = () => (
	<div>
		<h1>Action</h1>
		<h2>Definition</h2>
		<p>
			The component displays an infinite progress bar at the top of the window.
			<br />
			<a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
				Spec
			</a>
		</p>

		<div style={containerStyle}>
			<h2>Examples</h2>
			Look above, the progress bar is contained in a div :<br />
			<Progress id="my-progress" contained percent={75} tooltip="Hey ! Already 75% !" />
			And a infinite contained progress bar :<br />
			<Progress id="my-infinite-progress" contained infinite tooltip="Hey !" />
		</div>
	</div>
);
