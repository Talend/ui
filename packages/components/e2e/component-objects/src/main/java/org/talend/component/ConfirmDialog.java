package org.talend.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * Created by cdehe on 09/01/17.
 */
public class ConfirmDialog extends Component {

    private static final String CONFIRMDIALOG_NAME = "ConfirmDialog";

    private static final String CONFIRMDIALOG_SELECTOR = ".modal-content";

    private static final String CONFIRMDIALOG_BUTTONS_SELECTOR = ".modal-footer .btn";

    /**
     * ConfirmDialog constructor
     *
     * @param driver Selenium WebDriver
     */
    ConfirmDialog(WebDriver driver) {
        super(driver, CONFIRMDIALOG_NAME, CONFIRMDIALOG_SELECTOR);
    }

    /**
     * ConfirmDialog constructor
     *
     * @param driver Selenium WebDriver
     * @param id Unique ID of the component
     */
    ConfirmDialog(WebDriver driver, String id) {
        super(driver, NAME, id + CONFIRMDIALOG_SELECTOR);
    }

    /**
     * Return cancel button WebElement
     *
     * @return cancel button WebElement
     */
    public WebElement getCancelButton() {
        // The cancel button is always the first button in the footer
        return this.getElement().findElements(By.cssSelector(CONFIRMDIALOG_BUTTONS_SELECTOR)).get(0);
    }

    /**
     * Return validate button WebElement
     *
     * @return validate button WebElement
     */
    public WebElement getValidateButton() {
        // The validate button is always the second button in the footer
        return this.getElement().findElements(By.cssSelector(CONFIRMDIALOG_BUTTONS_SELECTOR)).get(1);
    }

}
