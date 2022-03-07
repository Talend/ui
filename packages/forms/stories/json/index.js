import React from 'react';
import FormStoryWithDisplayMode from './FormStoryWithDisplayMode';

export function getAllStories(category, conceptsFilenames) {
	return conceptsFilenames.keys().reduce((accu, filename) => {
		const sampleNameMatches = filename.match(/^.\/(.*).json$/);
		const sampleName = sampleNameMatches[sampleNameMatches.length - 1];
		const name = sampleName.charAt(0).toUpperCase() + sampleName.slice(1);

		return {
			...accu,
			[name]: () => {
				const { doc, ...data } = conceptsFilenames(filename);
				return <FormStoryWithDisplayMode data={data} doc={doc} category={category} />;
			},
		};
	}, {});
}
