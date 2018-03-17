package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.Matchers.equalToIgnoringCase;
import static org.junit.Assert.assertThat;


public class SidePanelTest extends StorybookTest {

    private SidePanel sidePanelObject = new SidePanel(driver);

    @Before
    public void init() {
        goToStory("SidePanel", "default");
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
        WebElement menu = sidePanelObject.getActiveMenu();

        // then
        assertThat(menu.getText(), equalToIgnoringCase("preparations"));
    }

    @Test
    public void should_get_fold_button() {
        // when
        sidePanelObject.getFoldButton();

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_fold_the_side_panel() {
        // when
        sidePanelObject.fold();

        // then
        // should not throw NotFoundException
    }
}
