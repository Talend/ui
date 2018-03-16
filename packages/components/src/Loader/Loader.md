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
      $brand-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+Cgk8ZyBmaWxsPSJub25lIj4KCQk8cGF0aCBkPSJNMTUuOTk4IDcuOTk5QTggOCAwIDEgMSAwIDcuOTk5YTggOCAwIDAgMSAxNS45OTggMCIgY2xhc3M9InRpLXRtYy1wb3NpdGl2ZS1iZyIgZmlsbD0iIzczNzc4NSIvPgoJCTxnIGNsYXNzPSJ0aS10bWMtcG9zaXRpdmUtbG9nbyIgZmlsbD0iI0ZGRiI+CgkJCTxwYXRoIGQ9Ik0xMi4zMTcgMTIuMDg2bC0uNjA5LS42MS0uMzA4LjMwOS42MDguNjA5YTUuOTQ4IDUuOTQ4IDAgMCAxLTMuMjY3IDEuNTM0Ljg0NC44NDQgMCAwIDAtLjU0Ny0uNDU3di0xLjEwNmgtLjQzNnYxLjEwNGEuODUxLjg1MSAwIDAgMC0uNTU2LjQ2MiA1Ljk1NyA1Ljk1NyAwIDAgMS0zLjMzOC0xLjU4NmwuNjIyLS42MjItLjMwOC0uMzEtLjYyLjYyYTUuOTUyIDUuOTUyIDAgMCAxLTEuNTEyLTMuMjQ3Ljg1My44NTMgMCAwIDAgLjQ3Ni0uNTY0aDEuMDF2LS40MzdIMi41MThhLjg1Mi44NTIgMCAwIDAtLjQ3Mi0uNTUyQTUuOTQyIDUuOTQyIDAgMCAxIDMuNTggMy45N2wuNTkuNTkuMzEtLjMwOC0uNTkzLS41OTJhNS45MzcgNS45MzcgMCAwIDEgMy4zMjYtMS41NjQuODUuODUgMCAwIDAgLjU0Mi40Mzh2MS4wNjhoLjQzNlYyLjUzNGEuODQ1Ljg0NSAwIDAgMCAuNTQtLjQzNiA1Ljk1MyA1Ljk1MyAwIDAgMSAzLjI1MiAxLjUxbC0uNTczLjU3NC4zMS4zMDguNTczLS41NzRhNS45NDYgNS45NDYgMCAwIDEgMS41ODYgMy4zNDIuODUzLjg1MyAwIDAgMC0uNDIyLjUzMmwtMS4wMTMuMDA3di40MzZsMS4wMTMtLjAwN2EuODU1Ljg1NSAwIDAgMCAuNDIzLjUzNiA1Ljk1MiA1Ljk1MiAwIDAgMS0xLjU2MyAzLjMyNG0yLjgxNC00LjA3NmEuODUxLjg1MSAwIDAgMC0uNzEzLS44NEE2LjUxMSA2LjUxMSAwIDAgMCA4LjgxIDEuNTU5YS44NTIuODUyIDAgMCAwLTEuNjc0LS4wMDNBNi41MTIgNi41MTIgMCAwIDAgMS41MDQgNy4xOGEuODUyLjg1MiAwIDAgMCAwIDEuNjU3IDYuNTEyIDYuNTEyIDAgMCAwIDUuNjM3IDUuNjM0Ljg1Ljg1IDAgMCAwIDEuNjY0LS4wMDIgNi41MTQgNi41MTQgMCAwIDAgNS42MTQtNS42MjEuODUyLjg1MiAwIDAgMCAuNzEyLS44NCIvPgoJCQk8cGF0aCBkPSJNNy45NzMgOS4wODRhMS4wOTYgMS4wOTYgMCAxIDEgMC0yLjE5MiAxLjA5NiAxLjA5NiAwIDEgMSAwIDIuMTkyem0xLjk2NS0uOTQzYTEuOTk0IDEuOTk0IDAgMCAwLS4xMTMtLjgxOGwuNzM1LS42NS0uOTQ4LjIyN2ExLjk4IDEuOTggMCAwIDAtLjYzMy0uNmwuMzkxLTIuNTktMS4yNTUgMi4zMTdhMS45NjcgMS45NjcgMCAwIDAtLjkxNi4xNDhsLS42Ni0uNzQ0LjIzOC45OWEyLjAxNyAyLjAxNyAwIDAgMC0uNTA4LjU2NWwtMS44MS0uMDkgMS41MzcuOTU5Yy0uMDAzLjA0Ny0uMDA3LjA5NS0uMDA3LjE0NCAwIC4yMTQuMDM1LjQyLjA5OC42MTNsLS43Ni42NzIuOTY3LS4yMzJjLjE2Ny4yNjQuMzk1LjQ4Ny42NjQuNjQ3bC0uNTIyIDIuNTlMNy44MjIgOS45N2MuMDQ4LjAwNC4wOTYuMDA4LjE0Ni4wMDguMjUzIDAgLjQ5NS0uMDUuNzE4LS4xMzhsLjY0Ny43MjktLjIyOS0uOTU0Yy4yMjctLjE2LjQxOC0uMzY2LjU2LS42MDVsMS44MS4xMDQtMS41MzYtLjk3NHoiLz4KCQkJPHBhdGggZD0iTTcuOTczIDcuNDczYS41MTMuNTEzIDAgMSAwIDAgMS4wMjkuNTE1LjUxNSAwIDEgMCAwLTEuMDI5Ii8+CgkJPC9nPgoJPC9nPgo8L3N2Zz4K');
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
