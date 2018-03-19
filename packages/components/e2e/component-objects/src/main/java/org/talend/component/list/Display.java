package org.talend.component.list;

import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebElement;

import java.util.List;

public interface Display {
    public List<Item> getDisplayedItems();
    public Boolean hasItem(String itemTitle);
    public Item getItem(final String itemTitle);
    public WebElement getElement() throws NotFoundException;
}
