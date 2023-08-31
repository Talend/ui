import { ThemeProvider } from '@talend/design-system';

export const decorators = [
	(Story, context) => {
		return (
			<>
				<style>
					{`
						.page {
							overflow: auto;
							height: 100%;
							display: flex;
							flex-direction: column;
						}

						.page__wrapper {
							height: calc(100vh - 20px);
						}
						`}
				</style>
				<ThemeProvider>
					<div className="page__wrapper">
						<div className="page">
							<Story {...context} />
						</div>
					</div>
				</ThemeProvider>
			</>
		);
	},
];
