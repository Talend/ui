const path = require('path');
const fs = require('fs');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const request = require('request');

const release = process.env['TALEND_RELEASE'] === 'true';
const mvnConfig = {
  groupId: 'org.talend.components',
  artifactId: 'talend-icon',
  version: require(path.join(__dirname, 'package.json')).version + (release ? '' : '-SNAPSHOT'),
  packaging: 'jar',
  repository: process.env['NEXUS_BASE'] || 'https://artifacts-oss.talend.com/nexus'
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
            request.post({
                url: mvnConfig.repository + '/service/local/artifact/maven/content',
                auth: {
                  username: process.env['NEXUS_USERNAME'] || process.env['USER'],
                  password: process.env['NEXUS_PASSWORD']
                },
                formData:{
                  r: release ? 'releases' : 'snapshots',
                  hasPom: 'false',
                  e: mvnConfig.packaging,
                  g: mvnConfig.groupId,
                  a: mvnConfig.artifactId,
                  v: mvnConfig.version,
                  p: mvnConfig.packaging,
                  f: fs.createReadStream(file)
              }
            }, function (err, httpResponse, body) {
              if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
                console.log(`[INFO] successfully uploaded ${jar} to nexus`);
              } else {
                console.log(`[ERROR] failed to upload ${jar} to nexus: ${JSON.stringify(httpResponse)}`);
              }
            });
          } else {
            console.log('[WARN] Artifact not ready to be uploaded');
          }
        });
      }
    }
	]
};
