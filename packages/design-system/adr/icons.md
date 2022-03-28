# Icon provider

## Context

Icon provider deserves fresh new behaviors, to serve the icons, because:

* We serve icons as they are exported, in their non-optimized version.
* There is no strong types definitions for the icons.
* The icons we see in Figma high fidelity mockups and the icons we get in production can differ.

## Problem

Icons need to be hosted by Figma because they rely on many shapes, as atoms, in a systemic way. 
That's our Icon System.
Having such decicated NPM package should only be the result of an optimization of those icons.
In the meantime, Figma high-fidelity mockups must use the same optimized icons to inherit of the current color, consequence of that optimization too.

## Solution

Figma will stay the single source of truth.
Figma will host the raw version, including the whole stack of shapes for each icons. 
Those shapes will be based on the predefined atoms and will follow our guidelines for some consistency reasons.

Figma will expose the optimized version of those icons, on their own, as components.
These components will be used by our product designers to compose the hi-fi mockups.

GitHub will get the icons from Figma and expose them as React components using TypeScript.
The NPM package will include each SVG icon, with each size variations, and will be exposed through Amazon CloudFront.

Since icons are not really critical, it's time to serve them in a smartest way.
Instead of fetching the whole SVG sprite, even if it's put in cache, we can befenit of our current CDN architecture to push forward the limits.
The goal is to introduce the usage of [service worker for a caching strategy](https://serviceworke.rs/strategy-cache-and-update.html).

```mermaid
sequenceDiagram
    participant C as Web browser
    participant W as Service worker
    participant S as CDN
    C->>W: GET icon
    activate W
    W-->>C: cached icon
    W->>S: GET icon
    S-->>W: icon
    W->>W: Put or update in cache
    W-->>C: icon from network
    deactivate W
```

First time you hit the icon, we will fetch it on the CDN.
Next times, you will get the cached version and it will be updated in background for the next calls. 
