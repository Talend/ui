import React from 'react';
import PropTypes from 'prop-types';

export const defaultLoading = {
	// https://cdn.worldvectorlogo.com/logos/slack-1.svg
	// https://la-cascade.io/content/images/2015/06/kiwi.svg

	source: 'https://cdn.worldvectorlogo.com/logos/slack-1.svg',
	size: 70,
	animationStyle: `
@keyframes swing {
	20% {
		transform: rotate3d(0, 0, 1, 15deg);
	}
	40% {
		transform: rotate3d(0, 0, 1, -10deg);
	}
	60% {
		transform: rotate3d(0, 0, 1, 5deg);
	}
	80% {
		transform: rotate3d(0, 0, 1, -5deg);
	}
	100% {
		transform: rotate3d(0, 0, 1, 0deg);
	}
}
	`,
	loadingStyle: `
transform-origin: top center;
animation-name: swing;
animation-duration: 1s;
animation-fill-mode: both;
animation-iteration-count: infinite;
	`,
};

export function LoadingForm({ loading, onChange }) {
	return (
		<form>
			<div className="form-group">
				<div className="form-group">
					<textarea
						id={'loading-src'}
						className="form-control"
						onChange={event => onChange('source', event.target.value)}
						defaultValue={loading.source}
					/>
					<label htmlFor={'loading-src'} className="control-label">Source</label>
				</div>
				<div className="form-group">
					<label htmlFor={'loading-size'} className="control-label">Width: {loading.size}px</label>
					<input id={'loading-size'} type="range" min="10" max="300" value={loading.size} onChange={event => onChange('size', event.target.value)} />
				</div>
				<div style={{ display: 'flex' }}>
					<div className="form-group" style={{ flexGrow: 1, paddingRight: 5 }}>
						<textarea
							id={'loading-animation-style'}
							className="form-control"
							rows={10}
							onChange={event => onChange('animationStyle', event.target.value)}
							defaultValue={loading.animationStyle}
						/>
						<label htmlFor={'loading-animation-style'} className="control-label">Animation Style</label>
					</div>
					<div className="form-group" style={{ flexGrow: 1, paddingLeft: 5 }}>
						<textarea
							id={'loading-style'}
							className="form-control"
							rows={10}
							onChange={event => onChange('loadingStyle', event.target.value)}
							defaultValue={loading.loadingStyle}
						/>
						<label htmlFor={'loading-style'} className="control-label">Loading Style</label>
					</div>
				</div>
			</div>
		</form>
	);
}
LoadingForm.propTypes = {
	loading: PropTypes.shape({
		source: PropTypes.string,
		style: PropTypes.string,
	}),
	onChange: PropTypes.func.isRequired,
};
