package org.talend.component;

import org.talend.component.list.large.Large;
import org.talend.component.list.table.Table;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component.
 *
 */
public class List extends Component {

    static final String NAME = "List";

    static final String SELECTOR = ".tc-list";

    static final String TOOL_BAR_SELECTOR = ".tc-list-toolbar";

    static final String ACTIONBAR_SELECTOR = ".tc-actionbar-container";

    static final String BTN_SELECTOR = ACTIONBAR_SELECTOR + " .btn";

    static final String TOOL_BAR_ITEM_SELECTOR = TOOL_BAR_SELECTOR + " div[role='toolbar'] #%s";

    /**
     * List constructor.
     *
     * @param driver Selenium WebDriver
     */
    List(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * List constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    List(WebDriver driver, String id) {
        super(driver, NAME, id + SELECTOR);
    }

    /**
     * Get Action Bar button of the list.
     *
     * @return WebElement button
     */
    public WebElement getAddButton() {
        return this.getButtons().get(0);
    }

    /**
     * Get all buttons of the list toolbar.
     *
     * @return java.util.List<WebElement> buttons
     */
    public java.util.List<WebElement> getButtons() {
        return this.driver.findElements(By.cssSelector(BTN_SELECTOR));
    }

    /**
     * Get add button of the list.
     *
     * @return WebElement button
     */
    public WebElement getActionBarButtonById(String id) {
        return this.getElement().findElement(By.cssSelector(ACTIONBAR_SELECTOR)).findElement(By.id(id));
    }

    /**
     * Get item from toolbar given its id.
     *
     * @return WebElement button
     */
    public WebElement getToolBarItemById(String id) {
        return this.getElement().findElement(By.cssSelector(String.format(TOOL_BAR_ITEM_SELECTOR, id)));
    }

    /**
     * Get the table display element manager.
     *
     * @return Large the table element manager
     */
    public Table getTable() {
        return new Table(driver);
    }

    /**
     * Get the table display element manager.
     *
     * @return Large the table element manager
     */
    public Large getLarge() {
        return new Large(driver);
    }

    /**
     * Get the table display element manager identified by id.
     *
     * @param id The table id
     * @return Large the table element manager
     */
    public Table getTable(final String id) {
        return new Table(driver, id);
    }
}
