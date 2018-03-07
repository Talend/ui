package org.talend.component;

import org.openqa.selenium.WebElement;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;


public class SidePanelTest extends StorybookTest {

    private SidePanel sidePanelObject = new SidePanel(driver);

    @Before
    public void init() {
        goToStory("SidePanel", "reverse");
    }

    @Test
    public void should_get_menu() {
        // when
        sidePanelObject.getMenu("DATASETS");

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_active_menu() {
        // when
        sidePanelObject.getActiveMenu();

        // then
        // should not throw NotFoundException
    }
}
