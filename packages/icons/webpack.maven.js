const path = require('path');
const fs = require('fs');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const request = require('request');
const crypto = require('crypto');

const release = !!process.env['TALEND_RELEASE'];
const mvnConfig = {
  groupId: 'org.talend.ui',
  artifactId: 'talend-icon',
  version: require(path.join(__dirname, 'package.json')).version + (release ? '' : '-SNAPSHOT'),
  packaging: 'jar',
  repository: process.env['NEXUS_BASE'] || 'https://artifacts-zl.talend.com/nexus/'
};

module.exports = {
  output: {
		filename: 'maven.js',
		path: path.join(__dirname, 'dist/maven')
	},
	plugins: [
    new CopyWebpackPlugin([{ from: 'src/svg' }]),
    new ZipPlugin({
      filename: `${mvnConfig.artifactId}-${mvnConfig.version}`,
      extension: mvnConfig.packaging,
      pathPrefix: 'icons',
      include: [/\.svg$/],
    }),
    {
      apply: function (compiler) {
        compiler.plugin('done', function (stats) {
          const jar = `${mvnConfig.artifactId}-${mvnConfig.version}.${mvnConfig.packaging}`;
          const file = path.join(__dirname, `dist/maven/${jar}`);
          if (fs.statSync(file).isFile()) {
            const postUploadHandler = (response, file) => {
              if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log(`[INFO] successfully uploaded ${file} to nexus`);
              } else {
                console.log(`[ERROR] failed to upload ${file} to nexus: ${JSON.stringify(httpresponseResponse)}`);
              }
            };
            const repository = process.env['NEXUS_REPOSITORY'] || (release ? 'releases' : 'snapshots');
            const base = mvnConfig.repository + `/content/repositories/${repository}/${mvnConfig.groupId.replace(/\./g, '/')}/${mvnConfig.artifactId}/${mvnConfig.version}/${mvnConfig.artifactId}-${mvnConfig.version}.`;
            const headers = {
              'Cache-control': 'no-cache',
              'Cache-store': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Accept-Encoding': 'gzip',
              'User-Agent': 'Apache-Maven/3.5.0 (Java 1.8.0_131; Linux 4.10.0-30-generic)'
            };
            const auth = {
              username: process.env['NEXUS_USERNAME'] || process.env['USER'],
              password: process.env['NEXUS_PASSWORD']
            };
            // upload the jar
            const jarPath = `${base}${mvnConfig.packaging}`;
            request.put({
                url: jarPath,
                auth: auth,
                headers: headers,
                body: fs.createReadStream(file)
            }, function (err, httpResponse, body) {
              postUploadHandler(httpResponse, jarPath);
            });
            // upload the pom
            const pomContent = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>

<groupId>${mvnConfig.groupId}</groupId>
<artifactId>${mvnConfig.artifactId}</artifactId>
<version>${mvnConfig.version}</version>
</project>`;
            const pomPath = `${base}pom`;
            request.put({
                url: pomPath,
                auth: auth,
                headers: headers,
                body: pomContent
            }, function (err, httpResponse, body) {
              postUploadHandler(httpResponse, pomPath);
            });

            // now the md5 and sha1 for each files
            [{
              path: jarPath,
              hasher: (hash, callback) => {
                const stream = fs.createReadStream(file);
                stream.on('data', d => hash.update(d));
                stream.on('end', callback);
              }
            }, {
              path: pomPath,
              hasher: (hash, callback) => {
                hash.update(pomContent);
                callback();
              }
            }].forEach(item => {
              ['md5', 'sha1'].forEach(algo => {
                  const hash = crypto.createHash(algo);
                  item.hasher(hash, () => {
                    const path = item.path + `.${algo}`;
                    request.put({
                        url: path,
                        auth: auth,
                        headers: headers,
                        body: hash.digest('hex')
                    }, function (err, httpResponse, body) {
                      postUploadHandler(httpResponse, path);
                    });
                  });
              });
            });
          } else {
            console.log('[WARN] Artifact not ready to be uploaded');
          }
        });
      }
    }
	]
};
