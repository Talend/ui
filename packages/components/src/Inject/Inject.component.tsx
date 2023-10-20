/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidElement, ComponentClass, FunctionComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';

type NotFoundComponentProps = {
	error: string;
};
/**
 * This is to render an not found component to alert developers
 * @param {object} props container of the error
 */
function NotFoundComponent({ error }: NotFoundComponentProps) {
	return <div className="alert alert-danger">{error}</div>;
}

export type InjectedComponentType = string | ComponentClass | FunctionComponent;
export type GetComponentType = (component: InjectedComponentType) => InjectedComponentType;

export type InjectConfig = {
	component: InjectedComponentType;
} & Record<string, any>;

type InjectProps = {
	getComponent: GetComponentType;
	component: InjectedComponentType;
};

/**
 * This component role is to show the evaluated component or not found component
 * @param {object} props getComponent method to resolve the component given and his props
 */
function Inject({ getComponent, component, ...props }: InjectProps) {
	if (!getComponent || !component) {
		return null;
	}
	try {
		const Component = getComponent(component);
		return <Component {...props} />;
	} catch (error: any) {
		return <NotFoundComponent error={error.message} />;
	}
}

/**
 * This function is used to inject an array of components
 * @param {function} getComponent the method used to resolve the component
 * @param {array} array an array of components
 */
Inject.map = function injectMap(
	getComponent: GetComponentType,
	array: InjectConfig[],
	CustomInject: FunctionComponent<InjectProps> = Inject,
): JSX.Element[] {
	return array.map((props, index) => (
		<CustomInject key={index} getComponent={getComponent} {...props} />
	));
};

/**
 * Used to inject components & have them in an object to resolve it in our component
 * @param {function} getComponent the method used to resolve the component
 * @param {object} components an object to represent the components
 * @example
	{
		'header': [{ component: 'MyConnectedHeader', myProps: 'lol' }],
		'aside': [{ component: 'MyConnectedSidePanel', toto: 'mdr' }],
	}
 */
Inject.all = function injectAll(
	getComponent: GetComponentType,
	components: Record<string, InjectConfig | InjectConfig[]>,
	CustomInject: FunctionComponent<InjectProps> = Inject,
) {
	return (key: string, props: any = {}) => {
		if (!components) {
			return null;
		}

		const component = components[key];

		if (Array.isArray(component)) {
			return Inject.map(getComponent, component, CustomInject);
		} else if (isValidElement(component)) {
			return component;
		} else if (typeof component === 'object') {
			return <CustomInject getComponent={getComponent} {...props} {...component} />;
		}
		return null;
	};
};

/**
 * used to inject a component with componentID & fallback on a component given if not available
 * @param {function} getComponent the method used to resolve the component
 * @param {string|function} componentId the id to fetch with getComponent method or the component to render
 * @param {object} DefaultComponent The component to fallback to
 */
Inject.get = function injectGet(
	getComponent: GetComponentType,
	componentId: InjectedComponentType,
	DefaultComponent: InjectedComponentType,
): InjectedComponentType {
	if (typeof componentId === 'function') {
		return componentId;
	}
	if (!getComponent || componentId == null) {
		return DefaultComponent;
	}
	try {
		return getComponent(componentId);
	} catch (error) {
		return DefaultComponent;
	}
};

/**
 * Allow to call get on a object configuration
 * @param {function} getComponent the method used to resolve the component
 * @param {object} config the component configurations
 */
Inject.getAll = function injectGetAll(
	getComponent: GetComponentType,
	config: Record<string, InjectedComponentType>,
): Record<string, InjectedComponentType> {
	const components: Record<string, InjectedComponentType> = {};
	Object.keys(config).forEach((key: string) => {
		components[key] = Inject.get(getComponent, key, config[key]);
	});
	return components;
};

/**
 * Allow a props to have multiple shape with a target to be a react valid element.
 * It supports three shapes: string, object, react element
 * @param {function} getComponent
 * @param {object|string|React Element} data
 */
Inject.getReactElement = function getReactElement(
	getComponent: GetComponentType,
	data: InjectedComponentType | InjectedComponentType[] | InjectConfig,
	CustomInject: FunctionComponent<InjectProps> = Inject,
	withKey = false,
): ReactNode {
	let key;
	if (Array.isArray(data)) {
		return data.map(info => getReactElement(getComponent, info, CustomInject, true));
	} else if (data === null) {
		return data;
	} else if (typeof data === 'string') {
		const props = { getComponent, component: data };
		if (withKey) {
			key = `${data}#default`;
		}
		return <CustomInject {...props} key={key} />;
	} else if (isValidElement(data)) {
		return data;
	} else if (typeof data === 'object') {
		const props = { getComponent, ...data };
		if (withKey) {
			key = `${data.component}#${data.componentId || 'default'}`;
		}
		return <CustomInject {...props} key={key} />;
	}
	return null; // We do not throw anything, proptypes should do the job
};
// @ts-ignore
Inject.getReactElement.propTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.shape({ component: PropTypes.string }),
	PropTypes.element,
	PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({ component: PropTypes.string }),
			PropTypes.element,
		]),
	),
]);
Inject.displayName = 'Inject';

Inject.NotFound = NotFoundComponent;
export default Inject;
