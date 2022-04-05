import icons from '../icon';

type Icon =
	| {
			size: 8;
			name: keyof icons[8];
	  }
	| {
			size: 12;
			name: keyof icons[8];
	  }
	| {
			size: 16;
			name: keyof icons[16];
	  }
	| {
			size: 24;
			name: keyof icons[24];
	  };
