package org.talend.component.display;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;
import org.talend.component.StorybookTest;
import org.talend.component.list.Cell;
import org.talend.component.list.Item;
import org.talend.component.list.display.Table;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class TableTest extends StorybookTest {

    private Table tableObject = new Table(driver);

    @Before
    public void init() {
        goToStory("List", "Table display");
    }

    @Test
    public void should_get_table_headers() {
        // when
        final java.util.List<WebElement> headers = tableObject.getHeaders();

        // then
        assertThat(headers, hasSize(5));
        assertThat(headers.get(0).getText(), equalToIgnoringCase("id"));
        assertThat(headers.get(1).getText(), equalToIgnoringCase("name"));
        assertThat(headers.get(2).getText(), equalToIgnoringCase("author"));
        assertThat(headers.get(3).getText(), equalToIgnoringCase(""));        
        assertThat(headers.get(4).getText(), equalToIgnoringCase("created"));
    }

    @Test
    public void should_get_table_header_from_column_key() {
        // when
        final WebElement header = tableObject.getHeader("author");

        // then
        assertThat(header.getText(), equalToIgnoringCase("author"));
    }

    @Test
    public void should_get_all_items() {
        // when
        final java.util.List<Item> items = tableObject.getDisplayedItems();

        // then
        assertThat(items, hasSize(5));
        assertThat(items.get(0).getCell("id").getText(), equalToIgnoringCase("0"));
        assertThat(items.get(1).getCell("id").getText(), equalToIgnoringCase("1"));
        assertThat(items.get(2).getCell("id").getText(), equalToIgnoringCase("2"));
        assertThat(items.get(3).getCell("id").getText(), equalToIgnoringCase("3"));
        assertThat(items.get(4).getCell("id").getText(), equalToIgnoringCase("4"));
    }

    @Test
    public void should_get_item_from_title_label() {
        // when
        final Item item = tableObject.getItem("Title with actions");

        // then
        assertThat(item.getCell("id").getText(), equalToIgnoringCase("0"));
    }

    @Test
    public void should_return_false_on_item_non_presence() {
        // when
        final boolean exists = tableObject.hasItem("Unknown");

        // then
        assertThat(exists, is(false));
    }

    @Test
    public void should_return_true_on_item_presence() {
        // when
        final boolean exists = tableObject.hasItem("Title with actions");

        // then
        assertThat(exists, is(true));
    }

    @Test
    public void should_get_item_title() {
        // when
        final WebElement title = tableObject.getItem("Title with actions").getTitle();

        // then
        assertThat(title.getTagName(), is("button"));
        assertThat(title.getText(), is("Title with actions"));
    }

    @Test
    public void should_get_item_action_from_actionId() {
        // when
        final WebElement editButton = tableObject.getItem("Title with actions").getAction("edit");

        // then
        assertThat(editButton.getTagName(), is("button"));
    }

    @Test
    public void should_get_item_action_from_actionId_within_ellipsis_dropdown() {
        // when
        final WebElement editButton = tableObject.getItem("Title with a lot of actions").getAction("delete");

        // then
        assertThat(editButton.getTagName(), is("a"));
    }

    @Test
    public void should_get_item_cell_from_column_key() {
        // when
        final Cell cell = tableObject.getItem("Title with actions").getCell("author");

        // then
        assertThat(cell.getText(), is("Jean-Pierre DUPONT"));
    }

    @Test
    public void should_click_on_item_title() {
        // given
        assertThat(getActionLog(), not(startsWith("▶onTitleClick:")));

        // when
        tableObject.getItem("Title with actions").clickOnTitle();

        // then
        assertThat(getActionLog(), startsWith("▶onTitleClick:"));
    }

    @Test
    public void should_scroll_and_click_on_item_title() {
        // given
        goToStory("VirtualizedList", "List > Table");
        assertThat(getActionLog(), not(startsWith("▶onTitleClick:")));

        // when
        tableObject.getItem("Title with icon and actions 25").clickOnTitle();

        // then
        assertThat(getActionLog(), startsWith("▶onTitleClick:"));
    }

    @Test
    public void should_mouseover_and_click_on_item_action() {
        // given
        goToStory("VirtualizedList", "List > Table");
        final Item item = tableObject.getItem("Title with lot of actions");
        assertThat(item.getAction("edit").isDisplayed(), is(false));
        assertThat(getActionLog(), not(startsWith("▶onEdit:")));

        // when
        item.clickOnAction("edit");

        // then
        // should not throw because of non button visibility
        assertThat(getActionLog(), startsWith("▶onEdit:"));
    }

    @Test
    public void should_mouseover_and_click_on_item_action_within_ellipsis_dropdown() {
        // given
        goToStory("VirtualizedList", "List > Table");
        final Item item = tableObject.getItem("Title with lot of actions");
        assertThat(item.getAction("copy").isDisplayed(), is(false));
        assertThat(getActionLog(), not(startsWith("▶onCopy:")));

        // when
        item.clickOnAction("copy");

        // then
        // should not throw because of non button visibility
        assertThat(getActionLog(), startsWith("▶onCopy:"));
    }

    @Test
    public void should_scroll_and_click_on_item_action() {
        // given
        goToStory("VirtualizedList", "List > Table");
        assertThat(getActionLog(), not(startsWith("▶onEdit:")));

        // when
        tableObject
                .getItem("Title with icon and actions 25")
                .clickOnAction("edit");

        // then
        assertThat(getActionLog(), startsWith("▶onEdit:"));
    }

    @Test
    public void should_click_on_item_specific_cell_action() {
        // given
        goToStory("List", "Column actions");
        assertThat(getActionLog(), not(startsWith("▶onFavorite:")));

        // when
        tableObject
                .getItem("Title with actions")
                .clickOnCellAction("columnActions", "favorite-action-0");

        // then
        assertThat(getActionLog(), startsWith("▶onFavorite:"));
    }
}
