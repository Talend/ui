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

    static final String LIST_NAME = "List";

    static final String LIST_SELECTOR = ".tc-list";

    static final String ACTIONBAR_SELECTOR = ".tc-actionbar-container";

    static final String BTN_SELECTOR = ACTIONBAR_SELECTOR + " .btn";

    static final String ACTION_BAR_SELECTOR = ".tc-list-toolbar #%s.btn";

    static final String TOOL_BAR_SELECTOR_DISPLAY_MODE = ".dropdown #talend-display-mode";

    static final String TOOL_BAR_SELECTOR_SORT_BY = ".dropdown #talend-sort-by";

    static final String TOOL_BAR_SELECTOR_SORT_ORDER = ".dropdown #talend-sort-order";


    /**
     * List constructor.
     *
     * @param driver Selenium WebDriver
     */
    List(WebDriver driver) {
        super(driver, LIST_NAME, LIST_SELECTOR);
    }

    /**
     * List constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    List(WebDriver driver, String id) {
        super(driver, NAME, id + LIST_SELECTOR);
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
        return this.getElement().findElement(By.cssSelector(String.format(ACTION_BAR_SELECTOR, id)));
    }

    /**
     * Get Display Mode in Tool Bar button of the list.
     *
     * @return WebElement button
     */
    public WebElement getToolBarButtonDisplayMode() {
        return this.getElement().findElement(By.cssSelector(TOOL_BAR_SELECTOR_DISPLAY_MODE));
    }

    /**
     * Get Sort BY in Tool Bar button of the list.
     *
     * @return WebElement button
     */
    public WebElement getToolBarButtonSortBy() {
        return this.getElement().findElement(By.cssSelector(TOOL_BAR_SELECTOR_SORT_BY));
    }

    /**
     * Get Sort Order in Tool Bar button of the list.
     *
     * @return WebElement button
     */
    public WebElement getToolBarButtonSortOrder() {
        return this.getElement().findElement(By.id(TOOL_BAR_SELECTOR_SORT_ORDER));
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
