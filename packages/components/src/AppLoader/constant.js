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

@keyframes app-loader-spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
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

.tc-app-loader:before,
.tc-app-loader:after {
	animation: app-loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	box-sizing: border-box;
	content: '';
	display: block;
	position: absolute;
	width: 165px;
	height: 165px;
	border: 4.5px solid #ababab;
	border-radius: 50%;
	margin: -7px 0 0 -7px;
	border-color: #ababab transparent transparent transparent;
}

.tc-app-loader:before {
	animation-delay: -0.3s;
}

.tc-app-loader:after {
	animation-delay: -0.15s;
}

.tc-app-loader-icon:before {
	animation: app-loader-fadeIn 1.5s linear infinite;
	background-image: ICON_BASE_64;
	content: '';
	position: absolute;
	width: 150px;
	height: 150px;
	border-radius: 50%;
}`;

const APP_LOADER = `<div class="tc-app-loader-container">
	<div class="tc-app-loader">
		<div class="tc-app-loader-icon"></div>
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
