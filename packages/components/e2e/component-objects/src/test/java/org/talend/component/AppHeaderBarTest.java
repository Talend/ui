package org.talend.component;

import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.startsWith;


public class AppHeaderBarTest extends StorybookTest {

    private AppHeaderBar headerBar = new AppHeaderBar(driver);

    @Before
    public void init() {
        goToStory("HeaderBar", "default");
    }

    @Test
    public void should_click_on_logo() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onLogoClick:")));

        // when
        headerBar.clickOnLogo();

        // then
        assertThat(getActionLog(), startsWith("▶onLogoClick:"));
    }

    @Test
    public void should_click_on_brand_product() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onProductClick:")));

        // when
        headerBar.clickOnProduct("Data Preparation");

        // then
        assertThat(getActionLog(), startsWith("▶onProductClick:"));
    }

    @Test
    public void should_click_on_help() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onHelpClick:")));

        // when
        headerBar.clickOnHelp();

        // then
        assertThat(getActionLog(), startsWith("▶onHelpClick:"));
    }

    @Test
    public void should_click_on_user_menu() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onSettingsClick:")));

        // when
        headerBar.clickOnUserMenuItem("Settings");

        // then
        assertThat(getActionLog(), startsWith("▶onSettingsClick:"));
    }

    @Test
    public void should_click_on_user_menu_by_id() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onSettingsClick:")));

        // when
        headerBar.clickOnUserMenuItemById("settings");

        // then
        assertThat(getActionLog(), startsWith("▶onSettingsClick:"));
    }
}
