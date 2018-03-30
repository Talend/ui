package org.talend.axeselenium.axe;

import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.talend.axeselenium.Script;

import java.util.Map;
import java.util.concurrent.TimeUnit;

public class Axe {
    private WebDriver driver;
    private Script script;

    public Axe(final WebDriver driver) {
        this.driver = driver;
        this.script = new Script(driver, Axe.class.getResource("/axe.min.js"));
    }

    public JSONObject runWCAG2a(final WebElement element) {
        final Options options = Options.builder().runOnly("tags", "wcag2a").build();
        return run(element, options);
    }

    public JSONObject run(final WebElement element, final Options options) {
        this.driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);
        this.script.runAxeScript();

        final String command =
                "cont done = arguments[arguments.length - 1];\n" +
                "function handleResult(error, report) { if (error) { throw error; } return done(report); }\n" +
                "const targetElement = arguments[0] || document;" +
                "const options = arguments[1];" +
                "axe.run(targetElement, options, handleResult)";
        final String axeOptions = options == null ? "{}" : options.toString();
        final Object response = ((JavascriptExecutor) this.driver).executeAsyncScript(command, element, axeOptions);

        return new JSONObject((Map) response);
    }
}
