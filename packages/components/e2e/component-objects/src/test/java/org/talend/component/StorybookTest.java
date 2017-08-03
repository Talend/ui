package org.talend.component;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class StorybookTest {

    private static final String ACTION_LOGGER_CONSOLE_SELECTOR = ".horizontal.Pane2 > div > div > div:last-child";

    private static final String STORY_MENU_SELECTOR = "a[title='%s']";

    protected static WebDriver driver;

    @BeforeClass
    public static void before() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:6006/");
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @AfterClass
    public static void after() {
        driver.close();
    }

    protected void goToStory(final String categoryName, final String storyName) {
        this.goToMainElement();

        final WebElement categoryMenu = driver.findElement(By.cssSelector(String.format(STORY_MENU_SELECTOR, categoryName)));
        if (!"bold".equals(categoryMenu.getCssValue("font-weight"))) {
            categoryMenu.click();
        }
        driver.findElement(By.cssSelector(String.format(STORY_MENU_SELECTOR, storyName))).click();

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
