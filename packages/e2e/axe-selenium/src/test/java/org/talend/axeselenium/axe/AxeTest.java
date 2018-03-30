package org.talend.axeselenium.axe;

import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.fail;

public class AxeTest {
    @Rule
    public TestName testName = new TestName();

    private WebDriver driver;
    private Axe axe;

    @Before
    public void setUp() {
        driver = new ChromeDriver();
        driver.get("http://talend.surge.sh/components/iframe.html?selectedKind=ObjectViewer&selectedStory=tree%20default");
        axe = new Axe(driver);
    }

    @After
    public void tearDown() {
        driver.close();
    }

    /**
     * Basic test
     */
    @Test
    public void testAccessibilityForWCAG2a() {
        final JSONObject scanResult = axe.runWCAG2a();
        final String violations = axe.reportViolations(testName.getMethodName(), scanResult);

        if (violations != null) {
            fail(violations);
        }
    }

    /**
     * Test with skip frames
     */
    @Test
    public void testAccessibilityForWCAG2aa() {
        final JSONObject scanResult = axe.runWCAG2aa();
        final String violations = axe.reportViolations(testName.getMethodName(), scanResult);

        if (violations != null) {
            fail(violations);
        }
    }
}
