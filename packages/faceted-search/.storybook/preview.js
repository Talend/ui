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

addDecorator(storyFn => (
  <div
    style={{
      height: '100%',
      width: '100%',
      overflow: 'auto',
      padding: '3rem',
      backgroundColor: 'rgba(145, 209, 237, 0.1)',
    }}
  >
    <IconProvider bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.4.0/dist/svg-bundle/all.svg']}/>
    {storyFn()}
  </div>
));
