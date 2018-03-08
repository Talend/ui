package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;


public class ActionListTest extends StorybookTest {

    private ActionList actionListObject = new ActionList(driver);

    @Before
    public void init() {
        goToStory("ActionList");
    }

    @Test
    public void should_get_menu() {
        // when
        actionListObject.getMenu("USE MAGIC");

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_active_menu() {
        // when
        final WebElement action = actionListObject.getActiveMenu();

        // then
        assertThat(action.getText(), equalToIgnoringCase("favorite datasets"));
    }
    
    @Test
    public void should_click_on_menu() {
        // when
        actionListObject.clickOn("ALL DATASETS");

        // then
        assertThat(getActionLog(), startsWith("▶All clicked:"));
    }
}
