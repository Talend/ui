package org.talend.component;

import org.junit.Before;
import org.junit.Test;

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
}
