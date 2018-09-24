package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class ListTest extends StorybookTest {

    private List listObject = new List(driver);

    @Before
    public void init() {
        goToStory("List", "Table display");
    }

    @Test
    public void should_get_table() {
        // when
        listObject.getTable().getElement();

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_table_with_id() {
        // when
        listObject.getTable("talend").getElement();

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_table_using_display() {
        // when
        // should not throw NotFoundException
        listObject.getDisplay().getElement();
        final WebElement title = listObject.getDisplay().getItem("Title with actions").getTitle();

        // then
        assertThat(title.getTagName(), is("button"));
        assertThat(title.getText(), is("Title with actions"));    }
}
