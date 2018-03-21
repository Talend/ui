package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;


public class NotificationTest extends StorybookTest {
    private final WebDriverWait wait = new WebDriverWait(driver, 3);

    private Notification notification = new Notification(driver);

    @Before
    public void init() {
        goToStory("Notification");
    }

    @Test
    public void should_retrieve_error_notification() throws InterruptedException {
        // when
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".tc-notification-container")));
        WebElement errorNotification = notification.getNotificationMessage(0);

        // then
        assertThat(errorNotification.getText(), containsString("This is a feedback"));
    }

    @Test
    public void should_retrieve_warning_notification() throws InterruptedException {
        // when
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".tc-notification-warning")));
        WebElement warningNotification = notification.getWarningMessage(0);

        // then
        assertThat(warningNotification.getText(), containsString("This is a feedback of your operation3"));
    }
}
