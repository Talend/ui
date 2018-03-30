import { createInstance } from 'i18next';

const I18N_DOMAIN_DATAGRID = 'tui-datagrid';

// https://github.com/i18next/i18next/issues/936#issuecomment-307550677
export const DEFAULT_I18N = createInstance({}, () => {});

export default I18N_DOMAIN_DATAGRID;
