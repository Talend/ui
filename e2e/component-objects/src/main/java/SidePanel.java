import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Iterator;

class SidePanel extends Component {

    static final String NAME = "SidePanel";

    static final String SELECTOR = ".tc-side-panel";

    SidePanel(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }

    WebElement getMenu(String label) throws NotFoundException {
        Iterator<WebElement> elements = this.getElement().findElements(By.cssSelector(".tc-side-panel-list-item span")).iterator();
        while (elements.hasNext()) {
            WebElement el = elements.next();
            if (el.getText().equals(label)) {
                return el;
            }
        }
        throw new NotFoundException(label);
    }
}
