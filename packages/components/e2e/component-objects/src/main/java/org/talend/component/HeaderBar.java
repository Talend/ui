package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HeaderBar extends Component {

    private static final Logger LOGGER = LogManager.getLogger(AppHeaderBar.class);

    static final String NAME = "AppHeaderBar";

    static final String SELECTOR = ".tc-header-bar";

    static final String USER_DROP_DOWN_SELECTOR = ".dropdown-menu.dropdown-menu-right";

    /**
     * AppHeaderBar constructor
     *
     * @param driver Selenium WebDriver
     */
    HeaderBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    public WebElement getUserMenu() {
        return this.getElement().findElement(By.cssSelector(USER_DROP_DOWN_SELECTOR));
    }

    public WebElement getItemById(String id) {
        return this.getElement().findElement(By.id(id));
    }
}
