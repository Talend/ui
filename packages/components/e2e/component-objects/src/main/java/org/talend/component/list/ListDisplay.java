package org.talend.component.list;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.talend.component.Component;

import java.util.List;

/**
 *  Abtract class Container for List component
 */
public abstract class ListDisplay extends Component implements Display {

    abstract public WebElement getElementToScroll();
    abstract public List<Item> getDisplayedItems();

    private final WebDriverWait wait;

    public ListDisplay(final WebDriver driver, final String name, final String id) {
        super(driver, name, id);
        this.wait = new WebDriverWait(driver, 1);
    }
    /**
     * Scroll to top
     */
    public void scrollToTop() {
        final WebElement container = this.getElementToScroll();
        jsExec.executeScript("arguments[0].scrollTop = 0", container);
    }

    /**
     * Test if grid can scroll down
     */
    public boolean canScrollDown() {
        final WebElement container = this.getElementToScroll();
        return (boolean) jsExec.executeScript(
                "return arguments[0].scrollHeight > (arguments[0].scrollTop + arguments[0].offsetHeight);",
                container
        );
    }

    /**
     * Scroll to next set of rows
     * @return true if the element has been scrolled, false otherwise.
     */
    public boolean scrollDown() {
        if (!canScrollDown()) {
            return false;
        }

        final WebElement container = this.getElementToScroll();
        jsExec.executeScript("arguments[0].scrollTop += arguments[0].offsetHeight;", container);
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
                throw new NotFoundException("List item not found with title " + itemTitle);
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
