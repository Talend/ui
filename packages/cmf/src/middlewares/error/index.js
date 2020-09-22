import invariant from 'invariant';
import http from '../../actions/http';

export const URL_REQUIRED_MESSAGE = 'url to post the error is required';

/**
 * create a middleware which post request to server
 * @param  {String} url or path of the api like /api/errors
 * @return {function}      middleware
 */
export default function getErrorMiddleware(url) {
	invariant(url, URL_REQUIRED_MESSAGE);
	return store => next => action => {
		try {
			return next(action);
		} catch (error) {
			return next(
				http.post(url, {
					userAgent: navigator ? navigator.userAgent : 'unknown',
					reduxState: store.state,
					action,
					error,
				}),
			);
		}
	};
}

getErrorMiddleware.URL_REQUIRED_MESSAGE = URL_REQUIRED_MESSAGE;
