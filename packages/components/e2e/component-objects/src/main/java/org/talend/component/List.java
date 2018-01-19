package org.talend.component;

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

    static final String LIST_SELECTOR = ".tc-list";

    static final String ACTIONBAR_SELECTOR = ".tc-actionbar-container";

    static final String BTN_SELECTOR = ACTIONBAR_SELECTOR + " .btn";

    /**
     * List constructor.
     *
     * @param driver Selenium WebDriver
     */
    List(WebDriver driver) {
        super(driver, NAME, LIST_SELECTOR);
    }

    /**
     * Get add button of the list.
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
     * Get the table display element manager.
     *
     * @return Table the table element manager
     */
    public Table getTable() {
        return new Table(driver);
    }

    /**
     * Get the table display element manager identified by id.
     *
     * @param id The table id
     * @return Table the table element manager
     */
    public Table getTable(final String id) {
        return new Table(driver, id);
    }
}
