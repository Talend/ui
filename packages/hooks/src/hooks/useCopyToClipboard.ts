import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copy: CopyFn = async text => {
		if (!navigator?.clipboard) {
			console.warn('Clipboard not supported');
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			if (text !== copiedText) {
				setCopiedText(text);
			}
			return true;
		} catch (error) {
			console.error('Copy failed', error);
			if (copiedText !== null) {
				setCopiedText(null);
			}
			return false;
		}
	};

	return [copiedText, copy];
}
