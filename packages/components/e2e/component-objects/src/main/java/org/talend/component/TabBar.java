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

    static final String TAB_ITEMS_SELECTOR = SELECTOR + " li > *";

    static final String TAB_ITEM_ACTIVE_SELECTOR = SELECTOR + " li.active > *";

    /**
     * SidePanel constructor
     *
     * @param driver Selenium WebDriver
     */
    public TabBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * TabBar constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    public TabBar(WebDriver driver, String id) {
        super(driver, NAME, id + SELECTOR);
    }


    /**
     * Get tab item from its label
     *
     * @param label item tab label
     * @return WebElement of tab item
     * @throws NotFoundException if no elements with this label are found
     */
    public WebElement getTab(final String label) throws NotFoundException {
        final Iterator<WebElement> elements = this.getElement().findElements(By.cssSelector(TAB_ITEMS_SELECTOR)).iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException("Tab not found: " + label);
    }

    /**
     * Get tab item from its index
     *
     * @param index item tab index
     * @return WebElement of tab item
     * @throws NotFoundException if no elements with this label are found
     */
    public WebElement getTab(final int index) throws NotFoundException {
        final WebElement element = this.getElement()
                .findElements(By.cssSelector(TAB_ITEMS_SELECTOR))
                .get(index);

        if (element == null) {
            throw new NotFoundException("Tab not found at index: " + index);
        }
        return element;
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

    /**
     * Select the tab identified by label
     *
     * @return WebElement of tab item
     * @throws NotFoundException if no active element is find
     */
    public void selectTab(final int index) throws NotFoundException {
        this.getTab(index).click();
    }
}
