package org.talend.config;

import com.browserstack.local.Local;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class BrowserStackWebDriverTest extends WebDriverTest {

    private Local browserStackLocalInstance;

    public void setUp() throws Exception {
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability("browser", "Chrome");
        capabilities.setCapability("browser_version", "64.0");
        capabilities.setCapability("os", "Windows");
        capabilities.setCapability("os_version", "10");
        capabilities.setCapability("resolution", "1024x768");
        capabilities.setCapability("browserstack.debug", "true");
        //capabilities.setCapability("browserstack.local", "true");

        String username = System.getenv("BROWSERSTACK_USERNAME");
        String accessKey = System.getenv("BROWSERSTACK_ACCESS_KEY");

        if (capabilities.getCapability("browserstack.local") != null && capabilities.getCapability("browserstack.local") == "true") {
            browserStackLocalInstance = new Local();
            Map<String, String> options = new HashMap<String, String>();
            options.put("key", accessKey);
            browserStackLocalInstance.start(options);
        }

        driver = new RemoteWebDriver(new URL("http://" + username + ":" + accessKey + "@hub-cloud.browserstack.com/wd/hub"), capabilities);
    }

    public void tearDown() throws Exception {
        driver.quit();
        if (browserStackLocalInstance != null) browserStackLocalInstance.stop();
    }
}
