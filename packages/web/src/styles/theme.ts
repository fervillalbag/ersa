import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		'dark-grayish-blue': 'hsl(227, 12%, 61%)',
		'very-dark-blue': 'hsl(233, 12%, 13%)',
		'very-pale-red': 'hsl(13, 100%, 96%)',
		'vary-light-gray': 'hsl(0, 0%, 98%)',
		'bright-red': 'hsl(12, 88%, 59%)',
		'dark-blue': 'hsl(228, 39%, 23%)',
		'hover-gray': 'hsl(0, 0%, 97%)',
	},
	components: {
		Heading: {
			variants: {
				large: {
					fontSize: 50,
					color: 'dark-blue',
				},
				title: {
					fontSize: 36,
					color: 'dark-blue',
				},
				subtitle: {
					fontSize: 26,
					color: 'dark-blue',
				},
				secondary: {
					fontSize: 22,
					color: 'dark-blue',
				},
			},
		},
		Text: {
			variants: {
				description: {
					color: 'dark-grayish-blue',
					fontSize: '1.125rem',
					// marginTop: '1rem',
				},
			},
		},

		Button: {
			variants: {
				dots: {
					display: 'inline-block',
					rounded: 'full',
					backgroundColor: 'bright-red',
					color: 'white',
					fontSize: 14,
					height: '40px',
					padding: '0 26px',
					cursor: 'initial',

					_focus: {
						shadow: 0,
					},
				},

				primary: {
					display: 'inline-block',
					rounded: 'full',
					backgroundColor: 'bright-red',
					color: 'white',
					fontSize: 14,
					height: '44px',
					padding: '0 28px',
					transition: 'all 300ms ease',

					_hover: {
						backgroundColor: 'hsl(12, 88%, 68%)',
					},

					_focus: {
						shadow: '0 0 0 3px hsl(12, 88%, 70%)',
					},

					_active: {
						backgroundColor: 'hsl(12, 88%, 52%)',
					},
				},
			},
		},
	},
});

export default theme;
