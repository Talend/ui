# Icons

## Context

Icon component deserves fresh new behaviors, to serve the icons, because:

* We serve icons as they are exported, in their non-optimized version.
* There are no strong types definitions for the icons.
* The icons we see in Figma high fidelity mockups and the icons we get in production can differ.
* We can't easily update icon's parts, unitary, and reuse shapes for composition purposes since they are flattened.
* The whole bundle needs to be downloaded to start rendering icons

## Problem

Icons need to be hosted by Figma because they rely on many shapes, like atoms, in a systemic way. 
That's our Icon System.
Having such a dedicated NPM package should only be the result of an optimization of those icons.
In the meantime, Figma high-fidelity mockups must use the same optimized icons to inherit the current color, the consequence of that optimization too.

## Solution

Figma will stay the single source of truth.
Figma will host the raw version, including the whole stack of shapes for each icon. 
Those shapes will be based on the predefined atoms and will follow our guidelines for some consistency reasons.

Figma will expose the optimized version of those icons, on their own, as components.
These components will be used by our product designers to compose the hi-fi mockups.

GitHub will get the icons from Figma and expose them as React components using TypeScript.
The NPM package will include each SVG icon, with each size variation, and will be exposed through Amazon CloudFront.

```mermaid
graph LR
    Icons[Icon System library] --> FaaS[Function as a Service]
    FaaS --> Coral[Design System library]
    FaaS --> Github[Codebase]
    Coral --- PT[Product teams' needs]
    Github --- PT
```

Since icons are not really critical, it's time to serve them in the smartest way.
Instead of fetching the whole SVG sprite, even if it's put in the cache, we can benefit of our current CDN architecture to push forward the limits.
The goal is to introduce the usage of [service worker for a caching strategy](https://serviceworke.rs/strategy-cache-and-update.html) as a bonus.

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

The first time a client will hit the icon, it will fetch the icon as React component on the CDN.
Next time, they will get the cached version and it will be updated in the background, if and only if the icon has changed, for the next calls.

### Under the hood

Figma stores the icons. Easy part!  
Now, we need to fetch the icons from Figma, using a GitHub Action that will create a Pull Request (PR). 
That PR will organize the icons per size, only if they have changed.

Using Webpak 5 + [SVGR](https://react-svgr.com/), we can easily lazy-import each icon, as a React component. 
Each React component get a hashed name based on its content `[contenthash].js`.  
If you have already fetched the file, the web browser cache can reuse it.  
If not, it will fetch a couple of kilobytes for once. 

Now, you can say "OK, but what if my version of the package `@talend/icons` changes?"  
That's why we introduce the service worker, since, if the version changes, that implies a new URL to reach the CDN. 
And a new URL is a new cache key for your web browser.

The package `@talend/icons` won't expose a generic `<Icon />` React component. 
This component will be part of the Design System package. 
The package `@talend/icons` will expose a factory, instead, to retrieve the right icon at the right time. 
It will either be a new icon or fall back on our previous icons, for a smooth migration path.
