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
    updatePomEntry(pom, packageJsonVersion, '\n    <version>', '</version>')
    updatePomEntry(pom, pomVersion, '<project.previous.version>', '</project.previous.version>')
    log.info("Updated versions in ${pom}")
} else {
    log.info("Pom version already up to date")
}

static def updatePomEntry(File pom, String packageJsonVersion, start, end){
    def oldPomContent = pom.text
    def startIndex = oldPomContent.indexOf(start)
    if (startIndex < 0) {
        throw new IllegalStateException("No "+start+" in pom: " + pom)
    }
    def endEndex = oldPomContent.indexOf(end, startIndex)
    if (endEndex < 0) {
        throw new IllegalStateException("No "+end+" in pom: " + pom)
    }
    pom.text = oldPomContent.substring(0, startIndex + start.length()) + packageJsonVersion + oldPomContent.substring(endEndex)
}
