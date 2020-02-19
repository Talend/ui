import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTimelineContext } from './context';
import Icon from '../Icon';

export default function Zoom({ initialZoom, min = 0.5, max = 2, ...restProps }) {
	const { setZoom, zoom } = useTimelineContext();

	useEffect(() => {
		if (initialZoom) {
			setZoom(initialZoom);
		}
	}, []);

	const zoomOut = () => {
		if (zoom >= min) {
			setZoom(zoom - 0.1);
		}
	};

	const zoomIn = () => {
		if (zoom <= max) {
			setZoom(zoom + 0.1);
		}
	};

	const currentZoomLabel = `Current zoom: ${Math.trunc(zoom) * 100}%`;
	return (
		<div {...restProps}>
			<button
				className="btn btn-link btn-icon-only"
				aria-label={`Zoom In. ${currentZoomLabel}`}
				onClick={zoomIn}
			>
				<Icon name="talend-zoomin" />
			</button>
			<button
				className="btn btn-link btn-icon-only"
				aria-label={`Zoom out. ${currentZoomLabel}`}
				onClick={zoomOut}
			>
				<Icon name="talend-zoomout" />
			</button>
		</div>
	);
}

Zoom.propTypes = {
	initialZoom: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
};
