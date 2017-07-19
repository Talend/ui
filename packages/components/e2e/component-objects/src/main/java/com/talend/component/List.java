package com.talend.component;

import com.talend.component.list.table.Table;
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

    static final String ADD_BTN_SELECTOR = ".tc-actionbar-container .btn-primary";

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
        return this.getElement().findElement(By.cssSelector(ADD_BTN_SELECTOR));
    }

    /**
     * Get the table display element manager.
     *
     * @return Table the table element manager
     */
    public Table getTable() {
        return new Table(driver);
    }
}
