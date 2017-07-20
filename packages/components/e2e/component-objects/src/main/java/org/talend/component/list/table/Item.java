package org.talend.component.list.table;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import org.talend.component.Component;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - Item.
 */
public class Item extends Component {

    private static final String NAME = "Item";

    private static final String TABLE_ITEM_TITLE_SELECTOR = ".tc-list-title > button";

    private static final String TABLE_ITEM_ACTIONS_SELECTOR = ".tc-list-title > .tc-actions button";

    private static final String TABLE_ITEM_ACTION_SELECTOR = TABLE_ITEM_ACTIONS_SELECTOR + "[id*=%s]";

    private static final String TABLE_ITEM_SELECT_CHECKBOX_SELECTOR = ".tc-list-internal-row-selector input[type=checkbox]";

    private static final String TABLE_ITEM_CELL_SELECTOR = ".tc-list-cell-%s";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     * @param root The Item WebElement. This will scope the selection
     */
    public Item(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    /**
     * Get the title button WebElement.
     *
     * @return The title button WebElement
     */
    public WebElement getTitle() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_TITLE_SELECTOR));
    }

    /**
     * Get the Item action, selected its id or part of its idea.
     *
     * @param actionId The action id
     * @return The action WebElement
     */
    public WebElement getAction(final String actionId) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_ACTION_SELECTOR, actionId)));
    }

    /**
     * Get the item selection checkbox.
     *
     * @return The checkbox WebElement
     */
    public WebElement getSelectionCheckbox() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_SELECT_CHECKBOX_SELECTOR));
    }

    /**
     * Get a cell from the column key.
     *
     * @param columnKey The columnKey
     * @return The Cell
     */
    public Cell getCell(final String columnKey) {
        final WebElement cell = this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_CELL_SELECTOR, columnKey)));
        return new Cell(driver, cell);
    }

    /**
     * Click on item title.
     */
    public void clickOnTitle() {
        getTitle().click();
    }

    /**
     * Move the mouse to the action and click.
     * The item action is identified by its id.
     *
     * @param actionId The item action id
     */
    public void clickOnAction(final String actionId) {
        final WebElement actionButton = this.getAction(actionId);
        final Actions action = new Actions(driver);
        action.moveToElement(actionButton).perform();
        actionButton.click();
    }
}
