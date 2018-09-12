package org.talend.axeselenium.axe;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.FileNotFoundException;
import java.io.IOException;

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
    public void valid_WCAG2a_HTML_should_return_no_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=true");

        // when
        final JSONObject scanResult = axe.runWCAG2a();

        // then
        final String violations = axe.reportViolations(reportFolder, testName.getMethodName(), scanResult);
        if (violations != null) {
            fail(violations);
        }
    }

    @Test
    public void valid_WCAG2aa_HTML_should_return_no_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=true");

        // when
        final JSONObject scanResult = axe.runWCAG2aa();

        // then
        final String violations = axe.reportViolations(reportFolder, testName.getMethodName(), scanResult);
        if (violations != null) {
            fail(violations);
        }
    }

    @Test
    public void invalid_WCAG2a_HTML_should_return_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=false");

        // when
        final JSONObject scanResult = axe.runWCAG2a();
        axe.reportViolations(reportFolder, testName.getMethodName(), scanResult);

        // then
        final JSONArray violations = scanResult.getJSONArray("violations");
        assertThat(violations.length(), is(2));
        assertThat(violations.getJSONObject(0).getString("id"), is("html-has-lang"));
        assertThat(violations.getJSONObject(1).getString("id"), is("image-alt"));
    }

    @Test
    public void invalid_WCAG2aa_HTML_should_return_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=false");

        // when
        final JSONObject scanResult = axe.runWCAG2aa();

        // then
        final JSONArray violations = scanResult.getJSONArray("violations");
        assertThat(violations.length(), is(3));
        assertThat(violations.getJSONObject(0).getString("id"), is("color-contrast"));
        assertThat(violations.getJSONObject(1).getString("id"), is("html-has-lang"));
        assertThat(violations.getJSONObject(2).getString("id"), is("image-alt"));
    }

    @Test
    public void invalid_WCAG2a_element_should_return_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=false");
        final WebElement invalidTextAlternative = driver.findElement(By.id("invalid-alternative-text"));

        // when
        final JSONObject scanResult = axe.runWCAG2a(invalidTextAlternative);

        // then
        final JSONArray violations = scanResult.getJSONArray("violations");
        assertThat(violations.length(), is(1));
        assertThat(violations.getJSONObject(0).getString("id"), is("image-alt"));
    }

    @Test
    public void invalid_WCAG2aa_element_should_return_violation() throws IOException {
        // given
        driver.get("http://localhost:5005?valid=false");
        final WebElement invalidContrastElement = driver.findElement(By.id("invalid-contrast"));

        // when
        final JSONObject scanResult = axe.runWCAG2aa(invalidContrastElement);

        // then
        final JSONArray violations = scanResult.getJSONArray("violations");
        assertThat(violations.length(), is(1));
        assertThat(violations.getJSONObject(0).getString("id"), is("color-contrast"));
    }
}
