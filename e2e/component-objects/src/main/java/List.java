import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

class List extends Component {

    static final String NAME = "List";

    static final String LIST_SELECTOR = ".tc-list";

    List(WebDriver driver) {
        super(driver, NAME, LIST_SELECTOR);
    }

    WebElement getAddButton() throws NotFoundException {
        return this.getElement().findElement(By.cssSelector(".btn-success"));
    }
}
