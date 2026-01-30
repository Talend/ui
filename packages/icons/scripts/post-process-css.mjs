import fs from 'fs';

// Read the generated CSS file
const cssPath = './dist/talend-icons-webfont.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Convert decimal codepoints to hex format
// Match patterns like content: "\61697"; and convert to content: "\f101";
css = css.replace(/content: "\\(\d+)";/g, (match, decimal) => {
	const hex = parseInt(decimal, 10).toString(16);
	return `content: "\\${hex}";`;
});

// Write the processed CSS back
fs.writeFileSync(cssPath, css);
console.log('Post-processed CSS to convert decimal codepoints to hex format');
