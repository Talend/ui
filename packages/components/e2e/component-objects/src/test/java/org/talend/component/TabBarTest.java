package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalToIgnoringCase;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.startsWith;


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

        // then
        assertThat(tab.getText(), equalToIgnoringCase("tab2"));
    }

    @Test
    public void should_get_tab_and_select_it() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onSelect:")));

        // when
        tabBarObject.selectTab(3);

        // then
        assertThat(getActionLog(), startsWith("▶onSelect:"));
    }
}
