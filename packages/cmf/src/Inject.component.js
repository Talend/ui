import PropTypes from 'prop-types';
import componentAPI from './component';
import { useCMFContext } from './useContext';

/**
 * The Inject component let you use the registry to render named component
 * using the registry. It will not break the app if component is not found
 * but it will display an error.
 * @module react-cmf/lib/Inject
 * @example
import { Inject } from '@talend/react-cmf';
// this is not the best example but it show the concept
function MyComponent(props) {
	return (
		<Inject component="Action" onClick={props.onClick}>
			<Inject component="Icon" icon={props.icon} />
		</Inject>
	);
}
 */

function NotFoundComponent({ error }) {
	// eslint-disable-next-line no-console
	console.error(error);
	return <div className="alert alert-danger">{error.message}</div>;
}
NotFoundComponent.propTypes = {
	error: PropTypes.string.isRequired,
};

function Inject({ component, ...props }) {
	const context = useCMFContext();
	try {
		const Component = componentAPI.get(component, context);
		return <Component {...props} />;
	} catch (error) {
		return <NotFoundComponent error={error} />;
	}
}
Inject.propTypes = {
	component: PropTypes.string.isRequired,
};
Inject.NotFoundComponent = NotFoundComponent;

export default Inject;
