package org.talend.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class Notification extends Component {

    private static final String NAME = "Notification";

    private static final String SELECTOR = ".tc-notification-container";

    private static final String NOTIFICATION_MESSAGE = ".tc-notification-error .tc-notification-message";

    /**
     * Notification constructor
     *
     * @param driver Selenium WebDriver
     */
    Notification(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    /**
     * Return the first notification message WebElement
     *
     * @return notification message WebElement
     */
    public WebElement getNotificationMessage(int index) {
        return this.getElement().findElements(By.cssSelector(NOTIFICATION_MESSAGE)).get(index);
    }
}
