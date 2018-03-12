package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;
import java.util.List;

public class Breadcrumb extends Component {

    private static final Logger LOGGER = LogManager.getLogger(Breadcrumb.class);

    private static final String NAME = "Breadcrumb";

    private static final String SELECTOR = ".tc-breadcrumb";

    private static final String ITEM_SELECTOR = SELECTOR + " .tc-breadcrumb-item";

    private static final String ACTIVE_ITEM_SELECTOR = ITEM_SELECTOR + ".active";

    private static final String COLLAPSED_MENU_BUTTON_SELECTOR = SELECTOR + " .dropdown-toggle";

    private static final String COLLAPSED_MENU_SELECTOR = SELECTOR + " .dropdown-menu";

    private static final String COLLAPSED_MENU_ITEM_SELECTOR = COLLAPSED_MENU_SELECTOR + " a";

    /**
     * Breadcrumb constructor
     *
     * @param driver Selenium WebDriver
     */
    public Breadcrumb(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    public List<WebElement> getItems() {
        LOGGER.debug(NAME + ".getItems");
        return this.getElement().findElements(By.cssSelector(ITEM_SELECTOR));
    }

    public WebElement getItem(final String text) {
        LOGGER.debug(NAME + ".getItem " + text);
        for (WebElement item : this.getItems()) {
            if (item.getText().equals(text)) {
                return item;
            }
        }
        throw new NotFoundException(text);
    }

    public WebElement getActiveItem() {
        LOGGER.debug(NAME + ".getActiveItem");
        return this.getElement().findElement(By.cssSelector(ACTIVE_ITEM_SELECTOR));
    }

    public WebElement getCollapsedMenuButton() {
        LOGGER.debug(NAME + ".getCollapsedMenuButton");
        return this.getElement().findElement(By.cssSelector(COLLAPSED_MENU_BUTTON_SELECTOR));
    }

    public WebElement getCollapsedMenu() {
        LOGGER.debug(NAME + ".getCollapsedMenu");
        return this.getElement().findElement(By.cssSelector(COLLAPSED_MENU_SELECTOR));
    }

    public List<WebElement> getCollapsedMenuItems() {
        LOGGER.debug(NAME + ".getCollapsedMenuItems");
        return this.getElement().findElements(By.cssSelector(COLLAPSED_MENU_ITEM_SELECTOR));
    }

    public WebElement getCollapsedMenuItem(final String text) {
        LOGGER.debug(NAME + ".getCollapsedMenuItem " + text);
        for (final WebElement item : this.getCollapsedMenuItems()) {
            if (item.getText().equals(text)) {
                return item;
            }
        }
        throw new NotFoundException(text);
    }

    /* click helpers */

    public void clickOnMenuItem(final String text) {
        LOGGER.info(NAME + ".clickOnMenuItem " + text);
        this.getCollapsedMenuButton().click();
        this.getCollapsedMenuItem(text).click();
    }

    public void clickOnItem(final String text) {
        LOGGER.info(NAME + ".clickOnItem " + text);
        try {
            this.getItem(text).click();
        } catch (NotFoundException nfe) {
            // fallback
            this.clickOnMenuItem(text);
        }
    }
}
