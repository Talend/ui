import Loader from '.';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw',
};

export default {
	title: 'Design Principles/Loading Feedback/Loader',
	decorators: [story => <div style={containerStyle}>{story()}</div>],
};

export const Small = () => <Loader size={Loader.SIZE.small} />;

export const Default = () => <Loader />;

export const Large = () => <Loader size={Loader.SIZE.large} />;
