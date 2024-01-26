---
'@talend/design-system': major
---

**Breaking change**

What?

The setup of 1rem = 10px has been removed. 1rem = 16px is now the default value.

Why? 

Qlik does not set it and use the default value of 1rem = 16px.
Using Coral component in Qlik integrations, we alter their ui by setting 1rem = 10px on the html element.

How?

You can use the following code to update all scss files in a folder, to convert rem values from 10px to 16px:

```javascript
const fs = require('fs');
const path = require('path');

// Get folder path from command-line arguments
const folderPath = process.argv[2];

if (!folderPath) {
  console.error('Please provide a folder path as a command-line argument.');
  process.exit(1);
}

// Regular expression to match and capture rem values (including potential negative values)
const remRegex = /(-?\d*\.?\d+)rem/g;

// Function to divide rem values by 1.6 and keep the 'rem' unit with minimal decimal places
const replaceRem = (match, value) => {
  const result = (parseFloat(value) / 1.6).toFixed(4).replace(/\.?0+$/, '');
  return result + 'rem';
};

// Function to process a single file
const processFile = (filePath) => {
  const cssInput = fs.readFileSync(filePath, 'utf8');
  const updatedCSS = cssInput.replace(remRegex, replaceRem);
  fs.writeFileSync(filePath, updatedCSS, 'utf8');
  console.log(`Updated: ${filePath}`);
};

// Function to recursively find all .scss files in the specified folder
const findAllScssFiles = (folder) => {
  const files = fs.readdirSync(folder);
  const scssFiles = [];

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scssFiles.push(...findAllScssFiles(filePath));
    } else if (file.endsWith('.scss')) {
      scssFiles.push(filePath);
    }
  });

  return scssFiles;
};

// Find all .scss files in the specified folder
const scssFiles = findAllScssFiles(folderPath);

// Process each file
scssFiles.forEach(processFile);
```

To run the script, save it to a file with a .js extension (e.g., updateRemValues.js) and execute it using Node.js:

```bash
node updateRemValues.js /path/to/your/folder
```