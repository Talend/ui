package org.talend.component;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;

public class BreadcrumbTest extends StorybookTest {

    private Breadcrumb breadcrumb;

    @Before
    public void init() {
        breadcrumb = new Breadcrumb(driver);
        goToStory("Breadcrumbs");
    }

    @Test
    public void should_get_breadcrumb() {
        // when
        breadcrumb.getElement();

        // then
        // should not throw NotFoundException
    }

    @Test
    public void should_get_breadcrumb_items() {
        // when
        final java.util.List<WebElement> items = breadcrumb.getItems();

        // then
        assertThat(items, hasSize(3));
    }

    @Test
    public void should_click_on_items() {
        // given
        assertThat(getActionLog(), not(containsString("▶Text A clicked")));
        assertThat(getActionLog(), not(containsString("▶Text B clicked")));
        assertThat(getActionLog(), not(containsString("▶Text C clicked")));

        // when
        breadcrumb.clickOnItem("Text A");
        breadcrumb.clickOnItem("Text B");
        breadcrumb.clickOnItem("Text C");

        // then
        assertThat(getActionLog(), containsString("▶Text A clicked"));
        assertThat(getActionLog(), containsString("▶Text B clicked"));
        assertThat(getActionLog(), not(containsString("▶Text C clicked")));
    }

    @Test
    public void should_have_active_item() {
        // when
        WebElement activeItem = breadcrumb.getActiveItem();

        // then
        assertThat(activeItem, not(nullValue()));
        assertThat(activeItem.getText(), is("Text C"));
    }
}
