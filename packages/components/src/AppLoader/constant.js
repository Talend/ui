const LOADER_STYLE = `* {
	box-sizing: border-box;
}

body {
	margin: 0;
	padding: 0;
}

.tc-app-loader-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f6f6f6;
}

.tc-app-loader-icon {
  animation: app-loader-fadeIn 1.5s linear infinite;
  background-image: ICON_BASE_64;
  display: inline-block;
  position: relative;
  width: 151px;
  height: 151px;
  border-radius: 50%;
  margin: auto;
}
   
.tc-app-loader {
  animation: container-rotate 1568ms linear infinite;
  display: inline-block;
  position: relative;
  width: 165px;
  height: 165px;
  margin: -7px 0px 0px -7px;
}

.tc-app-loader .spinner-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-color: #ababab;
  opacity: 1;
  animation: app-loader-spin 5332ms cubic-bezier(.4, 0, .2, 1) infinite both;
}

.tc-app-loader .spinner-left,
.tc-app-loader .spinner-right {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.tc-app-loader .spinner-left {
  float: left !important;
}

.tc-app-loader .spinner-right {
  float: right !important;
}

.tc-app-loader .spinner-left .circle,
.tc-app-loader .spinner-right .circle {
  width: 165px;
  height: 165px;
  content: '';
  border-width: 4.5px;
  border-style: solid;
  border-color: inherit;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  animation: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.tc-app-loader .spinner-left .circle {
  animation: left-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
  left: 0;
  border-right-color: transparent !important;
  transform: rotate(129deg);
}

.tc-app-loader .spinner-right .circle {
  animation: right-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
  left: -100%;
  border-left-color: transparent !important;
  transform: rotate(-129deg);
}

@keyframes container-rotate {
  100% {
      transform: rotate(360deg);
  }
}

@keyframes app-loader-spin {
  12.5% {
      transform: rotate(135deg);
  }
  25% {
      transform: rotate(270deg);
  }
  37.5% {
      transform: rotate(405deg);
  }
  50% {
      transform: rotate(540deg);
  }
  62.5% {
      transform: rotate(675deg);
  }
  75% {
      transform: rotate(810deg);
  }
  87.5% {
      transform: rotate(945deg);
  }
  100% {
      transform: rotate(1080deg);
  }
}

@keyframes left-spin {
  0% {
      transform: rotate(130deg);
  }
  50% {
      transform: rotate(-5deg);
  }
  100% {
      transform: rotate(130deg);
  }
}

@keyframes right-spin {
  0% {
      transform: rotate(-130deg);
  }

  50% {
      transform: rotate(5deg);
  }
  100% {
      transform: rotate(-130deg);
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
}`;

const APP_LOADER = `<div class="tc-app-loader-container" aria-label="Loading application" role="status">
	<div class="tc-app-loader-icon">
		<div class="tc-app-loader" >
			<div class="spinner-wrapper">
				<div class="spinner-left" >
					<div class="circle"></div>
				</div>
				<div class="spinner-right">
					<div class="circle"></div>
				</div>
			</div>
		</div>
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
