package org.talend.component;

import org.junit.Before;
import org.junit.Test;


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
