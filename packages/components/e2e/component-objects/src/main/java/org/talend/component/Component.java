package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.*;

import java.util.List;

/**
 * Parent class for API react-talend-component components.
 *
 */
public class Component {

    private static final Logger LOGGER = LogManager.getLogger(Component.class);

    protected WebDriver driver;

    protected JavascriptExecutor jsExec;

    protected String selector;

    protected String name;

    protected WebElement root;

    /**
     * Component constructor
     *
     * @param driver Selenium WebDriver
     * @param name Component name
     * @param selector Component CSS selector
     */
    public Component(WebDriver driver, String name, String selector) {
        LOGGER.info("Component " + name + " " + selector);
        this.driver = driver;
        this.jsExec = (JavascriptExecutor) driver;
        this.name = name;
        this.selector = selector;
    }

    /**
     * Component constructor
     *
     * @param driver Selenium WebDriver
     * @param root Component root element
     */
    public Component(WebDriver driver, String name, WebElement root) {
        LOGGER.info("Component " + name + " from provided root");
        this.driver = driver;
        this.jsExec = (JavascriptExecutor) driver;
        this.name = name;
        this.root = root;
    }

    /**
     * Get components from component selector
     *
     * @return List of WebElement
     */
    public List<WebElement> getElements() {
        LOGGER.info(this.name + ".getElements " + this.selector);
        return this.driver.findElements(By.cssSelector(this.selector));
    }

    /**
     * Get component from its selector
     *
     * @return WebElement found with selector
     * @throws NotFoundException if no elements are found or if more than one element are found
     */
    public WebElement getElement() throws NotFoundException {
        LOGGER.info(this.name + ".getElement " + this.selector);

        if (this.root != null) {
            return this.root;
        }

        List<WebElement> elements = this.getElements();
        if (elements.size() == 0) {
            LOGGER.debug("currentUrl: " + this.driver.getCurrentUrl());
            throw new NotFoundException(this.name);
        }
        if (elements.size() > 1) {
            LOGGER.debug("currentUrl: " + this.driver.getCurrentUrl());
            throw new NotFoundException("Too many WebElements found for " + this.name);
        }
        return elements.get(0);
    }

    public String getText() {
        return this.getElement().getText();
    }
}
