package org.talend.config;

import com.browserstack.local.Local;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class BrowserStackWebDriverTest extends WebDriverTest {

    private Local bsLocalInstance;

    public void setUp() throws Exception {
        final DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browser", "Chrome");
        capabilities.setCapability("browser_version", "66.0");
        capabilities.setCapability("os", "Windows");
        capabilities.setCapability("os_version", "10");
        capabilities.setCapability("resolution", "1600x1200");
        capabilities.setCapability("browserstack.debug", "true");
        if (System.getProperty("storybook.host") == "localhost") {
            capabilities.setCapability("browserstack.local", "true");
        }

        final String username = System.getenv("BROWSERSTACK_USER");
        if (username == null) {
            throw new IllegalArgumentException("BROWSERSTACK_USER should be defined.");
        }

        final String accessKey = System.getenv("BROWSERSTACK_KEY");
        if (accessKey == null) {
            throw new IllegalArgumentException("BROWSERSTACK_KEY should be defined.");
        }

        if (capabilities.getCapability("browserstack.local") != null && capabilities.getCapability("browserstack.local") == "true") {
            bsLocalInstance = new Local();
            Map<String, String> options = new HashMap<String, String>();
            options.put("key", accessKey);
            bsLocalInstance.start(options);
        }

        final URL browserStackUrl = new URL("http://" + username + ":" + accessKey + "@hub-cloud.browserstack.com/wd/hub");
        driver = new RemoteWebDriver(browserStackUrl, capabilities);
    }

    public void tearDown() throws Exception {
        driver.quit();
        if (bsLocalInstance != null) bsLocalInstance.stop();
    }
}
