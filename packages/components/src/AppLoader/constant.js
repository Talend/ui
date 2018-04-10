const LOADER_STYLE = `html {
	font-size: 10px;
	text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
}

body {
	margin: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}


.tc-app-loader-container {
	display: flex;
	height: 100vh;
	width: 100vw;
	background: #f6f6f6;
}

.tc-app-loader {
	width: 165px;
	height: 165px;
	margin: auto;
}

.tc-app-loader-animate {
	width: 205px;
	height: 205px;
	position: absolute;
	margin: -27px 0 0 -27px;
	animation: rotate 2s linear infinite;
}

.tc-app-loader-path {
	stroke-dasharray: 12.5664; 
	stroke-dashoffset: 0;
	stroke: #ababab;
	stroke-linecap: round;
	stroke-width: 1.5px;
	animation: dash 1.3s ease-in-out infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}

	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}

@keyframes app-loader-fadeIn {
	0%,
	100% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
}

.tc-app-loader-icon:before {
	animation: app-loader-fadeIn 1.5s linear infinite;
	background-image: ICON_BASE_64;
	content: '';
	position: absolute;
	width: 151px;
	height: 151px;
	border-radius: 50%;
}`;

const APP_LOADER = `<div class="tc-app-loader-container" aria-atomic="true" aria-busy="true">
	<div class="tc-app-loader">
		<svg focusable="false" class="tc-app-loader-animate" viewBox="0 0 50 50">
			<circle class="tc-app-loader-path" r="20" cx="25" cy="25" fill="none"></circle>
		</svg>
		<div class="tc-app-loader-icon" />
	</div>
</div>
`;

function getLoaderStyle(icon = '') {
	return LOADER_STYLE.replace('ICON_BASE_64', icon);
}

export default {
	APP_LOADER,
	getLoaderStyle,
};
