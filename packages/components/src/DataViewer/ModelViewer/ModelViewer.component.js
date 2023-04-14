import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TreeHeader } from '../Headers';
import { Tree } from '../Core';
import getDefaultT from '../../translate';
import theme from './ModelViewer.module.scss';

export function ModelViewer({ t, ...props }) {
	return (
		<div className={classNames(theme['tc-model'], 'tc-model')}>
			<TreeHeader title={t('MODEL_VIEWER_HEADER_TITLE', { defaultValue: 'Data model' })} />
			<Tree {...props} jsonpath="$" index={0} level={0} type="array" noRoot />
		</div>
	);
}

ModelViewer.propTypes = {
	t: PropTypes.func,
};

ModelViewer.defaultProps = {
	t: getDefaultT(),
};

export default ModelViewer;
