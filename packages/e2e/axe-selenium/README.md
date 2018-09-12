# axe-selenium

This is a library for a11y automated tests, based on [axe-core](https://github.com/dequelabs/axe-core).
It is inspired from [axe-selenium-java](https://github.com/dequelabs/axe-selenium-java).

Why a new library:
* removed unnecessary code
* java api to deal with axe-core options instead of using json strings
* up-to-date axe-core, with a system to update it
* easier and user friendly top api running predefined scan

## How to use

### Example

Pom.xml
```xml
<dependency>
    <groupId>org.talend</groupId>
    <artifactId>axe-selenium</artifactId>
    <version>0.1.0</version>
</dependency>
```

Test.java
```java
package org.talend.axeselenium.axe;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

public class AxeTest {
    private static final String reportFolder = "a11y-reports/";

    @Rule
    public TestName testName = new TestName();
    private WebDriver driver;
    private Axe axe;

    @Before
    public void setUp() {
        driver = new ChromeDriver();
        axe = new Axe(driver);
    }

    @After
    public void tearDown() {
        driver.close();
    }

    @Test
    public void home_page_should_be_WCAG2a_compliant() {
        final JSONObject scanResult = axe.runWCAG2a();
        final String violations = axe.reportViolations(reportFolder, testName.getMethodName(), scanResult);

        if (violations != null) {
            fail("There are a11y violations, please check " + testName.getMethodName() + ".txt/json for details.");
        }
    }
}
```

### Api

#### Axe.run(final WebElement element, final Options options)

Run a scan with customisable options.

| Argument | Class | Description |
|---|---|---|
| element | org.openqa.selenium.WebElement | The element (and its children) to scan.<br/>If `null` is provided, the whole document is scanned. |
| options | org.talend.axeselenium.axe.Option | Axe-core options subset that we support.<br/>Use `Options.Builder` to customise the scan. |

#### Axe.runWCAG2a()

Run a scan on whole document using the WCAG 2.0 Level A set of rules.

#### Axe.runWCAG2a(final WebElement element)

Same as previous but on a specific element.

| Argument | Class | Description |
|---|---|---|
| element | org.openqa.selenium.WebElement | The element (and its children) to scan. |

#### Axe.runWCAG2aa()

Run a scan on whole document using the WCAG 2.0 Level AA set of rules.

#### Axe.runWCAG2aa(final WebElement element)

Same as previous but on a specific element.

| Argument | Class | Description |
|---|---|---|
| element | org.openqa.selenium.WebElement | The element (and its children) to scan. |

#### Axe.reportViolations(final String reportFolder, final String name, final JSONObject result)

Save scan result in ${reportFolder}/${name}.json, build/save/return a formatted violation report.

| Argument | Class | Description |
|---|---|---|
| reportFolder | String | The folder path where to store the scan result. |
| name | String | The scan result name. |
| result | org.json.JSONObject | The scan result. |

#### Options.Builder.runOnly(final String type, final String... values)

Configure the scan using [tags or rules ids](https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter-examples)

| Argument | Class | Description |
|---|---|---|
| type | String | The type of value tu use: `tag` or `rule` |
| values | String[] | The rules of tags to set. |

#### Options.Builder.enableRule(final String rule)

Enable a specific [rule](https://github.com/dequelabs/axe-core/tree/master/lib/rules)

| Argument | Class | Description |
|---|---|---|
| rule | String | The rule id. |

#### Options.Builder.disableRule(final String rule)

Disable a specific [rule](https://github.com/dequelabs/axe-core/tree/master/lib/rules)

| Argument | Class | Description |
|---|---|---|
| rule | String | The rule id. |

## Contribution

### How to install

```
mvn clean install -Dmaven.test.skip
```

We skip the test to build it because they are selenium tests that need a test server.
See [How to test section](#how-to-test)

### How to update axe-core library

1. Change the version in package.json
2. Install the new version
```
yarn update-axe-core
```

### How to test

There are selenium tests to ensure the module non regression.
When you contribute, please add/adapt the tests.

To run the tests, you'll need to run a test server

```
yarn test-server
mvn test
```
