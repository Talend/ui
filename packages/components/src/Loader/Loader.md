# **Loader**

# Types of loader 

1. General Loader, sizes are
    - small
    - default
    - large
    
2. App Loader (not a component, a pure css loader)

# How to use the general loader on your component

To use the general loader component, you need to specify the size of the loader

```html
<Loader size={CIRCULAR_PROGRESS_SIZE.small} />
```

# How to use the app loader on your component

1. Import the theme into your loading page,
   ```html
       import theme from '@talend/bootstrap-theme/src/theme/_loader.scss';
    ```
    
2. Specify the loader class names in the 'div' as follows,
    ```html
       <div data-app-icon='tmc' className={theme['tc-app-icon']}>
           <div className={theme['tc-app-loader']}><div></div></div>
       </div>
    ```
