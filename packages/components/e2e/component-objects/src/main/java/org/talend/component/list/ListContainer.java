package org.talend.component.list;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.talend.component.Component;

/**
 *  Abtract class Container for List component
 */
public abstract class ListContainer extends Component {

    abstract public WebElement getElementToScroll();
    abstract public WebElement getFirstElement();

    private final WebDriverWait wait;

    public ListContainer(final WebDriver driver, final String name, final String id) {
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
        if (! canScrollDown()) {
            return false;
        }

        final WebElement firstElement = this.getFirstElement();
        final WebElement container = this.getElementToScroll();
        jsExec.executeScript("arguments[0].scrollTop += arguments[0].offsetHeight;", container);
        try {
            wait.until(ExpectedConditions.stalenessOf(firstElement));
        } catch (TimeoutException e) {
            return false;
        }
        return true;
    }
}
