package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;

/**
 * Drawer is used to easily access to WebElements of the react-talend-component's Drawer component.
 *
 */
public class Drawer extends Component {

    private static final Logger LOGGER = LogManager.getLogger(List.class);

    static final String NAME = "Drawer";

    static final String SELECTOR = ".tc-drawer";

    /**
     * Drawer's constructor
     *
     * @param driver Selenium WebDriver
     */
    Drawer(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * Drawer constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    Drawer(WebDriver driver, String id) {
        super(driver, NAME, id + SELECTOR);
    }

}
