package com.talend.component.list.table;

import com.talend.component.Component;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - item.
 */
public class Item extends Component {
    private static final String NAME = "TableItem";

    private static final String TABLE_ITEM_TITLE_SELECTOR = ".tc-list-title > button";

    private static final String TABLE_ITEM_ACTIONS_SELECTOR = ".tc-list-title > .tc-actions button";

    private static final String TABLE_ITEM_ACTION_SELECTOR = TABLE_ITEM_ACTIONS_SELECTOR + "[id*=%s]";

    private static final String TABLE_ITEM_SELECT_CHECKBOX_SELECTOR = ".tc-list-internal-row-selector input[type=checkbox]";

    private static final String TABLE_ITEM_CELL_SELECTOR = ".ReactVirtualized__Table__rowColumn .tc-list-cell-%s";

    public Item(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    public WebElement getTitle() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_TITLE_SELECTOR));
    }

    public WebElement getAction(final String actionId) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_ACTION_SELECTOR, actionId)));
    }

    public WebElement getSelection() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_SELECT_CHECKBOX_SELECTOR));
    }

    public Cell getCell(final String headerKey) {
        final WebElement cell = this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_CELL_SELECTOR, headerKey)));
        return new Cell(driver, cell);
    }
}
