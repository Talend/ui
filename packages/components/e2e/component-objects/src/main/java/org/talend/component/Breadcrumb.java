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

    static final String NAME = "Breadcrumb";

    static final String SELECTOR = ".tc-breadcrumb";

    static final String ITEM_SELECTOR = ".tc-breadcrumb-item";

    static final String ACTIVE_ITEM_SELECTOR = ITEM_SELECTOR + ".active";

    static final String COLLAPSED_MENU_BUTTON_SELECTOR = ".dropdown-toggle";

    static final String COLLAPSED_MENU_SELECTOR = ".dropdown-menu";

    static final String COLLAPSED_MENU_ITEM_SELECTOR = COLLAPSED_MENU_SELECTOR + " a";

    /**
     * Breadcrumb constructor
     *
     * @param driver Selenium WebDriver
     */
    Breadcrumb(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    public List<WebElement> getItems() {
        LOGGER.info(NAME + ".getItems");
        return this.getElement().findElements(By.cssSelector(ITEM_SELECTOR));
    }

    public WebElement getItem(String label) {
        LOGGER.info(NAME + ".getItem " + label);
        Iterator<WebElement> elements = this.getItems().iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }

    public WebElement getActiveItem() {
        LOGGER.info(NAME + ".getActiveItem");
        return this.getElement().findElement(By.cssSelector(ACTIVE_ITEM_SELECTOR));
    }

    public WebElement getCollapsedMenuButton() {
        LOGGER.info(NAME + ".getCollapsedMenuButton");
        return this.getElement().findElement(By.cssSelector(COLLAPSED_MENU_BUTTON_SELECTOR));
    }

    public WebElement getCollapsedMenu() {
        LOGGER.info(NAME + ".getCollapsedMenu");
        return this.getElement().findElement(By.cssSelector(COLLAPSED_MENU_SELECTOR));
    }

    public List<WebElement> getCollapsedMenuItems() {
        LOGGER.info(NAME + ".getCollapsedMenuItems");
        return this.getElement().findElements(By.cssSelector(COLLAPSED_MENU_ITEM_SELECTOR));
    }

    public WebElement getCollapsedMenuItem(String label) {
        LOGGER.info(NAME + ".getCollapsedMenuItem " + label);
        Iterator<WebElement> elements = this.getCollapsedMenuItems().iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }
}
