package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;

/**
 * TabBar is used to easy access to WebElements of the @talend/react-component TabBar component.
 *
 */
public class TabBar extends Component {

    private static final Logger LOGGER = LogManager.getLogger(TabBar.class);

    static final String NAME = "TabBar";

    static final String SELECTOR = ".tc-tab-bar";

    static final String TAB_ITEMS_SELECTOR = SELECTOR + " .tc-tab-bar-action span";

    static final String TAB_ITEM_ACTIVE_SELECTOR = SELECTOR + " .tc-tab-bar-action.active span";

    /**
     * SidePanel constructor
     *
     * @param driver Selenium WebDriver
     */
    TabBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * Get tab item from its label
     *
     * @param label item tab label
     * @return WebElement of tab item
     * @throws NotFoundException if no elements with this label are found
     */
    public WebElement getTab(String label) throws NotFoundException {
        Iterator<WebElement> elements = this.getElement().findElements(By.cssSelector(TAB_ITEMS_SELECTOR)).iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }

    /**
     * Get current active tab item
     *
     * @return WebElement of tab item
     * @throws NotFoundException if no active element is find
     */
    public WebElement getActiveTab() throws NotFoundException {
        return this.getElement().findElement(By.cssSelector(TAB_ITEM_ACTIVE_SELECTOR));
    }
}
