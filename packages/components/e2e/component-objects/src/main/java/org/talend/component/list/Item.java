package org.talend.component.list;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.talend.component.Component;

import java.util.List;

import static org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - Item.
 */
public class Item extends Component {

    private static final String NAME = "Item";

    private static final String ITEM_TITLE_CONTAINER_SELECTOR = ".tc-list-title";

    private static final String ITEM_TITLE_SELECTOR = ITEM_TITLE_CONTAINER_SELECTOR + " > button";

    private static final String ITEM_SELECT_CHECKBOX_SELECTOR = ".tc-list-internal-row-selector input[type=checkbox]";

    private static final String ITEM_CELL_SELECTOR = ".tc-list-cell-%s";

    private final WebDriverWait wait;

    /**
     * Constructor.
     *
     * @param driver Selenium WebDriver
     * @param root The Item WebElement. This will scope the selection
     */
    public Item(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
        this.wait = new WebDriverWait(driver, 3);
    }

    /**
     * Get the title button WebElement.
     *
     * @return The title button WebElement
     */
    public WebElement getTitle() {
        final List<WebElement> titleButtons = this.getElement().findElements(By.cssSelector(ITEM_TITLE_SELECTOR));
        if (titleButtons.size() == 1) {
            return titleButtons.get(0);
        }
        return null;
    }

    /**
     * Extract current row id and build a specific action id
     */
    private By getActionSelector(final String actionId) {
        return getActionSelector(actionId, "");
    }

    /**
     * Extract current row id and build a specific action id having the passed attribute
     */
    private By getActionSelector(final String actionId, final String attribute) {
        final String cellID = this.getElement().findElement(By.cssSelector(ITEM_TITLE_CONTAINER_SELECTOR)).getAttribute("id");
        return By.cssSelector(String.format("#%s #%s%s", cellID, actionId, attribute));
    }

    /**
     * Get the ellipsis action menu button
     */
    private WebElement getEllipsisActionButton() {
        final String cellID = this.getElement().findElement(By.cssSelector(ITEM_TITLE_CONTAINER_SELECTOR)).getAttribute("id");
        final By buttonSelector = By.cssSelector(String.format("#%s .cell-title-actions-menu", cellID));
        if (driver.findElements(buttonSelector).size() == 0) {
            return null;
        }
        return this.driver.findElement(buttonSelector);
    }

    /**
     * Get the ellipsis action menu
     */
    private WebElement getEllipsisMenu() {
        final String cellID = this.getElement().findElement(By.cssSelector(ITEM_TITLE_CONTAINER_SELECTOR)).getAttribute("id");
        final By menuSelector = By.cssSelector(String.format("#%s .cell-title-actions-menu + ul", cellID));
        return this.driver.findElement(menuSelector);
    }

    /**
     * Get the Item action, selected its id or part of its idea.
     *
     * @param actionId The action id
     * @return The action WebElement
     */
    public WebElement getAction(final String actionId) {
        return this.driver.findElement(getActionSelector(actionId));
    }

    /**
     * Get the item selection checkbox.
     *
     * @return The checkbox WebElement
     */
    public WebElement getSelectionCheckbox() {
        return this.getElement().findElement(By.cssSelector(ITEM_SELECT_CHECKBOX_SELECTOR));
    }

    /**
     * Get a cell from the column key.
     *
     * @param columnKey The columnKey
     * @return The Cell
     */
    public Cell getCell(final String columnKey) {
        final WebElement cell = this.getElement().findElement(By.cssSelector(String.format(ITEM_CELL_SELECTOR, columnKey)));
        return new Cell(driver, cell);
    }

    /**
     * Click on item title.
     */
    public void clickOnTitle() {
        final WebElement title = getTitle();
        if (title == null) {
            throw new NotFoundException("Item title element not found. Not able to click on it.");
        }

        // this is js execution because in some cases react-virtualized freeze a very (very) short time after scroll.
        // this is a problem only for automated tests that click fast. So the click is programmatic.
        // for common human, this is not noticeable.
        jsExec.executeScript("arguments[0].scrollIntoView(); arguments[0].click();", title);
    }

    private void hoverOnButton(final WebElement element) {
        new Actions(driver)
                .moveToElement(element)
                .build()
                .perform();
    }

    private void clickOn(final By selector) {
        wait
                .until(elementToBeClickable(selector))
                .click();
    }

    /**
     * Move the mouse to the action and click.
     * The item action is identified by its id.
     *
     * @param actionId The item action id
     */
    public void clickOnAction(final String actionId) {
        hoverOnButton(this.getElement());

        // on some list display, actions are in an ellipsis dropdown. Open it
        WebElement ellipsisButton = this.getEllipsisActionButton();
        boolean isInEllipsis =
                ellipsisButton != null &&
                !getEllipsisMenu().findElements(By.cssSelector("#" + actionId)).isEmpty();
        if (isInEllipsis) {
            hoverOnButton(ellipsisButton);
            ellipsisButton = this.getEllipsisActionButton(); // reselect du to tooltip that replace dom element
            wait.until(elementToBeClickable(ellipsisButton)).click();
        }

        final WebElement button = this.getAction(actionId);
        hoverOnButton(button);

        // after button hover, TooltipTrigger replace the DOM element
        // we reselect it, then click on it
        final By actionWithTooltipSelector = isInEllipsis ?
                getActionSelector(actionId) :
                getActionSelector(actionId, "[aria-describedby]");
        clickOn(actionWithTooltipSelector);
    }

    /**
     * Move the mouse to the action of a column and click
     * The column is identified by its column key
     * The item action is identified by its id.
     *
     * @param columnKey The columnKey
     * @param actionId The item action id
     */
    public void clickOnCellAction(final String columnKey, final String actionId) {
        hoverOnButton(this.getElement());

        final WebElement button = this.getCell(columnKey).getAction(actionId);
        hoverOnButton(button);

        // after button hover, TooltipTrigger replace the DOM element
        // we reselect it, then click on it
        final By actionWithTooltipSelector = By.cssSelector(String.format("button[id=%s][aria-describedby]", actionId));
        clickOn(actionWithTooltipSelector);
    }
}
