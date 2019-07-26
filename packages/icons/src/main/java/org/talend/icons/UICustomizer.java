package org.talend.icons;

import org.talend.sdk.component.runtime.manager.ComponentManager;

import java.util.stream.Stream;

public class UICustomizer implements ComponentManager.Customizer {

    @Override
    public Stream<String> containerClassesAndPackages() {
        return Stream.of(UIIcon.class.getPackage().getName());
    }
}
