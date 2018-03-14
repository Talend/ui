//  ============================================================================
//
//  Copyright (C) 2006-2018 Talend Inc. - www.talend.com
//
//  This source code is available under agreement available at
//  https://github.com/Talend/data-prep/blob/master/LICENSE
//
//  You should have received a copy of the agreement
//  along with this program; if not, write to Talend SA
//  9 rue Pages 92150 Suresnes, France
//
//  ============================================================================
package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginForm extends Component {

    private static final Logger LOGGER = LogManager.getLogger(LoginForm.class);

    private static final String FORM_LOGIN_NAME = "LoginForm";

    private static final String FORM_LOGIN_SELECTOR = ".login-form";

    private static final String FORM_INPUT_USERNAME_ID = "lg-main-input-username";

    private static final String FORM_INPUT_PASSWORD_ID = "lg-main-input-password";

    private static final String FORM_MAIN_BUTTON_ID = "lg-main-button-login";

    /**
     * Notification constructor
     *
     * @param driver Selenium WebDriver
     */
    public LoginForm(WebDriver driver) {
        super(driver, FORM_LOGIN_NAME, FORM_LOGIN_SELECTOR);
    }

    public WebElement getFormLogin() {
        return this.getElement().findElement(By.cssSelector(FORM_LOGIN_SELECTOR));
    }

    public WebElement getUserNameInput() {
        return this.getElement().findElement(By.id(FORM_INPUT_USERNAME_ID));
    }

    public WebElement getPassWordInput() {
        return this.getElement().findElement(By.id(FORM_INPUT_PASSWORD_ID));
    }

    public WebElement getMainButtonForm() {
        return this.getElement().findElement(By.id(FORM_MAIN_BUTTON_ID));
    }

    public void waitForLoginForm() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(FORM_LOGIN_SELECTOR)));
    }

}
