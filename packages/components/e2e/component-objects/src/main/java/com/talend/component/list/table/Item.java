package com.talend.component.list.table;

import com.talend.component.Component;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - item.
 */
public class Item extends Component {
    static final String NAME = "TableItem";

    public Item(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    public WebElement getTitle() {
        return null;
    }

    public List<WebElement> getActions() {
        return null;
    }

    public WebElement getAction(final String actionId) {
        return null;
    }

    public Cell get(final String headerName) {
        // how to get index from headerName here ?
        return null;
    }

    public Cell get(final int cellIndex) {
        return null;
    }
}
