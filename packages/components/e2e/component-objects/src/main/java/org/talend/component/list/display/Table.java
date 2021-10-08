package org.talend.component.list.display;

import org.openqa.selenium.*;
import org.talend.component.list.Display;
import org.talend.component.list.Item;
import org.talend.component.list.ListDisplay;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table.
 */
public class Table extends ListDisplay {

    private static final String NAME = "Table";

    private static final String TABLE_SELECTOR = ".tc-list-table%s";

    private static final String TABLE_COLUMN_HEADER_SELECTOR = ".ReactVirtualized__Table__headerColumn";

    private static final String TABLE_COLUMN_HEADER_KEY_CLASS = TABLE_COLUMN_HEADER_SELECTOR + ".tc-list-cell-%s";

    private static final String TABLE_GRID_SELECTOR = ".ReactVirtualized__Table__Grid";

    private static final String TABLE_ITEM_SELECTOR = ".ReactVirtualized__Table__row";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     */
    public Table(final WebDriver driver) {
        this(driver, null);
    }

    /**
     * Constructor with table id
     *
     * @param driver Selenium WebDriver
     */
    public Table(final WebDriver driver, final String id) {
        super(driver, NAME, String.format(TABLE_SELECTOR, id != null ? "#" + id : ""));
    }

    public WebElement getElementToScroll() {
        return this.getElement().findElement(By.cssSelector(TABLE_GRID_SELECTOR));
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

    /*
     * Get all rendered items, represented by a row in the table.
     *
     * @return The list of Items
     */
    public List<Item> getDisplayedItems() {
        return this.getElement() //
                .findElements(By.cssSelector(TABLE_ITEM_SELECTOR)) //
                .stream() //
                .map(webElement -> new Item(driver, webElement)) //
                .collect(toList());
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
