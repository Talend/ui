package com.talend.component.list.table;

import org.openqa.selenium.WebDriver;

import com.talend.component.Component;
import org.openqa.selenium.WebElement;

import java.util.List;

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

    static final String TABLE_COLUMN_HEADER_SELECTOR = ".tc-list-table .ReactVirtualized__Table__headerColumn";

    public Table(final WebDriver driver) {
        super(driver, NAME, TABLE_SELECTOR);
    }

    public List<WebElement> getHeaders() {
        return null;
    }

    public List<WebElement> getHeaders(final String headerName) {
        return null;
    }

    public int getHeaderIndex(final String headerName) {
        return -1;
    }

    public Item getItem(final String itemName) {
        return null;
    }

    public Item getItem(final int itemIndex) {
        return null;
    }
}
