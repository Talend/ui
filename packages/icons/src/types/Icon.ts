import icons from '../icon';

export enum IconSize {
	XS = 8,
	S = 12,
	M = 16,
	L = 24,
}

export type Icon =
	| {
			size: keyof IconSize.XS;
			name: keyof typeof icons['XS'];
	  }
	| {
			size: keyof IconSize.S;
			name: keyof typeof icons['S'];
	  }
	| {
			size: keyof IconSize.M;
			name: keyof typeof icons['M'];
	  }
	| {
			size: keyof IconSize.L;
			name: keyof typeof icons['L'];
	  };
