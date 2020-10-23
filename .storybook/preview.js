import React from "react";
import { addDecorator } from "@storybook/react";
import { withI18next } from "storybook-addon-i18next";
import { locales } from "@talend/locales-tui-faceted-search/locales";
import IconProvider from "@talend/react-components/lib/IconsProvider";

import i18n from "./i18n";

const languages = {};
Object.keys(locales).forEach((key) => (languages[key] = key));
console.log(locales);
addDecorator(
  withI18next({
    i18n,
    languages,
  })
);

addDecorator((storyFn) => (
  <div>
    <IconProvider />
    {storyFn()}
  </div>
));
