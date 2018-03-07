package org.talend.component;

import org.apache.http.client.utils.URIBuilder;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.URL;
import java.net.URLEncoder;

import static org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable;

public class StorybookTest {

    private static final String ACTION_LOGGER_CONSOLE_SELECTOR = ".horizontal.Pane2 > div > div > div:last-child";

    private static final String STORY_CATEGORY_SELECTOR = "div[data-name='%s']";

    private static final String STORY_MENU_SELECTOR = "a[data-name='%s']";

    private static final String DEFAULT_STORY_NAME = "default";

    private static final String STORYBOOK_HOST = "localhost";

    private static final int STORYBOOK_PORT = 6006;

    protected static WebDriver driver;

    @BeforeClass
    public static void before() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterClass
    public static void after() {
        driver.close();
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
            builder.setPath("/");
            builder.addParameter("selectedKind", categoryName);
            builder.addParameter("selectedStory", storyName);

            driver.get(builder.build().toURL().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }

        this.goToStoryFrame();
    }

    protected void goToStoryFrame() {
        driver.switchTo().frame(driver.findElement(By.id("storybook-preview-iframe")));
    }

    protected void goToMainElement() {
        driver.switchTo().defaultContent();
    }

    protected String getActionLog() {
        this.goToMainElement();
        final String log = driver.findElement(By.cssSelector(ACTION_LOGGER_CONSOLE_SELECTOR)).getText();
        this.goToStoryFrame();
        return log;
    }
}
