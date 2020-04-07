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

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2724): use sentence case for attributes

## [0.5.1]

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2709): Set initialOperatorOpened to false on hiding the value overlay

## [0.5.0]

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2692): Handle the badgePerFacet metadata

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2696): Do not display empty label badge

## [0.4.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.32.0

### Changed

- [Link to PR](https://github.com/Talend/ui/pull/2673): Handle categories in badge definitions

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2675): Empty screen text for search on badges list

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2665): sort alphabetically facets
- [Link to PR](https://github.com/Talend/ui/pull/2662): values open up at start
- [Link to PR](https://github.com/Talend/ui/pull/2666): Put a scrollbar for enum badge with a lot of values
- [Link to PR](https://github.com/Talend/ui/pull/2676): Do not alter the filter input in checkboxes badge

## [0.3.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.27.0

### Changed

- [Link to PR](https://github.com/Talend/ui/pull/2639): Update some operators labels

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2641): Unknown operators facet return by the api throw javascript error
- [Link to PR](https://github.com/Talend/ui/pull/2631): Remove "Selected values only" for checkbox facet

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2640/): Select automatically operator if only one
- [Link to PR](https://github.com/Talend/ui/pull/2636): Use Input text for Badge text instead of Textarea
- [Link to PR](https://github.com/Talend/ui/pull/2638): use toggle for basic/advance button

## [0.2.6]

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2617): Fix overflow x and y in AddFacetPopover

## [0.2.5]

### Breaking

- [breaking](https://github.com/Talend/ui/pull/2599): Change equal key operator to equals

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2590/): Add label in add facet button

### Changed

- [Link to PR](https://github.com/Talend/ui/pull/2591): Remove Header in AddFacetPopover

### Fixed

- [chore](https://github.com/Talend/ui/pull/2600): change some field, snake case to camel case

## [0.2.4]

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2554): Fix TQL creation with badges number

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2587): Add skeleton to FacetedSearchIcon if loading props true

## [0.2.3]

### Breaking changes

- As we change the equal operator name, you need to rename it's usage in your app from `=` to `equal`.

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2548): Add number type badge

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2545): Fix support of notEqual operator
- [Link to PR](https://github.com/Talend/ui/pull/2544): Get back Tooltip trigger for button icon in BadgeOverlay
- [Link to PR](https://github.com/Talend/ui/pull/2535): Fix onSubmit execution on BasicSearch

### Changed

- [Link to PR](https://github.com/Talend/ui/pull/2530): Update remove / add tooltip labels

## [0.2.2]

### Fixed

- [Link to PR](https://github.com/Talend/ui/pull/2520): Tql error on empty value array
- [Link to PR](https://github.com/Talend/ui/pull/2513): Invert action basic <> advanced
- [Link to PR](https://github.com/Talend/ui/pull/2510): Disable resize on textarea
- [Link to PR](https://github.com/Talend/ui/pull/2509): Filter badge by label, not attribute
- [Link to PR](https://github.com/Talend/ui/pull/2501): Tql error on checkboxes badge

## [0.2.1]

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2487): Add connection type badge

## [0.2.0]

### Added

- [Link to PR](https://github.com/Talend/ui/pull/2441): Faceted search to ui
