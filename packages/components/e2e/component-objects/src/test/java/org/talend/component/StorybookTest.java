package org.talend.component;

import org.apache.http.client.utils.URIBuilder;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.talend.config.WebDriverTest;
import org.talend.config.WebDriverTestFactory;

public class StorybookTest {

    private static final String ACTION_LOGGER_CONSOLE_SELECTOR = ".horizontal.Pane2 > div > div > div:last-child";

    private static final String DEFAULT_STORY_NAME = "default";

    private static final String STORYBOOK_HOST = "talend.surge.sh";

    private static final int STORYBOOK_PORT = 80;

    protected WebDriverTest webDriverTestConfiguration;

    protected WebDriver driver;

    @Before
    public void before() throws Exception {
        webDriverTestConfiguration = new WebDriverTestFactory().getWebDriverTestConfiguration();
        webDriverTestConfiguration.setUp();
        driver = webDriverTestConfiguration.driver;
        System.out.println("WebDriver is running: " + driver);
    }

    @After
    public void after() throws Exception {
        webDriverTestConfiguration.tearDown();
    }

    protected void goToStory(final String categoryName) {
        goToStory(categoryName, DEFAULT_STORY_NAME);
    }

    protected void goToStory(final String categoryName, final String storyName) {
        this.goToMainElement();

        try {
            URIBuilder builder = new URIBuilder();

            builder.setScheme("http");
            builder.setHost(STORYBOOK_HOST);
            builder.setPort(STORYBOOK_PORT);
            builder.setPath("/components/");
            builder.addParameter("selectedKind", categoryName);
            builder.addParameter("selectedStory", storyName);

            driver.get(builder.build().toURL().toString());
        } catch (Exception e) {
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
