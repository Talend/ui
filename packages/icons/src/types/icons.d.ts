import icons from '../icon';

declare type Icon =
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
