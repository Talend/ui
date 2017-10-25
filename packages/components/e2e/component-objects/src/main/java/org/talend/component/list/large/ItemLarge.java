package org.talend.component.list.large;

import java.time.Duration;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.talend.component.Component;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Large - ItemLarge.
 */
public class ItemLarge extends Component {

    private static final String NAME = "ItemLarge";

    private static final String TABLE_ITEM_TITLE_CONTAINER_SELECTOR = ".tc-list-title";

    private static final String TABLE_ITEM_TITLE_SELECTOR = TABLE_ITEM_TITLE_CONTAINER_SELECTOR + " > button";

    private static final String TABLE_ITEM_ACTIONS_SELECTOR = TABLE_ITEM_TITLE_CONTAINER_SELECTOR + " > .tc-actions button";

    private static final String TABLE_ITEM_ACTION_SELECTOR = TABLE_ITEM_ACTIONS_SELECTOR + "[id*=\"%s\"]";

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     * @param root The ItemLarge WebElement. This will scope the selection
     */
    public ItemLarge(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    /**
     * Get the title button WebElement.
     *
     * @return The title button WebElement
     */
    public WebElement getTitle() {
        final List<WebElement> titleButtons = this.getElement().findElements(By.cssSelector(TABLE_ITEM_TITLE_SELECTOR));
        if (titleButtons.size() == 1) {
            return titleButtons.get(0);
        }
        return null;
    }

    /**
     * Get the ItemLarge action, selected its id or part of its idea.
     *
     * @param actionId The action id
     * @return The action WebElement
     */
    public WebElement getAction(final String actionId) {
        return this.getElement().findElement(By.cssSelector(String.format(TABLE_ITEM_ACTION_SELECTOR, actionId)));
    }


    /**
     * Click on item title.
     */
    public void clickOnTitle() {
        final WebElement title = getTitle();
        if (title == null) {
            throw new NotFoundException("ItemLarge title element not found. Not able to click on it.");
        }

        // this is js execution because in some cases react-virtualized freeze a very (very) short time after scroll.
        // this is a problem only for automated tests that click fast. So the click is programmatic.
        // for common human, this is not noticeable.
        jsExec.executeScript("arguments[0].scrollIntoView(); arguments[0].click();", title);
    }

    /**
     * Move the mouse to the action and click.
     * The item action is identified by its id.
     *
     * @param actionId The item action id
     */
    public void clickOnAction(final String actionId) {
        final Actions action = new Actions(driver);
        action
                .moveToElement(this.getElement())
                .pause(Duration.ofSeconds(1))
                .moveToElement(this.getAction(actionId))
                .build()
                .perform();

        // we need to get the button element again because of TooltipTrigger that replace the element on hover ...
        this.getAction(actionId).click();
    }
}
