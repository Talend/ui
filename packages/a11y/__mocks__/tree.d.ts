export default Tree;
declare function Tree(props: any): JSX.Element;
declare namespace Tree {
	const displayName: string;
	namespace defaultProps {
		const items: never[];
		const level: number;
	}
	namespace propTypes {
		const items_1: PropTypes.Requireable<any[]>;
		export { items_1 as items };
		const level_1: PropTypes.Requireable<number>;
		export { level_1 as level };
	}
}
import PropTypes from 'prop-types';
