const fs = require('fs');

const ROOT = './packages';
const reports = ['eslint-report.json', 'stylelint-report.json'];
const pkgs = fs.readdirSync(ROOT);

let buff = [];

pkgs.forEach(pkg => {
    reports.forEach(report => {
        const fpath = `${ROOT}/${pkg}/${report}`;
        if (fs.existsSync(fpath)) {
            try {
                buff = buff.concat(JSON.parse(fs.readFileSync(fpath)));
            } catch(e) {
                console.error(e);
            }
        }
    });
});
const target = `${process.cwd()}/eslint-report.json`;

// eslint-disable-next-line no-console
console.log(`report merge into ${target}`);
fs.writeFileSync(target, JSON.stringify(buff, null, 2));
