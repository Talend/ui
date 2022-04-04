const fs = require('fs');

let json;

try {
	json = fs.readFileSync('./storybook-static/stories.json');
} catch (err) {
	console.error(
		'The file storybook-static/stories.json is not found! You should run `yarn extract-storybook` instead.',
		err,
	);
	return;
}

const data = JSON.parse(json);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.values(data.stories)
	.reduce((storyIdArray, next) => {
		const { id } = next;
		if (!storyIdArray.some(storyId => storyId.split('--')[0] === id.split('--')[0]))
			storyIdArray.push(next.id);
		return storyIdArray;
	}, [])
	.map(
		id =>
			`  <url><loc>https://design.talend.com/iframe.html?id=${id}&amp;viewMode=docs</loc></url>`,
	)
	.join('\n')}
</urlset>`;

fs.writeFile('./storybook-static/sitemap.xml', sitemap, err => {
	if (err) {
		console.error(err);
	}
});
