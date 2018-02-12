package org.talend.component;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocalJUnitTest implements JUnitTest {

    protected static WebDriver driver;

    @BeforeClass
    public static void before() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterClass
    public static void after() {
        driver.close();
    }
}
