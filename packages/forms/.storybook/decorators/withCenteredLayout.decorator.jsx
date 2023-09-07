export const withCenteredLayout = (story, { parameters: { centeredLayout } }) => {
	if (!centeredLayout) {
		return story();
	}

	return (
		<div className="container-fluid">
			<div
				className="col-md-offset-1 col-md-11"
				style={{ marginTop: '20px', marginBottom: '20px' }}
			>
				{story()}
			</div>
		</div>
	);
};
