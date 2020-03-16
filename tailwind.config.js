// https://github.com/aniftyco/awesome-tailwindcss
module.exports = {
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			transparent: 'transparent',

			black: '#000',
			white: '#fff',

			gray: {
				100: '#f7fafc',
				200: '#edf2f7',
				300: '#e2e8f0',
				400: '#cbd5e0',
				500: '#a0aec0',
				600: '#718096',
				700: '#4a5568',
				800: '#2d3748',
				900: '#1a202c',
			},
			red: {
				100: '#fff5f5',
				200: '#fed7d7',
				300: '#feb2b2',
				400: '#fc8181',
				500: '#E96065', // $chesnutRose
				600: '#e53e3e',
				700: '#c53030',
				800: '#9b2c2c',
				900: '#742a2a',
			},
			orange: {
				100: '#fffaf0',
				200: '#feebc8',
				300: '#fbd38d',
				400: '#f6ad55',
				500: '#EA8330', // $jaffa
				600: '#dd6b20',
				700: '#c05621',
				800: '#9c4221',
				900: '#7b341e',
			},
			yellow: {
				100: '#fffff0',
				200: '#fefcbf',
				300: '#faf089',
				400: '#f6e05e',
				500: '#F3C446', // $lightningYellow
				600: '#d69e2e',
				700: '#b7791f',
				800: '#975a16',
				900: '#744210',
			},
			green: {
				100: '#f0fff4',
				200: '#c6f6d5',
				300: '#9ae6b4',
				400: '#68d391',
				500: '#82BD41', // $rioGrande
				600: '#38a169',
				700: '#2f855a',
				800: '#276749',
				900: '#22543d',
			},
			teal: {
				100: '#e6fffa',
				200: '#b2f5ea',
				300: '#81e6d9',
				400: '#4fd1c5',
				500: '#38b2ac',
				600: '#319795',
				700: '#2c7a7b',
				800: '#285e61',
				900: '#234e52',
			},
			blue: {
				100: '#ebf8ff',
				200: '#bee3f8',
				300: '#90cdf4',
				400: '#63b3ed',
				500: '#0675C1', // lochmara
				600: '#3182ce',
				700: '#2b6cb0',
				800: '#2c5282',
				900: '#2a4365',
			},
			indigo: {
				100: '#ebf4ff',
				200: '#c3dafe',
				300: '#a3bffa',
				400: '#7f9cf5',
				500: '#667eea',
				600: '#5a67d8',
				700: '#4c51bf',
				800: '#434190',
				900: '#3c366b',
			},
			purple: {
				100: '#faf5ff',
				200: '#e9d8fd',
				300: '#d6bcfa',
				400: '#b794f4',
				500: '#9f7aea',
				600: '#805ad5',
				700: '#6b46c1',
				800: '#553c9a',
				900: '#44337a',
			},
			pink: {
				100: '#fff5f7',
				200: '#fed7e2',
				300: '#fbb6ce',
				400: '#f687b3',
				500: '#ed64a6',
				600: '#d53f8c',
				700: '#b83280',
				800: '#97266d',
				900: '#702459',
			},
		},
		spacing: {
			px: '1px',
			'0': '0',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16': '4rem',
			'20': '5rem',
			'24': '6rem',
			'32': '8rem',
			'40': '10rem',
			'48': '12rem',
			'56': '14rem',
			'64': '16rem',
		},
		backgroundColor: theme => theme('colors'),
		backgroundPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top',
		},
		backgroundSize: {
			auto: 'auto',
			cover: 'cover',
			contain: 'contain',
		},
		borderColor: theme => ({
			...theme('colors'),
			default: theme('colors.gray.300', 'currentColor'),
		}),
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			default: '0.25rem',
			md: '0.375rem',
			lg: '0.5rem',
			full: '9999px',
		},
		borderWidth: {
			default: '1px',
			'0': '0',
			'2': '2px',
			'4': '4px',
			'8': '8px',
		},
		boxShadow: {
			xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
			none: 'none',
		},
		container: {},
		cursor: {
			auto: 'auto',
			default: 'default',
			pointer: 'pointer',
			wait: 'wait',
			text: 'text',
			move: 'move',
			'not-allowed': 'not-allowed',
		},
		fill: {
			current: 'currentColor',
		},
		flex: {
			'1': '1 1 0%',
			auto: '1 1 auto',
			initial: '0 1 auto',
			none: 'none',
		},
		flexGrow: {
			'0': '0',
			default: '1',
		},
		flexShrink: {
			'0': '0',
			default: '1',
		},
		fontFamily: {
			sans: [
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
		},
		fontWeight: {
			hairline: '100',
			thin: '200',
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800',
			black: '900',
		},
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: '100vh',
		}),
		inset: {
			'0': '0',
			auto: 'auto',
		},
		letterSpacing: {
			tighter: '-0.05em',
			tight: '-0.025em',
			normal: '0',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.1em',
		},
		lineHeight: {
			none: '1',
			tight: '1.25',
			snug: '1.375',
			normal: '1.5',
			relaxed: '1.625',
			loose: '2',
			'3': '.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'7': '1.75rem',
			'8': '2rem',
			'9': '2.25rem',
			'10': '2.5rem',
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal',
		},
		margin: (theme, { negative }) => ({
			auto: 'auto',
			...theme('spacing'),
			...negative(theme('spacing')),
		}),
		maxHeight: {
			full: '100%',
			screen: '100vh',
		},
		maxWidth: (theme, { breakpoints }) => ({
			none: 'none',
			xs: '20rem',
			sm: '24rem',
			md: '28rem',
			lg: '32rem',
			xl: '36rem',
			'2xl': '42rem',
			'3xl': '48rem',
			'4xl': '56rem',
			'5xl': '64rem',
			'6xl': '72rem',
			full: '100%',
			...breakpoints(theme('screens')),
		}),
		minHeight: {
			'0': '0',
			full: '100%',
			screen: '100vh',
		},
		minWidth: {
			'0': '0',
			full: '100%',
		},
		objectPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top',
		},
		opacity: {
			'0': '0',
			'25': '0.25',
			'50': '0.5',
			'75': '0.75',
			'100': '1',
		},
		order: {
			first: '-9999',
			last: '9999',
			none: '0',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
		},
		padding: theme => theme('spacing'),
		placeholderColor: theme => theme('colors'),
		stroke: {
			current: 'currentColor',
		},
		strokeWidth: {
			'0': '0',
			'1': '1',
			'2': '2',
		},
		textColor: theme => theme('colors'),
		width: theme => ({
			auto: 'auto',
			...theme('spacing'),
			'1/2': '50%',
			'1/3': '33.333333%',
			'2/3': '66.666667%',
			'1/4': '25%',
			'2/4': '50%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/5': '60%',
			'4/5': '80%',
			'1/6': '16.666667%',
			'2/6': '33.333333%',
			'3/6': '50%',
			'4/6': '66.666667%',
			'5/6': '83.333333%',
			'1/12': '8.333333%',
			'2/12': '16.666667%',
			'3/12': '25%',
			'4/12': '33.333333%',
			'5/12': '41.666667%',
			'6/12': '50%',
			'7/12': '58.333333%',
			'8/12': '66.666667%',
			'9/12': '75%',
			'10/12': '83.333333%',
			'11/12': '91.666667%',
			full: '100%',
			screen: '100vw',
		}),
		zIndex: {
			auto: 'auto',
			'0': '0',
			'10': '10',
			'20': '20',
			'30': '30',
			'40': '40',
			'50': '50',
		},
		gap: theme => theme('spacing'),
		gridTemplateColumns: {
			none: 'none',
			'1': 'repeat(1, minmax(0, 1fr))',
			'2': 'repeat(2, minmax(0, 1fr))',
			'3': 'repeat(3, minmax(0, 1fr))',
			'4': 'repeat(4, minmax(0, 1fr))',
			'5': 'repeat(5, minmax(0, 1fr))',
			'6': 'repeat(6, minmax(0, 1fr))',
			'7': 'repeat(7, minmax(0, 1fr))',
			'8': 'repeat(8, minmax(0, 1fr))',
			'9': 'repeat(9, minmax(0, 1fr))',
			'10': 'repeat(10, minmax(0, 1fr))',
			'11': 'repeat(11, minmax(0, 1fr))',
			'12': 'repeat(12, minmax(0, 1fr))',
		},
		gridColumn: {
			auto: 'auto',
			'span-1': 'span 1 / span 1',
			'span-2': 'span 2 / span 2',
			'span-3': 'span 3 / span 3',
			'span-4': 'span 4 / span 4',
			'span-5': 'span 5 / span 5',
			'span-6': 'span 6 / span 6',
			'span-7': 'span 7 / span 7',
			'span-8': 'span 8 / span 8',
			'span-9': 'span 9 / span 9',
			'span-10': 'span 10 / span 10',
			'span-11': 'span 11 / span 11',
			'span-12': 'span 12 / span 12',
		},
		gridColumnStart: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
			'13': '13',
		},
		gridColumnEnd: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
			'13': '13',
		},
		gridTemplateRows: {
			none: 'none',
			'1': 'repeat(1, minmax(0, 1fr))',
			'2': 'repeat(2, minmax(0, 1fr))',
			'3': 'repeat(3, minmax(0, 1fr))',
			'4': 'repeat(4, minmax(0, 1fr))',
			'5': 'repeat(5, minmax(0, 1fr))',
			'6': 'repeat(6, minmax(0, 1fr))',
		},
		gridRow: {
			auto: 'auto',
			'span-1': 'span 1 / span 1',
			'span-2': 'span 2 / span 2',
			'span-3': 'span 3 / span 3',
			'span-4': 'span 4 / span 4',
			'span-5': 'span 5 / span 5',
			'span-6': 'span 6 / span 6',
		},
		gridRowStart: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
		},
		gridRowEnd: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
		},
		transformOrigin: {
			center: 'center',
			top: 'top',
			'top-right': 'top right',
			right: 'right',
			'bottom-right': 'bottom right',
			bottom: 'bottom',
			'bottom-left': 'bottom left',
			left: 'left',
			'top-left': 'top left',
		},
		scale: {
			'0': '0',
			'50': '.5',
			'75': '.75',
			'90': '.9',
			'95': '.95',
			'100': '1',
			'105': '1.05',
			'110': '1.1',
			'125': '1.25',
			'150': '1.5',
		},
		rotate: {
			'-180': '-180deg',
			'-90': '-90deg',
			'-45': '-45deg',
			'0': '0',
			'45': '45deg',
			'90': '90deg',
			'180': '180deg',
		},
		translate: (theme, { negative }) => ({
			...theme('spacing'),
			...negative(theme('spacing')),
			'-full': '-100%',
			'-1/2': '-50%',
			'1/2': '50%',
			full: '100%',
		}),
		skew: {
			'-12': '-12deg',
			'-6': '-6deg',
			'-3': '-3deg',
			'0': '0',
			'3': '3deg',
			'6': '6deg',
			'12': '12deg',
		},
		transitionProperty: {
			none: 'none',
			all: 'all',
			default:
				'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
			colors: 'background-color, border-color, color, fill, stroke',
			opacity: 'opacity',
			shadow: 'box-shadow',
			transform: 'transform',
		},
		transitionTimingFunction: {
			linear: 'linear',
			in: 'cubic-bezier(0.4, 0, 1, 1)',
			out: 'cubic-bezier(0, 0, 0.2, 1)',
			'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
		transitionDuration: {
			'75': '75ms',
			'100': '100ms',
			'150': '150ms',
			'200': '200ms',
			'300': '300ms',
			'500': '500ms',
			'700': '700ms',
			'1000': '1000ms',
		},
	},
	variants: {
		accessibility: ['responsive', 'focus'],
		alignContent: ['responsive'],
		alignItems: ['responsive'],
		alignSelf: ['responsive'],
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundColor: ['responsive', 'hover', 'focus'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		backgroundSize: ['responsive'],
		borderCollapse: ['responsive'],
		borderColor: ['responsive', 'hover', 'focus'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidth: ['responsive'],
		boxShadow: ['responsive', 'hover', 'focus'],
		boxSizing: ['responsive'],
		cursor: ['responsive'],
		display: ['responsive'],
		fill: ['responsive'],
		flex: ['responsive'],
		flexDirection: ['responsive'],
		flexGrow: ['responsive'],
		flexShrink: ['responsive'],
		flexWrap: ['responsive'],
		float: ['responsive'],
		clear: ['responsive'],
		fontFamily: ['responsive'],
		fontSize: ['responsive'],
		fontSmoothing: ['responsive'],
		fontStyle: ['responsive'],
		fontWeight: ['responsive', 'hover', 'focus'],
		height: ['responsive'],
		inset: ['responsive'],
		justifyContent: ['responsive'],
		letterSpacing: ['responsive'],
		lineHeight: ['responsive'],
		listStylePosition: ['responsive'],
		listStyleType: ['responsive'],
		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		objectFit: ['responsive'],
		objectPosition: ['responsive'],
		opacity: ['responsive', 'hover', 'focus'],
		order: ['responsive'],
		outline: ['responsive', 'focus'],
		overflow: ['responsive'],
		padding: ['responsive'],
		placeholderColor: ['responsive', 'focus'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		resize: ['responsive'],
		stroke: ['responsive'],
		strokeWidth: ['responsive'],
		tableLayout: ['responsive'],
		textAlign: ['responsive'],
		textColor: ['responsive', 'hover', 'focus'],
		textDecoration: ['responsive', 'hover', 'focus'],
		textTransform: ['responsive'],
		userSelect: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		wordBreak: ['responsive'],
		zIndex: ['responsive'],
		gap: ['responsive'],
		gridAutoFlow: ['responsive'],
		gridTemplateColumns: ['responsive'],
		gridColumn: ['responsive'],
		gridColumnStart: ['responsive'],
		gridColumnEnd: ['responsive'],
		gridTemplateRows: ['responsive'],
		gridRow: ['responsive'],
		gridRowStart: ['responsive'],
		gridRowEnd: ['responsive'],
		transform: ['responsive'],
		transformOrigin: ['responsive'],
		scale: ['responsive', 'hover', 'focus'],
		rotate: ['responsive', 'hover', 'focus'],
		translate: ['responsive', 'hover', 'focus'],
		skew: ['responsive', 'hover', 'focus'],
		transitionProperty: ['responsive'],
		transitionTimingFunction: ['responsive'],
		transitionDuration: ['responsive'],
	},
	corePlugins: {},
	plugins: [],
};
