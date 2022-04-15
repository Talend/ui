const tokens = {
	coralColorNeutralText: 'var(--coral-color-neutral-text, hsla(0,0%,100%,1))',
	coralColorNeutralTextInverted: 'var(--coral-color-neutral-text-inverted, hsla(210,7%,79%,1))',
	coralColorNeutralTextWeak: 'var(--coral-color-neutral-text-weak, hsla(206,17%,82%,1))',
	coralColorNeutralTextDisabled: 'var(--coral-color-neutral-text-disabled, hsla(207,11%,64%,1))',
	coralColorNeutralBackground: 'var(--coral-color-neutral-background, hsla(207,18%,24%,1))',
	coralColorNeutralBackgroundDisabled:
		'var(--coral-color-neutral-background-disabled, hsla(210,17%,16%,1))',
	coralColorNeutralBackgroundMedium:
		'var(--coral-color-neutral-background-medium, hsla(208,18%,21%,1))',
	coralColorNeutralBackgroundStrong:
		'var(--coral-color-neutral-background-strong, hsla(208,18%,14%,1))',
	coralColorNeutralBorder: 'var(--coral-color-neutral-border, hsla(206,17%,82%,1))',
	coralColorNeutralBorderWeak: 'var(--coral-color-neutral-border-weak, hsla(207,18%,34%,1))',
	coralColorNeutralBorderWeakHover:
		'var(--coral-color-neutral-border-weak-hover, hsla(207,18%,44%,1))',
	coralColorNeutralBorderDisabled:
		'var(--coral-color-neutral-border-disabled, hsla(208,11%,35%,1))',
	coralColorAccentText: 'var(--coral-color-accent-text, hsla(198,72%,65%,1))',
	coralColorAccentTextHover: 'var(--coral-color-accent-text-hover, hsla(198,72%,55%,1))',
	coralColorAccentTextActive: 'var(--coral-color-accent-text-active, hsla(198,72%,45%,1))',
	coralColorAccentTextWeak: 'var(--coral-color-accent-text-weak, hsla(207,18%,24%,1))',
	coralColorAccentTextWeakHover: 'var(--coral-color-accent-text-weak-hover, hsla(199,71%,15%,1))',
	coralColorAccentTextWeakActive: 'var(--coral-color-accent-text-weak-active, hsla(199,73%,10%,1))',
	coralColorAccentTextStrong: 'var(--coral-color-accent-text-strong, hsla(198,72%,75%,1))',
	coralColorAccentTextStrongHover:
		'var(--coral-color-accent-text-strong-hover, hsla(198,72%,65%,1))',
	coralColorAccentTextStrongActive:
		'var(--coral-color-accent-text-strong-active, hsla(198,72%,55%,1))',
	coralColorAccentBackground: 'var(--coral-color-accent-background, hsla(199,71%,15%,1))',
	coralColorAccentBackgroundHover:
		'var(--coral-color-accent-background-hover, hsla(199,73%,10%,1))',
	coralColorAccentBackgroundActive:
		'var(--coral-color-accent-background-active, hsla(200,69%,5%,1))',
	coralColorAccentBackgroundWeak: 'var(--coral-color-accent-background-weak, hsla(207,18%,24%,1))',
	coralColorAccentBackgroundWeakHover:
		'var(--coral-color-accent-background-weak-hover, hsla(199,71%,15%,1))',
	coralColorAccentBackgroundWeakActive:
		'var(--coral-color-accent-background-weak-active, hsla(199,73%,10%,1))',
	coralColorAccentBackgroundStrong:
		'var(--coral-color-accent-background-strong, hsla(198,72%,75%,1))',
	coralColorAccentBackgroundStrongHover:
		'var(--coral-color-accent-background-strong-hover, hsla(198,72%,65%,1))',
	coralColorAccentBackgroundStrongActive:
		'var(--coral-color-accent-background-strong-active, hsla(198,72%,55%,1))',
	coralColorAccentBorder: 'var(--coral-color-accent-border, hsla(198,72%,75%,1))',
	coralColorAccentBorderHover: 'var(--coral-color-accent-border-hover, hsla(198,72%,65%,1))',
	coralColorAccentBorderActive: 'var(--coral-color-accent-border-active, hsla(199,72%,55%,1))',
	coralColorDangerText: 'var(--coral-color-danger-text, hsla(2,95%,74%,1))',
	coralColorDangerTextHover: 'var(--coral-color-danger-text-hover, hsla(2,95%,69%,1))',
	coralColorDangerTextActive: 'var(--coral-color-danger-text-active, hsla(2,96%,64%,1))',
	coralColorDangerTextWeak: 'var(--coral-color-danger-text-weak, hsla(207,18%,24%,1))',
	coralColorDangerTextWeakHover: 'var(--coral-color-danger-text-weak-hover, hsla(358,96%,18%,1))',
	coralColorDangerTextWeakActive: 'var(--coral-color-danger-text-weak-active, hsla(357,97%,13%,1))',
	coralColorDangerTextStrong: 'var(--coral-color-danger-text-strong, hsla(359,100%,78%,1))',
	coralColorDangerTextStrongHover:
		'var(--coral-color-danger-text-strong-hover, hsla(359,100%,73%,1))',
	coralColorDangerTextStrongActive:
		'var(--coral-color-danger-text-strong-active, hsla(359,100%,68%,1))',
	coralColorDangerBackground: 'var(--coral-color-danger-background, hsla(358,96%,18%,1))',
	coralColorDangerBackgroundHover:
		'var(--coral-color-danger-background-hover, hsla(357,97%,13%,1))',
	coralColorDangerBackgroundActive:
		'var(--coral-color-danger-background-active, hsla(358,95%,8%,1))',
	coralColorDangerBackgroundWeak: 'var(--coral-color-danger-background-weak, hsla(207,18%,24%,1))',
	coralColorDangerBackgroundWeakHover:
		'var(--coral-color-danger-background-weak-hover, hsla(358,96%,18%,1))',
	coralColorDangerBackgroundWeakActive:
		'var(--coral-color-danger-background-weak-active, hsla(357,97%,13%,1))',
	coralColorDangerBackgroundStrong:
		'var(--coral-color-danger-background-strong, hsla(359,100%,78%,1))',
	coralColorDangerBackgroundStrongHover:
		'var(--coral-color-danger-background-strong-hover, hsla(359,100%,73%,1))',
	coralColorDangerBackgroundStrongActive:
		'var(--coral-color-danger-background-strong-active, hsla(359,100%,68%,1))',
	coralColorDangerBorder: 'var(--coral-color-danger-border, hsla(359,100%,78%,1))',
	coralColorDangerBorderHover: 'var(--coral-color-danger-border-hover, hsla(359,100%,73%,1))',
	coralColorDangerBorderActive: 'var(--coral-color-danger-border-active, hsla(359,100%,68%,1))',
	coralColorSuccessText: 'var(--coral-color-success-text, hsla(110,50%,60%,1))',
	coralColorSuccessTextHover: 'var(--coral-color-success-text-hover, hsla(110,45%,50%,1))',
	coralColorSuccessTextActive: 'var(--coral-color-success-text-active, hsla(110,45%,40%,1))',
	coralColorSuccessTextWeak: 'var(--coral-color-success-text-weak, hsla(207,18%,24%,1))',
	coralColorSuccessTextWeakHover: 'var(--coral-color-success-text-weak-hover, hsla(109,50%,20%,1))',
	coralColorSuccessTextWeakActive:
		'var(--coral-color-success-text-weak-active, hsla(109,51%,15%,1))',
	coralColorSuccessTextStrong: 'var(--coral-color-success-text-strong, hsla(110,50%,70%,1))',
	coralColorSuccessTextStrongHover:
		'var(--coral-color-success-text-strong-hover, hsla(110,50%,60%,1))',
	coralColorSuccessTextStrongActive:
		'var(--coral-color-success-text-strong-active, hsla(110,50%,50%,1))',
	coralColorSuccessBackground: 'var(--coral-color-success-background, hsla(109,50%,20%,1))',
	coralColorSuccessBackgroundHover:
		'var(--coral-color-success-background-hover, hsla(109,51%,15%,1))',
	coralColorSuccessBackgroundActive:
		'var(--coral-color-success-background-active, hsla(110,49%,10%,1))',
	coralColorSuccessBackgroundWeak:
		'var(--coral-color-success-background-weak, hsla(207,18%,24%,1))',
	coralColorSuccessBackgroundWeakHover:
		'var(--coral-color-success-background-weak-hover, hsla(109,50%,20%,1))',
	coralColorSuccessBackgroundWeakActive:
		'var(--coral-color-success-background-weak-active, hsla(109,51%,15%,1))',
	coralColorSuccessBackgroundStrong:
		'var(--coral-color-success-background-strong, hsla(110,50%,70%,1))',
	coralColorSuccessBackgroundStrongHover:
		'var(--coral-color-success-background-strong-hover, hsla(110,50%,60%,1))',
	coralColorSuccessBackgroundStrongActive:
		'var(--coral-color-success-background-strong-active, hsla(110,50%,50%,1))',
	coralColorSuccessBorder: 'var(--coral-color-success-border, hsla(110,50%,70%,1))',
	coralColorSuccessBorderHover: 'var(--coral-color-success-border-hover, hsla(110,50%,60%,1))',
	coralColorSuccessBorderActive: 'var(--coral-color-success-border-active, hsla(110,50%,50%,1))',
	coralColorWarningText: 'var(--coral-color-warning-text, hsla(27,97%,57%,1))',
	coralColorWarningTextHover: 'var(--coral-color-warning-text-hover, hsla(27,97%,47%,1))',
	coralColorWarningTextActive: 'var(--coral-color-warning-text-active, hsla(27,97%,37%,1))',
	coralColorWarningTextWeak: 'var(--coral-color-warning-text-weak, hsla(207,18%,24%,1))',
	coralColorWarningTextWeakHover: 'var(--coral-color-warning-text-weak-hover, hsla(22,84%,20%,1))',
	coralColorWarningTextWeakActive:
		'var(--coral-color-warning-text-weak-active, hsla(23,84%,15%,1))',
	coralColorWarningTextStrong: 'var(--coral-color-warning-text-strong, hsla(27,98%,67%,1))',
	coralColorWarningTextStrongHover:
		'var(--coral-color-warning-text-strong-hover, hsla(27,97%,57%,1))',
	coralColorWarningTextStrongActive:
		'var(--coral-color-warning-text-strong-active, hsla(27,98%,47%,1))',
	coralColorWarningBackground: 'var(--coral-color-warning-background, hsla(22,84%,20%,1))',
	coralColorWarningBackgroundHover:
		'var(--coral-color-warning-background-hover, hsla(22,84%,15%,1))',
	coralColorWarningBackgroundActive:
		'var(--coral-color-warning-background-active, hsla(22,84%,10%,1))',
	coralColorWarningBackgroundWeak:
		'var(--coral-color-warning-background-weak, hsla(207,18%,24%,1))',
	coralColorWarningBackgroundWeakHover:
		'var(--coral-color-warning-background-weak-hover, hsla(22,84%,20%,1))',
	coralColorWarningBackgroundWeakActive:
		'var(--coral-color-warning-background-weak-active, hsla(23,84%,15%,1))',
	coralColorWarningBackgroundStrong:
		'var(--coral-color-warning-background-strong, hsla(27,98%,67%,1))',
	coralColorWarningBackgroundStrongHover:
		'var(--coral-color-warning-background-strong-hover, hsla(27,97%,57%,1))',
	coralColorWarningBackgroundStrongActive:
		'var(--coral-color-warning-background-strong-active, hsla(27,98%,47%,1))',
	coralColorWarningBorder: 'var(--coral-color-warning-border, hsla(27,98%,67%,1))',
	coralColorWarningBorderHover: 'var(--coral-color-warning-border-hover, hsla(27,97%,57%,1))',
	coralColorWarningBorderActive: 'var(--coral-color-warning-border-active, hsla(27,98%,47%,1))',
	coralColorAssistiveBackground: 'var(--coral-color-assistive-background, hsla(208,20%,83%,1))',
	coralColorAssistiveText: 'var(--coral-color-assistive-text, hsla(208,18%,14%,1))',
	coralColorAssistiveBorder: 'var(--coral-color-assistive-border, hsla(208,20%,63%,1))',
	coralColorAssistiveBorderFocus: 'var(--coral-color-assistive-border-focus, hsla(256,66%,76%,1))',
	coralColorBrandingBrand: 'var(--coral-color-branding-brand, hsla(359,100%,71%,1))',
	coralColorNeutralBorderHover: 'var(--coral-color-neutral-border-hover, hsla(206,17%,92%,1))',
	coralColorBetaText: 'var(--coral-color-beta-text, hsla(280,44%,72%,1))',
	coralColorBetaTextHover: 'var(--coral-color-beta-text-hover, hsla(280,43%,62%,1))',
	coralColorBetaTextActive: 'var(--coral-color-beta-text-active, hsla(280,44%,52%,1))',
	coralColorBetaIcon: 'var(--coral-color-beta-icon, hsla(280,68%,61%,1))',
	coralColorBetaIconHover: 'var(--coral-color-beta-icon-hover, hsla(280,68%,51%,1))',
	coralColorBetaIconActive: 'var(--coral-color-beta-icon-active, hsla(280,67%,41%,1))',
	coralColorBetaTextWeak: 'var(--coral-color-beta-text-weak, hsla(207,18%,24%,1))',
	coralColorBetaTextWeakHover: 'var(--coral-color-beta-text-weak-hover, hsla(281,65%,24%,1))',
	coralColorBetaTextWeakActive: 'var(--coral-color-beta-text-weak-active, hsla(280,64%,14%,1))',
	coralColorBetaTextStrong: 'var(--coral-color-beta-text-strong, hsla(279,34%,78%,1))',
	coralColorBetaTextStrongHover: 'var(--coral-color-beta-text-strong-hover, hsla(279,34%,68%,1))',
	coralColorBetaTextStrongActive: 'var(--coral-color-beta-text-strong-active, hsla(280,34%,48%,1))',
	coralColorBetaBackground: 'var(--coral-color-beta-background, hsla(281,65%,24%,1))',
	coralColorBetaBackgroundHover: 'var(--coral-color-beta-background-hover, hsla(280,64%,14%,1))',
	coralColorBetaBackgroundActive: 'var(--coral-color-beta-background-active, hsla(277,62%,4%,1))',
	coralColorBetaBackgroundWeak: 'var(--coral-color-beta-background-weak, hsla(207,18%,24%,1))',
	coralColorBetaBackgroundWeakHover:
		'var(--coral-color-beta-background-weak-hover, hsla(281,65%,24%,1))',
	coralColorBetaBackgroundWeakActive:
		'var(--coral-color-beta-background-weak-active, hsla(280,64%,14%,1))',
	coralColorBetaBackgroundStrong: 'var(--coral-color-beta-background-strong, hsla(279,34%,78%,1))',
	coralColorBetaBackgroundStrongHover:
		'var(--coral-color-beta-background-strong-hover, hsla(279,34%,68%,1))',
	coralColorBetaBackgroundStrongActive:
		'var(--coral-color-beta-background-strong-active, hsla(279,34%,48%,1))',
	coralColorBetaBorder: 'var(--coral-color-beta-border, hsla(279,34%,78%,1))',
	coralColorBetaBorderHover: 'var(--coral-color-beta-border-hover, hsla(279,34%,68%,1))',
	coralColorBetaBorderActive: 'var(--coral-color-beta-border-active, hsla(279,34%,48%,1))',
	coralColorAccentIcon: 'var(--coral-color-accent-icon, hsla(198,76%,67%,1))',
	coralColorAccentIconHover: 'var(--coral-color-accent-icon-hover, hsla(198,76%,57%,1))',
	coralColorAccentIconActive: 'var(--coral-color-accent-icon-active, hsla(198,77%,47%,1))',
	coralColorDangerIcon: 'var(--coral-color-danger-icon, hsla(2,96%,67%,1))',
	coralColorDangerIconHover: 'var(--coral-color-danger-icon-hover, hsla(2,96%,57%,1))',
	coralColorDangerIconActive: 'var(--coral-color-danger-icon-active, hsla(2,97%,47%,1))',
	coralColorSuccessIconActive: 'var(--coral-color-success-icon-active, hsla(110,61%,36%,1))',
	coralColorSuccessIconHover: 'var(--coral-color-success-icon-hover, hsla(110,62%,46%,1))',
	coralColorSuccessIcon: 'var(--coral-color-success-icon, hsla(110,61%,56%,1))',
	coralColorWarningIconActive: 'var(--coral-color-warning-icon-active, hsla(27,98%,19%,1))',
	coralColorWarningIconHover: 'var(--coral-color-warning-icon-hover, hsla(27,99%,29%,1))',
	coralColorWarningIcon: 'var(--coral-color-warning-icon, hsla(27,99%,49%,1))',
	coralColorChartsNeutral: 'var(--coral-color-charts-neutral, hsla(0,0%,75%,1))',
	coralColorChartsNeutralWeak: 'var(--coral-color-charts-neutral-weak, hsla(206,10%,48%,1))',
	coralColorChartsNeutralStrong: 'var(--coral-color-charts-neutral-strong, hsla(0,0%,88%,1))',
	coralColorChartsNeutralHover: 'var(--coral-color-charts-neutral-hover, hsla(0,0%,88%,1))',
	coralColorChartsSuccess: 'var(--coral-color-charts-success, hsla(148,87%,40%,1))',
	coralColorChartsSuccessWeak: 'var(--coral-color-charts-success-weak, hsla(130,52%,91%,1))',
	coralColorChartsSuccessStrong: 'var(--coral-color-charts-success-strong, hsla(139,50%,22%,1))',
	coralColorChartsSuccessHover: 'var(--coral-color-charts-success-hover, hsla(139,50%,22%,1))',
	coralColorChartsDanger: 'var(--coral-color-charts-danger, hsla(4,89%,49%,1))',
	coralColorChartsDangerWeak: 'var(--coral-color-charts-danger-weak, hsla(359,69%,73%,1))',
	coralColorChartsDangerStrong: 'var(--coral-color-charts-danger-strong, hsla(359,62%,43%,1))',
	coralColorChartsDangerHover: 'var(--coral-color-charts-danger-hover, hsla(359,62%,43%,1))',
	coralColorChartsWarning: 'var(--coral-color-charts-warning, hsla(32,100%,56%,1))',
	coralColorChartsWarningWeak: 'var(--coral-color-charts-warning-weak, hsla(22,88%,84%,1))',
	coralColorChartsWarningStrong: 'var(--coral-color-charts-warning-strong, hsla(22,75%,42%,1))',
	coralColorChartsWarningHover: 'var(--coral-color-charts-warning-hover, hsla(22,75%,42%,1))',
	coralColorChartsDefault: 'var(--coral-color-charts-default, hsla(216,82%,48%,1))',
	coralColorChartsDefaultWeak: 'var(--coral-color-charts-default-weak, hsla(204,59%,73%,1))',
	coralColorChartsDefaultStrong: 'var(--coral-color-charts-default-strong, hsla(204,92%,29%,1))',
	coralColorChartsDefaultHover: 'var(--coral-color-charts-default-hover, hsla(204,92%,29%,1))',
	coralColorChartsColor00: 'var(--coral-color-charts-color-00, hsla(48,100%,50%,1))',
	coralColorChartsColor00Weak: 'var(--coral-color-charts-color-00-weak, hsla(51,91%,82%,1))',
	coralColorChartsColor00Strong: 'var(--coral-color-charts-color-00-strong, hsla(48,82%,45%,1))',
	coralColorChartsColor00Hover: 'var(--coral-color-charts-color-00-hover, hsla(48,82%,45%,1))',
	coralColorChartsColor01: 'var(--coral-color-charts-color-01, hsla(216,82%,48%,1))',
	coralColorChartsColor01Weak: 'var(--coral-color-charts-color-01-weak, hsla(204,59%,73%,1))',
	coralColorChartsColor01Strong: 'var(--coral-color-charts-color-01-strong, hsla(204,92%,29%,1))',
	coralColorChartsColor01Hover: 'var(--coral-color-charts-color-01-hover, hsla(204,92%,29%,1))',
	coralColorChartsColor02: 'var(--coral-color-charts-color-02, hsla(194,92%,50%,1))',
	coralColorChartsColor02Weak: 'var(--coral-color-charts-color-02-weak, hsla(194,91%,91%,1))',
	coralColorChartsColor02Strong: 'var(--coral-color-charts-color-02-strong, hsla(194,93%,32%,1))',
	coralColorChartsColor02Hover: 'var(--coral-color-charts-color-02-hover, hsla(194,93%,32%,1))',
	coralColorChartsColor03: 'var(--coral-color-charts-color-03, hsla(140,39%,79%,1))',
	coralColorChartsColor03Weak: 'var(--coral-color-charts-color-03-weak, hsla(138,40%,92%,1))',
	coralColorChartsColor03Strong: 'var(--coral-color-charts-color-03-strong, hsla(139,11%,35%,1))',
	coralColorChartsColor03Hover: 'var(--coral-color-charts-color-03-hover, hsla(139,11%,35%,1))',
	coralColorChartsColor04: 'var(--coral-color-charts-color-04, hsla(148,87%,40%,1))',
	coralColorChartsColor04Weak: 'var(--coral-color-charts-color-04-weak, hsla(130,52%,91%,1))',
	coralColorChartsColor04Strong: 'var(--coral-color-charts-color-04-strong, hsla(139,50%,22%,1))',
	coralColorChartsColor04Hover: 'var(--coral-color-charts-color-04-hover, hsla(139,50%,22%,1))',
	coralColorChartsColor05: 'var(--coral-color-charts-color-05, hsla(324,68%,71%,1))',
	coralColorChartsColor05Weak: 'var(--coral-color-charts-color-05-weak, hsla(323,69%,95%,1))',
	coralColorChartsColor05Strong: 'var(--coral-color-charts-color-05-strong, hsla(324,28%,49%,1))',
	coralColorChartsColor05Hover: 'var(--coral-color-charts-color-05-hover, hsla(324,28%,49%,1))',
	coralColorChartsColor06: 'var(--coral-color-charts-color-06, hsla(280,75%,58%,1))',
	coralColorChartsColor06Weak: 'var(--coral-color-charts-color-06-weak, hsla(279,77%,88%,1))',
	coralColorChartsColor06Strong: 'var(--coral-color-charts-color-06-strong, hsla(280,54%,36%,1))',
	coralColorChartsColor06Hover: 'var(--coral-color-charts-color-06-hover, hsla(280,54%,36%,1))',
	coralColorChartsColor07: 'var(--coral-color-charts-color-07, hsla(4,89%,49%,1))',
	coralColorChartsColor07Weak: 'var(--coral-color-charts-color-07-weak, hsla(359,69%,73%,1))',
	coralColorChartsColor07Strong: 'var(--coral-color-charts-color-07-strong, hsla(359,62%,43%,1))',
	coralColorChartsColor07Hover: 'var(--coral-color-charts-color-07-hover, hsla(359,62%,43%,1))',
	coralColorChartsColor08: 'var(--coral-color-charts-color-08, hsla(22,88%,54%,1))',
	coralColorChartsColor08Weak: 'var(--coral-color-charts-color-08-weak, hsla(22,88%,84%,1))',
	coralColorChartsColor08Strong: 'var(--coral-color-charts-color-08-strong, hsla(22,75%,42%,1))',
	coralColorChartsColor08Hover: 'var(--coral-color-charts-color-08-hover, hsla(22,75%,42%,1))',
	coralColorChartsColor09: 'var(--coral-color-charts-color-09, hsla(34,34%,45%,1))',
	coralColorChartsColor09Weak: 'var(--coral-color-charts-color-09-weak, hsla(35,28%,82%,1))',
	coralColorChartsColor09Strong: 'var(--coral-color-charts-color-09-strong, hsla(35,34%,27%,1))',
	coralColorChartsColor09Hover: 'var(--coral-color-charts-color-09-hover, hsla(35,34%,27%,1))',
	coralColorNeutralBorderStrong: 'var(--coral-color-neutral-border-strong, hsla(0,0%,92%,1))',
	coralColorNeutralBorderStrongHover:
		'var(--coral-color-neutral-border-strong-hover, hsla(216,30%,82%,1))',
	coralColorNeutralIcon: 'var(--coral-color-neutral-icon, hsla(210,17%,93%,1))',
	coralColorNeutralIconInverted: 'var(--coral-color-neutral-icon-inverted, hsla(210,7%,79%,1))',
	coralColorNeutralIconWeak: 'var(--coral-color-neutral-icon-weak, hsla(206,24%,83%,1))',
	coralColorChartsDefaultText: 'var(--coral-color-charts-default-text, hsla(205,87%,94%,1))',
	coralColorChartsDefaultTextStrong:
		'var(--coral-color-charts-default-text-strong, hsla(205,93%,22%,1))',
	coralColorChartsDefaultTextWeak:
		'var(--coral-color-charts-default-text-weak, hsla(207,93%,94%,1))',
	coralColorChartsColor09Text: 'var(--coral-color-charts-color-09-text, hsla(36,36%,5%,1))',
	coralColorChartsColor09TextStrong:
		'var(--coral-color-charts-color-09-text-strong, hsla(36,36%,5%,1))',
	coralColorChartsColor09TextWeak:
		'var(--coral-color-charts-color-09-text-weak, hsla(35,28%,82%,1))',
	coralColorNeutralBackgroundHeavy:
		'var(--coral-color-neutral-background-heavy, hsla(204,18%,11%,1))',
	coralColorIllustrationColor01: 'var(--coral-color-illustration-color-01, hsla(358,40%,53%,1))',
	coralColorIllustrationColor02: 'var(--coral-color-illustration-color-02, hsla(355,39%,61%,1))',
	coralColorIllustrationColor03: 'var(--coral-color-illustration-color-03, hsla(349,15%,71%,1))',
	coralColorIllustrationColor04: 'var(--coral-color-illustration-color-04, hsla(211,54%,15%,1))',
	coralColorIllustrationColor05: 'var(--coral-color-illustration-color-05, hsla(212,28%,37%,1))',
	coralColorIllustrationColor06: 'var(--coral-color-illustration-color-06, hsla(212,29%,61%,1))',
	coralColorIllustrationSkintone01:
		'var(--coral-color-illustration-skintone-01, hsla(20,29%,66%,1))',
	coralColorIllustrationSkintone02:
		'var(--coral-color-illustration-skintone-02, hsla(21,23%,49%,1))',
	coralColorIllustrationSkintone03:
		'var(--coral-color-illustration-skintone-03, hsla(17,29%,22%,1))',
	coralColorIllustrationShadow: 'var(--coral-color-illustration-shadow, hsla(0,0%,0%,0.1))',
	coralColorIllustrationColor07: 'var(--coral-color-illustration-color-07, hsla(213,13%,35%,1))',
	coralColorIllustrationColor08: 'var(--coral-color-illustration-color-08, hsla(212,13%,19%,1))',
	coralColorIllustrationColor09: 'var(--coral-color-illustration-color-09, hsla(240,3%,12%,1))',
	coralColorBrandingBackground:
		'var(--coral-color-branding-background, linear-gradient(133deg,hsla(226,49%,14%,1) 0%, hsla(253,46%,8%,1) 100%))',
	coralColorBrandingNavigation:
		'var(--coral-color-branding-navigation, linear-gradient(133deg,hsla(222,49%,14%,1) 0%, hsla(253,46%,8%,1) 100%))',
	coralSpacingXxs: 'var(--coral-spacing-xxs, 0.4rem)',
	coralSpacingXs: 'var(--coral-spacing-xs, 0.8rem)',
	coralSpacingS: 'var(--coral-spacing-s, 1.2rem)',
	coralSpacingM: 'var(--coral-spacing-m, 1.6rem)',
	coralSpacingL: 'var(--coral-spacing-l, 2.8rem)',
	coralSpacingXl: 'var(--coral-spacing-xl, 3.6rem)',
	coralSizingMinimal: 'var(--coral-sizing-minimal, 1.2rem)',
	coralSizingXxxs: 'var(--coral-sizing-xxxs, 1.6rem)',
	coralSizingXxs: 'var(--coral-sizing-xxs, 2rem)',
	coralSizingXs: 'var(--coral-sizing-xs, 2.4rem)',
	coralSizingS: 'var(--coral-sizing-s, 2.8rem)',
	coralSizingM: 'var(--coral-sizing-m, 3.6rem)',
	coralSizingL: 'var(--coral-sizing-l, 4rem)',
	coralSizingXxxl: 'var(--coral-sizing-xxxl, 22rem)',
	coralSizingMaximal: 'var(--coral-sizing-maximal, 32rem)',
	coralElevationShadowNeutralM:
		'var(--coral-elevation-shadow-neutral-m, 0rem 0.2rem 0.6rem 0rem hsla(0,0%,0%,0.5))',
	coralElevationShadowNeutralL:
		'var(--coral-elevation-shadow-neutral-l, 0rem 0.4rem 0.8rem 0rem hsla(0,0%,0%,0.5))',
	coralElevationShadowAccent:
		'var(--coral-elevation-shadow-accent, 0rem 0.1rem 0.1rem 0rem hsla(198,72%,75%,0.3))',
	coralElevationShadowSuccess:
		'var(--coral-elevation-shadow-success, 0rem 0.1rem 0.1rem 0rem hsla(110,50%,70%,0.3))',
	coralElevationShadowDanger:
		'var(--coral-elevation-shadow-danger, 0rem 0.1rem 0.1rem 0rem hsla(359,100%,78%,0.3))',
	coralElevationShadowWarning:
		'var(--coral-elevation-shadow-warning, 0rem 0.1rem 0.1rem 0rem hsla(27,98%,67%,0.3))',
	coralElevationShadowBeta:
		'var(--coral-elevation-shadow-beta, 0rem 0.1rem 0.1rem 0rem hsla(279,34%,78%,0.3))',
	coralElevationShadowNeutralInvertedM:
		'var(--coral-elevation-shadow-neutral-inverted-m, 0rem -0.2rem 0.6rem 0rem hsla(0,0%,2%,0.5))',
	coralElevationShadowNeutralInvertedL:
		'var(--coral-elevation-shadow-neutral-inverted-l, 0rem -0.4rem 0.8rem 0rem hsla(0,0%,5%,0.5))',
	coralHeadingL: "var(--coral-heading-l, 600 1.8rem/140% 'Source Sans Pro')",
	coralHeadingM: "var(--coral-heading-m, 600 1.6rem/140% 'Source Sans Pro')",
	coralHeadingS: "var(--coral-heading-s, 600 1.4rem/140% 'Source Sans Pro')",
	coralParagraphM: "var(--coral-paragraph-m, 400 1.4rem/140% 'Source Sans Pro')",
	coralParagraphMBold: "var(--coral-paragraph-m-bold, 600 1.4rem/140% 'Source Sans Pro')",
	coralParagraphS: "var(--coral-paragraph-s, 400 1.2rem/140% 'Source Sans Pro')",
	coralParagraphSBold: "var(--coral-paragraph-s-bold, 600 1.2rem/140% 'Source Sans Pro')",
	coralRadiusM: 'var(--coral-radius-m, 0.8rem)',
	coralRadiusL: 'var(--coral-radius-l, 1.6rem)',
	coralRadiusRound: 'var(--coral-radius-round, 9999.9rem)',
	coralRadiusS: 'var(--coral-radius-s, 0.4rem)',
	coralBorderSSolid: 'var(--coral-border-s-solid, 1px solid)',
	coralBorderMSolid: 'var(--coral-border-m-solid, 2px solid)',
	coralBorderSDashed: 'var(--coral-border-s-dashed, 1px dashed)',
	coralBorderMDashed: 'var(--coral-border-m-dashed, 2px dashed)',
	coralOpacityL: 'var(--coral-opacity-l, 0.2)',
	coralOpacityM: 'var(--coral-opacity-m, 0.4)',
	coralOpacityS: 'var(--coral-opacity-s, 0.6)',
	coralBreakpointS: 'var(--coral-breakpoint-s, 40em)',
	coralBreakpointM: 'var(--coral-breakpoint-m, 48em)',
	coralBreakpointL: 'var(--coral-breakpoint-l, 64em)',
	coralBreakpointXl: 'var(--coral-breakpoint-xl, 80em)',
	coralBrandingLogo:
		'var(--coral-branding-logo, url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ3SURBVHgB7Zu/UxNBFMe/e6ahQ0qxiBpaQWfUTjM0aqMMnWMh1iJEeyHBXiLqjDM6IP+A0Dk2Gkq0EMaxkhmuADsgNmZGgfW9vZz5dUcul938uPGbCbnb+5H95L3bu33vIaBZMpXqxT6GADEIIYcgaFmilzbFq3a1aZtN2/KQIkdHrovn2Rw0S0CDilBJOtskrRKcAgqjPL1zEGJZzM0uQoOaAlRghwQlkUJ4KD/ZYNg/yIiXWRshFQrQMFjN11EvM/iNxTCgDQPK8dQIHbUA82DV2iTXzTTquoEBldUkpslyKbRTFmap1zMim80H2T0QIMHFCWyJAIfQGdqka3M4iMvWBVRwB/iI2mG+3QoEeSRgB8O5qgvpC9gFcK6OhPQEVAPKAb6g8+EcCeqrRZAeA4/leQCPlt0Cx5I4R+8pr001FpT3U2P0sYDuk6TXKD3PLpc3VlhQXXdQ1jOn61eBvj4YkKDXE3V5lanSRQ9xByZd89IFArwGDJyBIZ2ih/6KB5F/gMp6EmmYUk+PA2daAhPlVixZcN8gHMuca1breLkVS4ACV2BKDJc0d/oalVlRARZHzjhMiOFa4ZqVoumcUL+oa8Gb0C2+5m7fagccS0DKSWcByoJ70DW/Y7DkZccledlLGxvAzm5l2y6tv3sPjdrDMZyO0QQ2CV1woyN0K7joD+YqkaB3VdvOjm5AFfyKqTmeltATnFFya9tZHkj471coAL8KlW1fv0G7JANaGkfP1/POJ4OmH/nv93YJWP0MwxLEdpYHmVbHVloniskyYBxRFQWcow1IbBYirv+A3S4GtBFd2ZZKX0VVkgGBdURVAj/ZgmuIpiSFYFYsoowqIFtwzUJMAUbxOsxzStwqRoOjaMUV/uPcByWeIlqSnOfnBQcwRrnwVrqp+eia7WaCFaByU51W5AltoeC/PeExGU5QMLi/H5qUcxdiKC1lKaPEgZrm54cMxzN7v1k9t3NAiuMwHN5g4JME951iNc9eoElJSqfNuCsVwQqKz6SpRU9ugt1w4l5wd+Qf5dW8E5BqRhIZGj3T7mrlwzZbkROKOsTWmSNrrH7iL/UXg3GwKf24eTju+z7elDfUps+cMpEl6BRbUbnhiVLEbesHsL2tA8oVj5x3q8tMvDO84yku1WhvuUijksiSaz6obvaeD8aQUWnh7tGm6rOHPAHVbcPCKHRdj2blFCH4FAYFKSP5AE4sdqbCl5G46mDIQIVAdWMyZHqbkhjD6CR35fEhYClXoKBTEfI8j1Q4+q5mXtwHKxgcq/FySidZyjUprXbZTYJ7WF0mUk9hC2Lj9MQwRkdPhT1HA3ImAvSUFbSEslzNljQz6HQxvx+HXtimwFxp65ByXYkbdMYkSjOSRs+fLwbBGCzXDBhCdiCQilnjQXqzZXvpW+KotbCtYrIc9JJijf+tgONDOqDK9RfJ1nAWmpwCzwAAAABJRU5ErkJggg=="))',
	coralTransitionInstant: 'var(--coral-transition-instant, 100ms ease-out)',
	coralTransitionFast: 'var(--coral-transition-fast, 250ms ease-in-out)',
	coralTransitionNormal: 'var(--coral-transition-normal, 300ms ease-in-out)',
	coralTransitionSlow: 'var(--coral-transition-slow, 400ms ease-in)',
	coralElevationLayerFlat: 'var(--coral-elevation-layer-flat, 0)',
	coralElevationLayerStandardFront: 'var(--coral-elevation-layer-standard-front, 4)',
	coralElevationLayerInteractiveFront: 'var(--coral-elevation-layer-interactive-front, 8)',
	coralElevationLayerOverlay: 'var(--coral-elevation-layer-overlay, 16)',
	coralAnimationHeartbeat:
		'var(--coral-animation-heartbeat, coral-dark-keyframes-blink 1.5s cubic-bezier(0.7, 0, 1, 1) infinite)',
};

export default tokens;
