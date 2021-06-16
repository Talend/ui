import React from 'react';
import APP_LOADER from '@talend/react-components/lib/AppLoader/constant';
import { Inject } from '@talend/react-cmf';
import AppLoader from '../src/AppLoader';

const ICON =
	"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+Cgk8ZyBmaWxsPSJub25lIj4KCQk8cGF0aCBkPSJNMTYgOEE4IDggMCAxIDEgMCA4YTggOCAwIDAgMSAxNiAwIiBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtYmciIGZpbGw9IiM1ZDg4YWEiLz4KCQk8ZyBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtbG9nbyIgZmlsbD0iI0ZGRiI+CgkJCTxwYXRoIGQ9Ik05LjI4OCAxMS40NTdjLS41NDMgMC0xLjA3OC0uMjYtMS41ODktLjc3MS0uNDAyLS40MDEtLjc5LS41ODUtMS4xNTYtLjU0NS0uNTY5LjA1OS0uOTU2LjYzNi0uOTYuNjQyYS4zNzMuMzczIDAgMCAxLS41MTYuMTEyLjM3NS4zNzUgMCAwIDEtLjExMi0uNTE3Yy4wMjQtLjAzNi41OC0uODgyIDEuNTEtLjk4MS42LS4wNjMgMS4xOTMuMTkyIDEuNzYyLjc2LjQuNDAyLjc5LjU4NCAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzUuMzc1IDAgMCAxIC41MTgtLjEwNi4zNzUuMzc1IDAgMCAxIC4xMDUuNTE5Yy0uMDI0LjAzNS0uNTk2Ljg4Mi0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5bTAtMi41MjJjLS41NDMgMC0xLjA3OC0uMjU4LTEuNTg5LS43Ny0uNC0uNC0uNzg2LS41ODQtMS4xNTItLjU0Ni0uNTcyLjA1Ny0uOTYuNjM4LS45NjUuNjQ0YS4zNzQuMzc0IDAgMCAxLS42MjctLjQwNmMuMDI0LS4wMzYuNTgtLjg4MiAxLjUxLS45ODIuNi0uMDYzIDEuMTkzLjE5MyAxLjc2Mi43NjEuNC40MDEuNzkuNTg0IDEuMTYuNTQ3LjU4Mi0uMDU5Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEzYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDFtMC0yLjUxMmMtLjU0MyAwLTEuMDc4LS4yNi0xLjU4OS0uNzcxLS40MDItLjQwMS0uNzktLjU4NS0xLjE1Ni0uNTQ2LS41NjkuMDYtLjk1Ni42MzctLjk2LjY0M2EuMzc0LjM3NCAwIDAgMS0uNjI4LS40MDVjLjAyNC0uMDM2LjU4LS44ODIgMS41MS0uOTgxLjYtLjA2NCAxLjE5My4xOTIgMS43NjIuNzYuNC40Ljc5LjU4NSAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEyYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzhhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5Ii8+CgkJCTxwYXRoIGQ9Ik0yLjEwMyA4LjcwM0EuNzA1LjcwNSAwIDAgMCAyLjE5NiA3LjRhNS44MjQgNS44MjQgMCAwIDEgNC4wMTEtNC45OTljMi44NzYtLjkzNCA2LjAyNi41MTUgNy4xOTIgMy4zMDJsLS43MzQuMjM4IDEuMzc3Ljg2Ni42MDctMS41MS0uNzQuMjRDMTIuNjUgMi40NjYgOS4yMDEuODY1IDYuMDQzIDEuODkyQTYuMzU4IDYuMzU4IDAgMCAwIDEuNjYgNy4zNjVhLjcwNS43MDUgMCAwIDAgLjQ0MiAxLjMzOG0xMi42NzctLjk3YS43MDYuNzA2IDAgMCAwLTEuMzQyLjQzNi43MDIuNzAyIDAgMCAwIC4zNzIuNDE4IDUuODQgNS44NCAwIDAgMS00LjAwMyA0LjkyNGMtMi44MS45MTItNS45MzQtLjQ4Mi03LjEzNy0zLjE3N2wuNzE0LS4yMzMtMS4zNzctLjg2NC0uNjA4IDEuNTEuNzU5LS4yNDdjMS4yOTggMi45OCA0LjcyMiA0LjUyNSA3LjgxNCAzLjUyYTYuMzc2IDYuMzc2IDAgMCAwIDQuMzczLTUuNDA2LjcwNi43MDYgMCAwIDAgLjQzNS0uODgiLz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=')";

const header = {
	component: 'HeaderBar',
	brand: { label: 'Example app' },
};

const hasCollections = ['photos1', 'photos2', 'photos3'];

const steps = [
	{ actionCreators: ['http:get:photos1'] },
	{ sagas: ['saga:get:photos3'] },
	{ waitFor: ['photos1', 'photos3'] },
	{ actionCreators: ['http:get:photos2'] },
];

const ExampleAppLoader = {
	Default: () => (
		<div>
			<style>{APP_LOADER.getLoaderStyle(ICON)}</style>
			<AppLoader hasCollections={hasCollections} steps={steps} saga="appLoaderSaga">
					Loaded content
			</AppLoader>
		</div>
	),
	Renderer: () => {
		const renderer = loaderElement => <Inject component="Layout" mode="OneColumn" header={header} content={loaderElement} />;
		return (
			<div>
				<style>{APP_LOADER.getLoaderStyle(ICON)}</style>
				<AppLoader hasCollections={hasCollections} steps={steps} saga="appLoaderSaga" renderer={renderer}>
					Loaded content
				</AppLoader>
			</div>
		);
	},
};

export default ExampleAppLoader;
