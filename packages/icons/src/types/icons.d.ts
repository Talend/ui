import icons from '../icon';

enum Size {
	XS = 8,
	S = 12,
	M = 16,
	L = 24,
}

type Icon =
	| {
			size: 'XS';
			name: keyof typeof icons['XS'];
	  }
	| {
			size: 'S';
			name: keyof typeof icons['S'];
	  }
	| {
			size: 'M';
			name: keyof typeof icons['M'];
	  }
	| {
			size: 'L';
			name: keyof typeof icons['L'];
	  };
