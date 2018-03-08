package org.talend.config;

import org.openqa.selenium.WebDriver;

public abstract class WebDriverTest {

    public WebDriver driver;

    public abstract void setUp() throws Exception;

    public abstract void tearDown() throws Exception;
}
