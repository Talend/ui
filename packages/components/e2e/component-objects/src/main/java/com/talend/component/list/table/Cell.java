package com.talend.component.list.table;

import com.talend.component.Component;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * A List is used to easy access to WebElements of the react-talend-component List component - Table - item - cell.
 */
public class Cell extends Component {
    static final String NAME = "TableItemCell";

    public Cell(final WebDriver driver, final WebElement root) {
        super(driver, NAME, root);
    }

    public String getText() {
        return this.root.getText();
    }

    public List<WebElement> getActions() {
        return null;
    }

    public WebElement getAction(final String actionId) {
        return null;
    }

    public Cell getCheckbox() {
        return null;
    }
}
