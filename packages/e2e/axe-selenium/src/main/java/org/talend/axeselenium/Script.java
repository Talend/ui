package org.talend.axeselenium;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class Script {
    private static final String lineSeparator = System.getProperty("line.separator");
    private final WebDriver driver;
    private final URL scriptUrl;

    public Script(final WebDriver driver, final URL scriptUrl) {
        this.driver = driver;
        this.scriptUrl = scriptUrl;
    }

    /**
     * Get script content
     */
    private String getContent() {
        final StringBuilder sb = new StringBuilder();
        BufferedReader reader = null;

        try {
            URLConnection connection = scriptUrl.openConnection();
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;

            while ((line = reader.readLine()) != null) {
                sb.append(line);
                sb.append(lineSeparator);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if (reader != null) {
                try { reader.close(); }
                catch (IOException ignored) {}
            }
        }

        return sb.toString();
    }

    /**
     * Execute the axe script in the driver js executor
     */
    public void runAxeScript() {
        final String script = getContent();

        final JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.switchTo().defaultContent();
        js.executeScript(script);
    }
}
