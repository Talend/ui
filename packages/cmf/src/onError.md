# onError

Error handling is a sensible topic and so important.
When an issue happens in an app we need a lots of information to be able to understand it and debug it.

## User experience

A webapp is fragile because it's a state machine. So when an error occured the state is often compromised and disconnected from the backend state.

So the only global solution is to stop the end user. I know you will not be happy but your app must not encounter error if you want your user to be happy. Let the UI in place in case of error is worse than no UI at all.

Then we must inform the enduser and we believe here the best solution is to tell him the error has been reported (give him an id) and very few options like `refresh` the current page, `back to home` or `contact support`.

As a companie you must aggregate thoses errors and be notified from it.
An error for a end user means frustration so they should be treat as soon as possible.

Be proactive, when internet goes `offline` block the enduser but do not remove the app, just put it in pause with a nice message or you will have lots of useless error in your backend.

## Technical point of view

Before continue I consider you have read and understood the following documentation

* [Error Handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
* [Global Event Handlers onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror)
* [online and offline events](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events)

At the CMF level we have decided to force handling of error. When an error occured we the app rendering is completly replaced by an `ErrorFeedback` component. You can replace it for sure but be aware this component must be very clean. The worse situation may happens if this component fall in error.

![onError sequence diagram](../assets/diagram-onError-sequence.svg "onError sequence diagram")

## API

To setup onError please refer to the [bootstrap documentation](./bootstrap.md#onError)

CMF will post to the backend the following data structure:

| attribute | example value | description |
| -- | -- | -- |
| `time` | "2018-11-16T09:51:44.500Z" | the current date time |
| `browser` | "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" | navigator.userAgent |
| `location` | https://www.myapp.com/path/#/hash | the location.href |
| `error` | { message, name , stack } | the fields we have found in the error |
| `uiState` | quite big object | the redux store |
| `actions` | [ { type: 'REDUX_TYPE', payload }] | last actions |

## Anonymisation / remove sensible data

In the process of the report all data are anonymise if the `key` lowercase name match one of the following rules.

* starts with $
* starts with _
* contains password
* contains secret
* contains key
* contains mail

In that case the content is transformed as a random string of the same length

[bootstrap API](./bootstrap.md#onError) let you add some other regex to match sensible keys if the previous rules are not enought in your project
