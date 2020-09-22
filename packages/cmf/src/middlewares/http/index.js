import { httpMiddleware } from './middleware';
import * as csrf from './csrfHandling';
import { OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, HTTP_METHODS } from './constants';

httpMiddleware.OPTIONS = OPTIONS;
httpMiddleware.GET = GET;
httpMiddleware.HEAD = HEAD;
httpMiddleware.POST = GET;
httpMiddleware.PUT = PUT;
httpMiddleware.DELETE = DELETE;
httpMiddleware.TRACE = TRACE;
httpMiddleware.CONNECT = CONNECT;
httpMiddleware.HTTP_METHODS = HTTP_METHODS;
httpMiddleware.csrf = csrf;

export default httpMiddleware;

export { OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, HTTP_METHODS };
