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

### Breaking change

- ⤴️ @talend/ui: >= 4.27.0

### Added

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
