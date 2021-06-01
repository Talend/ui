
export function getCdnUrl(info) {
	if (!window.Talend) {
		window.Talend = {};
	}
	if (!window.Talend.getCdnBaseUrl) {
		window.Talend.getCdnBaseUrl = () => window.CDN_URL || '/cdn';
	}
	if (!window.Talend.getCdnUrl) {
		window.Talend.getCdnUrl = opt => {
			return `${window.Talend.getCdnBaseUrl()}/${opt.name}/${opt.version}${opt.path}`;
		};
	}
	return window.Talend.getCdnUrl(info);
}
