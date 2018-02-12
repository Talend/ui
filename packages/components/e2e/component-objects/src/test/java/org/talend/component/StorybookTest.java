package org.talend.component;

import org.openqa.selenium.By;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class StorybookTest extends LocalJUnitTest {

    private static final String ACTION_LOGGER_CONSOLE_SELECTOR = ".horizontal.Pane2 > div > div > div:last-child";

    void goToStory(final String categoryName) {
        this.goToStory(categoryName, "default");
    }

    protected void goToStory(final String categoryName, final String storyName) {
        this.goToMainElement();

        try {
            driver.get("http://localhost:6006/?selectedKind=" + categoryName + "&selectedStory=" + URLEncoder.encode(storyName, "UTF-8") + "&full=0&addons=1&stories=0&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        this.goToStoryFrame();
    }

    private void goToStoryFrame() {
        driver.switchTo().frame(driver.findElement(By.id("storybook-preview-iframe")));
    }

    private void goToMainElement() {
        driver.switchTo().defaultContent();
    }

    protected String getActionLog() {
        this.goToMainElement();
        final String log = driver.findElement(By.cssSelector(ACTION_LOGGER_CONSOLE_SELECTOR)).getText();
        this.goToStoryFrame();
        return log;
    }
}
