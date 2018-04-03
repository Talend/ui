package org.talend.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class Notification extends Component {

    private static final String NAME = "Notification";

    private static final String SELECTOR = ".tc-notification-container";

    private static final String NOTIFICATION_ERROR_MESSAGE = ".tc-notification-error .tc-notification-message";

    private static final String NOTIFICATION_WARNING_MESSAGE = ".tc-notification-warning .tc-notification-message";

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
        List<WebElement> notifications = this.getElement().findElements(By.cssSelector(NOTIFICATION_ERROR_MESSAGE));
        return notifications != null ? notifications.get(index) : null;
    }

    public WebElement getWarningMessage(int index) {
        List<WebElement> notifications = this.getElement().findElements(By.cssSelector(NOTIFICATION_WARNING_MESSAGE));
        return notifications != null ? notifications.get(index) : null;
    }
}
