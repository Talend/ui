# **Loader**

# Types of loader 

1. General Loader, sizes are
    - small
    - default
    - large
    
2. App Loader (pure css loader)

# How to use the general loader on your component

To use the general loader component, you need to specify the size of the loader

```html
<Loader size={CIRCULAR_PROGRESS_SIZE.small} />
```

# How to use the app loader (css loader) on your component

1. Include the application icon `$brand-icon` image data in your webpack file to launch the app loader with app logo.
    
    ```javascript
    const SASS_DATA = `
      $brand-primary: #77828A;
      $brand-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR......');
      @import '~@talend/bootstrap-theme/src/theme/guidelines';
    `;

1. Import the theme into your loading page,
   ```html
       import theme from '@talend/bootstrap-theme/src/theme/_loader.scss';
    ```
    
2. Specify the loader class names in the 'div' in your loading page as follows,
    ```html
       <div className={appLoaderTheme['tc-app-loader']}>
           <div className={appLoaderTheme['tc-app-icon']}></div>
       </div>
    ```
