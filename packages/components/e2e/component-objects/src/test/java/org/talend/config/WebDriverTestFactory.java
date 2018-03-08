package org.talend.config;

public class WebDriverTestFactory {

    public WebDriverTest getWebDriverTestConfiguration() {
        boolean isRemote = Boolean.parseBoolean(System.getProperty("remote", "false"));
        if (isRemote) {
            System.out.println("Remote WebDriver test configuration enabled");
            return new BrowserStackWebDriverTest();
        } else {
            System.out.println("Local WebDriver test configuration enabled");
            return new LocalWebDriverTest();
        }
    }
}
