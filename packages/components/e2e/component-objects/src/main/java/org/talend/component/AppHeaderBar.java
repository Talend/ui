package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;

/**
 * AppHeaderBar is used to easy access to WebElements of the react-talend-component AppHeaderBar component.
 *
 */
public class AppHeaderBar extends Component {

    private static final Logger LOGGER = LogManager.getLogger(AppHeaderBar.class);

    static final String NAME = "AppHeaderBar";

    static final String SELECTOR = ".tc-app-header-bar";

    /**
     * AppHeaderBar constructor
     *
     * @param driver Selenium WebDriver
     */
    AppHeaderBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }
}
