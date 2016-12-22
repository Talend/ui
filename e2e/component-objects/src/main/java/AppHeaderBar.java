import org.openqa.selenium.WebDriver;

class AppHeaderBar extends Component {

    static final String NAME = "AppHeaderBar";

    static final String SELECTOR = ".tc-app-header-bar";

    AppHeaderBar(WebDriver driver) {
        super(driver, NAME, SELECTOR);
    }
}
