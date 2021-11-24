package org.talend.component.list.display;

import static java.util.stream.Collectors.toList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.talend.component.list.Display;
import org.talend.component.list.Item;
import org.talend.component.list.ListDisplay;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Large.
 */
public class Large extends ListDisplay {

    private static final String NAME = "Large";

    private static final String LIST_LARGE_SELECTOR = ".ReactVirtualized__List";

    private static final String LARGE_ITEM_SELECTOR = ".tc-list-large";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     */
    public Large(final WebDriver driver) {
        this(driver, null);
    }

    /**
     * Constructor with table id
     *
     * @param driver Selenium WebDriver
     */
    public Large(final WebDriver driver, final String id) {
        super(driver, NAME, String.format(LIST_LARGE_SELECTOR, id != null ? "#" + id : ""));
    }

    public WebElement getElementToScroll() {
        return this.getElement();
    }

    /**
     * Get all rendered items, represented by a row in the table.
     *
     * @return The list of Items
     */
    public List<Item> getDisplayedItems() {
        return this.getElement() //
                .findElements(By.cssSelector(LARGE_ITEM_SELECTOR)) //
                .stream() //
                .map(webElement -> new Item(driver, webElement)) //
                .collect(toList());
    }
}
