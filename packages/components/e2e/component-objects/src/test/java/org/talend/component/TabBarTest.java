package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalToIgnoringCase;


public class TabBarTest extends StorybookTest {

    private TabBar tabBarObject = new TabBar(driver);

    @Before
    public void init() {
        goToStory("TabBar");
    }

    @Test
    public void should_get_menu() {
        // when
        tabBarObject.getTab("TAB3");

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_active_menu() {
        // when
        final WebElement tab = tabBarObject.getActiveTab();

        assertThat(tab.getText(), equalToIgnoringCase("tab2"));
    }
}
