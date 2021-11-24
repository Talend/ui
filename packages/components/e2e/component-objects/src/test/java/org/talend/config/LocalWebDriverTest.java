package org.talend.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocalWebDriverTest extends WebDriverTest {
    private static final Logger LOGGER = LogManager.getLogger(LocalWebDriverTest.class);

    public void setUp() {
        LOGGER.info("Using local version of WebDriver: " + System.getProperty("webdriver.chrome.driver"));
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    public void tearDown() {
        driver.close();
    }
}
