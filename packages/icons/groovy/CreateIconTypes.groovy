/**
 *  Copyright (C) 2006-2018 Talend Inc. - www.talend.com
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

import static java.util.Locale.ENGLISH

def icons = listSVGFromFolder(new File(project.basedir, "src/svg"))
def iconsDeprecated = listSVGFromFolder(new File(project.basedir, "src/svg-deprecated"))
def allIcons = icons + iconsDeprecated
allIcons.sort()

def iconJava = new File(project.basedir, 'src/main/java/org/talend/icons/Type.java')
validateIcons(iconJava, allIcons)
iconJava.text = """/*
  Copyright (C) 2006-2019 Talend Inc. - www.talend.com
  <p>
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  <p>
  http://www.apache.org/licenses/LICENSE-2.0
  <p>
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
package org.talend.icons;

/**
 * See http://talend.surge.sh/icons/
 */
public enum Type {
${generateEnumValues(allIcons, iconsDeprecated)}
    
    private final String key;
 
    Type(String key) {
        this.key = key;
    }
    
    public String getKey() {
        return key;
    }
}
"""


static Collection listSVGFromFolder(File folder) {
    return folder.list()
            .findAll {
                it.endsWith('.svg')
            }
            .collect {
                def icon = it.substring(it.lastIndexOf('/') + 1, it.length() - ('.svg'.length()))
                "${icon.replace('-', '_').toUpperCase(ENGLISH)}(\"${icon}\")"
            }
}

static String generateEnumValues(icons, iconsDeprecated) {
    def iconJavaBuilder = new StringBuilder()
    def index = 1
    icons.each { icon ->
        if (iconsDeprecated.contains(icon)) {
            iconJavaBuilder.append("        @Deprecated\n")
        }
        iconJavaBuilder.append("        ${icon}")
        if (index == icons.size()) {
            iconJavaBuilder.append(";")
        } else {
            iconJavaBuilder.append(",\n")
        }
        index++
    }

    return iconJavaBuilder.toString()
}

static void validateIcons(File iconJava, allIcons) {
    def oldIcons = []
    def startEnumValues = false
    iconJava.eachLine {
        def trim = it.trim()
        if (!trim.isEmpty() && startEnumValues && !trim.startsWith("@")) {
            oldIcons.add(trim.substring(0, trim.length() - 1))
        }

        if (trim.endsWith(";")) {
            startEnumValues = false
        }

        if (trim.contains("enum IconType {")) {
            startEnumValues = true
        }
    }

    // before rewriting the file ensure we didnt loose icons
    def missingIcons = oldIcons - allIcons - [ /* to force an update with icon diff add them here */]
    if (!missingIcons.isEmpty()) {
        throw new IllegalArgumentException(
                "These icons were here and are no more supported, either add an exception in CreateIconTypesypes.groovy or add them back:\n> ${missingIcons}")
    }
}
