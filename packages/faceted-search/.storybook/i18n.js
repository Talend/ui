import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import merge from "lodash/merge";

import { namespaces as tuiNamespaces } from "@talend/locales-tui/namespaces";
import { locales as tuiLocales } from "@talend/locales-tui/locales";

import { namespaces as facetedNamespaces } from "@talend/locales-tui-faceted-search/namespaces";
import { locales as facetedLocales } from "@talend/locales-tui-faceted-search/locales";

i18n.use(initReactI18next).init({
  debug: true,
  defaultNS: facetedNamespaces[0],
  fallbackLng: "en",
  fallbackNS: [...tuiNamespaces, ...facetedNamespaces],
  interpolation: {
    escapeValue: false,
  },
  ns: [...tuiNamespaces, ...facetedNamespaces],
  resources: merge(facetedLocales, tuiLocales),
  wait: true,
});

window.i18n = i18n;

export default i18n;
