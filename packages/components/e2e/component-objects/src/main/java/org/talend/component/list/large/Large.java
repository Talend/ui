package org.talend.component.list.large;

import static java.util.stream.Collectors.toList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.talend.component.list.ListContainer;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Large.
 */
public class Large extends ListContainer {

    private static final String NAME = "Large";

    private static final String LIST_LARGE_SELECTOR = ".ReactVirtualized__List";

    private static final String TABLE_ITEM_SELECTOR = ".tc-list-large";

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

    public WebElement getFirstElement() {
        return this.getElement().findElement(By.cssSelector(TABLE_ITEM_SELECTOR));
    }

    /**
     * Get all rendered items, represented by a row in the table.
     *
     * @return The list of Items
     */
    public List<ItemLarge> getDisplayedItems() {
        return this.getElement() //
                .findElements(By.cssSelector(TABLE_ITEM_SELECTOR)) //
                .stream() //
                .map(webElement -> new ItemLarge(driver, webElement)) //
                .collect(toList());
    }

    /**
     * Get a specific item, find by the item title.
     * It should be unique in the list.
     *
     * @param itemTitle The item title
     * @return The ItemLarge
     */
    public ItemLarge getItem(final String itemTitle) {
        this.scrollToTop();
        ItemLarge item = null;

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
}
