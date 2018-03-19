package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;

/**
 * SidePanel is used to easy access to WebElements of the react-talend-component SidePanel component.
 *
 */
public class SidePanel extends Component {

    private static final Logger LOGGER = LogManager.getLogger(SidePanel.class);

    static final String NAME = "SidePanel";

    static final String SELECTOR = ".tc-side-panel";

    static final String FOLD_BUTTON_SELECTOR = ".tc-side-panel-toggle-btn button";

    private ActionList actionList;

    /**
     * SidePanel constructor
     *
     * @param driver Selenium WebDriver
     */
    SidePanel(WebDriver driver) {
        super(driver, NAME, SELECTOR);
        this.actionList = new ActionList(driver);
    }

    /**
     * SidePanel constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    SidePanel(WebDriver driver, String id) {
        super(driver, NAME, id + SELECTOR);
    }

    /**
     * Get menu item from its label
     *
     * @param label item menu label
     * @return WebElement of menu item
     * @throws NotFoundException if no elements with this label are found
     */
    public WebElement getMenu(String label) throws NotFoundException {
        return this.actionList.getMenu(label);
    }

    /**
     * Get current active menu item
     *
     * @return WebElement of menu item
     * @throws NotFoundException if no active element is find
     */
    public WebElement getActiveMenu() throws NotFoundException {
        return this.actionList.getActiveMenu();
    }

    /**
     * Get fold button
     *
     * @return WebElement of fold button
     * @throws NotFoundException if no active element is find
     */
    public WebElement getFoldButton() throws NotFoundException {
        return this.getElement().findElement(By.cssSelector(FOLD_BUTTON_SELECTOR));
    }

    /**
     * Folds the side panel
     *
     * @throws NotFoundException if no active element is find
     */
    public void fold() throws NotFoundException {
        this.getElement().findElement(By.cssSelector(FOLD_BUTTON_SELECTOR)).click();
    }
}
