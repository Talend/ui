package org.talend.component;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * AppHeaderBar is used to easy access to WebElements of the react-talend-component AppHeaderBar component.
 */
public class AppHeaderBar extends Component {

    private static final String NAME = "HeaderBar";

    private static final String SELECTOR = ".tc-header-bar";

    private static final String LOGO_SELECTOR = ".tc-header-bar-logo";

    private static final String BRAND_SELECTOR = ".tc-header-bar-brand";

    private static final String PRODUCTS_SELECTOR = BRAND_SELECTOR + " + .dropdown-menu a";

    private static final String USER_GROUP_SELECTOR = ".tc-header-bar-user";

    private static final String USER_SELECTOR = USER_GROUP_SELECTOR + " .dropdown-toggle";

    private static final String USER_MENU_ITEMS_SELECTOR = USER_GROUP_SELECTOR + " .dropdown-menu a";

    private static final String HELP_SELECTOR = ".tc-header-bar-help button";

    /**
     * AppHeaderBar constructor
     *
     * @param driver Selenium WebDriver
     */
    AppHeaderBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /** AppHeaderBar constructor
    *
    * @param driver Selenium WebDriver
    * @param id Unique ID of the component
    */
    AppHeaderBar(WebDriver driver, String id) {
       super(driver, NAME, id + SELECTOR);
    }

    /**
     * Get the header bar logo
     *
     * @return The Logo web element
     */
    public WebElement getLogo() {
        return driver.findElement(By.cssSelector(LOGO_SELECTOR));
    }

    /**
     * Perform a click on the logo
     */
    public void clickOnLogo() {
        this.getLogo().click();
    }

    /**
     * Get the header bar brand button
     */
    public WebElement getBrand() {
        return driver.findElement(By.cssSelector(BRAND_SELECTOR));
    }

    /**
     * Perform a click on the brand button
     */
    public void clickOnBrand() {
        this.getBrand().click();
    }

    /**
     * Get the header bar brand dropdown items : the products
     */
    public List<WebElement> getProducts() {
        return driver.findElements(By.cssSelector(PRODUCTS_SELECTOR));
    }

    /**
     * Get a product link
     */
    public WebElement getProduct(final String productLabel) {
        for (final WebElement product : this.getProducts()) {
            if (product.getText().equalsIgnoreCase(productLabel)) {
                return product;
            }
        }
        throw new NotFoundException(productLabel);
    }

    /**
     * Get the header bar brand dropdown items : the products
     */
    public void clickOnProduct(final String productLabel) {
        this.clickOnBrand();
        this.getProduct(productLabel).click();
    }

    /**
     * Get the user element
     */
    public WebElement getUser() {
        return driver.findElement(By.cssSelector(USER_SELECTOR));
    }

    /**
     * Get the user menu items elements
     */
    public List<WebElement> getUserMenuItems() {
        return driver.findElements(By.cssSelector(USER_MENU_ITEMS_SELECTOR));
    }

    /**
     * Get a user menu item element by label
     * Deprecation : This is not i18n proof, use #getUserMenuItemById instead
     */
    @Deprecated
    public WebElement getUserMenuItem(final String menuLabel) {
        for (final WebElement item : this.getUserMenuItems()) {
            if (item.getText().equals(menuLabel)) {
                return item;
            }
        }
        throw new NotFoundException(menuLabel);
    }

    /**
     * Get a user menu item element
     */
    public WebElement getUserMenuItemById(final String menuId) {
        return driver.findElement(By.cssSelector(USER_MENU_ITEMS_SELECTOR + "#" + menuId));
    }

    /**
     * Open the user menu and click on the item
     * Deprecation : This is not i18n proof, use #clickOnUserMenuItemById instead
     */
    @Deprecated
    public void clickOnUserMenuItem(final String label) {
        this.getUser().click();
        this.getUserMenuItem(label).click();
    }

    /**
     * Open the user menu and click on the item
     */
    public void clickOnUserMenuItemById(final String menuId) {
        this.getUser().click();
        this.getUserMenuItemById(menuId).click();
    }

    /**
     * Get the help button element
     */
    public WebElement getHelp() {
        return driver.findElement(By.cssSelector(HELP_SELECTOR));
    }

    /**
     * Click on the help button
     */
    public void clickOnHelp() {
        this.getHelp().click();
    }
}
