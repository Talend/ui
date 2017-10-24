package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class HeaderBar extends Component {

    private static final Logger LOGGER = LogManager.getLogger(AppHeaderBar.class);

    static final String HEADER_NAME = "AppHeaderBar";

    static final String HEADER_SELECTOR = ".tc-header-bar";

    static final String HELP_SELECTOR = "header-help";

    static final String USER_SELECTOR = "header-user";

    static final String USER_DROP_DOWN_SELECTOR = ".dropdown-menu.dropdown-menu-right";

    static final String ABOUT_SELECTOR = "//li/a[@label='About']";

    static final String LOGOUT_SELECTOR = "//li/a[@label='Logout']";

    /**
     * AppHeaderBar constructor
     *
     * @param driver Selenium WebDriver
     */
    HeaderBar(WebDriver driver) {
        super(driver, HEADER_NAME, HEADER_SELECTOR);
    }

    public WebElement getHelp() {
        return this.getElement().findElement(By.id(HELP_SELECTOR));
    }

    public WebElement getUser() {
        return this.getElement().findElement(By.id(USER_SELECTOR));
    }

    public WebElement getUserMenu() {
        return this.getElement().findElement(By.cssSelector(USER_DROP_DOWN_SELECTOR));
    }

    public WebElement getInfo() {
        return this.getElement().findElement(By.xpath(ABOUT_SELECTOR));
    }

    public WebElement getLogout() {
        return this.getElement().findElement(By.xpath(LOGOUT_SELECTOR));
    }
}
