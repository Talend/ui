package com.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component.
 *
 */
public class List extends Component {

    private static final Logger LOGGER = LogManager.getLogger(List.class);

    static final String NAME = "List";

    static final String LIST_SELECTOR = ".tc-list";

    static final String ADD_BTN_SELECTOR = ".tc-actionbar-container .btn-primary";

    static final String LIST_COLUMN_HEADER_SELECTOR = ".tc-list-table .ReactVirtualized__Table__headerColumn";

    static final String LIST_ITEMS_SELECTOR = ".tc-list-table div:first-child button";

    static final String ACTION_BTN_ITEM_XPATH = "//*[contains(@class,'tc-list-display-table-td')]//button[text()='{label}']/../../following-sibling::div[contains(@class, 'actions')]/div[@class='tc-actions btn-group']/button[@id='{listType}:{action}']";

    /**
     * List constructor
     *
     * @param driver Selenium WebDriver
     */
    List(WebDriver driver) {
        super(driver, NAME, LIST_SELECTOR);
    }

    /**
     * Get add button of the list
     *
     * @return WebElement button
     * @throws NotFoundException
     */
    public WebElement getAddButton() throws NotFoundException {
        return this.getElement().findElement(By.cssSelector(ADD_BTN_SELECTOR));
    }

    /**
     * Get list of column header
     *
     * @return List of WebElement
     */
    public java.util.List<WebElement> getColumnsHeaders() {
        return this.getElement().findElements(By.cssSelector(LIST_COLUMN_HEADER_SELECTOR));
    }

    /**
     * Get list item from his label
     *
     * @param label label of the item
     * @return WebElement the item
     */
    public WebElement getTitleFromLabel(String label) {
        LOGGER.info(NAME + ".getItemFromLabel " + label);
        Iterator<WebElement> elements = this.getElement().findElements(By.cssSelector(LIST_ITEMS_SELECTOR)).iterator();

        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equalsIgnoreCase(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }

    /**
     * Get action button of a list item
     *
     * @param label label of the list item
     * @param listType type of elements display in the list
     * @param action button action
     * @return WebElement of the action button
     */
    public WebElement getItemActionButton(String label, String listType, String action) throws Exception {
        if (label != null && !label.isEmpty() && listType != null && !listType.isEmpty() && action != null && !action.isEmpty()) {
            String xpath = ACTION_BTN_ITEM_XPATH.replace("{label}", label);
            xpath = xpath.replace("{listType}", listType);
            xpath = xpath.replace("{action}", action);
            return this.getElement().findElement(By.xpath(xpath));
        } else {
            LOGGER.error(NAME + ".getItemActionButton(" + label + ", " + listType + ", " + action + ")");
            throw new Exception("Parameters should not be empty or null!");
        }
    }

    /**
     * Test if an item exists
     *
     * @param name label of the list item
     * @return true if the item is in the list
     */
    public Boolean hasItem(String name) {
        try {
            this.getItemFromLabel(name);
        } catch (NotFoundException e) {
            return false;
        }
        return true;
    }
}
