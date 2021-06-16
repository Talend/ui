package org.talend.component.display;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;
import org.talend.component.StorybookTest;
import org.talend.component.list.Item;
import org.talend.component.list.display.Large;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.startsWith;

public class LargeTest extends StorybookTest {
    private Large largeObject = new Large(driver);

    @Before
    public void init() {
        goToStory("List", "Large display");
    }

    @Test
    public void should_get_displayed_items() {
        // when
        final java.util.List<Item> items = largeObject.getDisplayedItems();

        // then
        assertThat(items, not(empty()));
    }

    @Test
    public void should_return_false_on_item_non_presence() {
        // when
        final boolean exists = largeObject.hasItem("Unknown");

        // then
        assertThat(exists, is(false));
    }

    @Test
    public void should_return_true_on_item_presence() {
        // when
        final boolean exists = largeObject.hasItem("Title with actions");

        // then
        assertThat(exists, is(true));
    }

    @Test
    public void should_get_item_title() {
        // when
        final WebElement title = largeObject.getItem("Title with actions").getTitle();

        // then
        assertThat(title.getTagName(), is("button"));
        assertThat(title.getText(), is("Title with actions"));
    }

    @Test
    public void should_get_item_action_from_actionId() {
        // when
        final WebElement editButton = largeObject.getItem("Title with actions").getAction("edit");

        // then
        assertThat(editButton.getTagName(), is("button"));
    }

    @Test
    public void should_click_on_item_title() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onTitleClick:")));

        // when
        largeObject.getItem("Title with actions").clickOnTitle();

        // then
        assertThat(getActionLog(), startsWith("▶onTitleClick:"));
    }

    @Test
    public void should_scroll_and_click_on_item_title() {
        // given
        goToStory("VirtualizedList", "List > Large");
        assertThat(getActionLog(), not(startsWith("▶onTitleClick:")));

        // when
        largeObject.getItem("Title with icon and actions 25").clickOnTitle();

        // then
        assertThat(getActionLog(), startsWith("▶onTitleClick:"));
    }

    @Test
    public void should_mouseover_and_click_on_item_action() {
        // given
        final Item item = largeObject.getItem("Title with actions");
        assertThat(item.getAction("edit").isDisplayed(), is(false));
        assertThat(getActionLog(), not(startsWith("▶onEdit:")));

        // when
        item.clickOnAction("edit");

        // then
        // should not throw because of non button visibility
        assertThat(item.getAction("edit").isDisplayed(), is(true));
        assertThat(getActionLog(), startsWith("▶onEdit:"));
    }
}
