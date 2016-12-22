import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

class Component {

    WebDriver driver;

    String selector;

    String name;

    Component(WebDriver driver, String name, String selector) {
        System.out.println("Component " + name + " " + selector);
        this.driver = driver;
        this.name = name;
        this.selector = selector;
    }

    List<WebElement> getElements() {
        System.out.println(this.name + ".getElements " + this.selector);
        return this.driver.findElements(By.cssSelector(this.selector));
    }

    WebElement getElement() throws NotFoundException {
        System.out.println(this.name + ".getElement " + this.selector);
        List<WebElement> elements = this.getElements();
        if (elements.size() == 0) {
            System.out.print("currentUrl: " + this.driver.getCurrentUrl());
            throw new NotFoundException(this.name);
        }
        if (elements.size() > 1) {
            System.out.print("currentUrl: " + this.driver.getCurrentUrl());
            throw new NotFoundException("Too many WebElements found for " + this.name);
        }
        return elements.get(0);
    }
}
