package org.talend.config;

import org.openqa.selenium.chrome.ChromeDriver;

public class LocalWebDriverTest extends WebDriverTest {

    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    public void tearDown() {
        driver.close();
    }
}
