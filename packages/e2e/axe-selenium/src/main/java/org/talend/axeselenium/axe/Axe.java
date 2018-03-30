package org.talend.axeselenium.axe;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.net.URL;

public class Axe {
    private WebDriver driver;
    private final URL axeScript;

    public Axe(final WebDriver driver) {
        this.driver = driver;
        this.axeScript = Axe.class.getResource("/axe.min.js");
    }

    public void run(final WebElement element, final Options options) {

    }
}
