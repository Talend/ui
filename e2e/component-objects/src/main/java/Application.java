import org.openqa.selenium.WebDriver;

/**
 * Application is the root the API to use web components
 */
class Application {

    WebDriver driver;

    SidePanel SidePanel;

    AppHeaderBar AppHeaderBar;

    List List;

    Application(WebDriver driver) {
        this.driver = driver;
        this.SidePanel = new SidePanel(driver);
        this.AppHeaderBar = new AppHeaderBar(driver);
        this.List = new List(driver);
    }
}