const LOADER_STYLE = `@keyframes app-loader-spin {
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

.loader-container {
	display: flex;
	height: 100vh;
	width: 100vw;
	background: #f6f6f6;
}

.tc-app-loader {
	width: 16.5rem;
	height: 16.5rem;
	margin: auto;
}

.tc-app-loader:before,
.tc-app-loader:after {
	animation: app-loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	box-sizing: border-box;
	content: '';
	display: block;
	position: absolute;
	width: 16.5rem;
	height: 16.5rem;
	border: 4.5px solid #ababab;
	border-radius: 50%;
	margin: -0.7rem 0 0 -0.7rem;
	border-color: #ababab transparent transparent transparent;
}

.tc-app-loader:before {
	animation-delay: -0.3s;
}

.tc-app-loader:after {
	animation-delay: -0.15s;
}

.tc-app-icon:before {
	animation: app-loader-fadeIn 1.5s linear infinite;
	background-image: ICON_BASE_64;
	content: '';
	position: absolute;
	width: 15rem;
	height: 15rem;
	border-radius: 50%;
}`;

const LOADER_APP = `<div class="loader-container">
	<div class="tc-app-loader">
		<div class="tc-app-icon"></div>
	</div>
</div>
`;

function getLoaderStyle(icon) {
	return LOADER_STYLE.replace('ICON_BASE_64', icon);
}

export default {
	LOADER_APP,
	getLoaderStyle,
};
