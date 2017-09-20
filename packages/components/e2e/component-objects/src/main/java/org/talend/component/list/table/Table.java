package org.talend.component.list.table;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.talend.component.Component;

import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table.
 */
public class Table extends Component {

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
    public List<Item> getDisplayedItems() {
        return this.getElement() //
                .findElements(By.cssSelector(TABLE_ITEM_SELECTOR)) //
                .stream() //
                .map(webElement -> new Item(driver, webElement)) //
                .collect(toList());
    }

    /**
     * Scroll to top
     */
    public void scrollToTop() {
        final WebElement grid = this.getElement().findElement(By.cssSelector(TABLE_GRID_SELECTOR));
        jsExec.executeScript("arguments[0].scrollTop = 0", grid);
    }

    /**
     * Test if grid can scroll down
     */
    public boolean canScrollDown() {
        final WebElement grid = this.getElement().findElement(By.cssSelector(TABLE_GRID_SELECTOR));
        return (boolean) jsExec.executeScript(
                "return arguments[0].scrollHeight > (arguments[0].scrollTop + arguments[0].offsetHeight);",
                grid
        );
    }

    /**
     * Scroll to next set of rows
     * @return true if the element has been scrolled, false otherwise.
     */
    public boolean scrollDown() {
        if (! canScrollDown()) {
            return false;
        }

        final WebElement grid = this.getElement().findElement(By.cssSelector(TABLE_GRID_SELECTOR));
        jsExec.executeScript("arguments[0].scrollTop += arguments[0].offsetHeight;", grid);
        return true;
    }

    /**
     * Get a specific item, find by the item title.
     * It should be unique in the list.
     *
     * @param itemTitle The item title
     * @return The Item
     */
    public Item getItem(final String itemTitle) {
        this.scrollToTop();
        Item item = null;

        while (item == null) {
            item = getDisplayedItems() //
                    .stream() //
                    .filter(nextItem -> {
                        final WebElement title = nextItem.getTitle();
                        return title != null && itemTitle.equalsIgnoreCase(title.getText());
                    }) //
                    .findFirst() //
                    .orElse(null);

            if (item == null && !this.scrollDown()) {
                throw new NotFoundException("List table item not found with title " + itemTitle);
            }
        }

        return item;
    }

    /**
     * Test if an item exists, based on its title
     *
     * @param itemTitle Title label of the list item
     * @return true if the item is in the list
     */
    public Boolean hasItem(String itemTitle) {
        try {
            this.getItem(itemTitle);
        } catch (NotFoundException e) {
            return false;
        }
        return true;
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
