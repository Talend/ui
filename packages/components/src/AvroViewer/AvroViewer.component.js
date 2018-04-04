import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Inject from '../Inject';
import theme from './AvroViewer.scss';

export default function AvroViewer({
	getComponent,
	components,
	leftProps,
	rightProps,
}) {
	const injected = Inject.all(getComponent, components);
	return (
		<div className={classNames(theme['tc-avro-layout'], 'tc-avro-layout')}>
			{injected('before-left')}
			<div className={classNames(theme['tc-avro-layout-left'], 'tc-avro-layout-left')}>
				{injected('left', leftProps)}
			</div>
			{injected('middle')}
			<div className={classNames(theme['tc-avro-layout-right'], 'tc-avro-layout-right')}>
				{injected('right', rightProps)}
			</div>
			{injected('after-right')}
		</div>
	);
}

AvroViewer.propTypes = {
	getComponent: PropTypes.func,
	components: PropTypes.object,
	leftProps: PropTypes.object,
	rightProps: PropTypes.object,
};
