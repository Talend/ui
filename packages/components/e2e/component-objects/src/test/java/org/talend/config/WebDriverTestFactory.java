package org.talend.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class WebDriverTestFactory {
    private static final Logger LOGGER = LogManager.getLogger(WebDriverTestFactory.class);

    public WebDriverTest getWebDriverTestConfiguration() {
        boolean isRemote = Boolean.parseBoolean(System.getProperty("remote", "false"));
        if (isRemote) {
            LOGGER.info("Remote WebDriver test configuration enabled");
            return new BrowserStackWebDriverTest();
        } else {
            LOGGER.info("Local WebDriver test configuration enabled");
            return new LocalWebDriverTest();
        }
    }
}
