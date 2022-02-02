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
