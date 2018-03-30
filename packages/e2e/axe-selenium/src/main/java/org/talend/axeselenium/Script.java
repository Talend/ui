package org.talend.axeselenium;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

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
     * Recursively find frames and inject a script into them.
     * @param script Script to inject
     * @param parents A list of all toplevel frames
     */
//    private void injectIntoFrames(final String script, final List<WebElement> parents) {
//        final JavascriptExecutor js = (JavascriptExecutor) driver;
//        final List<WebElement> frames = driver.findElements(By.tagName("iframe"));
//
//        for (WebElement frame : frames) {
//            driver.switchTo().defaultContent();
//
//            if (parents != null) {
//                for (WebElement parent : parents) {
//                    driver.switchTo().frame(parent);
//                }
//            }
//
//            driver.switchTo().frame(frame);
//            js.executeScript(script);
//
//            parents.add(frame);
//            injectIntoFrames(script, parents);
//        }
//    }

    /**
     * Recursively injects a script to the top level document
     */
    public void runAxeScript() {
        final String script = getContent();

        final JavascriptExecutor js = (JavascriptExecutor) driver;
        driver.switchTo().defaultContent();
        js.executeScript(script);
    }
}
