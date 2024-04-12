# Transition from scss to CSS [Draft]

## Context

Our current use of SCSS is primarily for nesting capabilities, a feature which we have found to be less essential over time.
The SCSS compilation step is adding significant overhead to our build process, and the advanced features of SASS/SCSS are largely underutilized in our projects. Simplifying our styling workflow by using plain CSS could decrease compilation time and streamline our development process.

## Decision

We will start a transition from using SCSS to using plain CSS in our codebase. This decision involves rewriting existing SCSS files into CSS and updating our build and development processes to remove the SASS compiler.

## Consequences

- Reduced Compilation Time: Removing the SCSS compilation step will decrease build times, making our development and deployment processes faster and more efficient.

- Simplification of Code: Transitioning to CSS simplifies our stylesheets by eliminating unnecessary complexities and focusing on essential styling.

- Ease of Maintenance: CSS is universally understood by front-end developers without the need for additional knowledge of SASS/SCSS syntax, which can make our codebase more accessible to new team members.

- Potential Loss of Features: While this change will simplify our toolchain, we will lose some of the features provided by SCSS, such as variables and mixins. However, given our current usage primarily involves nesting, this loss is considered manageable.

- Rewriting Effort: Existing SCSS files need to be carefully rewritten in CSS. This task requires a one-time development effort to ensure that styles remain consistent and functional across the platform.

## Implementation Plan

- Provide a tool to make it possible.

- Iteration will be made over the code every time a component is modified.

- Gradual Refactoring: Implement the transition in phases, starting with less complex stylesheets. This approach minimizes risk by allowing iterative testing and adjustment.
  Update Build Process: Modify the build tools and processes to remove SASS compilers and integrate with the new CSS-based workflow.

- Documentation and Training: Update project documentation to reflect the new styling practices and conduct training sessions for the development team on effective CSS management without SCSS features.

- By documenting this decision in this ADR, we ensure that the rationale and implications are clear and well-communicated to all stakeholders involved. This change aligns with our goals of streamlining our development processes and maintaining a robust and efficient codebase.

## Tips

A [script](https://gist.github.com/jmfrancois/16b52b313d35eef589fa2935431d4b70) has been created for this occasion

`node sassToCss.js /home/jmfrancois/ui/packages/design-system/src /home/jmfrancois/ui/packages/design-system/src`

Before applying this script you can use this regexp
`var\(([a-z-]*), (.*)\)` to remove the default value in `_tokens.scss` before applying the script
