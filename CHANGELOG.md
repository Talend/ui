# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Guiding Principles

- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each version is displayed.
- Mention whether you follow Semantic Versioning.

Types of changes

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [unreleased]

- [Added](https://github.com/Talend/ui/pull/2994): Read only support
- [Added](https://github.com/Talend/ui/pull/2997): Handle badges without labels
- [Added](https://github.com/Talend/ui/pull/3000): Added complies/wordComplies pattern operators support
- [Added](https://github.com/Talend/ui/pull/3013): Added colored badge support
- [Fixed] (https://github.com/Talend/ui-faceted-search/pull/4): External changes to `badgesFaceted` state are ignored

## [0.13.0]

- [Fixed](https://github.com/Talend/ui/pull/2972): Don't reopen the value tooltip for badges with default operators
- [Added](https://github.com/Talend/ui/pull/2932): Pointer cursor on the slider facet value

## [0.12.1]

- [Fixed](https://github.com/Talend/ui/pull/2919): Fallback to default for slider facet

## [0.12.0]

- [Added](https://github.com/Talend/ui/pull/2916): Embed error messages in slider facet

## [0.11.0]

- [Added](https://github.com/Talend/ui/pull/2897): Badge slider

## [0.10.3]

- [fixed](https://github.com/Talend/ui/pull/2881): IE11: hide scrollbar for BasicSearch
- [fixed](https://github.com/Talend/ui/pull/2862): Hide delete icon if no filters
- [changed](https://github.com/Talend/ui/pull/2778): chore: use @talend/scripts

## [0.10.2]

- [fixed](https://github.com/Talend/ui/pull/2847): Check badge existence before trying to set it

## [0.10.1]

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2842): Avoid error when there is no callbacks props

## [0.10.0]

### Added

- [feat](https://github.com/Talend/ui/pull/2828): Add badge tags support

## [0.9.1]

### Fixed

- [TMDM-14276](https://github.com/Talend/ui/pull/2818): IE11 : Center icons faceted #2818

## [0.9.0]

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2801): Fix somes user tracking tag

### Added

- [feat](https://github.com/Talend/ui/pull/2793): Add a clear button to remove all badges in basic search

## [0.8.0]

### Breaking change

Rename two data-feature attributes for harmonization:

- `faceted-advanced-search.cancel` become `filter.advanced.clear`
- `faceted-advanced-search.submit` become `filter.advanced.apply`

### Added

- [feat](https://github.com/Talend/ui/pull/2759): Add somes data-feature attributes for Pendo tracking / E2E tests

## [0.7.0]

### Added

- [feat](https://github.com/Talend/ui/pull/2734): Expose an helper to remove `contains` operator if `containsIgnoreCase` is here

## [0.6.0]

### Added

- [feat](https://github.com/Talend/ui/pull/2732): Implement containsIgnoreCase operator

## [0.5.2]

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2725): ignore unknown badges types

## [0.5.1]

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2709): Set initialOperatorOpened to false on hiding the value overlay

## [0.5.0]

### Added

- [feat](https://github.com/Talend/ui/pull/2692): Handle the badgePerFacet metadata

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2696): Do not display empty label badge

## [0.4.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.32.0

### Changed

- [Added](https://github.com/Talend/ui/pull/2673): Handle categories in badge definitions

### Added

- [feat](https://github.com/Talend/ui/pull/2675): Empty screen text for search on badges list

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2665): sort alphabetically facets
- [fixed](https://github.com/Talend/ui/pull/2662): values open up at start
- [fixed](https://github.com/Talend/ui/pull/2666): Put a scrollbar for enum badge with a lot of values
- [fixed](https://github.com/Talend/ui/pull/2676): Do not alter the filter input in checkboxes badge

## [0.3.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.27.0

### Changed

- [Changed](https://github.com/Talend/ui/pull/2639): Update some operators labels

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2641): Unknown operators facet return by the api throw javascript error
- [fixed](https://github.com/Talend/ui/pull/2631): Remove "Selected values only" for checkbox facet

### Added

- [feat](https://github.com/Talend/ui/pull/2640/): Select automatically operator if only one
- [feat](https://github.com/Talend/ui/pull/2636): Use Input text for Badge text instead of Textarea
- [feat](https://github.com/Talend/ui/pull/2638): use toggle for basic/advance button

## [0.2.6]

### Fixed

- [fixed](https://github.com/Talend/ui/pull/2617): Fix overflow x and y in AddFacetPopover

## [0.2.5]

### Breaking

- [breaking](https://github.com/Talend/ui/pull/2599): Change equal key operator to equals

### Added

- [feat](https://github.com/Talend/ui/pull/2590/): Add label in add facet button

### Changed

- [Changed](https://github.com/Talend/ui/pull/2591): Remove Header in AddFacetPopover

### Fixed

- [chore](https://github.com/Talend/ui/pull/2600): change some field, snake case to camel case

## [0.2.4]

### Fixed

- [Fixed](https://github.com/Talend/ui/pull/2554): Fix TQL creation with badges number

### Added

- [feat](https://github.com/Talend/ui/pull/2587): Add skeleton to FacetedSearchIcon if loading props true

## [0.2.3]

### Breaking changes

- As we change the equal operator name, you need to rename it's usage in your app from `=` to `equal`.

### Added

- [Added](https://github.com/Talend/ui/pull/2548): Add number type badge

### Fixed

- [Fixed](https://github.com/Talend/ui/pull/2545): Fix support of notEqual operator
- [Fixed](https://github.com/Talend/ui/pull/2544): Get back Tooltip trigger for button icon in BadgeOverlay
- [Fixed](https://github.com/Talend/ui/pull/2535): Fix onSubmit execution on BasicSearch

### Changed

- [Changed](https://github.com/Talend/ui/pull/2530): Update remove / add tooltip labels

## [0.2.2]

### Fixed

- [Fixed](https://github.com/Talend/ui/pull/2520): Tql error on empty value array
- [Fixed](https://github.com/Talend/ui/pull/2513): Invert action basic <> advanced
- [Fixed](https://github.com/Talend/ui/pull/2510): Disable resize on textarea
- [Fixed](https://github.com/Talend/ui/pull/2509): Filter badge by label, not attribute
- [Fixed](https://github.com/Talend/ui/pull/2501): Tql error on checkboxes badge

## [0.2.1]

### Added

- [Added](https://github.com/Talend/ui/pull/2487): Add connection type badge

## [0.2.0]

### Added

- [Added](https://github.com/Talend/ui/pull/2441): Faceted search to ui
