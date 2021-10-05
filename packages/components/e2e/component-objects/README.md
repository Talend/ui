# Components end-to-end tests API

This package aims to provide API to use components, in Selenium scenario, in order to write e2e tests.

The goal is to be safe from any not wanted breaking changes effects.

## Contribute

### Run with local configuration

Local configuration will test [http://localhost:6006](http://localhost:6006) by default.

```shell
$> mvn clean verify -Plocal
```

### Run with remote configuration

Remote configuration, which is provided by BrowserStack, will test [http://localhost:6006](http://localhost:6006) by default.

```shell
$> BROWSERSTACK_USER=$YOUR_BS_USER BROWSERSTACK_KEY=$YOUR_BS_KEY mvn clean verify -Premote
```

### Run with custom parameters

|Property|Default|Description|
|---|---|---|
|storybook.host|`localhost`|Storybook host to test|
|storybook.port|`6006`|Storybook port to test|
|storybook.context|_empty_|Storybook context to test (`/components/` for http://talend.surge.sh/components/)|

If you want to test [http://talend.surge.sh/components/](http://talend.surge.sh/components/)

```shell
$> mvn clean verify -Plocal -Dstorybook.host=talend.surge.sh -Dstorybook.port=80 -Dstorybook.context=/components/
```

## Use

First, add dependency to your pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.talend</groupId>
        <artifactId>component-objects</artifactId>
        <version>LATEST</version>
    </dependency>
</dependencies>
```

Then you can start to manipulate any mapped component.

```java
public class SidePanelTest {

    private SidePanel sidePanelObject = new SidePanel(driver);

    @Test
    public void should_click_on_menu() {
        // when
        sidePanelObject.getMenu("DATASETS");

        // then
        final WebElement activeMenu = sidePanelObject.getActiveMenu();
        assertThat(activeMenu.getText(), equalTo("DATASETS"));
    }
}
```