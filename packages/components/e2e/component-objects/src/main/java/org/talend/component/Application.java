package org.talend.component;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;

/**
 * Application is the root the API to use web components
 */
public class Application {

    private static final Logger LOGGER = LogManager.getLogger(Application.class);

    public WebDriver driver;

    // TODO (breaking change) : Rename theses variable in order to respect the Java Convention, and set them private in order to use getter
    public SidePanel SidePanel;

    public AppHeaderBar AppHeaderBar;

    public List List;

    public Drawer Drawer;

    public ConfirmDialog ConfirmDialog;

    /**
     * Application constructor
     *
     * @param driver Selenium WebDriver
     */
    public Application(WebDriver driver) {
        LOGGER.debug("Construct the Component Application");
        this.driver = driver;
        this.SidePanel = new SidePanel(driver);
        this.AppHeaderBar = new AppHeaderBar(driver);
        this.List = new List(driver);
        this.Drawer = new Drawer(driver);
        this.ConfirmDialog = new ConfirmDialog(driver);
    }

    public WebDriver getDriver() {
        return driver;
    }

    public org.talend.component.SidePanel getSidePanel() {
        return SidePanel;
    }

    public org.talend.component.AppHeaderBar getAppHeaderBar() {
        return AppHeaderBar;
    }

    public org.talend.component.List getList() {
        return List;
    }

    public org.talend.component.Drawer getDrawer() {
        return Drawer;
    }

    public org.talend.component.ConfirmDialog getConfirmDialog() {
        return ConfirmDialog;
    }
}
