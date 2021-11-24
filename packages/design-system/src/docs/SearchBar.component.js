import React from 'react';
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';

import { Autocomplete } from './AlgoliaAutocomplete.component';

import theme from './SearchBar.scss';

const searchClient = algoliasearch(
	process.env.STORYBOOK_ALGOLIA_SEARCH_APP_ID,
	process.env.STORYBOOK_ALGOLIA_SEARCH_API_KEY,
);

function SearchBar() {
	if (!process.env.STORYBOOK_ALGOLIA_SEARCH_INDEX) {
		console.warn(
			'Algolia is not set up correctly, be sure to configure STORYBOOK_ALGOLIA_SEARCH_APP_ID, STORYBOOK_ALGOLIA_SEARCH_API_KEY and STORYBOOK_ALGOLIA_SEARCH_INDEX secrets before.',
		);
		return null;
	}

	return (
		<div style={{ maxWidth: '50%', margin: '0 auto' }}>
			<Autocomplete
				placeholder="Search for anything on Coral"
				getSources={({ query }) => [
					{
						sourceId: 'pages',
						getItems() {
							return getAlgoliaResults({
								searchClient,
								queries: [
									{
										indexName: process.env.STORYBOOK_ALGOLIA_SEARCH_INDEX,
										query,
									},
								],
							});
						},
						templates: {
							item({ item, components }) {
								return (
									<a
										className={`aa-ItemLink ${theme.link}`}
										href={item.url?.replace(/\/iframe.html\?id=(.*)&/, '/?path=/docs/$1&')}
										target="_parent"
									>
										<div className="aa-ItemWrapper">
											<div className="aa-ItemContent">
												<div className="aa-ItemContentBody">
													<div className={`aa-ItemContentTitle ${theme.title}`}>
														<components.Snippet hit={item} attribute="title" />
													</div>
													<small className={`aa-ItemContentCategory ${theme.category}`}>
														<components.Snippet hit={item} attribute="category" />
													</small>
													<div className={`aa-ItemContentDescription ${theme.description}`}>
														<components.Snippet hit={item} attribute="content" />
													</div>
												</div>
											</div>
										</div>
									</a>
								);
							},
						},
					},
				]}
			/>
		</div>
	);
}

export default SearchBar;
