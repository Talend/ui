package org.talend.component.list;

import org.talend.component.Component;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - Item - Cell.
 */
public class Cell extends Component {

    private static final String NAME = "Cell";

    private static final String TABLE_ITEM_CELL_ACTIONS_SELECTOR = "button";

    private static final String TABLE_ITEM_CELL_ACTIONS_ID_SELECTOR = TABLE_ITEM_CELL_ACTIONS_SELECTOR + "[id=%s]";

    private static final String TABLE_ITEM_CELL_CHECKBOX_SELECTOR = "input[type=checkbox]";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     * @param root The Cell WebElement. This will scope the selection
     */
    public Cell(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    /**
     * Get the actions buttons on an actions cell.
     *
     * @return The list of buttons WebElement
     */
    public List<WebElement> getActions() {
        return this.getElement().findElements(By.cssSelector(TABLE_ITEM_CELL_ACTIONS_SELECTOR));
    }

    /**
     * Get a specific action, based on its id.
     *
     * @param actionId The action id
     * @return The button WebElement
     */
    public WebElement getAction(final String actionId) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_CELL_ACTIONS_ID_SELECTOR, actionId)));
    }

    /**
     * Get a checkbox on a checkbox cell.
     *
     * @return The checkbox WebElement
     */
    public WebElement getCheckbox() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_CELL_CHECKBOX_SELECTOR));
    }
}
