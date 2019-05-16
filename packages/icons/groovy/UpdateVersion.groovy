/**
 *  Copyright (C) 2006-2019 Talend Inc. - www.talend.com
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

def pom = new File(project.basedir, 'pom.xml')
def packageJsonVersion = new groovy.json.JsonSlurper().parse(new File(project.basedir, 'package.json')).version
def pomVersion = new groovy.util.XmlSlurper().parse(pom).version.text()
if (pomVersion != packageJsonVersion) { // don't rewrite with xml tools, ensure it respects formatting etc
    def oldPomContent = pom.text
    def versionMarker = '\n    <version>'
    def versionStart = oldPomContent.indexOf(versionMarker)
    if (versionStart < 0) {
        throw new IllegalStateException("No <version> in pom: " + pom)
    }
    def versionEnd = oldPomContent.indexOf('</version>', versionStart)
    if (versionEnd < 0) {
        throw new IllegalStateException("No </version> in pom: " + pom)
    }
    pom.text = oldPomContent.substring(0, versionStart + versionMarker.length()) + packageJsonVersion + oldPomContent.substring(versionEnd)
    log.info("Updated version in ${pom}")
} else {
    log.info("Pom version already up to date")
}
