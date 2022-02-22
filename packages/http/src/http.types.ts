export interface TalendHttpResponse<T> {
	response: Response;
	data: T;
}

export type TalendRequestInitSecurity = {
	CSRFTokenCookieKey?: string;
	CSRFTokenHeaderKey?: string;
};

export interface TalendRequestInit extends RequestInit {
	security?: TalendRequestInitSecurity;
}

export interface TalendHttpError<T> extends Error {
	response: Response;
	data: T;
}
