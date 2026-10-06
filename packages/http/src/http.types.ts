export interface TalendHttpResponse<T> {
	response: Response;
	data: T;
}

export type TalendRequestInitSecurity = {
	CSRFTokenCookieKey?: string;
	CSRFTokenHeaderKey?: string;
	/**
	 * Cross-origin origins (ex: https://api.example.com) that may receive the CSRF token.
	 * Same-origin requests always receive it.
	 */
	CSRFTokenAllowedOrigins?: string[];
};

export interface TalendRequestInit extends RequestInit {
	security?: TalendRequestInitSecurity;
	context?: Record<string, unknown>;
}

export type TalendRequest = {
	url: string;
} & TalendRequestInit;

export interface TalendHttpError<T> extends Error {
	response: Response;
	data: T;
}
