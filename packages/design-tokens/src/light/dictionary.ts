const dictionary = [
	{
		name: 'coralColorNeutralText',
		type: 'color',
		description:
			"Default text color. if you don't know which color to pick for text, then this is the safest bet.",
		hsla: 'hsla(0,0%,13%,1)',
		hex: '#202020',
		value: 'hsla(0,0%,13%,1)',
	},
	{
		name: 'coralColorNeutralTextWeak',
		type: 'color',
		description: `Weak text color.
Best used when there is regular neutral-text next to it.`,
		hsla: 'hsla(0,0%,38%,1)',
		hex: '#616161',
		value: 'hsla(0,0%,38%,1)',
	},
	{
		name: 'coralColorNeutralTextDisabled',
		type: 'color',
		description: `Disabled text color.
Only use for interactive elements in their disabled state.
`,
		hsla: 'hsla(0,0%,44%,1)',
		hex: '#707070',
		value: 'hsla(0,0%,44%,1)',
	},
	{
		name: 'coralColorNeutralTextInverted',
		type: 'color',
		description: `Inverted text color.
Only use on dark backgrounds.
`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorNeutralBackground',
		type: 'color',
		description:
			"Default background color. If there's no reason for a semantic background, then that is the one to use.",
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorNeutralBackgroundMedium',
		type: 'color',
		description: `Medium contrasting background color.

Ex: SubHeader`,
		hsla: 'hsla(0,0%,97%,1)',
		hex: '#f7f7f7',
		value: 'hsla(0,0%,97%,1)',
	},
	{
		name: 'coralColorNeutralBackgroundStrong',
		type: 'color',
		description: `Strongly contrasting background color.
Use sparingly.

Ex: SubHeader back button.`,
		hsla: 'hsla(0,0%,88%,1)',
		hex: '#e0e0e0',
		value: 'hsla(0,0%,88%,1)',
	},
	{
		name: 'coralColorNeutralBackgroundDisabled',
		type: 'color',
		description: `Background color for disabled interactive elements only.

Ex: Buttons`,
		hsla: 'hsla(0,0%,88%,1)',
		hex: '#e0e0e0',
		value: 'hsla(0,0%,88%,1)',
	},
	{
		name: 'coralColorNeutralBorder',
		type: 'color',
		description: `Default border color.

Ex: Inputs`,
		hsla: 'hsla(0,0%,55%,1)',
		hex: '#8c8c8c',
		value: 'hsla(0,0%,55%,1)',
	},
	{
		name: 'coralColorNeutralBorderWeak',
		type: 'color',
		description: `Weaker border color, for discreet separators

Ex: Dividers`,
		hsla: 'hsla(0,0%,82%,1)',
		hex: '#d2d2d2',
		value: 'hsla(0,0%,82%,1)',
	},
	{
		name: 'coralColorNeutralBorderHover',
		type: 'color',
		description: `Default border color, on mouseover.

Ex: Inputs`,
		hsla: 'hsla(0,0%,40%,1)',
		hex: '#666666',
		value: 'hsla(0,0%,40%,1)',
	},
	{
		name: 'coralColorAccentTextWeak',
		type: 'color',
		description: `Accent text color on accent-background-strong.

Ex: ButtonPrimary`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorAccentTextWeakHover',
		type: 'color',
		description: `Accent text color on accent-background-strong, on mouseover.

Ex: ButtonPrimary
`,
		hsla: 'hsla(204,59%,88%,1)',
		hex: '#cde3f2',
		value: 'hsla(204,59%,88%,1)',
	},
	{
		name: 'coralColorAccentTextWeakActive',
		type: 'color',
		description: `Accent text color on accent-background-strong, while pressing.

Ex: ButtonPrimary`,
		hsla: 'hsla(205,60%,75%,1)',
		hex: '#9bc7e6',
		value: 'hsla(205,60%,75%,1)',
	},
	{
		name: 'coralColorAccentText',
		type: 'color',
		description: `Accent text color.
Use for interactive text content without background.

Ex: Links`,
		hsla: 'hsla(204,95%,31%,1)',
		hex: '#045d9a',
		value: 'hsla(204,95%,31%,1)',
	},
	{
		name: 'coralColorAccentTextHover',
		type: 'color',
		description: `Accent text color on mouseover.

Ex: Links`,
		hsla: 'hsla(204,96%,18%,1)',
		hex: '#023659',
		value: 'hsla(204,96%,18%,1)',
	},
	{
		name: 'coralColorAccentTextActive',
		type: 'color',
		description: `Accent text color while pressed.

Ex: Links`,
		hsla: 'hsla(205,94%,13%,1)',
		hex: '#022741',
		value: 'hsla(205,94%,13%,1)',
	},
	{
		name: 'coralColorAccentBackground',
		type: 'color',
		description: `Accent background color by default. Use with text-strong.

Ex: InlineMessage`,
		hsla: 'hsla(204,59%,88%,1)',
		hex: '#cde3f2',
		value: 'hsla(204,59%,88%,1)',
	},
	{
		name: 'coralColorAccentBackgroundHover',
		type: 'color',
		description: 'Accent background color by default, on mouseover. ',
		hsla: 'hsla(205,60%,75%,1)',
		hex: '#9bc7e6',
		value: 'hsla(205,60%,75%,1)',
	},
	{
		name: 'coralColorAccentBackgroundActive',
		type: 'color',
		description: 'Accent background color by default, while pressing. ',
		hsla: 'hsla(204,60%,63%,1)',
		hex: '#69acd9',
		value: 'hsla(204,60%,63%,1)',
	},
	{
		name: 'coralColorAccentBackgroundWeak',
		type: 'color',
		description: `Weakest accent background color. Same color as neutral-background but with accent-tinted hover and active.

Use as placeholder to indicate that you want accent-tinted interactive states.

Ex: ButtonTertiary`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorAccentBackgroundWeakHover',
		type: 'color',
		description: `Weakest accent background color on mouseover.

Ex: ButtonTertiary`,
		hsla: 'hsla(204,59%,88%,1)',
		hex: '#cde3f2',
		value: 'hsla(204,59%,88%,1)',
	},
	{
		name: 'coralColorAccentBackgroundWeakActive',
		type: 'color',
		description: `Weakest accent background color on press.

Ex: ButtonTertiary`,
		hsla: 'hsla(205,60%,75%,1)',
		hex: '#9bc7e6',
		value: 'hsla(205,60%,75%,1)',
	},
	{
		name: 'coralColorAccentBackgroundStrong',
		type: 'color',
		description: `Strongest accent background color.
Use for primary interactive items. Use with text-weak.

Ex: ButtonPrimary`,
		hsla: 'hsla(204,95%,31%,1)',
		hex: '#045d9a',
		value: 'hsla(204,95%,31%,1)',
	},
	{
		name: 'coralColorAccentBackgroundStrongHover',
		type: 'color',
		description: `Strongest accent background color on mouseover

Ex: ButtonPrimary`,
		hsla: 'hsla(204,95%,23%,1)',
		hex: '#034673',
		value: 'hsla(204,95%,23%,1)',
	},
	{
		name: 'coralColorAccentBackgroundStrongActive',
		type: 'color',
		description: `Strongest accent background color on press.

Ex: ButtonPrimary`,
		hsla: 'hsla(205,95%,15%,1)',
		hex: '#022e4d',
		value: 'hsla(205,95%,15%,1)',
	},
	{
		name: 'coralColorAccentBorderHover',
		type: 'color',
		description: `Border with accent color on mouseover.

Ex: ButtonSecondary`,
		hsla: 'hsla(204,95%,23%,1)',
		hex: '#034673',
		value: 'hsla(204,95%,23%,1)',
	},
	{
		name: 'coralColorAccentBorderActive',
		type: 'color',
		description: `Border with accent color while pressing.

Ex: ButtonSecondary`,
		hsla: 'hsla(205,95%,15%,1)',
		hex: '#022e4d',
		value: 'hsla(205,95%,15%,1)',
	},
	{
		name: 'coralColorDangerTextWeak',
		type: 'color',
		description: `Danger text color on danger-background-strong.

Ex: ButtonDestructive`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorDangerTextWeakHover',
		type: 'color',
		description: `Danger text color on mouseover.

Ex: ButtonDestructive`,
		hsla: 'hsla(358,100%,94%,1)',
		hex: '#ffe1e2',
		value: 'hsla(358,100%,94%,1)',
	},
	{
		name: 'coralColorDangerTextWeakActive',
		type: 'color',
		description: `Danger text color while pressing.

Ex: ButtonDestructive`,
		hsla: 'hsla(359,100%,88%,1)',
		hex: '#ffc4c5',
		value: 'hsla(359,100%,88%,1)',
	},
	{
		name: 'coralColorDangerText',
		type: 'color',
		description: `Danger text color.
Use for text content without background that must carry a negative semantic value on its own. `,
		hsla: 'hsla(359,51%,53%,1)',
		hex: '#c4484a',
		value: 'hsla(359,51%,53%,1)',
	},
	{
		name: 'coralColorDangerTextHover',
		type: 'color',
		description: 'Danger text color on mouseover, if interactive. ',
		hsla: 'hsla(359,52%,43%,1)',
		hex: '#a63537',
		value: 'hsla(359,52%,43%,1)',
	},
	{
		name: 'coralColorDangerTextActive',
		type: 'color',
		description: 'Danger text color while pressing, if interactive. ',
		hsla: 'hsla(359,51%,33%,1)',
		hex: '#7f292a',
		value: 'hsla(359,51%,33%,1)',
	},
	{
		name: 'coralColorDangerBackground',
		type: 'color',
		description: `Danger background color by default. Use with text-strong.

Ex: InlineMessage`,
		hsla: 'hsla(0,100%,96%,1)',
		hex: '#ffebeb',
		value: 'hsla(0,100%,96%,1)',
	},
	{
		name: 'coralColorDangerBackgroundHover',
		type: 'color',
		description: 'Danger background on mouseover. ',
		hsla: 'hsla(359,100%,88%,1)',
		hex: '#ffc4c5',
		value: 'hsla(359,100%,88%,1)',
	},
	{
		name: 'coralColorDangerBackgroundActive',
		type: 'color',
		description: 'Danger background while pressing.',
		hsla: 'hsla(359,100%,83%,1)',
		hex: '#ffa7a9',
		value: 'hsla(359,100%,83%,1)',
	},
	{
		name: 'coralColorDangerBackgroundWeak',
		type: 'color',
		description: `Weakest danger background color. Same color as neutral-background but with danger-tinted hover and active.

Use as placeholder to indicate that you want danger-tinted interactive states.`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorDangerBackgroundWeakHover',
		type: 'color',
		description: 'Weakest danger background color on mouseover. ',
		hsla: 'hsla(358,100%,94%,1)',
		hex: '#ffe1e2',
		value: 'hsla(358,100%,94%,1)',
	},
	{
		name: 'coralColorDangerBackgroundWeakActive',
		type: 'color',
		description: 'Weakest danger background color while pressed.',
		hsla: 'hsla(359,100%,88%,1)',
		hex: '#ffc4c5',
		value: 'hsla(359,100%,88%,1)',
	},
	{
		name: 'coralColorSuccessTextWeak',
		type: 'color',
		description: 'Success text color on success-background-strong. ',
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorSuccessTextWeakHover',
		type: 'color',
		description: 'Success text color on mouseover. ',
		hsla: 'hsla(110,49%,90%,1)',
		hex: '#ddf2d9',
		value: 'hsla(110,49%,90%,1)',
	},
	{
		name: 'coralColorSuccessTextWeakActive',
		type: 'color',
		description: 'Success text color while pressed. ',
		hsla: 'hsla(110,48%,85%,1)',
		hex: '#ccebc6',
		value: 'hsla(110,48%,85%,1)',
	},
	{
		name: 'coralColorSuccessText',
		type: 'color',
		description: `Success text color.
Use for text content without background that must carry a positive semantic value on its own.

Ex: StatusSuccessful`,
		hsla: 'hsla(111,49%,34%,1)',
		hex: '#39812c',
		value: 'hsla(111,49%,34%,1)',
	},
	{
		name: 'coralColorSuccessTextHover',
		type: 'color',
		description: 'Success text color on mouseover.',
		hsla: 'hsla(111,49%,29%,1)',
		hex: '#316e26',
		value: 'hsla(111,49%,29%,1)',
	},
	{
		name: 'coralColorSuccessTextActive',
		type: 'color',
		description: 'Success text color while pressed.',
		hsla: 'hsla(111,49%,24%,1)',
		hex: '#285b1f',
		value: 'hsla(111,49%,24%,1)',
	},
	{
		name: 'coralColorSuccessBackground',
		type: 'color',
		description: `Success background color by default. Use with text-strong.

Ex: InlineMessage `,
		hsla: 'hsla(110,49%,90%,1)',
		hex: '#ddf2d9',
		value: 'hsla(110,49%,90%,1)',
	},
	{
		name: 'coralColorDangerBackgroundStrong',
		type: 'color',
		description: `Strongest danger background color. Use on strong interactive elements with a negative semantic attached. Use with text-weak.

Ex: ButtonDestructive `,
		hsla: 'hsla(359,51%,53%,1)',
		hex: '#c4484a',
		value: 'hsla(359,51%,53%,1)',
	},
	{
		name: 'coralColorDangerBackgroundStrongHover',
		type: 'color',
		description: `Strongest danger background color on mouseover.

Ex: ButtonDestructive`,
		hsla: 'hsla(359,54%,38%,1)',
		hex: '#952d2f',
		value: 'hsla(359,54%,38%,1)',
	},
	{
		name: 'coralColorDangerBackgroundStrongActive',
		type: 'color',
		description: `Strongest danger background color while pressed.

Ex: ButtonDestructive`,
		hsla: 'hsla(359,54%,33%,1)',
		hex: '#812729',
		value: 'hsla(359,54%,33%,1)',
	},
	{
		name: 'coralColorDangerBorder',
		type: 'color',
		description: `Border color with danger semantic.

Ex: Input in error state`,
		hsla: 'hsla(359,51%,53%,1)',
		hex: '#c4484a',
		value: 'hsla(359,51%,53%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundHover',
		type: 'color',
		description: 'Success background color on mouseover. ',
		hsla: 'hsla(110,48%,85%,1)',
		hex: '#ccebc6',
		value: 'hsla(110,48%,85%,1)',
	},
	{
		name: 'coralColorDangerBorderHover',
		type: 'color',
		description: `Border color with danger semantic on mouseover.

Ex: Input in error state`,
		hsla: 'hsla(359,54%,38%,1)',
		hex: '#952d2f',
		value: 'hsla(359,54%,38%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundActive',
		type: 'color',
		description: 'Success background color while pressed. ',
		hsla: 'hsla(110,49%,80%,1)',
		hex: '#bbe5b3',
		value: 'hsla(110,49%,80%,1)',
	},
	{
		name: 'coralColorDangerBorderActive',
		type: 'color',
		description: `Border color with danger semantic while pressing.

Ex: Input in error state`,
		hsla: 'hsla(359,54%,33%,1)',
		hex: '#812729',
		value: 'hsla(359,54%,33%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundWeak',
		type: 'color',
		description: `Weakest success background color. Same color as neutral-background but with success-tinted hover and active.

Use as placeholder to indicate that you want success-tinted interactive states.`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundWeakHover',
		type: 'color',
		description: 'Weakest success background color on mouseover.',
		hsla: 'hsla(110,49%,90%,1)',
		hex: '#ddf2d9',
		value: 'hsla(110,49%,90%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundWeakActive',
		type: 'color',
		description: 'Weakest success background color while pressed.',
		hsla: 'hsla(110,48%,85%,1)',
		hex: '#ccebc6',
		value: 'hsla(110,48%,85%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundStrong',
		type: 'color',
		description:
			'Strongest success background color. Use on strong interactive elements with a positive semantic attached. Use with text-weak.',
		hsla: 'hsla(111,49%,34%,1)',
		hex: '#39812c',
		value: 'hsla(111,49%,34%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundStrongHover',
		type: 'color',
		description: 'Strongest success background color on mouseover.',
		hsla: 'hsla(111,49%,29%,1)',
		hex: '#316e26',
		value: 'hsla(111,49%,29%,1)',
	},
	{
		name: 'coralColorSuccessBackgroundStrongActive',
		type: 'color',
		description: 'Strongest success background color while pressed.',
		hsla: 'hsla(111,49%,24%,1)',
		hex: '#285b1f',
		value: 'hsla(111,49%,24%,1)',
	},
	{
		name: 'coralColorWarningTextWeak',
		type: 'color',
		description: 'Warning text color on warning-background-strong. ',
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorWarningTextWeakHover',
		type: 'color',
		description: 'Warning weak text color, on mouseover. ',
		hsla: 'hsla(22,85%,92%,1)',
		hex: '#fce6d9',
		value: 'hsla(22,85%,92%,1)',
	},
	{
		name: 'coralColorWarningTextWeakActive',
		type: 'color',
		description: 'Warning weak text color, while pressed. ',
		hsla: 'hsla(22,85%,82%,1)',
		hex: '#f8c7aa',
		value: 'hsla(22,85%,82%,1)',
	},
	{
		name: 'coralColorSuccessBorder',
		type: 'color',
		description: 'Border color with success semantic.',
		hsla: 'hsla(111,49%,34%,1)',
		hex: '#39812c',
		value: 'hsla(111,49%,34%,1)',
	},
	{
		name: 'coralColorWarningText',
		type: 'color',
		description: `Waring text color.
Use for text content without background that must carry a warning semantic value on its own.

Ex: StatusWarning`,
		hsla: 'hsla(22,93%,41%,1)',
		hex: '#ca4d07',
		value: 'hsla(22,93%,41%,1)',
	},
	{
		name: 'coralColorWarningTextHover',
		type: 'color',
		description: 'Waring text color, on mouseover.',
		hsla: 'hsla(21,94%,31%,1)',
		hex: '#993a05',
		value: 'hsla(21,94%,31%,1)',
	},
	{
		name: 'coralColorWarningTextActive',
		type: 'color',
		description: 'Warning text color, while pressed.',
		hsla: 'hsla(21,93%,21%,1)',
		hex: '#682704',
		value: 'hsla(21,93%,21%,1)',
	},
	{
		name: 'coralColorWarningBackground',
		type: 'color',
		description: `Warning background color by default. Use with text-strong.

Ex: InlineMessage`,
		hsla: 'hsla(22,85%,92%,1)',
		hex: '#fce6d9',
		value: 'hsla(22,85%,92%,1)',
	},
	{
		name: 'coralColorSuccessBorderHover',
		type: 'color',
		description: 'Border color with success semantic, on mouseover.',
		hsla: 'hsla(111,49%,29%,1)',
		hex: '#316e26',
		value: 'hsla(111,49%,29%,1)',
	},
	{
		name: 'coralColorWarningBackgroundHover',
		type: 'color',
		description: 'Warning background color, on mouseover.',
		hsla: 'hsla(22,85%,82%,1)',
		hex: '#f8c7aa',
		value: 'hsla(22,85%,82%,1)',
	},
	{
		name: 'coralColorSuccessBorderActive',
		type: 'color',
		description: 'Border color with success semantic, while pressed.',
		hsla: 'hsla(111,49%,24%,1)',
		hex: '#285b1f',
		value: 'hsla(111,49%,24%,1)',
	},
	{
		name: 'coralColorWarningBackgroundActive',
		type: 'color',
		description: 'Warning background color, while pressed.',
		hsla: 'hsla(22,85%,72%,1)',
		hex: '#f4a87b',
		value: 'hsla(22,85%,72%,1)',
	},
	{
		name: 'coralColorWarningBackgroundWeak',
		type: 'color',
		description: `Weakest warning background color. Same color as neutral-background but with warning-tinted hover and active.

Use as placeholder to indicate that you want warning-tinted interactive states.`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorAssistiveText',
		type: 'color',
		description: `Text for assistive elements. Use with assistive-background.

Ex: Tooltip`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorWarningBackgroundWeakHover',
		type: 'color',
		description: 'Weakest warning background color, on mouseover.',
		hsla: 'hsla(22,85%,92%,1)',
		hex: '#fce6d9',
		value: 'hsla(22,85%,92%,1)',
	},
	{
		name: 'coralColorWarningBackgroundWeakActive',
		type: 'color',
		description: 'Weakest warning background color, while pressed.',
		hsla: 'hsla(22,85%,82%,1)',
		hex: '#f8c7aa',
		value: 'hsla(22,85%,82%,1)',
	},
	{
		name: 'coralColorAssistiveBackground',
		type: 'color',
		description: `Background for assistive elements. Use with assistive-text.

Ex: Tooltip`,
		hsla: 'hsla(210,62%,5%,1)',
		hex: '#050d15',
		value: 'hsla(210,62%,5%,1)',
	},
	{
		name: 'coralColorWarningBackgroundStrong',
		type: 'color',
		description:
			'Strongest warning background color. Use on strong interactive elements with a warning semantic attached. Use with text-weak.',
		hsla: 'hsla(22,93%,41%,1)',
		hex: '#ca4d07',
		value: 'hsla(22,93%,41%,1)',
	},
	{
		name: 'coralColorWarningBackgroundStrongHover',
		type: 'color',
		description: 'Strongest warning background color, on mouseover.',
		hsla: 'hsla(21,94%,31%,1)',
		hex: '#993a05',
		value: 'hsla(21,94%,31%,1)',
	},
	{
		name: 'coralColorWarningBackgroundStrongActive',
		type: 'color',
		description: 'Strongest warning background color, while pressed.',
		hsla: 'hsla(21,93%,21%,1)',
		hex: '#672704',
		value: 'hsla(21,93%,21%,1)',
	},
	{
		name: 'coralColorWarningBorder',
		type: 'color',
		description: 'Border color with warning semantic.',
		hsla: 'hsla(22,93%,41%,1)',
		hex: '#ca4d07',
		value: 'hsla(22,93%,41%,1)',
	},
	{
		name: 'coralColorAssistiveBorder',
		type: 'color',
		description: 'Border for assistive elements. ',
		hsla: 'hsla(0,0%,47%,1)',
		hex: '#797979',
		value: 'hsla(0,0%,47%,1)',
	},
	{
		name: 'coralColorWarningBorderHover',
		type: 'color',
		description: 'Border color with warning semantic, on mouseover.',
		hsla: 'hsla(21,94%,31%,1)',
		hex: '#993a05',
		value: 'hsla(21,94%,31%,1)',
	},
	{
		name: 'coralColorWarningBorderActive',
		type: 'color',
		description: 'Border color with warning semantic, while pressed.',
		hsla: 'hsla(21,93%,21%,1)',
		hex: '#672704',
		value: 'hsla(21,93%,21%,1)',
	},
	{
		name: 'coralColorBrandingBrand',
		type: 'color',
		description: 'Main brand color. Used for logo.',
		hsla: 'hsla(359,100%,71%,1)',
		hex: '#ff6d70',
		value: 'hsla(359,100%,71%,1)',
	},
	{
		name: 'coralColorNeutralBorderDisabled',
		type: 'color',
		description: `Disabled border color for interactive elements

Ex: Inputs`,
		hsla: 'hsla(0,0%,65%,1)',
		hex: '#a6a6a6',
		value: 'hsla(0,0%,65%,1)',
	},
	{
		name: 'coralColorNeutralBorderWeakHover',
		type: 'color',
		description: 'Weaker border color on mouseover.',
		hsla: 'hsla(0,0%,72%,1)',
		hex: '#b8b8b8',
		value: 'hsla(0,0%,72%,1)',
	},
	{
		name: 'coralColorAssistiveBorderFocus',
		type: 'color',
		description: `Focus color for focus rings across the products.

Ex: Buttons on focus`,
		hsla: 'hsla(241,54%,61%,1)',
		hex: '#6664d1',
		value: 'hsla(241,54%,61%,1)',
	},
	{
		name: 'coralColorAccentTextStrong',
		type: 'color',
		description: 'Accent text color on accent-background.',
		hsla: 'hsla(204,96%,18%,1)',
		hex: '#023659',
		value: 'hsla(204,96%,18%,1)',
	},
	{
		name: 'coralColorAccentTextStrongHover',
		type: 'color',
		description: 'Accent text color on mouseover.',
		hsla: 'hsla(204,97%,13%,1)',
		hex: '#012741',
		value: 'hsla(204,97%,13%,1)',
	},
	{
		name: 'coralColorAccentTextStrongActive',
		type: 'color',
		description: 'Accent text color while pressed.',
		hsla: 'hsla(205,95%,8%,1)',
		hex: '#011828',
		value: 'hsla(205,95%,8%,1)',
	},
	{
		name: 'coralColorDangerTextStrong',
		type: 'color',
		description: 'Danger text color on danger-background. ',
		hsla: 'hsla(359,47%,44%,1)',
		hex: '#a43b3d',
		value: 'hsla(359,47%,44%,1)',
	},
	{
		name: 'coralColorDangerTextStrongHover',
		type: 'color',
		description: 'Danger text color on mouseover. ',
		hsla: 'hsla(359,54%,38%,1)',
		hex: '#952d2f',
		value: 'hsla(359,54%,38%,1)',
	},
	{
		name: 'coralColorDangerTextStrongActive',
		type: 'color',
		description: 'Danger text color while pressing. ',
		hsla: 'hsla(359,54%,33%,1)',
		hex: '#812729',
		value: 'hsla(359,54%,33%,1)',
	},
	{
		name: 'coralColorSuccessTextStrong',
		type: 'color',
		description: 'Success text color on success-background. ',
		hsla: 'hsla(111,49%,29%,1)',
		hex: '#316e26',
		value: 'hsla(111,49%,29%,1)',
	},
	{
		name: 'coralColorSuccessTextStrongHover',
		type: 'color',
		description: 'Success text color on mouseover. ',
		hsla: 'hsla(110,49%,24%,1)',
		hex: '#295b1f',
		value: 'hsla(110,49%,24%,1)',
	},
	{
		name: 'coralColorSuccessTextStrongActive',
		type: 'color',
		description: 'Success text color while pressed. ',
		hsla: 'hsla(111,48%,19%,1)',
		hex: '#204819',
		value: 'hsla(111,48%,19%,1)',
	},
	{
		name: 'coralColorWarningTextStrong',
		type: 'color',
		description: 'Warning text color on warning-background.',
		hsla: 'hsla(22,86%,27%,1)',
		hex: '#80360a',
		value: 'hsla(22,86%,27%,1)',
	},
	{
		name: 'coralColorWarningTextStrongHover',
		type: 'color',
		description: 'Warning strong text color, on mouseover. ',
		hsla: 'hsla(23,86%,22%,1)',
		hex: '#682c08',
		value: 'hsla(23,86%,22%,1)',
	},
	{
		name: 'coralColorWarningTextStrongActive',
		type: 'color',
		description: 'Warning strong text color, while pressed.',
		hsla: 'hsla(23,86%,17%,1)',
		hex: '#502206',
		value: 'hsla(23,86%,17%,1)',
	},
	{
		name: 'coralColorBetaText',
		type: 'color',
		description: `Beta text color, for things that are new or temporary.
Use for text content without background that must carry a beta semantic value on its own. `,
		hsla: 'hsla(280,57%,49%,1)',
		hex: '#9435c3',
		value: 'hsla(280,57%,49%,1)',
	},
	{
		name: 'coralColorBetaTextHover',
		type: 'color',
		description: 'Beta text color, on mouseover.',
		hsla: 'hsla(281,58%,39%,1)',
		hex: '#772a9c',
		value: 'hsla(281,58%,39%,1)',
	},
	{
		name: 'coralColorBetaTextActive',
		type: 'color',
		description: 'Beta text color, while pressed.',
		hsla: 'hsla(281,58%,29%,1)',
		hex: '#591f74',
		value: 'hsla(281,58%,29%,1)',
	},
	{
		name: 'coralColorBetaIcon',
		type: 'color',
		description: `Icon with beta color.

Ex: InlineMessage`,
		hsla: 'hsla(280,80%,54%,1)',
		hex: '#aa2de8',
		value: 'hsla(280,80%,54%,1)',
	},
	{
		name: 'coralColorBetaIconHover',
		type: 'color',
		description: 'Icon with beta color, on mouseover.',
		hsla: 'hsla(280,80%,44%,1)',
		hex: '#8e16ca',
		value: 'hsla(280,80%,44%,1)',
	},
	{
		name: 'coralColorBetaIconActive',
		type: 'color',
		description: 'Icon with beta color, while pressed.',
		hsla: 'hsla(280,80%,34%,1)',
		hex: '#6e119c',
		value: 'hsla(280,80%,34%,1)',
	},
	{
		name: 'coralColorBetaTextWeak',
		type: 'color',
		description: 'Beta text color on beta-background-strong. ',
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorBetaTextWeakHover',
		type: 'color',
		description: 'Beta weak text color, on mouseover.',
		hsla: 'hsla(280,56%,83%,1)',
		hex: '#dcbbec',
		value: 'hsla(280,56%,83%,1)',
	},
	{
		name: 'coralColorBetaTextWeakActive',
		type: 'color',
		description: 'Beta weak text color, while pressed.',
		hsla: 'hsla(280,57%,73%,1)',
		hex: '#c793e1',
		value: 'hsla(280,57%,73%,1)',
	},
	{
		name: 'coralColorBetaTextStrong',
		type: 'color',
		description: 'Beta text color on beta-background.',
		hsla: 'hsla(281,58%,29%,1)',
		hex: '#591f74',
		value: 'hsla(281,58%,29%,1)',
	},
	{
		name: 'coralColorBetaTextStrongHover',
		type: 'color',
		description: 'Beta strong text color, on mouseover. ',
		hsla: 'hsla(282,58%,19%,1)',
		hex: '#3b144c',
		value: 'hsla(282,58%,19%,1)',
	},
	{
		name: 'coralColorBetaTextStrongActive',
		type: 'color',
		description: 'Beta strong text color, while pressed. ',
		hsla: 'hsla(282,57%,9%,1)',
		hex: '#1c0a24',
		value: 'hsla(282,57%,9%,1)',
	},
	{
		name: 'coralColorBetaBackground',
		type: 'color',
		description: `Beta background color by default. Use with text-strong.

Ex: InlineMessage`,
		hsla: 'hsla(279,57%,90%,1)',
		hex: '#ead7f4',
		value: 'hsla(279,57%,90%,1)',
	},
	{
		name: 'coralColorBetaBackgroundHover',
		type: 'color',
		description: 'Beta background color, on mouseover.',
		hsla: 'hsla(279,57%,81%,1)',
		hex: '#d7b3ea',
		value: 'hsla(279,57%,81%,1)',
	},
	{
		name: 'coralColorBetaBackgroundActive',
		type: 'color',
		description: 'Beta background color, while pressed.',
		hsla: 'hsla(279,57%,71%,1)',
		hex: '#c28bdf',
		value: 'hsla(279,57%,71%,1)',
	},
	{
		name: 'coralColorBetaBackgroundWeak',
		type: 'color',
		description: `Weakest beta background color. Same color as neutral-background but with beta-tinted hover and active.

Use as placeholder to indicate that you want beta-tinted interactive states.`,
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorBetaBackgroundWeakHover',
		type: 'color',
		description: 'Weakest beta background color, on mouseover.',
		hsla: 'hsla(279,57%,90%,1)',
		hex: '#ead7f4',
		value: 'hsla(279,57%,90%,1)',
	},
	{
		name: 'coralColorBetaBackgroundWeakActive',
		type: 'color',
		description: 'Weakest beta background color, while pressed.',
		hsla: 'hsla(279,57%,80%,1)',
		hex: '#d5afe9',
		value: 'hsla(279,57%,80%,1)',
	},
	{
		name: 'coralColorBetaBackgroundStrong',
		type: 'color',
		description:
			'Strongest beta background color. Use on strong interactive elements with a beta semantic attached. Use with text-weak.',
		hsla: 'hsla(281,58%,29%,1)',
		hex: '#591f74',
		value: 'hsla(281,58%,29%,1)',
	},
	{
		name: 'coralColorBetaBackgroundStrongHover',
		type: 'color',
		description: 'Strongest beta background color, on mouseover.',
		hsla: 'hsla(282,58%,19%,1)',
		hex: '#3b144c',
		value: 'hsla(282,58%,19%,1)',
	},
	{
		name: 'coralColorBetaBackgroundStrongActive',
		type: 'color',
		description: 'Strongest beta background color, while pressed.',
		hsla: 'hsla(282,57%,9%,1)',
		hex: '#1c0a24',
		value: 'hsla(282,57%,9%,1)',
	},
	{
		name: 'coralColorBetaBorder',
		type: 'color',
		description: 'Border color with beta semantic.',
		hsla: 'hsla(281,58%,29%,1)',
		hex: '#591f74',
		value: 'hsla(281,58%,29%,1)',
	},
	{
		name: 'coralColorBetaBorderHover',
		type: 'color',
		description: 'Border color with beta semantic, on mouseover.',
		hsla: 'hsla(282,58%,19%,1)',
		hex: '#3b144c',
		value: 'hsla(282,58%,19%,1)',
	},
	{
		name: 'coralColorBetaBorderActive',
		type: 'color',
		description: 'Border color with beta semantic, while pressed.',
		hsla: 'hsla(282,57%,9%,1)',
		hex: '#1c0a24',
		value: 'hsla(282,57%,9%,1)',
	},
	{
		name: 'coralColorNeutralBorderStrong',
		type: 'color',
		description: `Strongest border color.

Use on strong backgrounds (neutral-background-medium, -strong or -heavy).`,
		hsla: 'hsla(0,0%,25%,1)',
		hex: '#404040',
		value: 'hsla(0,0%,25%,1)',
	},
	{
		name: 'coralColorNeutralBorderStrongHover',
		type: 'color',
		description: 'Strongest border color on mouseover.',
		hsla: 'hsla(0,0%,15%,1)',
		hex: '#262626',
		value: 'hsla(0,0%,15%,1)',
	},
	{
		name: 'coralColorNeutralIconInverted',
		type: 'color',
		description: 'Neutral icon color on dark backgrounds.',
		hsla: 'hsla(0,0%,100%,1)',
		hex: '#ffffff',
		value: 'hsla(0,0%,100%,1)',
	},
	{
		name: 'coralColorNeutralIcon',
		type: 'color',
		description: `Default icon color.

Best used when the icon doesn't expect interactivity. `,
		hsla: 'hsla(0,0%,13%,1)',
		hex: '#202020',
		value: 'hsla(0,0%,13%,1)',
	},
	{
		name: 'coralColorNeutralIconWeak',
		type: 'color',
		description: `Weakly contrasting icon color.

Best used when there is regular neutral-text or neutral-icon colors nearby for efficient hierarchy.`,
		hsla: 'hsla(0,0%,38%,1)',
		hex: '#616161',
		value: 'hsla(0,0%,38%,1)',
	},
	{
		name: 'coralColorAccentIcon',
		type: 'color',
		description: `Icon with accent color.

Ex: ButtonIcon`,
		hsla: 'hsla(204,88%,40%,1)',
		hex: '#0c78c2',
		value: 'hsla(204,88%,40%,1)',
	},
	{
		name: 'coralColorAccentIconHover',
		type: 'color',
		description: `Icon with accent color on mouseover.

Ex: ButtonIcon`,
		hsla: 'hsla(204,88%,30%,1)',
		hex: '#095990',
		value: 'hsla(204,88%,30%,1)',
	},
	{
		name: 'coralColorAccentIconActive',
		type: 'color',
		description: `Icon with accent color while pressing.

Ex: ButtonIcon`,
		hsla: 'hsla(205,88%,20%,1)',
		hex: '#063b60',
		value: 'hsla(205,88%,20%,1)',
	},
	{
		name: 'coralColorDangerIcon',
		type: 'color',
		description: `Icon with danger color.

Ex: Status`,
		hsla: 'hsla(359,69%,53%,1)',
		hex: '#d93335',
		value: 'hsla(359,69%,53%,1)',
	},
	{
		name: 'coralColorDangerIconHover',
		type: 'color',
		description: 'Icon with danger color on mouseover.',
		hsla: 'hsla(359,69%,43%,1)',
		hex: '#b92224',
		value: 'hsla(359,69%,43%,1)',
	},
	{
		name: 'coralColorDangerIconActive',
		type: 'color',
		description: 'Icon with danger color while pressed.',
		hsla: 'hsla(359,69%,33%,1)',
		hex: '#8e1a1c',
		value: 'hsla(359,69%,33%,1)',
	},
	{
		name: 'coralColorSuccessIcon',
		type: 'color',
		description: `Icon with success color.

Ex: StatusSuccessful`,
		hsla: 'hsla(111,53%,40%,1)',
		hex: '#409c30',
		value: 'hsla(111,53%,40%,1)',
	},
	{
		name: 'coralColorSuccessIconHover',
		type: 'color',
		description: 'Icon with success color, on mouseover.',
		hsla: 'hsla(111,53%,30%,1)',
		hex: '#307524',
		value: 'hsla(111,53%,30%,1)',
	},
	{
		name: 'coralColorSuccessIconActive',
		type: 'color',
		description: 'Icon with success color, while pressed.',
		hsla: 'hsla(111,53%,20%,1)',
		hex: '#204e18',
		value: 'hsla(111,53%,20%,1)',
	},
	{
		name: 'coralColorWarningIcon',
		type: 'color',
		description: `Icon with warning color.

Ex: StatusWarning`,
		hsla: 'hsla(22,87%,47%,1)',
		hex: '#e25c10',
		value: 'hsla(22,87%,47%,1)',
	},
	{
		name: 'coralColorWarningIconHover',
		type: 'color',
		description: 'Icon with warning color, on mouseover.',
		hsla: 'hsla(22,87%,37%,1)',
		hex: '#b0480c',
		value: 'hsla(22,87%,37%,1)',
	},
	{
		name: 'coralColorWarningIconActive',
		type: 'color',
		description: 'Icon with warning color, while pressed.',
		hsla: 'hsla(22,87%,27%,1)',
		hex: '#813409',
		value: 'hsla(22,87%,27%,1)',
	},
	{
		name: 'coralColorChartsNeutral',
		type: 'color',
		description: `Chart color: Neutral.
Use for neutral / empty semantic values.

Ex: QualityBar`,
		hsla: 'hsla(0,0%,22%,1)',
		hex: '#383838',
		value: 'hsla(0,0%,22%,1)',
	},
	{
		name: 'coralColorChartsNeutralWeak',
		type: 'color',
		description: `Chart color: Neutral-weak.
Weak contrast for neutral / empty semantic values.`,
		hsla: 'hsla(0,0%,83%,1)',
		hex: '#d4d4d4',
		value: 'hsla(0,0%,83%,1)',
	},
	{
		name: 'coralColorChartsNeutralStrong',
		type: 'color',
		description: `Chart color: Neutral-strong.
Strong contrast for neutral / empty semantic values.`,
		hsla: 'hsla(0,0%,12%,1)',
		hex: '#1f1f1f',
		value: 'hsla(0,0%,12%,1)',
	},
	{
		name: 'coralColorChartsNeutralHover',
		type: 'color',
		description: 'Chart color: Neutral on mouseover for interactive charts.',
		hsla: 'hsla(0,0%,12%,1)',
		hex: '#1f1f1f',
		value: 'hsla(0,0%,12%,1)',
	},
	{
		name: 'coralColorChartsSuccess',
		type: 'color',
		description: `Chart color: Success.
Use for success / positive semantic values.

Ex: QualityBar`,
		hsla: 'hsla(148,87%,40%,1)',
		hex: '#0dbd5e',
		value: 'hsla(148,87%,40%,1)',
	},
	{
		name: 'coralColorChartsSuccessWeak',
		type: 'color',
		description: `Chart color: Success-weak.
Weak contrast for positive / success semantic values.`,
		hsla: 'hsla(130,52%,91%,1)',
		hex: '#dcf4e0',
		value: 'hsla(130,52%,91%,1)',
	},
	{
		name: 'coralColorChartsSuccessStrong',
		type: 'color',
		description: `Chart color: Success-strong.
Strong contrast for positive / success semantic values.`,
		hsla: 'hsla(139,50%,22%,1)',
		hex: '#1c552e',
		value: 'hsla(139,50%,22%,1)',
	},
	{
		name: 'coralColorChartsSuccessHover',
		type: 'color',
		description: 'Chart color: Success on mouseover for interactive charts.',
		hsla: 'hsla(139,50%,22%,1)',
		hex: '#1c552e',
		value: 'hsla(139,50%,22%,1)',
	},
	{
		name: 'coralColorChartsDanger',
		type: 'color',
		description: `Chart color: Danger.
Use for danger / negative semantic values.

Ex: QualityBar`,
		hsla: 'hsla(4,89%,49%,1)',
		hex: '#ea1b0e',
		value: 'hsla(4,89%,49%,1)',
	},
	{
		name: 'coralColorChartsDangerWeak',
		type: 'color',
		description: `Chart color: Danger-weak.
Weak contrast for negative / danger semantic values.`,
		hsla: 'hsla(359,69%,73%,1)',
		hex: '#e9898a',
		value: 'hsla(359,69%,73%,1)',
	},
	{
		name: 'coralColorChartsDangerStrong',
		type: 'color',
		description: `Chart color: Danger-strong.
Strong contrast for negative / danger semantic values.`,
		hsla: 'hsla(359,62%,43%,1)',
		hex: '#b32a2c',
		value: 'hsla(359,62%,43%,1)',
	},
	{
		name: 'coralColorChartsDangerHover',
		type: 'color',
		description: 'Chart color: Danger on mouseover for interactive charts.',
		hsla: 'hsla(359,62%,43%,1)',
		hex: '#b32a2c',
		value: 'hsla(359,62%,43%,1)',
	},
	{
		name: 'coralColorChartsWarning',
		type: 'color',
		description: `Chart color: Warning.
Use for warning semantic values.`,
		hsla: 'hsla(32,100%,56%,1)',
		hex: '#ff9820',
		value: 'hsla(32,100%,56%,1)',
	},
	{
		name: 'coralColorChartsWarningWeak',
		type: 'color',
		description: `Chart color: Warning-weak.
Weak contrast for warning semantic values.`,
		hsla: 'hsla(22,88%,84%,1)',
		hex: '#facbb0',
		value: 'hsla(22,88%,84%,1)',
	},
	{
		name: 'coralColorChartsWarningStrong',
		type: 'color',
		description: `Chart color: Warning-strong.
Strong contrast for warning semantic values.`,
		hsla: 'hsla(22,75%,42%,1)',
		hex: '#b9541b',
		value: 'hsla(22,75%,42%,1)',
	},
	{
		name: 'coralColorChartsWarningHover',
		type: 'color',
		description: 'Chart color: Warning on mouseover for interactive charts.',
		hsla: 'hsla(22,75%,42%,1)',
		hex: '#b9541b',
		value: 'hsla(22,75%,42%,1)',
	},
	{
		name: 'coralColorChartsDefault',
		type: 'color',
		description: `Chart color by default.
If the chart only has one set of value, and not a semantic (danger / warning / success) then use this colorset.`,
		hsla: 'hsla(216,82%,48%,1)',
		hex: '#1667df',
		value: 'hsla(216,82%,48%,1)',
	},
	{
		name: 'coralColorChartsDefaultWeak',
		type: 'color',
		description: `Chart color: default-weak.
Weak contrast for basic chart values.`,
		hsla: 'hsla(204,59%,73%,1)',
		hex: '#91c2e3',
		value: 'hsla(204,59%,73%,1)',
	},
	{
		name: 'coralColorChartsDefaultStrong',
		type: 'color',
		description: `Chart color: default-strong.
Strong contrast for basic chart values. `,
		hsla: 'hsla(204,92%,29%,1)',
		hex: '#06568d',
		value: 'hsla(204,92%,29%,1)',
	},
	{
		name: 'coralColorChartsDefaultHover',
		type: 'color',
		description: `Chart color: default on mouseover for interactive charts.

if there is text on top if this, use default-text-weak.`,
		hsla: 'hsla(204,92%,29%,1)',
		hex: '#06568d',
		value: 'hsla(204,92%,29%,1)',
	},
	{
		name: 'coralColorChartsColor00',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(48,100%,50%,1)',
		hex: '#ffcc00',
		value: 'hsla(48,100%,50%,1)',
	},
	{
		name: 'coralColorChartsColor00Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(51,91%,82%,1)',
		hex: '#fbefa9',
		value: 'hsla(51,91%,82%,1)',
	},
	{
		name: 'coralColorChartsColor00Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(48,82%,45%,1)',
		hex: '#d2ad15',
		value: 'hsla(48,82%,45%,1)',
	},
	{
		name: 'coralColorChartsColor00Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(48,82%,45%,1)',
		hex: '#d2ad15',
		value: 'hsla(48,82%,45%,1)',
	},
	{
		name: 'coralColorChartsColor01',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(216,82%,48%,1)',
		hex: '#1667df',
		value: 'hsla(216,82%,48%,1)',
	},
	{
		name: 'coralColorChartsColor01Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(204,59%,73%,1)',
		hex: '#91c2e3',
		value: 'hsla(204,59%,73%,1)',
	},
	{
		name: 'coralColorChartsColor01Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(204,92%,29%,1)',
		hex: '#06568d',
		value: 'hsla(204,92%,29%,1)',
	},
	{
		name: 'coralColorChartsColor01Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(204,92%,29%,1)',
		hex: '#06568d',
		value: 'hsla(204,92%,29%,1)',
	},
	{
		name: 'coralColorChartsColor02',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(194,92%,50%,1)',
		hex: '#0abef5',
		value: 'hsla(194,92%,50%,1)',
	},
	{
		name: 'coralColorChartsColor02Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(194,91%,91%,1)',
		hex: '#d2f3fd',
		value: 'hsla(194,91%,91%,1)',
	},
	{
		name: 'coralColorChartsColor02Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(194,93%,32%,1)',
		hex: '#067b9f',
		value: 'hsla(194,93%,32%,1)',
	},
	{
		name: 'coralColorChartsColor02Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(194,93%,32%,1)',
		hex: '#067b9f',
		value: 'hsla(194,93%,32%,1)',
	},
	{
		name: 'coralColorChartsColor03',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(140,39%,79%,1)',
		hex: '#b3dec1',
		value: 'hsla(140,39%,79%,1)',
	},
	{
		name: 'coralColorChartsColor03Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(138,40%,92%,1)',
		hex: '#e1f2e6',
		value: 'hsla(138,40%,92%,1)',
	},
	{
		name: 'coralColorChartsColor03Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(139,11%,35%,1)',
		hex: '#506356',
		value: 'hsla(139,11%,35%,1)',
	},
	{
		name: 'coralColorChartsColor03Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(139,11%,35%,1)',
		hex: '#506356',
		value: 'hsla(139,11%,35%,1)',
	},
	{
		name: 'coralColorChartsColor04',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(148,87%,40%,1)',
		hex: '#0dbd5e',
		value: 'hsla(148,87%,40%,1)',
	},
	{
		name: 'coralColorChartsColor04Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(130,52%,91%,1)',
		hex: '#dcf4e0',
		value: 'hsla(130,52%,91%,1)',
	},
	{
		name: 'coralColorChartsColor04Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(139,50%,22%,1)',
		hex: '#1c552e',
		value: 'hsla(139,50%,22%,1)',
	},
	{
		name: 'coralColorChartsColor04Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(139,50%,22%,1)',
		hex: '#1c552e',
		value: 'hsla(139,50%,22%,1)',
	},
	{
		name: 'coralColorChartsColor05',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(324,68%,71%,1)',
		hex: '#e884c0',
		value: 'hsla(324,68%,71%,1)',
	},
	{
		name: 'coralColorChartsColor05Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(323,69%,95%,1)',
		hex: '#fbe9f4',
		value: 'hsla(323,69%,95%,1)',
	},
	{
		name: 'coralColorChartsColor05Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(324,28%,49%,1)',
		hex: '#a15b85',
		value: 'hsla(324,28%,49%,1)',
	},
	{
		name: 'coralColorChartsColor05Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(324,28%,49%,1)',
		hex: '#a15b85',
		value: 'hsla(324,28%,49%,1)',
	},
	{
		name: 'coralColorChartsColor06',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(280,75%,58%,1)',
		hex: '#b045e5',
		value: 'hsla(280,75%,58%,1)',
	},
	{
		name: 'coralColorChartsColor06Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(279,77%,88%,1)',
		hex: '#e8caf8',
		value: 'hsla(279,77%,88%,1)',
	},
	{
		name: 'coralColorChartsColor06Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(280,54%,36%,1)',
		hex: '#6e2b8f',
		value: 'hsla(280,54%,36%,1)',
	},
	{
		name: 'coralColorChartsColor06Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(280,54%,36%,1)',
		hex: '#6e2b8f',
		value: 'hsla(280,54%,36%,1)',
	},
	{
		name: 'coralColorChartsColor07',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(4,89%,49%,1)',
		hex: '#ea1b0e',
		value: 'hsla(4,89%,49%,1)',
	},
	{
		name: 'coralColorChartsColor07Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(359,69%,73%,1)',
		hex: '#e9898a',
		value: 'hsla(359,69%,73%,1)',
	},
	{
		name: 'coralColorChartsColor07Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(359,62%,43%,1)',
		hex: '#b32a2c',
		value: 'hsla(359,62%,43%,1)',
	},
	{
		name: 'coralColorChartsColor07Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(359,62%,43%,1)',
		hex: '#b32a2c',
		value: 'hsla(359,62%,43%,1)',
	},
	{
		name: 'coralColorChartsColor08',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(22,88%,54%,1)',
		hex: '#f16e23',
		value: 'hsla(22,88%,54%,1)',
	},
	{
		name: 'coralColorChartsColor08Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(22,88%,84%,1)',
		hex: '#facbb0',
		value: 'hsla(22,88%,84%,1)',
	},
	{
		name: 'coralColorChartsColor08Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(22,75%,42%,1)',
		hex: '#b9541b',
		value: 'hsla(22,75%,42%,1)',
	},
	{
		name: 'coralColorChartsColor08Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(22,75%,42%,1)',
		hex: '#b9541b',
		value: 'hsla(22,75%,42%,1)',
	},
	{
		name: 'coralColorChartsColor09',
		type: 'color',
		description: `Chart color used in combinations with the other numerical chart colors.

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
		hsla: 'hsla(34,34%,45%,1)',
		hex: '#99784c',
		value: 'hsla(34,34%,45%,1)',
	},
	{
		name: 'coralColorChartsColor09Weak',
		type: 'color',
		description: '',
		hsla: 'hsla(35,28%,82%,1)',
		hex: '#ded3c4',
		value: 'hsla(35,28%,82%,1)',
	},
	{
		name: 'coralColorChartsColor09Strong',
		type: 'color',
		description: '',
		hsla: 'hsla(35,34%,27%,1)',
		hex: '#5b482d',
		value: 'hsla(35,34%,27%,1)',
	},
	{
		name: 'coralColorChartsColor09Hover',
		type: 'color',
		description: '',
		hsla: 'hsla(35,34%,27%,1)',
		hex: '#5b482d',
		value: 'hsla(35,34%,27%,1)',
	},
	{
		name: 'coralColorAccentBorder',
		type: 'color',
		description: `Border with accent color.
Use for interactive items.

Ex: ButtonSecondary`,
		hsla: 'hsla(204,95%,31%,1)',
		hex: '#045d9a',
		value: 'hsla(204,95%,31%,1)',
	},
	{
		name: 'coralColorChartsDefaultText',
		type: 'color',
		description: `Text color for chart-default.

Text on a chart is discouraged, but if you must, then use this with chart-default.`,
		hsla: 'hsla(205,87%,94%,1)',
		hex: '#e3f2fd',
		value: 'hsla(205,87%,94%,1)',
	},
	{
		name: 'coralColorChartsDefaultTextStrong',
		type: 'color',
		description: `Strong text color for chart-default-weak.

Text on a chart is discouraged, but if you must, then use this with chart-default-weak.`,
		hsla: 'hsla(205,93%,22%,1)',
		hex: '#04426d',
		value: 'hsla(205,93%,22%,1)',
	},
	{
		name: 'coralColorChartsDefaultTextWeak',
		type: 'color',
		description: `Weak text color for chart-default-strong.

Text on a chart is discouraged, but if you must, then use this with chart-default-strong.`,
		hsla: 'hsla(207,93%,94%,1)',
		hex: '#e3f2fe',
		value: 'hsla(207,93%,94%,1)',
	},
	{
		name: 'coralColorChartsColor09Text',
		type: 'color',
		description: '',
		hsla: 'hsla(36,36%,5%,1)',
		hex: '#130f09',
		value: 'hsla(36,36%,5%,1)',
	},
	{
		name: 'coralColorChartsColor09TextStrong',
		type: 'color',
		description: '',
		hsla: 'hsla(36,36%,5%,1)',
		hex: '#130f09',
		value: 'hsla(36,36%,5%,1)',
	},
	{
		name: 'coralColorChartsColor09TextWeak',
		type: 'color',
		description: '',
		hsla: 'hsla(35,28%,82%,1)',
		hex: '#ded3c4',
		value: 'hsla(35,28%,82%,1)',
	},
	{
		name: 'coralColorNeutralBackgroundHeavy',
		type: 'color',
		description: '',
		hsla: 'hsla(0,0%,78%,1)',
		hex: '#c7c7c7',
		value: 'hsla(0,0%,78%,1)',
	},
	{
		name: 'coralColorBrandingBackground',
		type: 'gradient',
		description: 'Main brand background. Used for heroes.',
		value: 'linear-gradient(133deg,hsla(210,62%,26%,1) 0%, hsla(254,47%,23%,1) 100%)',
	},
	{
		name: 'coralColorBrandingNavigation',
		type: 'gradient',
		description: 'Main navigation background. Used for TopBar and branded Sidebar.',
		value: 'linear-gradient(133deg,hsla(210,62%,26%,1) 0%, hsla(254,47%,23%,1) 100%)',
	},
	{
		name: 'coralSizeXxs',
		type: 'measure',
		description: '',
		value: '0.4rem',
	},
	{
		name: 'coralSizeXs',
		type: 'measure',
		description: '',
		value: '0.8rem',
	},
	{
		name: 'coralSizeS',
		type: 'measure',
		description: '',
		value: '1.2rem',
	},
	{
		name: 'coralSizeM',
		type: 'measure',
		description: '',
		value: '1.6rem',
	},
	{
		name: 'coralSizeL',
		type: 'measure',
		description: '',
		value: '2.8rem',
	},
	{
		name: 'coralSizeXl',
		type: 'measure',
		description: '',
		value: '3.6rem',
	},
	{
		name: 'coralSizeLimit',
		type: 'measure',
		description: '',
		value: '32rem',
	},
	{
		name: 'coralElevationShadowNeutralM',
		type: 'shadow',
		description: `Default shadow.

Use on "first layer" of elevation. `,
		value: '0rem 0.2rem 0.6rem 0rem hsla(0,0%,0%,0.3)',
	},
	{
		name: 'coralElevationShadowNeutralL',
		type: 'shadow',
		description: `Large shadow.

Use on "second layer" of elevation - something that need to be "above" anything else.`,
		value: '0rem 0.4rem 0.8rem 0rem hsla(0,0%,0%,0.3)',
	},
	{
		name: 'coralElevationShadowAccent',
		type: 'shadow',
		description: `Shadow with an accent tint.

Use for subtle highlights.

Ex: InlineMessage`,
		value: '0rem 0.1rem 0.1rem 0rem hsla(204,95%,31%,0.3)',
	},
	{
		name: 'coralElevationShadowSuccess',
		type: 'shadow',
		description: `Shadow with a success tint.

Use for subtle highlights.

Ex: InlineMessage`,
		value: '0rem 0.1rem 0.1rem 0rem hsla(111,49%,34%,0.3)',
	},
	{
		name: 'coralElevationShadowDanger',
		type: 'shadow',
		description: `Shadow with a danger tint.

Use for subtle highlights.

Ex: InlineMessage`,
		value: '0rem 0.1rem 0.1rem 0rem hsla(359,51%,53%,0.3)',
	},
	{
		name: 'coralElevationShadowWarning',
		type: 'shadow',
		description: `Shadow with a warning tint.

Use for subtle highlights.

Ex: InlineMessage`,
		value: '0rem 0.1rem 0.1rem 0rem hsla(22,93%,41%,0.3)',
	},
	{
		name: 'coralElevationShadowBeta',
		type: 'shadow',
		description: `Shadow with a beta tint.

Use for subtle highlights.

Ex: InlineMessage`,
		value: '0rem 0.1rem 0.1rem 0rem hsla(281,58%,29%,0.3)',
	},
	{
		name: 'coralHeadingL',
		type: 'typography',
		description: 'Heading text - Use for highest level headings.',
		value: "600 1.8rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '1.8rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralParagraphM',
		type: 'typography',
		description: 'Paragraph text - Standard size.',
		value: "400 1.4rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: '1.4rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralParagraphMBold',
		type: 'typography',
		description: 'Paragraph text - Standard size, bold.',
		value: "600 1.4rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '1.4rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralParagraphS',
		type: 'typography',
		description: 'Paragraph text - Small size.',
		value: "400 1.2rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: '1.2rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralParagraphSBold',
		type: 'typography',
		description: '',
		value: "600 1.2rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '1.2rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralHeadingM',
		type: 'typography',
		description: 'Heading text - Use for medium level headings, most current ones.',
		value: "600 1.6rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '1.6rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralHeadingS',
		type: 'typography',
		description:
			'Heading text - Use for small level headings. Use with caution, this can clash with bold paragraphs.',
		value: "600 1.4rem/140% 'Source Sans Pro'",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '1.4rem',
		lineHeight: '140%',
		fontFamily: 'Source Sans Pro',
	},
	{
		name: 'coralRadiusM',
		type: 'radius',
		description: 'Radius for molecules (Accordion, Fieldset, Popover, etc.)',
		value: '0.8rem',
	},
	{
		name: 'coralRadiusL',
		type: 'radius',
		description: 'Radius for layout components (Card, Modal, etc.)',
		value: '1.6rem',
	},
	{
		name: 'coralRadiusRound',
		type: 'radius',
		description: 'Radius for immediate actions (badges, switch, etc.)',
		value: '9999.9rem',
	},
	{
		name: 'coralRadiusS',
		type: 'radius',
		description: 'Radius for atomic components (button, tag, tooltip, etc.) ',
		value: '0.4rem',
	},
	{
		name: 'coralBorderSSolid',
		type: 'border',
		description: 'Solid border to visually separate elements',
		value: '1px solid',
	},
	{
		name: 'coralBorderMSolid',
		type: 'border',
		description: 'Solid border to visually identify a selection',
		value: '2px solid',
	},
	{
		name: 'coralBorderSDashed',
		type: 'border',
		description: `Dashed border to visually identify potentially interactive components.

Ex: Droppable zone`,
		value: '1px dashed',
	},
	{
		name: 'coralBorderMDashed',
		type: 'border',
		description: `Dashed border to visually identify a possible selection.

Ex: Ongoing mapper link`,
		value: '2px dashed',
	},
	{
		name: 'coralOpacityL',
		type: 'opacity',
		description: `Very transparent.

Opacity for components that are not currently enabled.`,
		value: '0.2',
	},
	{
		name: 'coralOpacityM',
		type: 'opacity',
		description: `Transparent.

Opacity for components that are only temporarily disabled.`,
		value: '0.4',
	},
	{
		name: 'coralOpacityS',
		type: 'opacity',
		description: 'Barely transparent.',
		value: '0.6',
	},
	{
		name: 'coralBreakpointS',
		type: 'breakpoint',
		description: 'Small screen (Portrait)',
		value: '40em',
	},
	{
		name: 'coralBreakpointM',
		type: 'breakpoint',
		description: 'Small screen (Landscape)',
		value: '48em',
	},
	{
		name: 'coralBreakpointL',
		type: 'breakpoint',
		description: 'Wide screen (Portrait)',
		value: '64em',
	},
	{
		name: 'coralBreakpointXl',
		type: 'breakpoint',
		description: 'Wide screen (Landscape)',
		value: '80em',
	},
	{
		name: 'coralBrandingLogo',
		type: 'branding',
		description: 'Brand logo in App heading',
		value:
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ3SURBVHgB7Zu/UxNBFMe/e6ahQ0qxiBpaQWfUTjM0aqMMnWMh1iJEeyHBXiLqjDM6IP+A0Dk2Gkq0EMaxkhmuADsgNmZGgfW9vZz5dUcul938uPGbCbnb+5H95L3bu33vIaBZMpXqxT6GADEIIYcgaFmilzbFq3a1aZtN2/KQIkdHrovn2Rw0S0CDilBJOtskrRKcAgqjPL1zEGJZzM0uQoOaAlRghwQlkUJ4KD/ZYNg/yIiXWRshFQrQMFjN11EvM/iNxTCgDQPK8dQIHbUA82DV2iTXzTTquoEBldUkpslyKbRTFmap1zMim80H2T0QIMHFCWyJAIfQGdqka3M4iMvWBVRwB/iI2mG+3QoEeSRgB8O5qgvpC9gFcK6OhPQEVAPKAb6g8+EcCeqrRZAeA4/leQCPlt0Cx5I4R+8pr001FpT3U2P0sYDuk6TXKD3PLpc3VlhQXXdQ1jOn61eBvj4YkKDXE3V5lanSRQ9xByZd89IFArwGDJyBIZ2ih/6KB5F/gMp6EmmYUk+PA2daAhPlVixZcN8gHMuca1breLkVS4ACV2BKDJc0d/oalVlRARZHzjhMiOFa4ZqVoumcUL+oa8Gb0C2+5m7fagccS0DKSWcByoJ70DW/Y7DkZccledlLGxvAzm5l2y6tv3sPjdrDMZyO0QQ2CV1woyN0K7joD+YqkaB3VdvOjm5AFfyKqTmeltATnFFya9tZHkj471coAL8KlW1fv0G7JANaGkfP1/POJ4OmH/nv93YJWP0MwxLEdpYHmVbHVloniskyYBxRFQWcow1IbBYirv+A3S4GtBFd2ZZKX0VVkgGBdURVAj/ZgmuIpiSFYFYsoowqIFtwzUJMAUbxOsxzStwqRoOjaMUV/uPcByWeIlqSnOfnBQcwRrnwVrqp+eia7WaCFaByU51W5AltoeC/PeExGU5QMLi/H5qUcxdiKC1lKaPEgZrm54cMxzN7v1k9t3NAiuMwHN5g4JME951iNc9eoElJSqfNuCsVwQqKz6SpRU9ugt1w4l5wd+Qf5dW8E5BqRhIZGj3T7mrlwzZbkROKOsTWmSNrrH7iL/UXg3GwKf24eTju+z7elDfUps+cMpEl6BRbUbnhiVLEbesHsL2tA8oVj5x3q8tMvDO84yku1WhvuUijksiSaz6obvaeD8aQUWnh7tGm6rOHPAHVbcPCKHRdj2blFCH4FAYFKSP5AE4sdqbCl5G46mDIQIVAdWMyZHqbkhjD6CR35fEhYClXoKBTEfI8j1Q4+q5mXtwHKxgcq/FySidZyjUprXbZTYJ7WF0mUk9hC2Lj9MQwRkdPhT1HA3ImAvSUFbSEslzNljQz6HQxvx+HXtimwFxp65ByXYkbdMYkSjOSRs+fLwbBGCzXDBhCdiCQilnjQXqzZXvpW+KotbCtYrIc9JJijf+tgONDOqDK9RfJ1nAWmpwCzwAAAABJRU5ErkJggg==")',
	},
	{
		name: 'coralTransitionInstant',
		type: 'transition',
		description: 'Instant transition for hovering effects (opacity, color...)',
		value: '100ms ease-out',
	},
	{
		name: 'coralTransitionFast',
		type: 'transition',
		description: 'Fast transition for "out" effects (closing menu, hide modal...)',
		value: '250ms ease-in-out',
	},
	{
		name: 'coralTransitionNormal',
		type: 'transition',
		description: 'Normal transition for "in" effects (opening menu, show modal...)',
		value: '300ms ease-in-out',
	},
	{
		name: 'coralTransitionSlow',
		type: 'transition',
		description: 'Slow transition for background illustrations with movement.',
		value: '400ms ease-in',
	},
	{
		name: 'coralElevationLayerFlat',
		type: 'elevation',
		description: 'Default content elevation',
		value: '0',
	},
	{
		name: 'coralElevationLayerStandardFront',
		type: 'elevation',
		description: `First elevation layer.

Just above the default content (Drawer, Modal, Fixed layout...)`,
		value: '4',
	},
	{
		name: 'coralElevationLayerInteractiveFront',
		type: 'elevation',
		description: `Second elevation layer.

For elements above any layout (Dropdown, Popover).`,
		value: '8',
	},
	{
		name: 'coralElevationLayerOverlay',
		type: 'elevation',
		description: `Topmost layer.

For items that stand on top of anything (Alert, Confirm, Tooltip, etc.)`,
		value: '16',
	},
	{
		name: 'coralAnimationHeartbeat',
		type: 'animation',
		description: `Heartbeat animation.

Ex: Skeletons

Usage:

animate: tokens.$animation-heartbeat;`,
		value: 'coral-light-keyframes-blink 1.5s cubic-bezier(0.7, 0, 1, 1) infinite',
	},
];

export default dictionary;
