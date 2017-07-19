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
 */
public class Table extends Component {

    private static final String NAME = "Table";

    private static final String TABLE_SELECTOR = ".tc-list-table";

    private static final String TABLE_COLUMN_HEADER_SELECTOR = ".ReactVirtualized__Table__headerColumn";

    private static final String TABLE_COLUMN_HEADER_KEY_CLASS = TABLE_COLUMN_HEADER_SELECTOR + ".tc-list-cell-%s";

    private static final String TABLE_ITEM_SELECTOR = ".ReactVirtualized__Table__row";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     */
    public Table(final WebDriver driver) {
        super(driver, NAME, TABLE_SELECTOR);
    }

    /**
     * Get the headers.
     *
     * @return List of headers WebElement
     */
    public List<WebElement> getHeaders() {
        return this.getElement().findElements(By.cssSelector(TABLE_COLUMN_HEADER_SELECTOR));
    }

    /**
     * Get a specific header, identified by the column key.
     * You can get this key from the className on header element : tc-list-cell-(columnKey).
     *
     * @param columnKey The column key
     * @return The header WebElement
     */
    public WebElement getHeader(final String columnKey) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_COLUMN_HEADER_KEY_CLASS, columnKey)));
    }

    /**
     * Get all rendered items, represented by a row in the table.
     *
     * @return The list of Items
     */
    public List<Item> getItems() {
        return this.getElement() //
                .findElements(By.cssSelector(TABLE_ITEM_SELECTOR)) //
                .stream() //
                .map(webElement -> new Item(driver, webElement)) //
                .collect(toList());
    }

    /**
     * Get a specific item, find by the item title.
     * It should be unique in the list.
     *
     * @param itemTitle The item title
     * @return The Item
     */
    public Item getItem(final String itemTitle) {
        return getItems() //
                .stream() //
                .filter(item -> itemTitle.equalsIgnoreCase(item.getTitle().getText())) //
                .findFirst() //
                .orElseThrow(() -> new NotFoundException("List table item not found with title " + itemTitle));
    }

    /**
     * Click on header.
     *
     * @param columnKey The column key
     */
    public void clickOnHeader(final String columnKey) {
        getHeader(columnKey).click();
    }
}
