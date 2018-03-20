package org.talend.component.list;

import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebElement;

import java.util.List;

public interface Display {
    List<Item> getDisplayedItems();
    Boolean hasItem(final String itemTitle);
    Item getItem(final String itemTitle);
    WebElement getElement() throws NotFoundException;
}
