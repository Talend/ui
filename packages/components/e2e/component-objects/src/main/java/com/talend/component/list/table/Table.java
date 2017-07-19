package com.talend.component.list.table;

import com.talend.component.Component;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table.
 *
 * ** TABLE **
 table = list.getTable();

 ** TABLE / HEADER **

 // get column headers
 headers = table.getHeaders();
 headerIndex = table.getHeaderIndex(headerName);
 header = table.getHeader(headerName);
 header.click();

 ** TABLE / ITEM **

 // get item row
 item = table.getItem(itemName);
 item = table.getItem(itemIndex);

 // get item title
 title = item.getTitle();
 // DROPPED title = table.getItemTitle(itemName);
 title.click();

 // get item actions
 actions = item.getActions();
 // DROPPED actions = table.getItemActions(itemName);

 action = item.getAction(actionId); --> need to generate uniform ids
 // DROPPED action = table.getItemAction(itemName, actionId);
 action.click();

 // get item cell
 cell = item.get(headerName);
 cell = item.get(headerIndex);

 text = cell.getText();

 actions = cell.getActions();
 action = cell.getAction(actionId); --> need to generate uniform ids
 action.click();
 */
public class Table extends Component {
    static final String NAME = "Table";

    static final String TABLE_SELECTOR = ".tc-list-table";

    static final String TABLE_COLUMN_HEADER_SELECTOR = ".ReactVirtualized__Table__headerColumn";

    static final String TABLE_COLUMN_HEADER_KEY_CLASS = TABLE_COLUMN_HEADER_SELECTOR + ".tc-list-cell-%s";

    static final String TABLE_ITEM_SELECTOR = ".ReactVirtualized__Table__row";

    public Table(final WebDriver driver) {
        super(driver, NAME, TABLE_SELECTOR);
    }

    public List<WebElement> getHeaders() {
        return this.getElement().findElements(By.cssSelector(TABLE_COLUMN_HEADER_SELECTOR));
    }

    public WebElement getHeader(final String headerKey) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_COLUMN_HEADER_KEY_CLASS, headerKey)));
    }

    public List<Item> getItems() {
        return this.getElement()
                .findElements(By.cssSelector(TABLE_ITEM_SELECTOR))
                .stream()
                .map(webElement -> new Item(driver, webElement))
                .collect(toList());
    }

    public Item getItem(final String itemTitle) {
        return getItems()
                .stream()
                .filter(item -> itemTitle.equalsIgnoreCase(item.getTitle().getText()))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("List table item not found with title " + itemTitle));
    }
}
