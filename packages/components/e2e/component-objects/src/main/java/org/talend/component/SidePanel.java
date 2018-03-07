package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;

/**
 * SidePanel is used to easy access to WebElements of the react-talend-component SidePanel component.
 *
 */
public class SidePanel extends Component {

    private static final Logger LOGGER = LogManager.getLogger(SidePanel.class);

    static final String NAME = "SidePanel";

    static final String SELECTOR = ".tc-side-panel";

    static final String MENU_ITEMS_SELECTOR = SELECTOR + " .tc-action-list-item span";

    static final String MENU_ITEM_ACTIVE_SELECTOR = SELECTOR + " .tc-action-list-item.active span";

    /**
     * SidePanel constructor
     *
     * @param driver Selenium WebDriver
     */
    SidePanel(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * Get menu item from its label
     *
     * @param label item menu label
     * @return WebElement of menu item
     * @throws NotFoundException if no elements with this label are found
     */
    public WebElement getMenu(String label) throws NotFoundException {
        LOGGER.info(NAME + ".getMenu " + label);
        Iterator<WebElement> elements = this.getElement().findElements(By.cssSelector(MENU_ITEMS_SELECTOR)).iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }

    /**
     * Get current active menu item
     *
     * @return WebElement of menu item
     * @throws NotFoundException if no active element is find
     */
    public WebElement getActiveMenu() throws NotFoundException {
        return this.getElement().findElement(By.cssSelector(MENU_ITEM_ACTIVE_SELECTOR));
    }
}
