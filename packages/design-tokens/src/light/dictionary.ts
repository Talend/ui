const dictionary = [
    {
        name: 'coralColorNeutralText',
        type: 'color',
        description: `Default text color. if you don't know which color to pick for text, then this is the safest bet.`,
        hsla: 'hsla(0, 0%, 13%, 1)',
        hex: '#202020',
        value: 'hsla(0, 0%, 13%, 1)',
        id: 'S:10c999cb93ee06de292f4d9709f22283fe62af43,'
    },
    {
        name: 'coralColorNeutralTextWeak',
        type: 'color',
        description: `Weak text color. 
Best used when there is regular neutral-text next to it.`,
        hsla: 'hsla(0, 0%, 38%, 1)',
        hex: '#616161',
        value: 'hsla(0, 0%, 38%, 1)',
        id: 'S:d0d891a26f776586e59edbc79fc8b5044c4c1d67,'
    },
    {
        name: 'coralColorNeutralTextDisabled',
        type: 'color',
        description: `Disabled text color. 
Only use for interactive elements in their disabled state.
`,
        hsla: 'hsla(0, 0%, 44%, 1)',
        hex: '#707070',
        value: 'hsla(0, 0%, 44%, 1)',
        id: 'S:ea3a5293bbd8868883f2210e9463b273d587ddd6,'
    },
    {
        name: 'coralColorNeutralTextInverted',
        type: 'color',
        description: `Inverted text color. 
Only use on dark backgrounds.
`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:94a7c158b80c973456d5cc992e5ddce6d240a006,'
    },
    {
        name: 'coralColorNeutralBackground',
        type: 'color',
        description: `Default background color. If there's no reason for a semantic background, then that is the one to use.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:c1a0034c50a38e51ca164bfd5e3d6b880bed6da7,'
    },
    {
        name: 'coralColorNeutralBackgroundMedium',
        type: 'color',
        description: `Medium contrasting background color. 

Ex: SubHeader`,
        hsla: 'hsla(0, 0%, 97%, 1)',
        hex: '#f7f7f7',
        value: 'hsla(0, 0%, 97%, 1)',
        id: 'S:67c8eb054cae339d5e6968f69f30900b6e096e5d,'
    },
    {
        name: 'coralColorNeutralBackgroundStrong',
        type: 'color',
        description: `Strongly contrasting background color. 
Use sparingly.

Ex: SubHeader back button.`,
        hsla: 'hsla(0, 0%, 88%, 1)',
        hex: '#e0e0e0',
        value: 'hsla(0, 0%, 88%, 1)',
        id: 'S:e860bbcf429d1a19f1528c7bddf304ec2a9b3b9a,'
    },
    {
        name: 'coralColorNeutralBackgroundDisabled',
        type: 'color',
        description: `Background color for disabled interactive elements only. 

Ex: Buttons`,
        hsla: 'hsla(0, 0%, 88%, 1)',
        hex: '#e0e0e0',
        value: 'hsla(0, 0%, 88%, 1)',
        id: 'S:200fc7c7a285466db40c8c5b5c308f9a0c22150e,'
    },
    {
        name: 'coralColorNeutralBorder',
        type: 'color',
        description: `Default border color. 

Ex: Inputs`,
        hsla: 'hsla(0, 0%, 55%, 1)',
        hex: '#8c8c8c',
        value: 'hsla(0, 0%, 55%, 1)',
        id: 'S:4f74b76b2783c3621c34c2c99bc6a59ba7420755,'
    },
    {
        name: 'coralColorNeutralBorderWeak',
        type: 'color',
        description: `Weaker border color, for discreet separators

Ex: Dividers`,
        hsla: 'hsla(0, 0%, 82%, 1)',
        hex: '#d2d2d2',
        value: 'hsla(0, 0%, 82%, 1)',
        id: 'S:8e2cbe7a09479ac7528c901ca941659681239da3,'
    },
    {
        name: 'coralColorNeutralBorderHover',
        type: 'color',
        description: `Default border color, on mouseover. 

Ex: Inputs`,
        hsla: 'hsla(0, 0%, 40%, 1)',
        hex: '#666666',
        value: 'hsla(0, 0%, 40%, 1)',
        id: 'S:3aba03f6504578f37ae1623a909f59cba423d6f6,'
    },
    {
        name: 'coralColorAccentTextWeak',
        type: 'color',
        description: `Accent text color on accent-background-strong. 

Ex: ButtonPrimary`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:b161248608415cdb43f2b1effbf88c1c54e16247,'
    },
    {
        name: 'coralColorAccentTextWeakHover',
        type: 'color',
        description: `Accent text color on accent-background-strong, on mouseover. 

Ex: ButtonPrimary
`,
        hsla: 'hsla(204, 59%, 88%, 1)',
        hex: '#cde3f2',
        value: 'hsla(204, 59%, 88%, 1)',
        id: 'S:3b1aeb6600fd22b67debbf33ae3192c684ef564f,'
    },
    {
        name: 'coralColorAccentTextWeakActive',
        type: 'color',
        description: `Accent text color on accent-background-strong, while pressing. 

Ex: ButtonPrimary`,
        hsla: 'hsla(205, 60%, 75%, 1)',
        hex: '#9bc7e6',
        value: 'hsla(205, 60%, 75%, 1)',
        id: 'S:74ac7e3ea8a4211e464a52cc801c95aa98b88538,'
    },
    {
        name: 'coralColorAccentText',
        type: 'color',
        description: `Accent text color. 
Use for interactive text content without background. 

Ex: Links`,
        hsla: 'hsla(204, 95%, 31%, 1)',
        hex: '#045d9a',
        value: 'hsla(204, 95%, 31%, 1)',
        id: 'S:4718b804e881a63c4d941b7c3e8a596f90e42364,'
    },
    {
        name: 'coralColorAccentTextHover',
        type: 'color',
        description: `Accent text color on mouseover. 

Ex: Links`,
        hsla: 'hsla(204, 96%, 18%, 1)',
        hex: '#023659',
        value: 'hsla(204, 96%, 18%, 1)',
        id: 'S:a6c8553b1ca97e0d2434639f226b3a3d6fa578bd,'
    },
    {
        name: 'coralColorAccentTextActive',
        type: 'color',
        description: `Accent text color while pressed. 

Ex: Links`,
        hsla: 'hsla(205, 94%, 13%, 1)',
        hex: '#022741',
        value: 'hsla(205, 94%, 13%, 1)',
        id: 'S:fc5e1ef075ba0395d985f5872660aee140c9db57,'
    },
    {
        name: 'coralColorAccentBackground',
        type: 'color',
        description: `Accent background color by default. Use with text-strong.

Ex: InlineMessage`,
        hsla: 'hsla(204, 59%, 88%, 1)',
        hex: '#cde3f2',
        value: 'hsla(204, 59%, 88%, 1)',
        id: 'S:5a77c353aa9249ef687e53f4e30bba7a1b5bcf30,'
    },
    {
        name: 'coralColorAccentBackgroundHover',
        type: 'color',
        description: `Accent background color by default, on mouseover. `,
        hsla: 'hsla(205, 60%, 75%, 1)',
        hex: '#9bc7e6',
        value: 'hsla(205, 60%, 75%, 1)',
        id: 'S:f4591b46991fec51fa06fe0cdd8a283ced81f2e5,'
    },
    {
        name: 'coralColorAccentBackgroundActive',
        type: 'color',
        description: `Accent background color by default, while pressing. `,
        hsla: 'hsla(204, 60%, 63%, 1)',
        hex: '#69acd9',
        value: 'hsla(204, 60%, 63%, 1)',
        id: 'S:5b24749cb2dfdc31bedb6b0863660dfbeb30957b,'
    },
    {
        name: 'coralColorAccentBackgroundWeak',
        type: 'color',
        description: `Weakest accent background color. Same color as neutral-background but with accent-tinted hover and active.

Use as placeholder to indicate that you want accent-tinted interactive states.

Ex: ButtonTertiary`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:4ab71633a34bb81f90ab2a240d920a3a596d7aa1,'
    },
    {
        name: 'coralColorAccentBackgroundWeakHover',
        type: 'color',
        description: `Weakest accent background color on mouseover.

Ex: ButtonTertiary`,
        hsla: 'hsla(204, 59%, 88%, 1)',
        hex: '#cde3f2',
        value: 'hsla(204, 59%, 88%, 1)',
        id: 'S:da9c12d0c5f2671f98fa54cff3e5526386839759,'
    },
    {
        name: 'coralColorAccentBackgroundWeakActive',
        type: 'color',
        description: `Weakest accent background color on press.

Ex: ButtonTertiary`,
        hsla: 'hsla(205, 60%, 75%, 1)',
        hex: '#9bc7e6',
        value: 'hsla(205, 60%, 75%, 1)',
        id: 'S:e5ee6ad30225946448c18cd3d1b1674c0ded4b3c,'
    },
    {
        name: 'coralColorAccentBackgroundStrong',
        type: 'color',
        description: `Strongest accent background color.
Use for primary interactive items. Use with text-weak.

Ex: ButtonPrimary`,
        hsla: 'hsla(204, 95%, 31%, 1)',
        hex: '#045d9a',
        value: 'hsla(204, 95%, 31%, 1)',
        id: 'S:61f362d892cc32bebc531aee4ef65aa01fa92844,'
    },
    {
        name: 'coralColorAccentBackgroundStrongHover',
        type: 'color',
        description: `Strongest accent background color on mouseover

Ex: ButtonPrimary`,
        hsla: 'hsla(204, 95%, 23%, 1)',
        hex: '#034673',
        value: 'hsla(204, 95%, 23%, 1)',
        id: 'S:4c25100f44e0ed2470e2b94876cd890269b6438f,'
    },
    {
        name: 'coralColorAccentBackgroundStrongActive',
        type: 'color',
        description: `Strongest accent background color on press.

Ex: ButtonPrimary`,
        hsla: 'hsla(205, 95%, 15%, 1)',
        hex: '#022e4d',
        value: 'hsla(205, 95%, 15%, 1)',
        id: 'S:6d0c3f163cac914d4e6d4b106f6ea9c8105a4c3f,'
    },
    {
        name: 'coralColorAccentBorderHover',
        type: 'color',
        description: `Border with accent color on mouseover.

Ex: ButtonSecondary`,
        hsla: 'hsla(204, 95%, 23%, 1)',
        hex: '#034673',
        value: 'hsla(204, 95%, 23%, 1)',
        id: 'S:f1a7e54acba6696923d222eb71f2558121e59af4,'
    },
    {
        name: 'coralColorAccentBorderActive',
        type: 'color',
        description: `Border with accent color while pressing.

Ex: ButtonSecondary`,
        hsla: 'hsla(205, 95%, 15%, 1)',
        hex: '#022e4d',
        value: 'hsla(205, 95%, 15%, 1)',
        id: 'S:bf65f82ea1ee9f963e885936067a5ad8ee5cb512,'
    },
    {
        name: 'coralColorDangerTextWeak',
        type: 'color',
        description: `Danger text color on danger-background-strong. 

Ex: ButtonDestructive`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:699bc0d4356f52927fc72f3ba9df43c2a9354d0b,'
    },
    {
        name: 'coralColorDangerTextWeakHover',
        type: 'color',
        description: `Danger text color on mouseover. 

Ex: ButtonDestructive`,
        hsla: 'hsla(358, 100%, 94%, 1)',
        hex: '#ffe1e2',
        value: 'hsla(358, 100%, 94%, 1)',
        id: 'S:fb762bea2ac42ac749119d549e114110e583f251,'
    },
    {
        name: 'coralColorDangerTextWeakActive',
        type: 'color',
        description: `Danger text color while pressing. 

Ex: ButtonDestructive`,
        hsla: 'hsla(359, 100%, 88%, 1)',
        hex: '#ffc4c5',
        value: 'hsla(359, 100%, 88%, 1)',
        id: 'S:67f0688f82f99baff4f7421e390a717e97f0afdf,'
    },
    {
        name: 'coralColorDangerText',
        type: 'color',
        description: `Danger text color. 
Use for text content without background that must carry a negative semantic value on its own. `,
        hsla: 'hsla(359, 51%, 53%, 1)',
        hex: '#c4484a',
        value: 'hsla(359, 51%, 53%, 1)',
        id: 'S:c820445413c284b94cd3dca8c2978a97b8ebff2c,'
    },
    {
        name: 'coralColorDangerTextHover',
        type: 'color',
        description: `Danger text color on mouseover, if interactive. `,
        hsla: 'hsla(359, 52%, 43%, 1)',
        hex: '#a63537',
        value: 'hsla(359, 52%, 43%, 1)',
        id: 'S:cd4d1dcbba3ab13b836fb099611ff04fe0f63273,'
    },
    {
        name: 'coralColorDangerTextActive',
        type: 'color',
        description: `Danger text color while pressing, if interactive. `,
        hsla: 'hsla(359, 51%, 33%, 1)',
        hex: '#7f292a',
        value: 'hsla(359, 51%, 33%, 1)',
        id: 'S:32990ab88145c7d9e59b3f7adf70301c13015d39,'
    },
    {
        name: 'coralColorDangerBackground',
        type: 'color',
        description: `Danger background color by default. Use with text-strong.

Ex: InlineMessage`,
        hsla: 'hsla(0, 100%, 96%, 1)',
        hex: '#ffebeb',
        value: 'hsla(0, 100%, 96%, 1)',
        id: 'S:dff3ff5e6251f3c293f017442816109091f44798,'
    },
    {
        name: 'coralColorDangerBackgroundHover',
        type: 'color',
        description: `Danger background on mouseover. `,
        hsla: 'hsla(359, 100%, 88%, 1)',
        hex: '#ffc4c5',
        value: 'hsla(359, 100%, 88%, 1)',
        id: 'S:88db13990c405e9d3f53532c6faf0f06c43f27ae,'
    },
    {
        name: 'coralColorDangerBackgroundActive',
        type: 'color',
        description: `Danger background while pressing.`,
        hsla: 'hsla(359, 100%, 83%, 1)',
        hex: '#ffa7a9',
        value: 'hsla(359, 100%, 83%, 1)',
        id: 'S:e6fa6b9051912500cd95000470dfd6b149823e0e,'
    },
    {
        name: 'coralColorDangerBackgroundWeak',
        type: 'color',
        description: `Weakest danger background color. Same color as neutral-background but with danger-tinted hover and active.

Use as placeholder to indicate that you want danger-tinted interactive states.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:3ddd20e98abac1a33a90eb12b9ff53edf0be431f,'
    },
    {
        name: 'coralColorDangerBackgroundWeakHover',
        type: 'color',
        description: `Weakest danger background color on mouseover. `,
        hsla: 'hsla(358, 100%, 94%, 1)',
        hex: '#ffe1e2',
        value: 'hsla(358, 100%, 94%, 1)',
        id: 'S:982e6680ebf84ece47e2221f5ef20d5e01284e9b,'
    },
    {
        name: 'coralColorDangerBackgroundWeakActive',
        type: 'color',
        description: `Weakest danger background color while pressed.`,
        hsla: 'hsla(359, 100%, 88%, 1)',
        hex: '#ffc4c5',
        value: 'hsla(359, 100%, 88%, 1)',
        id: 'S:5627ea1b6c645efc5068f2c3fc978b10791afd89,'
    },
    {
        name: 'coralColorSuccessTextWeak',
        type: 'color',
        description: `Success text color on success-background-strong. `,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:b418e852c5d1b8a6fe42acbed221985cb3f127f2,'
    },
    {
        name: 'coralColorSuccessTextWeakHover',
        type: 'color',
        description: `Success text color on mouseover. `,
        hsla: 'hsla(110, 49%, 90%, 1)',
        hex: '#ddf2d9',
        value: 'hsla(110, 49%, 90%, 1)',
        id: 'S:96b23b9fb65d55713eb4e3ceae9a927546b0e690,'
    },
    {
        name: 'coralColorSuccessTextWeakActive',
        type: 'color',
        description: `Success text color while pressed. `,
        hsla: 'hsla(110, 48%, 85%, 1)',
        hex: '#ccebc6',
        value: 'hsla(110, 48%, 85%, 1)',
        id: 'S:e94294b66324c3f46fe667d78ff4c3f8fa96c99a,'
    },
    {
        name: 'coralColorSuccessText',
        type: 'color',
        description: `Success text color. 
Use for text content without background that must carry a positive semantic value on its own. 

Ex: StatusSuccessful`,
        hsla: 'hsla(111, 49%, 34%, 1)',
        hex: '#39812c',
        value: 'hsla(111, 49%, 34%, 1)',
        id: 'S:ffbfadc3dddedcc0961f945fcaa519892b76fe76,'
    },
    {
        name: 'coralColorSuccessTextHover',
        type: 'color',
        description: `Success text color on mouseover.`,
        hsla: 'hsla(111, 49%, 29%, 1)',
        hex: '#316e26',
        value: 'hsla(111, 49%, 29%, 1)',
        id: 'S:9ca8fcfbd8bbabe88daa5ad242511536f1a01aa1,'
    },
    {
        name: 'coralColorSuccessTextActive',
        type: 'color',
        description: `Success text color while pressed.`,
        hsla: 'hsla(111, 49%, 24%, 1)',
        hex: '#285b1f',
        value: 'hsla(111, 49%, 24%, 1)',
        id: 'S:c9960ec8e0fbb72b3176fe3dac962ef632cd97f1,'
    },
    {
        name: 'coralColorSuccessBackground',
        type: 'color',
        description: `Success background color by default. Use with text-strong. 

Ex: InlineMessage `,
        hsla: 'hsla(110, 49%, 90%, 1)',
        hex: '#ddf2d9',
        value: 'hsla(110, 49%, 90%, 1)',
        id: 'S:95830782a3ee2a02fb9be61ad9eca89b03d5f2e1,'
    },
    {
        name: 'coralColorDangerBackgroundStrong',
        type: 'color',
        description: `Strongest danger background color. Use on strong interactive elements with a negative semantic attached. Use with text-weak.

Ex: ButtonDestructive `,
        hsla: 'hsla(359, 51%, 53%, 1)',
        hex: '#c4484a',
        value: 'hsla(359, 51%, 53%, 1)',
        id: 'S:b67b75c7937d3e89670b0b2e706cbe597a294709,'
    },
    {
        name: 'coralColorDangerBackgroundStrongHover',
        type: 'color',
        description: `Strongest danger background color on mouseover.

Ex: ButtonDestructive`,
        hsla: 'hsla(359, 54%, 38%, 1)',
        hex: '#952d2f',
        value: 'hsla(359, 54%, 38%, 1)',
        id: 'S:cf0d1e51df9ed2ac0a3b80db051c2d9e1562ead0,'
    },
    {
        name: 'coralColorDangerBackgroundStrongActive',
        type: 'color',
        description: `Strongest danger background color while pressed.

Ex: ButtonDestructive`,
        hsla: 'hsla(359, 54%, 33%, 1)',
        hex: '#812729',
        value: 'hsla(359, 54%, 33%, 1)',
        id: 'S:8dee3c9010fcd0e28be2b28cd915bd29fa2e2514,'
    },
    {
        name: 'coralColorDangerBorder',
        type: 'color',
        description: `Border color with danger semantic.

Ex: Input in error state`,
        hsla: 'hsla(359, 51%, 53%, 1)',
        hex: '#c4484a',
        value: 'hsla(359, 51%, 53%, 1)',
        id: 'S:c87e7f1d145d085db0a232155acde5157e3fb3be,'
    },
    {
        name: 'coralColorSuccessBackgroundHover',
        type: 'color',
        description: `Success background color on mouseover. `,
        hsla: 'hsla(110, 48%, 85%, 1)',
        hex: '#ccebc6',
        value: 'hsla(110, 48%, 85%, 1)',
        id: 'S:a5648f39d5fd8c269fe9719eb0492879d051d3f4,'
    },
    {
        name: 'coralColorDangerBorderHover',
        type: 'color',
        description: `Border color with danger semantic on mouseover.

Ex: Input in error state`,
        hsla: 'hsla(359, 54%, 38%, 1)',
        hex: '#952d2f',
        value: 'hsla(359, 54%, 38%, 1)',
        id: 'S:bb30957d53cb31c1c8141f1d572b99c3673db665,'
    },
    {
        name: 'coralColorSuccessBackgroundActive',
        type: 'color',
        description: `Success background color while pressed. `,
        hsla: 'hsla(110, 49%, 80%, 1)',
        hex: '#bbe5b3',
        value: 'hsla(110, 49%, 80%, 1)',
        id: 'S:33f82dbd9c654c29d0338f4de5007e483d475869,'
    },
    {
        name: 'coralColorDangerBorderActive',
        type: 'color',
        description: `Border color with danger semantic while pressing.

Ex: Input in error state`,
        hsla: 'hsla(359, 54%, 33%, 1)',
        hex: '#812729',
        value: 'hsla(359, 54%, 33%, 1)',
        id: 'S:28931ad27aebb4371a9503277f095449aecb9bcb,'
    },
    {
        name: 'coralColorSuccessBackgroundWeak',
        type: 'color',
        description: `Weakest success background color. Same color as neutral-background but with success-tinted hover and active.

Use as placeholder to indicate that you want success-tinted interactive states.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:1d01add3e1aeec82426acb8d5b1246bdc29374d9,'
    },
    {
        name: 'coralColorSuccessBackgroundWeakHover',
        type: 'color',
        description: `Weakest success background color on mouseover.`,
        hsla: 'hsla(110, 49%, 90%, 1)',
        hex: '#ddf2d9',
        value: 'hsla(110, 49%, 90%, 1)',
        id: 'S:0b3d3ce6caa17154f21666351cd3c513ce65227b,'
    },
    {
        name: 'coralColorSuccessBackgroundWeakActive',
        type: 'color',
        description: `Weakest success background color while pressed.`,
        hsla: 'hsla(110, 48%, 85%, 1)',
        hex: '#ccebc6',
        value: 'hsla(110, 48%, 85%, 1)',
        id: 'S:0bede902379e0c55643d9f69a3c65a474d3ced38,'
    },
    {
        name: 'coralColorSuccessBackgroundStrong',
        type: 'color',
        description: `Strongest success background color. Use on strong interactive elements with a positive semantic attached. Use with text-weak.`,
        hsla: 'hsla(111, 49%, 34%, 1)',
        hex: '#39812c',
        value: 'hsla(111, 49%, 34%, 1)',
        id: 'S:b9943215670849a4f73933c228f323731d8ee407,'
    },
    {
        name: 'coralColorSuccessBackgroundStrongHover',
        type: 'color',
        description: `Strongest success background color on mouseover.`,
        hsla: 'hsla(111, 49%, 29%, 1)',
        hex: '#316e26',
        value: 'hsla(111, 49%, 29%, 1)',
        id: 'S:21c0dc76d97d31b7c5b98e3b19dcaf53ea1c818b,'
    },
    {
        name: 'coralColorSuccessBackgroundStrongActive',
        type: 'color',
        description: `Strongest success background color while pressed.`,
        hsla: 'hsla(111, 49%, 24%, 1)',
        hex: '#285b1f',
        value: 'hsla(111, 49%, 24%, 1)',
        id: 'S:e8adfa814ca367a2f65295d34477c37c10f818bb,'
    },
    {
        name: 'coralColorWarningTextWeak',
        type: 'color',
        description: `Warning text color on warning-background-strong. `,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:6dce8ae9ef0c12b7c6bca860dddca142d7f2c7c5,'
    },
    {
        name: 'coralColorWarningTextWeakHover',
        type: 'color',
        description: `Warning weak text color, on mouseover. `,
        hsla: 'hsla(22, 85%, 92%, 1)',
        hex: '#fce6d9',
        value: 'hsla(22, 85%, 92%, 1)',
        id: 'S:52d6dba6cfb3636d31269644277ca9b5a31963b4,'
    },
    {
        name: 'coralColorWarningTextWeakActive',
        type: 'color',
        description: `Warning weak text color, while pressed. `,
        hsla: 'hsla(22, 85%, 82%, 1)',
        hex: '#f8c7aa',
        value: 'hsla(22, 85%, 82%, 1)',
        id: 'S:ab9ff7e264b328e73d5b4c8e4ae4788d51c8a584,'
    },
    {
        name: 'coralColorSuccessBorder',
        type: 'color',
        description: `Border color with success semantic.`,
        hsla: 'hsla(111, 49%, 34%, 1)',
        hex: '#39812c',
        value: 'hsla(111, 49%, 34%, 1)',
        id: 'S:f78ebf0292cb1ad038d65aad96eebec270474f2a,'
    },
    {
        name: 'coralColorWarningText',
        type: 'color',
        description: `Waring text color. 
Use for text content without background that must carry a warning semantic value on its own. 

Ex: StatusWarning`,
        hsla: 'hsla(22, 93%, 41%, 1)',
        hex: '#ca4d07',
        value: 'hsla(22, 93%, 41%, 1)',
        id: 'S:205803f0d35b940890c48c6565e1877dfc6db950,'
    },
    {
        name: 'coralColorWarningTextHover',
        type: 'color',
        description: `Waring text color, on mouseover.`,
        hsla: 'hsla(21, 94%, 31%, 1)',
        hex: '#993a05',
        value: 'hsla(21, 94%, 31%, 1)',
        id: 'S:8ea61eed299497beb4c9134308f544c16b11b191,'
    },
    {
        name: 'coralColorWarningTextActive',
        type: 'color',
        description: `Warning text color, while pressed.`,
        hsla: 'hsla(21, 93%, 21%, 1)',
        hex: '#682704',
        value: 'hsla(21, 93%, 21%, 1)',
        id: 'S:9b770e1c4b8e97ea0db856067c4d377fbbca6676,'
    },
    {
        name: 'coralColorWarningBackground',
        type: 'color',
        description: `Warning background color by default. Use with text-strong.

Ex: InlineMessage`,
        hsla: 'hsla(22, 85%, 92%, 1)',
        hex: '#fce6d9',
        value: 'hsla(22, 85%, 92%, 1)',
        id: 'S:1dc621d9136e162ff9ea67764bf7b8f82b280a3c,'
    },
    {
        name: 'coralColorSuccessBorderHover',
        type: 'color',
        description: `Border color with success semantic, on mouseover.`,
        hsla: 'hsla(111, 49%, 29%, 1)',
        hex: '#316e26',
        value: 'hsla(111, 49%, 29%, 1)',
        id: 'S:7e93b8436eae345924a36ab81f809a0200f103a0,'
    },
    {
        name: 'coralColorWarningBackgroundHover',
        type: 'color',
        description: `Warning background color, on mouseover.`,
        hsla: 'hsla(22, 85%, 82%, 1)',
        hex: '#f8c7aa',
        value: 'hsla(22, 85%, 82%, 1)',
        id: 'S:ca0b064fde13f49c3efae291c3ffa8a3ea76d640,'
    },
    {
        name: 'coralColorSuccessBorderActive',
        type: 'color',
        description: `Border color with success semantic, while pressed.`,
        hsla: 'hsla(111, 49%, 24%, 1)',
        hex: '#285b1f',
        value: 'hsla(111, 49%, 24%, 1)',
        id: 'S:a0612979717038bd19818c9628055ef6778d0b41,'
    },
    {
        name: 'coralColorWarningBackgroundActive',
        type: 'color',
        description: `Warning background color, while pressed.`,
        hsla: 'hsla(22, 85%, 72%, 1)',
        hex: '#f4a87b',
        value: 'hsla(22, 85%, 72%, 1)',
        id: 'S:83e3662f59e3b023111f946a9772ac4652ebdd46,'
    },
    {
        name: 'coralColorWarningBackgroundWeak',
        type: 'color',
        description: `Weakest warning background color. Same color as neutral-background but with warning-tinted hover and active.

Use as placeholder to indicate that you want warning-tinted interactive states.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:a8fae482d49c8aebd35d856b0904f199dca4be7d,'
    },
    {
        name: 'coralColorAssistiveText',
        type: 'color',
        description: `Text for assistive elements. Use with assistive-background.

Ex: Tooltip`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:0e7226809b08a34855c21052d9eba6ab6653fef0,'
    },
    {
        name: 'coralColorWarningBackgroundWeakHover',
        type: 'color',
        description: `Weakest warning background color, on mouseover.`,
        hsla: 'hsla(22, 85%, 92%, 1)',
        hex: '#fce6d9',
        value: 'hsla(22, 85%, 92%, 1)',
        id: 'S:115c644edd2868ad52b23d576e20ab8d1faa08d8,'
    },
    {
        name: 'coralColorWarningBackgroundWeakActive',
        type: 'color',
        description: `Weakest warning background color, while pressed.`,
        hsla: 'hsla(22, 85%, 82%, 1)',
        hex: '#f8c7aa',
        value: 'hsla(22, 85%, 82%, 1)',
        id: 'S:a0ee19e8777403147f0c81dfa683044f0b5cb2db,'
    },
    {
        name: 'coralColorAssistiveBackground',
        type: 'color',
        description: `Background for assistive elements. Use with assistive-text.

Ex: Tooltip`,
        hsla: 'hsla(210, 62%, 5%, 1)',
        hex: '#050d15',
        value: 'hsla(210, 62%, 5%, 1)',
        id: 'S:f4a6fcb9f0533a453c37d323c82b6d52f4ec6bbc,'
    },
    {
        name: 'coralColorWarningBackgroundStrong',
        type: 'color',
        description: `Strongest warning background color. Use on strong interactive elements with a warning semantic attached. Use with text-weak.`,
        hsla: 'hsla(22, 93%, 41%, 1)',
        hex: '#ca4d07',
        value: 'hsla(22, 93%, 41%, 1)',
        id: 'S:51ccf9fa318e01e4c14968f239d096fad3260814,'
    },
    {
        name: 'coralColorWarningBackgroundStrongHover',
        type: 'color',
        description: `Strongest warning background color, on mouseover.`,
        hsla: 'hsla(21, 94%, 31%, 1)',
        hex: '#993a05',
        value: 'hsla(21, 94%, 31%, 1)',
        id: 'S:4eb56341e158a49f5b0d838089c8a8c18325ef55,'
    },
    {
        name: 'coralColorWarningBackgroundStrongActive',
        type: 'color',
        description: `Strongest warning background color, while pressed.`,
        hsla: 'hsla(21, 93%, 21%, 1)',
        hex: '#672704',
        value: 'hsla(21, 93%, 21%, 1)',
        id: 'S:88f29da5ec9704b5877e8ff58b2b018df64fe32c,'
    },
    {
        name: 'coralColorWarningBorder',
        type: 'color',
        description: `Border color with warning semantic.`,
        hsla: 'hsla(22, 93%, 41%, 1)',
        hex: '#ca4d07',
        value: 'hsla(22, 93%, 41%, 1)',
        id: 'S:bc12ace2f349e8b65c07bfb3b0647abbfbdc4f53,'
    },
    {
        name: 'coralColorAssistiveBorder',
        type: 'color',
        description: `Border for assistive elements. `,
        hsla: 'hsla(0, 0%, 47%, 1)',
        hex: '#797979',
        value: 'hsla(0, 0%, 47%, 1)',
        id: 'S:edc8f94e951e1a0fff555b30785298f191557a30,'
    },
    {
        name: 'coralColorWarningBorderHover',
        type: 'color',
        description: `Border color with warning semantic, on mouseover.`,
        hsla: 'hsla(21, 94%, 31%, 1)',
        hex: '#993a05',
        value: 'hsla(21, 94%, 31%, 1)',
        id: 'S:b6180ebd12bb4c6eaeb01bfadca62bed1d41ad00,'
    },
    {
        name: 'coralColorWarningBorderActive',
        type: 'color',
        description: `Border color with warning semantic, while pressed.`,
        hsla: 'hsla(21, 93%, 21%, 1)',
        hex: '#672704',
        value: 'hsla(21, 93%, 21%, 1)',
        id: 'S:0761e87f4a918be02b5867c09a06313aa004dec4,'
    },
    {
        name: 'coralColorBrandingBrand',
        type: 'color',
        description: `Main brand color. Used for logo.`,
        hsla: 'hsla(359, 100%, 71%, 1)',
        hex: '#ff6d70',
        value: 'hsla(359, 100%, 71%, 1)',
        id: 'S:6ec49ff780aa1ffdc439a65b477d377404ee0cba,'
    },
    {
        name: 'coralColorNeutralBorderDisabled',
        type: 'color',
        description: `Disabled border color for interactive elements 

Ex: Inputs`,
        hsla: 'hsla(0, 0%, 65%, 1)',
        hex: '#a6a6a6',
        value: 'hsla(0, 0%, 65%, 1)',
        id: 'S:9e515084692abf10acca4375ef1fee10b6b802ae,'
    },
    {
        name: 'coralColorNeutralBorderWeakHover',
        type: 'color',
        description: `Weaker border color on mouseover.`,
        hsla: 'hsla(0, 0%, 72%, 1)',
        hex: '#b8b8b8',
        value: 'hsla(0, 0%, 72%, 1)',
        id: 'S:a9d69c47fb18d002925ef03ce29d04c9a1912a2d,'
    },
    {
        name: 'coralColorAssistiveBorderFocus',
        type: 'color',
        description: `Focus color for focus rings across the products.

Ex: Buttons on focus`,
        hsla: 'hsla(241, 54%, 61%, 1)',
        hex: '#6664d1',
        value: 'hsla(241, 54%, 61%, 1)',
        id: 'S:291a7efc9bc12a252e0c41ec95c0edf270728ba4,'
    },
    {
        name: 'coralColorAccentTextStrong',
        type: 'color',
        description: `Accent text color on accent-background.`,
        hsla: 'hsla(204, 96%, 18%, 1)',
        hex: '#023659',
        value: 'hsla(204, 96%, 18%, 1)',
        id: 'S:f80bab3d3a5c4169db07daaa142cba7a8c319bbf,'
    },
    {
        name: 'coralColorAccentTextStrongHover',
        type: 'color',
        description: `Accent text color on mouseover.`,
        hsla: 'hsla(204, 97%, 13%, 1)',
        hex: '#012741',
        value: 'hsla(204, 97%, 13%, 1)',
        id: 'S:09d4f5976437b18847136f6e78ddef914d6b1c4c,'
    },
    {
        name: 'coralColorAccentTextStrongActive',
        type: 'color',
        description: `Accent text color while pressed.`,
        hsla: 'hsla(205, 95%, 8%, 1)',
        hex: '#011828',
        value: 'hsla(205, 95%, 8%, 1)',
        id: 'S:1f612fe19d4a6f7b40f07ab6b359950695c372b3,'
    },
    {
        name: 'coralColorDangerTextStrong',
        type: 'color',
        description: `Danger text color on danger-background. `,
        hsla: 'hsla(359, 47%, 44%, 1)',
        hex: '#a43b3d',
        value: 'hsla(359, 47%, 44%, 1)',
        id: 'S:0daf7e338da469d7273cc3387f64769e5561bba6,'
    },
    {
        name: 'coralColorDangerTextStrongHover',
        type: 'color',
        description: `Danger text color on mouseover. `,
        hsla: 'hsla(359, 54%, 38%, 1)',
        hex: '#952d2f',
        value: 'hsla(359, 54%, 38%, 1)',
        id: 'S:130f15e66ec11629b190e8a054d7ae2f3067aa89,'
    },
    {
        name: 'coralColorDangerTextStrongActive',
        type: 'color',
        description: `Danger text color while pressing. `,
        hsla: 'hsla(359, 54%, 33%, 1)',
        hex: '#812729',
        value: 'hsla(359, 54%, 33%, 1)',
        id: 'S:e114ebc6d803ac76389920edfdb0263d8ebfac0b,'
    },
    {
        name: 'coralColorSuccessTextStrong',
        type: 'color',
        description: `Success text color on success-background. `,
        hsla: 'hsla(111, 49%, 29%, 1)',
        hex: '#316e26',
        value: 'hsla(111, 49%, 29%, 1)',
        id: 'S:f70b76be155a581e83a2653e3e42262698233ad0,'
    },
    {
        name: 'coralColorSuccessTextStrongHover',
        type: 'color',
        description: `Success text color on mouseover. `,
        hsla: 'hsla(110, 49%, 24%, 1)',
        hex: '#295b1f',
        value: 'hsla(110, 49%, 24%, 1)',
        id: 'S:98750920b619bb58f2925e3f7cba6223b58e6449,'
    },
    {
        name: 'coralColorSuccessTextStrongActive',
        type: 'color',
        description: `Success text color while pressed. `,
        hsla: 'hsla(111, 48%, 19%, 1)',
        hex: '#204819',
        value: 'hsla(111, 48%, 19%, 1)',
        id: 'S:f33802276e544153ba2839a331b0854974edcb00,'
    },
    {
        name: 'coralColorWarningTextStrong',
        type: 'color',
        description: `Warning text color on warning-background.`,
        hsla: 'hsla(22, 86%, 27%, 1)',
        hex: '#80360a',
        value: 'hsla(22, 86%, 27%, 1)',
        id: 'S:3fc8b5aff756feefa5ffd273245d54ac12d4292d,'
    },
    {
        name: 'coralColorWarningTextStrongHover',
        type: 'color',
        description: `Warning strong text color, on mouseover. `,
        hsla: 'hsla(23, 86%, 22%, 1)',
        hex: '#682c08',
        value: 'hsla(23, 86%, 22%, 1)',
        id: 'S:cbe0b9dbb86da3cd74ddb50b5aea7e3900e307b8,'
    },
    {
        name: 'coralColorWarningTextStrongActive',
        type: 'color',
        description: `Warning strong text color, while pressed.`,
        hsla: 'hsla(23, 86%, 17%, 1)',
        hex: '#502206',
        value: 'hsla(23, 86%, 17%, 1)',
        id: 'S:e39493d2ad527926e2080d02fd12225fe8543bcc,'
    },
    {
        name: 'coralColorBetaText',
        type: 'color',
        description: `Beta text color, for things that are new or temporary.
Use for text content without background that must carry a beta semantic value on its own. `,
        hsla: 'hsla(280, 57%, 49%, 1)',
        hex: '#9435c3',
        value: 'hsla(280, 57%, 49%, 1)',
        id: 'S:227ff46cc42d2ad216c72fa2494d8794dfdb604b,'
    },
    {
        name: 'coralColorBetaTextHover',
        type: 'color',
        description: `Beta text color, on mouseover.`,
        hsla: 'hsla(281, 58%, 39%, 1)',
        hex: '#772a9c',
        value: 'hsla(281, 58%, 39%, 1)',
        id: 'S:1860f4ec7fc795c6494c68844e682141ed03a626,'
    },
    {
        name: 'coralColorBetaTextActive',
        type: 'color',
        description: `Beta text color, while pressed.`,
        hsla: 'hsla(281, 58%, 29%, 1)',
        hex: '#591f74',
        value: 'hsla(281, 58%, 29%, 1)',
        id: 'S:cd9326dc6997b00ac83a24f221e1e3890489be14,'
    },
    {
        name: 'coralColorBetaIcon',
        type: 'color',
        description: `Icon with beta color.

Ex: InlineMessage`,
        hsla: 'hsla(280, 80%, 54%, 1)',
        hex: '#aa2de8',
        value: 'hsla(280, 80%, 54%, 1)',
        id: 'S:db56e1eff68394f2df0a24020f98004dee0b6fe4,'
    },
    {
        name: 'coralColorBetaIconHover',
        type: 'color',
        description: `Icon with beta color, on mouseover.`,
        hsla: 'hsla(280, 80%, 44%, 1)',
        hex: '#8e16ca',
        value: 'hsla(280, 80%, 44%, 1)',
        id: 'S:0cd332fba92a693d38790f24ec3c3c77a5627d2c,'
    },
    {
        name: 'coralColorBetaIconActive',
        type: 'color',
        description: `Icon with beta color, while pressed.`,
        hsla: 'hsla(280, 80%, 34%, 1)',
        hex: '#6e119c',
        value: 'hsla(280, 80%, 34%, 1)',
        id: 'S:211e8a73a29e403dc16e7fd6c780060a81e2fffd,'
    },
    {
        name: 'coralColorBetaTextWeak',
        type: 'color',
        description: `Beta text color on beta-background-strong. `,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:3f576fd0d0c74680649087517d2449c5c57c72c0,'
    },
    {
        name: 'coralColorBetaTextWeakHover',
        type: 'color',
        description: `Beta weak text color, on mouseover.`,
        hsla: 'hsla(280, 56%, 83%, 1)',
        hex: '#dcbbec',
        value: 'hsla(280, 56%, 83%, 1)',
        id: 'S:20a77c0154975086869873e522e9a9e80348c26b,'
    },
    {
        name: 'coralColorBetaTextWeakActive',
        type: 'color',
        description: `Beta weak text color, while pressed.`,
        hsla: 'hsla(280, 57%, 73%, 1)',
        hex: '#c793e1',
        value: 'hsla(280, 57%, 73%, 1)',
        id: 'S:3485af3105644545dd9f11b518c3fd5cf6566299,'
    },
    {
        name: 'coralColorBetaTextStrong',
        type: 'color',
        description: `Beta text color on beta-background.`,
        hsla: 'hsla(281, 58%, 29%, 1)',
        hex: '#591f74',
        value: 'hsla(281, 58%, 29%, 1)',
        id: 'S:a6e7bfcd281bcc4752a1c9c25ff3c60a733fd578,'
    },
    {
        name: 'coralColorBetaTextStrongHover',
        type: 'color',
        description: `Beta strong text color, on mouseover. `,
        hsla: 'hsla(282, 58%, 19%, 1)',
        hex: '#3b144c',
        value: 'hsla(282, 58%, 19%, 1)',
        id: 'S:2e5cc532ac4389ce61fe097c688cf8bb569ee0c8,'
    },
    {
        name: 'coralColorBetaTextStrongActive',
        type: 'color',
        description: `Beta strong text color, while pressed. `,
        hsla: 'hsla(282, 57%, 9%, 1)',
        hex: '#1c0a24',
        value: 'hsla(282, 57%, 9%, 1)',
        id: 'S:fe383ab935ac26dd5db4dbe7793e6ee1f80c812f,'
    },
    {
        name: 'coralColorBetaBackground',
        type: 'color',
        description: `Beta background color by default. Use with text-strong.

Ex: InlineMessage`,
        hsla: 'hsla(279, 57%, 90%, 1)',
        hex: '#ead7f4',
        value: 'hsla(279, 57%, 90%, 1)',
        id: 'S:1ec184206ed55d016a3f514a77eee1900a8ed873,'
    },
    {
        name: 'coralColorBetaBackgroundHover',
        type: 'color',
        description: `Beta background color, on mouseover.`,
        hsla: 'hsla(279, 57%, 81%, 1)',
        hex: '#d7b3ea',
        value: 'hsla(279, 57%, 81%, 1)',
        id: 'S:4876d5505ea073060ad802c1a066185940aeca5e,'
    },
    {
        name: 'coralColorBetaBackgroundActive',
        type: 'color',
        description: `Beta background color, while pressed.`,
        hsla: 'hsla(279, 57%, 71%, 1)',
        hex: '#c28bdf',
        value: 'hsla(279, 57%, 71%, 1)',
        id: 'S:067a9d2c3e499ecbf1a79ef6364ee32821b0eefe,'
    },
    {
        name: 'coralColorBetaBackgroundWeak',
        type: 'color',
        description: `Weakest beta background color. Same color as neutral-background but with beta-tinted hover and active.

Use as placeholder to indicate that you want beta-tinted interactive states.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:d1f61dd2c3cad1846e4f57e79fcde1f58634cc06,'
    },
    {
        name: 'coralColorBetaBackgroundWeakHover',
        type: 'color',
        description: `Weakest beta background color, on mouseover.`,
        hsla: 'hsla(279, 57%, 90%, 1)',
        hex: '#ead7f4',
        value: 'hsla(279, 57%, 90%, 1)',
        id: 'S:240afbe15e900b300118e38db2ee01f4d48fe034,'
    },
    {
        name: 'coralColorBetaBackgroundWeakActive',
        type: 'color',
        description: `Weakest beta background color, while pressed.`,
        hsla: 'hsla(279, 57%, 80%, 1)',
        hex: '#d5afe9',
        value: 'hsla(279, 57%, 80%, 1)',
        id: 'S:f2cce1ec920b37548ed3fdde169a89ec229f5e34,'
    },
    {
        name: 'coralColorBetaBackgroundStrong',
        type: 'color',
        description: `Strongest beta background color. Use on strong interactive elements with a beta semantic attached. Use with text-weak.`,
        hsla: 'hsla(281, 58%, 29%, 1)',
        hex: '#591f74',
        value: 'hsla(281, 58%, 29%, 1)',
        id: 'S:86b2e9b8edcaf46e38b62483a44c25615ce7aab1,'
    },
    {
        name: 'coralColorBetaBackgroundStrongHover',
        type: 'color',
        description: `Strongest beta background color, on mouseover.`,
        hsla: 'hsla(282, 58%, 19%, 1)',
        hex: '#3b144c',
        value: 'hsla(282, 58%, 19%, 1)',
        id: 'S:f5aedf911101596e26aaaab0e5858f60aebaf8b6,'
    },
    {
        name: 'coralColorBetaBackgroundStrongActive',
        type: 'color',
        description: `Strongest beta background color, while pressed.`,
        hsla: 'hsla(282, 57%, 9%, 1)',
        hex: '#1c0a24',
        value: 'hsla(282, 57%, 9%, 1)',
        id: 'S:bd666021047c26d8a7af952f7a2ba3ca1997ba10,'
    },
    {
        name: 'coralColorBetaBorder',
        type: 'color',
        description: `Border color with beta semantic.`,
        hsla: 'hsla(281, 58%, 29%, 1)',
        hex: '#591f74',
        value: 'hsla(281, 58%, 29%, 1)',
        id: 'S:7eee30677af86804bf5963bfd0e139ee793fb003,'
    },
    {
        name: 'coralColorBetaBorderHover',
        type: 'color',
        description: `Border color with beta semantic, on mouseover.`,
        hsla: 'hsla(282, 58%, 19%, 1)',
        hex: '#3b144c',
        value: 'hsla(282, 58%, 19%, 1)',
        id: 'S:da4c4bc68c80bc856b7e5e7b25966fe21631e5cf,'
    },
    {
        name: 'coralColorBetaBorderActive',
        type: 'color',
        description: `Border color with beta semantic, while pressed.`,
        hsla: 'hsla(282, 57%, 9%, 1)',
        hex: '#1c0a24',
        value: 'hsla(282, 57%, 9%, 1)',
        id: 'S:f802feaadec404388ce6b63f6a389106de317b25,'
    },
    {
        name: 'coralColorNeutralBorderStrong',
        type: 'color',
        description: `Strongest border color.

Use on strong backgrounds (neutral-background-medium, -strong or -heavy).`,
        hsla: 'hsla(0, 0%, 25%, 1)',
        hex: '#404040',
        value: 'hsla(0, 0%, 25%, 1)',
        id: 'S:6d67f79c3f09a6c80192085883e78fe0c551a570,'
    },
    {
        name: 'coralColorNeutralBorderStrongHover',
        type: 'color',
        description: `Strongest border color on mouseover.`,
        hsla: 'hsla(0, 0%, 15%, 1)',
        hex: '#262626',
        value: 'hsla(0, 0%, 15%, 1)',
        id: 'S:7dab05073b0b6865ef824c49b6324eaba3ed4f1a,'
    },
    {
        name: 'coralColorNeutralIconInverted',
        type: 'color',
        description: `Neutral icon color on dark backgrounds.`,
        hsla: 'hsla(0, 0%, 100%, 1)',
        hex: '#ffffff',
        value: 'hsla(0, 0%, 100%, 1)',
        id: 'S:1475bba2bab6ad7cc2e50c844ee79e9423b0fec6,'
    },
    {
        name: 'coralColorNeutralIcon',
        type: 'color',
        description: `Default icon color.

Best used when the icon doesn't expect interactivity. `,
        hsla: 'hsla(0, 0%, 13%, 1)',
        hex: '#202020',
        value: 'hsla(0, 0%, 13%, 1)',
        id: 'S:b20caee1566e1478fe5cada2ef7fb319dde974b1,'
    },
    {
        name: 'coralColorNeutralIconWeak',
        type: 'color',
        description: `Weakly contrasting icon color.

Best used when there is regular neutral-text or neutral-icon colors nearby for efficient hierarchy.`,
        hsla: 'hsla(0, 0%, 38%, 1)',
        hex: '#616161',
        value: 'hsla(0, 0%, 38%, 1)',
        id: 'S:18981cf4fdba64a29264f759d65ce2a1c0e475c7,'
    },
    {
        name: 'coralColorAccentIcon',
        type: 'color',
        description: `Icon with accent color.

Ex: ButtonIcon`,
        hsla: 'hsla(204, 88%, 40%, 1)',
        hex: '#0c78c2',
        value: 'hsla(204, 88%, 40%, 1)',
        id: 'S:b949f744154da7eadf2b84b481546390c6cfd276,'
    },
    {
        name: 'coralColorAccentIconHover',
        type: 'color',
        description: `Icon with accent color on mouseover.

Ex: ButtonIcon`,
        hsla: 'hsla(204, 88%, 30%, 1)',
        hex: '#095990',
        value: 'hsla(204, 88%, 30%, 1)',
        id: 'S:360013e4e6ea521bceba7d4d104abb9dce876688,'
    },
    {
        name: 'coralColorAccentIconActive',
        type: 'color',
        description: `Icon with accent color while pressing.

Ex: ButtonIcon`,
        hsla: 'hsla(205, 88%, 20%, 1)',
        hex: '#063b60',
        value: 'hsla(205, 88%, 20%, 1)',
        id: 'S:243e03c059ebd2b791db15d88463272ace4ab8c2,'
    },
    {
        name: 'coralColorDangerIcon',
        type: 'color',
        description: `Icon with danger color.

Ex: Status`,
        hsla: 'hsla(359, 69%, 53%, 1)',
        hex: '#d93335',
        value: 'hsla(359, 69%, 53%, 1)',
        id: 'S:d8da6f95b630b6e5acddafafba8baf666115f8f7,'
    },
    {
        name: 'coralColorDangerIconHover',
        type: 'color',
        description: `Icon with danger color on mouseover.`,
        hsla: 'hsla(359, 69%, 43%, 1)',
        hex: '#b92224',
        value: 'hsla(359, 69%, 43%, 1)',
        id: 'S:d180d32a8e90a5865b56db7c104066b033dc493a,'
    },
    {
        name: 'coralColorDangerIconActive',
        type: 'color',
        description: `Icon with danger color while pressed.`,
        hsla: 'hsla(359, 69%, 33%, 1)',
        hex: '#8e1a1c',
        value: 'hsla(359, 69%, 33%, 1)',
        id: 'S:400548167d29a3f203b837d7eb75cbedf0387938,'
    },
    {
        name: 'coralColorSuccessIcon',
        type: 'color',
        description: `Icon with success color.

Ex: StatusSuccessful`,
        hsla: 'hsla(111, 53%, 40%, 1)',
        hex: '#409c30',
        value: 'hsla(111, 53%, 40%, 1)',
        id: 'S:422500a652ca311e96539523813e80ec52f1d560,'
    },
    {
        name: 'coralColorSuccessIconHover',
        type: 'color',
        description: `Icon with success color, on mouseover.`,
        hsla: 'hsla(111, 53%, 30%, 1)',
        hex: '#307524',
        value: 'hsla(111, 53%, 30%, 1)',
        id: 'S:03176e2626a76ecde06c048a3ea82b099bc294a0,'
    },
    {
        name: 'coralColorSuccessIconActive',
        type: 'color',
        description: `Icon with success color, while pressed.`,
        hsla: 'hsla(111, 53%, 20%, 1)',
        hex: '#204e18',
        value: 'hsla(111, 53%, 20%, 1)',
        id: 'S:5bb84b4b5ef68dc153685366aef659cb2f56dbb0,'
    },
    {
        name: 'coralColorWarningIcon',
        type: 'color',
        description: `Icon with warning color.

Ex: StatusWarning`,
        hsla: 'hsla(22, 87%, 47%, 1)',
        hex: '#e25c10',
        value: 'hsla(22, 87%, 47%, 1)',
        id: 'S:b281fb7af34bebfa8e71f5d5b3565a3c0e5b82fc,'
    },
    {
        name: 'coralColorWarningIconHover',
        type: 'color',
        description: `Icon with warning color, on mouseover.`,
        hsla: 'hsla(22, 87%, 37%, 1)',
        hex: '#b0480c',
        value: 'hsla(22, 87%, 37%, 1)',
        id: 'S:8c34d03b898d022052f45ca687fb59433dce7b5d,'
    },
    {
        name: 'coralColorWarningIconActive',
        type: 'color',
        description: `Icon with warning color, while pressed.`,
        hsla: 'hsla(22, 87%, 27%, 1)',
        hex: '#813409',
        value: 'hsla(22, 87%, 27%, 1)',
        id: 'S:0215678f15ac5deae83c0f1c58e700b8baee4f3a,'
    },
    {
        name: 'coralColorChartsNeutral',
        type: 'color',
        description: `Chart color: Neutral. 
Use for neutral / empty semantic values. 

Ex: QualityBar`,
        hsla: 'hsla(0, 0%, 22%, 1)',
        hex: '#383838',
        value: 'hsla(0, 0%, 22%, 1)',
        id: 'S:a3d498a33ebeff2f580391259314ab9246358c4f,'
    },
    {
        name: 'coralColorChartsNeutralWeak',
        type: 'color',
        description: `Chart color: Neutral-weak. 
Weak contrast for neutral / empty semantic values.`,
        hsla: 'hsla(0, 0%, 83%, 1)',
        hex: '#d4d4d4',
        value: 'hsla(0, 0%, 83%, 1)',
        id: 'S:95d1f769d53a6d21d966229e5213e8cc38bf9677,'
    },
    {
        name: 'coralColorChartsNeutralStrong',
        type: 'color',
        description: `Chart color: Neutral-strong. 
Strong contrast for neutral / empty semantic values.`,
        hsla: 'hsla(0, 0%, 12%, 1)',
        hex: '#1f1f1f',
        value: 'hsla(0, 0%, 12%, 1)',
        id: 'S:e0a7b477ff9221f3efbcc06a30879f78d6d722f2,'
    },
    {
        name: 'coralColorChartsNeutralHover',
        type: 'color',
        description: `Chart color: Neutral on mouseover for interactive charts.`,
        hsla: 'hsla(0, 0%, 12%, 1)',
        hex: '#1f1f1f',
        value: 'hsla(0, 0%, 12%, 1)',
        id: 'S:dd28a6a4590f44fca8a6f21e5cc25641f662c426,'
    },
    {
        name: 'coralColorChartsSuccess',
        type: 'color',
        description: `Chart color: Success. 
Use for success / positive semantic values. 

Ex: QualityBar`,
        hsla: 'hsla(148, 87%, 40%, 1)',
        hex: '#0dbd5e',
        value: 'hsla(148, 87%, 40%, 1)',
        id: 'S:33025d53ef61e6b730f35a93b6f7206094ef9385,'
    },
    {
        name: 'coralColorChartsSuccessWeak',
        type: 'color',
        description: `Chart color: Success-weak. 
Weak contrast for positive / success semantic values.`,
        hsla: 'hsla(130, 52%, 91%, 1)',
        hex: '#dcf4e0',
        value: 'hsla(130, 52%, 91%, 1)',
        id: 'S:5ef8fc9a63f09034cbe7326b3c064772a27dc9fc,'
    },
    {
        name: 'coralColorChartsSuccessStrong',
        type: 'color',
        description: `Chart color: Success-strong. 
Strong contrast for positive / success semantic values.`,
        hsla: 'hsla(139, 50%, 22%, 1)',
        hex: '#1c552e',
        value: 'hsla(139, 50%, 22%, 1)',
        id: 'S:8f8789e4b3e00968e8d720c29d8361fc314d5298,'
    },
    {
        name: 'coralColorChartsSuccessHover',
        type: 'color',
        description: `Chart color: Success on mouseover for interactive charts.`,
        hsla: 'hsla(139, 50%, 22%, 1)',
        hex: '#1c552e',
        value: 'hsla(139, 50%, 22%, 1)',
        id: 'S:cbf8d1b32e257667381b0602f227ddbba010c349,'
    },
    {
        name: 'coralColorChartsDanger',
        type: 'color',
        description: `Chart color: Danger. 
Use for danger / negative semantic values. 

Ex: QualityBar`,
        hsla: 'hsla(4, 89%, 49%, 1)',
        hex: '#ea1b0e',
        value: 'hsla(4, 89%, 49%, 1)',
        id: 'S:c09c28e8f588fa65453e69c7c60435ac96c2b90c,'
    },
    {
        name: 'coralColorChartsDangerWeak',
        type: 'color',
        description: `Chart color: Danger-weak. 
Weak contrast for negative / danger semantic values.`,
        hsla: 'hsla(359, 69%, 73%, 1)',
        hex: '#e9898a',
        value: 'hsla(359, 69%, 73%, 1)',
        id: 'S:9d2762507c6cfcd4c38cbdaa2b22353b183cdb6c,'
    },
    {
        name: 'coralColorChartsDangerStrong',
        type: 'color',
        description: `Chart color: Danger-strong. 
Strong contrast for negative / danger semantic values.`,
        hsla: 'hsla(359, 62%, 43%, 1)',
        hex: '#b32a2c',
        value: 'hsla(359, 62%, 43%, 1)',
        id: 'S:a92bc8f79e8062726ea5c2a8e885ca92c01200d5,'
    },
    {
        name: 'coralColorChartsDangerHover',
        type: 'color',
        description: `Chart color: Danger on mouseover for interactive charts.`,
        hsla: 'hsla(359, 62%, 43%, 1)',
        hex: '#b32a2c',
        value: 'hsla(359, 62%, 43%, 1)',
        id: 'S:c1ce6adfead2561c6db73e0e3deba74cd961c53d,'
    },
    {
        name: 'coralColorChartsWarning',
        type: 'color',
        description: `Chart color: Warning. 
Use for warning semantic values.`,
        hsla: 'hsla(32, 100%, 56%, 1)',
        hex: '#ff9820',
        value: 'hsla(32, 100%, 56%, 1)',
        id: 'S:25b2f6f66ea8a91c5c39eee7f51b5608693a4193,'
    },
    {
        name: 'coralColorChartsWarningWeak',
        type: 'color',
        description: `Chart color: Warning-weak. 
Weak contrast for warning semantic values.`,
        hsla: 'hsla(22, 88%, 84%, 1)',
        hex: '#facbb0',
        value: 'hsla(22, 88%, 84%, 1)',
        id: 'S:169501744af03fdec2df5369469fdfabaa29d76f,'
    },
    {
        name: 'coralColorChartsWarningStrong',
        type: 'color',
        description: `Chart color: Warning-strong. 
Strong contrast for warning semantic values.`,
        hsla: 'hsla(22, 75%, 42%, 1)',
        hex: '#b9541b',
        value: 'hsla(22, 75%, 42%, 1)',
        id: 'S:817044da616057f5e3106cde6fe45658c35e72b0,'
    },
    {
        name: 'coralColorChartsWarningHover',
        type: 'color',
        description: `Chart color: Warning on mouseover for interactive charts.`,
        hsla: 'hsla(22, 75%, 42%, 1)',
        hex: '#b9541b',
        value: 'hsla(22, 75%, 42%, 1)',
        id: 'S:d3ba5833d0e04af5ac82b406b0f60576962f6d53,'
    },
    {
        name: 'coralColorChartsDefault',
        type: 'color',
        description: `Chart color by default. 
If the chart only has one set of value, and not a semantic (danger / warning / success) then use this colorset.`,
        hsla: 'hsla(216, 82%, 48%, 1)',
        hex: '#1667df',
        value: 'hsla(216, 82%, 48%, 1)',
        id: 'S:f916a19d4c11fc0a456321af7491e482ec9c982a,'
    },
    {
        name: 'coralColorChartsDefaultWeak',
        type: 'color',
        description: `Chart color: default-weak. 
Weak contrast for basic chart values.`,
        hsla: 'hsla(204, 59%, 73%, 1)',
        hex: '#91c2e3',
        value: 'hsla(204, 59%, 73%, 1)',
        id: 'S:2b7a826d26354a36c8d2445d8a95b5e73f41e57d,'
    },
    {
        name: 'coralColorChartsDefaultStrong',
        type: 'color',
        description: `Chart color: default-strong. 
Strong contrast for basic chart values. `,
        hsla: 'hsla(204, 92%, 29%, 1)',
        hex: '#06568d',
        value: 'hsla(204, 92%, 29%, 1)',
        id: 'S:6dab7b28417521c28a18b973701dc041c71f7a9b,'
    },
    {
        name: 'coralColorChartsDefaultHover',
        type: 'color',
        description: `Chart color: default on mouseover for interactive charts.

if there is text on top if this, use default-text-weak.`,
        hsla: 'hsla(204, 92%, 29%, 1)',
        hex: '#06568d',
        value: 'hsla(204, 92%, 29%, 1)',
        id: 'S:52999beffff9eacf26bfed083486644be6b75d29,'
    },
    {
        name: 'coralColorChartsColor00',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(48, 100%, 50%, 1)',
        hex: '#ffcc00',
        value: 'hsla(48, 100%, 50%, 1)',
        id: 'S:9505c4d1a23e896b95e637f2ef3666e55b02843c,'
    },
    {
        name: 'coralColorChartsColor00Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(51, 91%, 82%, 1)',
        hex: '#fbefa9',
        value: 'hsla(51, 91%, 82%, 1)',
        id: 'S:6ddd5f3350267fc82b40ac74c11496ca58792644,'
    },
    {
        name: 'coralColorChartsColor00Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(48, 82%, 45%, 1)',
        hex: '#d2ad15',
        value: 'hsla(48, 82%, 45%, 1)',
        id: 'S:e9d116f4a613f1a63cbd8d0184dc7317a699976c,'
    },
    {
        name: 'coralColorChartsColor00Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(48, 82%, 45%, 1)',
        hex: '#d2ad15',
        value: 'hsla(48, 82%, 45%, 1)',
        id: 'S:fe75e8b14455819f62530cac887c281db3cf5ecd,'
    },
    {
        name: 'coralColorChartsColor01',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(216, 82%, 48%, 1)',
        hex: '#1667df',
        value: 'hsla(216, 82%, 48%, 1)',
        id: 'S:a720129992c4db38acc63651e44288d9dbe51dcd,'
    },
    {
        name: 'coralColorChartsColor01Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(204, 59%, 73%, 1)',
        hex: '#91c2e3',
        value: 'hsla(204, 59%, 73%, 1)',
        id: 'S:8d7bb5282649e7a36537bc19a112e6c4ff832dab,'
    },
    {
        name: 'coralColorChartsColor01Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(204, 92%, 29%, 1)',
        hex: '#06568d',
        value: 'hsla(204, 92%, 29%, 1)',
        id: 'S:6d5d6816f5e9af2400c4b36d7a1b0b2c89b5272b,'
    },
    {
        name: 'coralColorChartsColor01Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(204, 92%, 29%, 1)',
        hex: '#06568d',
        value: 'hsla(204, 92%, 29%, 1)',
        id: 'S:6a5ff3408046cc1276db9d4361741f502906d96f,'
    },
    {
        name: 'coralColorChartsColor02',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(194, 92%, 50%, 1)',
        hex: '#0abef5',
        value: 'hsla(194, 92%, 50%, 1)',
        id: 'S:d0045a8ff307816f958b16732e55b0f5a823cd0d,'
    },
    {
        name: 'coralColorChartsColor02Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(194, 91%, 91%, 1)',
        hex: '#d2f3fd',
        value: 'hsla(194, 91%, 91%, 1)',
        id: 'S:1d99aef8c9cf2e2c44d9d652f8e1e791b68801d6,'
    },
    {
        name: 'coralColorChartsColor02Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(194, 93%, 32%, 1)',
        hex: '#067b9f',
        value: 'hsla(194, 93%, 32%, 1)',
        id: 'S:ef3900e5ddc1f8e7c72e0688f376f6cd46530124,'
    },
    {
        name: 'coralColorChartsColor02Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(194, 93%, 32%, 1)',
        hex: '#067b9f',
        value: 'hsla(194, 93%, 32%, 1)',
        id: 'S:fb8ac038db8ff8aaa626f292f8143e4ad5c106ba,'
    },
    {
        name: 'coralColorChartsColor03',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(140, 39%, 79%, 1)',
        hex: '#b3dec1',
        value: 'hsla(140, 39%, 79%, 1)',
        id: 'S:d64422d228b90d9fa28c5227dc2effc6991f8b5e,'
    },
    {
        name: 'coralColorChartsColor03Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(138, 40%, 92%, 1)',
        hex: '#e1f2e6',
        value: 'hsla(138, 40%, 92%, 1)',
        id: 'S:3bcdcc34660e6fa4139952f2347bc8e14ee80a2d,'
    },
    {
        name: 'coralColorChartsColor03Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(139, 11%, 35%, 1)',
        hex: '#506356',
        value: 'hsla(139, 11%, 35%, 1)',
        id: 'S:3b8fc5892438a939aea3ceae27a42db6279f5c9d,'
    },
    {
        name: 'coralColorChartsColor03Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(139, 11%, 35%, 1)',
        hex: '#506356',
        value: 'hsla(139, 11%, 35%, 1)',
        id: 'S:4378d021b834eb01b63ab96dfdfe758d18c46d78,'
    },
    {
        name: 'coralColorChartsColor04',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(148, 87%, 40%, 1)',
        hex: '#0dbd5e',
        value: 'hsla(148, 87%, 40%, 1)',
        id: 'S:449b70e4010307677623f7fa4ca30851c86f37c5,'
    },
    {
        name: 'coralColorChartsColor04Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(130, 52%, 91%, 1)',
        hex: '#dcf4e0',
        value: 'hsla(130, 52%, 91%, 1)',
        id: 'S:f8ca9fb1cd5602615e6c904437343600b1a92877,'
    },
    {
        name: 'coralColorChartsColor04Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(139, 50%, 22%, 1)',
        hex: '#1c552e',
        value: 'hsla(139, 50%, 22%, 1)',
        id: 'S:662a45487ae84c81c9ce13bac5aa32a2dd45e3d4,'
    },
    {
        name: 'coralColorChartsColor04Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(139, 50%, 22%, 1)',
        hex: '#1c552e',
        value: 'hsla(139, 50%, 22%, 1)',
        id: 'S:0da97488b7d438b02f2b872a18f7849d87f45e18,'
    },
    {
        name: 'coralColorChartsColor05',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(324, 68%, 71%, 1)',
        hex: '#e884c0',
        value: 'hsla(324, 68%, 71%, 1)',
        id: 'S:b507bc0b849c50c9e60f4cb1c6b6e1d2a8ab6b66,'
    },
    {
        name: 'coralColorChartsColor05Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(323, 69%, 95%, 1)',
        hex: '#fbe9f4',
        value: 'hsla(323, 69%, 95%, 1)',
        id: 'S:84add423fc3c8a7f4fe5c3a774837bce3592d8d4,'
    },
    {
        name: 'coralColorChartsColor05Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(324, 28%, 49%, 1)',
        hex: '#a15b85',
        value: 'hsla(324, 28%, 49%, 1)',
        id: 'S:4214d17cb1ac1f2dea182c0e280d9c4cbe422229,'
    },
    {
        name: 'coralColorChartsColor05Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(324, 28%, 49%, 1)',
        hex: '#a15b85',
        value: 'hsla(324, 28%, 49%, 1)',
        id: 'S:00b56df15db6fedad4d91f4580aa73c3ab286422,'
    },
    {
        name: 'coralColorChartsColor06',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(280, 75%, 58%, 1)',
        hex: '#b045e5',
        value: 'hsla(280, 75%, 58%, 1)',
        id: 'S:772945b3afc20071f0ae1e950f79358e5b3ad299,'
    },
    {
        name: 'coralColorChartsColor06Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(279, 77%, 88%, 1)',
        hex: '#e8caf8',
        value: 'hsla(279, 77%, 88%, 1)',
        id: 'S:998de68b1713f2c044aa5832c6cc327e58c5c444,'
    },
    {
        name: 'coralColorChartsColor06Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(280, 54%, 36%, 1)',
        hex: '#6e2b8f',
        value: 'hsla(280, 54%, 36%, 1)',
        id: 'S:0cab8edb4e986bdaca01029ef186a669ba9f8fd9,'
    },
    {
        name: 'coralColorChartsColor06Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(280, 54%, 36%, 1)',
        hex: '#6e2b8f',
        value: 'hsla(280, 54%, 36%, 1)',
        id: 'S:d37dfa3b2b250227d761d2e7c09b7703e396ce07,'
    },
    {
        name: 'coralColorChartsColor07',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(4, 89%, 49%, 1)',
        hex: '#ea1b0e',
        value: 'hsla(4, 89%, 49%, 1)',
        id: 'S:c87f3de2572d12b7e9b00abecd2ecbb637e25d61,'
    },
    {
        name: 'coralColorChartsColor07Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(359, 69%, 73%, 1)',
        hex: '#e9898a',
        value: 'hsla(359, 69%, 73%, 1)',
        id: 'S:12f0499ea53fd49d90fbca59b38aa0cb4d759afa,'
    },
    {
        name: 'coralColorChartsColor07Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(359, 62%, 43%, 1)',
        hex: '#b32a2c',
        value: 'hsla(359, 62%, 43%, 1)',
        id: 'S:3972a1f74060849362fb18e23512a5c2279f3d88,'
    },
    {
        name: 'coralColorChartsColor07Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(359, 62%, 43%, 1)',
        hex: '#b32a2c',
        value: 'hsla(359, 62%, 43%, 1)',
        id: 'S:e22df6931d25e17ab33f853a637361ea04c2d6ef,'
    },
    {
        name: 'coralColorChartsColor08',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(22, 88%, 54%, 1)',
        hex: '#f16e23',
        value: 'hsla(22, 88%, 54%, 1)',
        id: 'S:1f2255d330755c5c0791f2dbefba6708e6572c96,'
    },
    {
        name: 'coralColorChartsColor08Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(22, 88%, 84%, 1)',
        hex: '#facbb0',
        value: 'hsla(22, 88%, 84%, 1)',
        id: 'S:d579c1dabfd78618df9d1f2331ce493aecda0fcd,'
    },
    {
        name: 'coralColorChartsColor08Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(22, 75%, 42%, 1)',
        hex: '#b9541b',
        value: 'hsla(22, 75%, 42%, 1)',
        id: 'S:98aba11850cb841b7b47d27d4f4f58635e6cf3f4,'
    },
    {
        name: 'coralColorChartsColor08Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(22, 75%, 42%, 1)',
        hex: '#b9541b',
        value: 'hsla(22, 75%, 42%, 1)',
        id: 'S:fbd775d6781100ab78f34e1739b17eadefc93d12,'
    },
    {
        name: 'coralColorChartsColor09',
        type: 'color',
        description: `Chart color used in combinations with the other numerical chart colors. 

Ex: Chart with three types of values? use chart-color-00, chart-color-01 and chart-color-03.`,
        hsla: 'hsla(34, 34%, 45%, 1)',
        hex: '#99784c',
        value: 'hsla(34, 34%, 45%, 1)',
        id: 'S:c36693434b12e24c60496af7e5069a405ac6c7e3,'
    },
    {
        name: 'coralColorChartsColor09Weak',
        type: 'color',
        description: ``,
        hsla: 'hsla(35, 28%, 82%, 1)',
        hex: '#ded3c4',
        value: 'hsla(35, 28%, 82%, 1)',
        id: 'S:f4224d0f302d3c637cf25f6c877926357b09f5fd,'
    },
    {
        name: 'coralColorChartsColor09Strong',
        type: 'color',
        description: ``,
        hsla: 'hsla(35, 34%, 27%, 1)',
        hex: '#5b482d',
        value: 'hsla(35, 34%, 27%, 1)',
        id: 'S:7ad3e194bd337aa2cdd3e0f14519b7dbeeb997db,'
    },
    {
        name: 'coralColorChartsColor09Hover',
        type: 'color',
        description: ``,
        hsla: 'hsla(35, 34%, 27%, 1)',
        hex: '#5b482d',
        value: 'hsla(35, 34%, 27%, 1)',
        id: 'S:72d13f5101e61b0cbc51cb43d69f6130f3401cc6,'
    },
    {
        name: 'coralColorAccentBorder',
        type: 'color',
        description: `Border with accent color.
Use for interactive items.

Ex: ButtonSecondary`,
        hsla: 'hsla(204, 95%, 31%, 1)',
        hex: '#045d9a',
        value: 'hsla(204, 95%, 31%, 1)',
        id: 'S:42634bfd0b5232c9141eeca48dcb3e68f4fa539c,'
    },
    {
        name: 'coralColorChartsDefaultText',
        type: 'color',
        description: `Text color for chart-default. 

Text on a chart is discouraged, but if you must, then use this with chart-default.`,
        hsla: 'hsla(205, 87%, 94%, 1)',
        hex: '#e3f2fd',
        value: 'hsla(205, 87%, 94%, 1)',
        id: 'S:4053126865c4a29f156c4510e949fe1dc7acb1cb,'
    },
    {
        name: 'coralColorChartsDefaultTextStrong',
        type: 'color',
        description: `Strong text color for chart-default-weak. 

Text on a chart is discouraged, but if you must, then use this with chart-default-weak.`,
        hsla: 'hsla(205, 93%, 22%, 1)',
        hex: '#04426d',
        value: 'hsla(205, 93%, 22%, 1)',
        id: 'S:32f8872c35f7aef21e55d005702eee76f6900f79,'
    },
    {
        name: 'coralColorChartsDefaultTextWeak',
        type: 'color',
        description: `Weak text color for chart-default-strong. 

Text on a chart is discouraged, but if you must, then use this with chart-default-strong.`,
        hsla: 'hsla(207, 93%, 94%, 1)',
        hex: '#e3f2fe',
        value: 'hsla(207, 93%, 94%, 1)',
        id: 'S:26c5c4563fd31c901e561c0c5ea588dfdfad27af,'
    },
    {
        name: 'coralColorChartsColor09Text',
        type: 'color',
        description: ``,
        hsla: 'hsla(36, 36%, 5%, 1)',
        hex: '#130f09',
        value: 'hsla(36, 36%, 5%, 1)',
        id: 'S:25b5c8aaf3d73df7f9c85c67f7e0b1ae80e36d96,'
    },
    {
        name: 'coralColorChartsColor09TextStrong',
        type: 'color',
        description: ``,
        hsla: 'hsla(36, 36%, 5%, 1)',
        hex: '#130f09',
        value: 'hsla(36, 36%, 5%, 1)',
        id: 'S:64fe115052f5128efc8808e4604fb4916f95aa2b,'
    },
    {
        name: 'coralColorChartsColor09TextWeak',
        type: 'color',
        description: ``,
        hsla: 'hsla(35, 28%, 82%, 1)',
        hex: '#ded3c4',
        value: 'hsla(35, 28%, 82%, 1)',
        id: 'S:06b63dfa38fd3587b0d9ac36e39aa42ee105af9f,'
    },
    {
        name: 'coralColorNeutralBackgroundHeavy',
        type: 'color',
        description: ``,
        hsla: 'hsla(0, 0%, 78%, 1)',
        hex: '#c7c7c7',
        value: 'hsla(0, 0%, 78%, 1)',
        id: 'S:68962413973388b6bbd8a7289c8a6663b0a0f181,'
    },
    {
        name: 'coralColorIllustrationColor01',
        type: 'color',
        description: ``,
        hsla: 'hsla(211, 62%, 26%, 1)',
        hex: '#19416c',
        value: 'hsla(211, 62%, 26%, 1)',
        id: 'S:762d0c0efa6779e5cdc76d66f776e14ee71a025b,'
    },
    {
        name: 'coralColorIllustrationColor02',
        type: 'color',
        description: ``,
        hsla: 'hsla(211, 43%, 47%, 1)',
        hex: '#4577ac',
        value: 'hsla(211, 43%, 47%, 1)',
        id: 'S:837b9aebd89eab69c43d006ede8092ef135bf95b,'
    },
    {
        name: 'coralColorIllustrationColor03',
        type: 'color',
        description: ``,
        hsla: 'hsla(201, 31%, 85%, 1)',
        hex: '#cedde5',
        value: 'hsla(201, 31%, 85%, 1)',
        id: 'S:9e47f29eb4617ca185e105e34389f738cf219851,'
    },
    {
        name: 'coralColorIllustrationColor05',
        type: 'color',
        description: ``,
        hsla: 'hsla(359, 82%, 81%, 1)',
        hex: '#f6a5a6',
        value: 'hsla(359, 82%, 81%, 1)',
        id: 'S:daf383f79d6e42fd6a76b0c742d1ca53479fa80f,'
    },
    {
        name: 'coralColorIllustrationColor04',
        type: 'color',
        description: ``,
        hsla: 'hsla(359, 100%, 72%, 1)',
        hex: '#ff6e70',
        value: 'hsla(359, 100%, 72%, 1)',
        id: 'S:149abb7212b5f90ed8fd51b42d0c1b0c041c41ce,'
    },
    {
        name: 'coralColorIllustrationColor06',
        type: 'color',
        description: ``,
        hsla: 'hsla(358, 100%, 93%, 1)',
        hex: '#ffdadb',
        value: 'hsla(358, 100%, 93%, 1)',
        id: 'S:ab2775175f55f85408df3dd7d669ac917ce9eadb,'
    },
    {
        name: 'coralColorIllustrationSkintone01',
        type: 'color',
        description: ``,
        hsla: 'hsla(20, 91%, 83%, 1)',
        hex: '#fbc6ab',
        value: 'hsla(20, 91%, 83%, 1)',
        id: 'S:f7567796748717162af5198cb896f4ed96ee4742,'
    },
    {
        name: 'coralColorIllustrationSkintone02',
        type: 'color',
        description: ``,
        hsla: 'hsla(21, 34%, 55%, 1)',
        hex: '#b27f64',
        value: 'hsla(21, 34%, 55%, 1)',
        id: 'S:0b0d80721bce8ed6c2f64ebdb7c3090a42424c9e,'
    },
    {
        name: 'coralColorIllustrationSkintone03',
        type: 'color',
        description: ``,
        hsla: 'hsla(17, 33%, 28%, 1)',
        hex: '#5f3d30',
        value: 'hsla(17, 33%, 28%, 1)',
        id: 'S:c35a128779db152d6cf8e6bff417efeac92e6a06,'
    },
    {
        name: 'coralColorIllustrationShadow',
        type: 'color',
        description: ``,
        hsla: 'hsla(0, 0%, 0%, 0.1)',
        hex: '#0000001a',
        value: 'hsla(0, 0%, 0%, 0.1)',
        id: 'S:172b785f68dba8621e1a503f9d7ae87479f49167,'
    },
    {
        name: 'coralColorIllustrationColor07',
        type: 'color',
        description: ``,
        hsla: 'hsla(192, 33%, 97%, 1)',
        hex: '#f5f9fa',
        value: 'hsla(192, 33%, 97%, 1)',
        id: 'S:a057cff7a96776950911855a2cfdc6908bea927e,'
    },
    {
        name: 'coralColorIllustrationColor08',
        type: 'color',
        description: ``,
        hsla: 'hsla(211, 23%, 74%, 1)',
        hex: '#adbccc',
        value: 'hsla(211, 23%, 74%, 1)',
        id: 'S:939faa25bd307250cd34b2b27dea01b5798ec269,'
    },
    {
        name: 'coralColorIllustrationColor09',
        type: 'color',
        description: ``,
        hsla: 'hsla(245, 10%, 23%, 1)',
        hex: '#35343f',
        value: 'hsla(245, 10%, 23%, 1)',
        id: 'S:603e1e228ae66fa1496162cb8cdbec5a70580da9,'
    },
    {
        name: 'coralColorAccentBackgroundSelected',
        type: 'color',
        description: `Accent background for currently selected elements: 

Ex: Selected column or line in a datagrid.`,
        hsla: 'hsla(204, 100%, 95%, 1)',
        hex: '#e3f4ff',
        value: 'hsla(204, 100%, 95%, 1)',
        id: 'S:8e41c9f17635925c89f424569bb6ac93eb5c008e,'
    },
    {
        name: 'coralColorBrandingBackground',
        type: 'gradient',
        description: `Main brand background. Used for heroes.`,
        value: 'linear-gradient(133deg,hsla(210, 62%, 26%, 1) 0%, hsla(254, 47%, 23%, 1) 100%)',
        id: 'S:48da8b40c9b41977ec986642cfb91febb77cc536,'
    },
    {
        name: 'coralColorBrandingNavigation',
        type: 'gradient',
        description: `Main navigation background. Used for TopBar and branded Sidebar.`,
        value: 'linear-gradient(133deg,hsla(210, 62%, 26%, 1) 0%, hsla(254, 47%, 23%, 1) 100%)',
        id: 'S:901ebd713b6444217424da171789495f7e32c8d2,'
    },
    {
        name: 'coralSpacingXxs',
        type: 'measure',
        description: `Use for paddings or margins`,
        value: '0.4rem',
        id: '16bfe560-b4c3-11ec-8521-cbbf4c303d59'
    },
    {
        name: 'coralSpacingXs',
        type: 'measure',
        description: `Use for paddings or margins`,
        value: '0.8rem',
        id: '1ca7bca0-b4c3-11ec-b522-2f15f0dfcaeb'
    },
    {
        name: 'coralSpacingS',
        type: 'measure',
        description: `Use for paddings or margins`,
        value: '1.2rem',
        id: '2c35d2b0-b4c3-11ec-96ab-01d033d945fb'
    },
    {
        name: 'coralSpacingM',
        type: 'measure',
        description: `Use for paddings or margins`,
        value: '1.6rem',
        id: '35c79f20-b4c3-11ec-84df-e5bfacc479f2'
    },
    {
        name: 'coralSpacingL',
        type: 'measure',
        description: `Use for margins, paddings of really necessary`,
        value: '2.8rem',
        id: '3b3dc8d0-b4c3-11ec-b3c9-73d93683841a'
    },
    {
        name: 'coralSpacingXl',
        type: 'measure',
        description: `Use for margins, paddings of really necessary`,
        value: '3.6rem',
        id: '4247b1e0-b4c3-11ec-8804-23bba7614e8e'
    },
    {
        name: 'coralSizingMinimal',
        type: 'measure',
        description: `Use for fixed-size elements`,
        value: '1.2rem',
        id: 'c3717da0-b4c3-11ec-8909-db885780505b'
    },
    {
        name: 'coralSizingXxxs',
        type: 'measure',
        description: `For fixed-size elements. Minimal size for interactive elements.`,
        value: '1.6rem',
        id: 'ed784f70-b4c3-11ec-b3b5-d3127ac3649e'
    },
    {
        name: 'coralSizingXxs',
        type: 'measure',
        description: `Use for fixed-size elements`,
        value: '2rem',
        id: '08dc2e80-b4c4-11ec-8350-c9f2819e7422'
    },
    {
        name: 'coralSizingXs',
        type: 'measure',
        description: `Use for fixed-size elements`,
        value: '2.4rem',
        id: '0e48e250-b4c4-11ec-b383-adf02fe16153'
    },
    {
        name: 'coralSizingS',
        type: 'measure',
        description: `Use for fixed-size elements. 

Ex: Small Buttons`,
        value: '2.8rem',
        id: '12bf4f40-b4c4-11ec-ae8c-a93a8912678c'
    },
    {
        name: 'coralSizingM',
        type: 'measure',
        description: `Use for fixed-size elements.

Ex: Buttons`,
        value: '3.6rem',
        id: '1c14d600-b4c4-11ec-9b40-6fc6b8a4ad7a'
    },
    {
        name: 'coralSizingL',
        type: 'measure',
        description: `Use for fixed-size elements.

Ex: Icon illustration`,
        value: '4rem',
        id: '21129b60-b4c4-11ec-a702-27e439bbf696'
    },
    {
        name: 'coralSizingXxxl',
        type: 'measure',
        description: `Use for fixed-size elements.

Ex: Spot illustration height`,
        value: '22rem',
        id: '292e1b80-b4c4-11ec-800e-5bc0e3562a54'
    },
    {
        name: 'coralSizingMaximal',
        type: 'measure',
        description: `Use for fixed-size elements.

Ex: Spot illustration width`,
        value: '32rem',
        id: '2e751ee0-b4c4-11ec-9f9f-75ac4ca4ac00'
    },
    {
        name: 'coralElevationShadowNeutralM',
        type: 'shadow',
        description: `Default shadow. 

Use on "first layer" of elevation. `,
        value: '0rem 0.2rem 0.6rem 0rem hsla(0, 0%, 0%, 0.3)',
        id: 'S:34a756f910ffc665554a228b44d5eec1e9c463cb,:shadow:0'
    },
    {
        name: 'coralElevationShadowAccent',
        type: 'shadow',
        description: `Shadow with an accent tint. 

Use for subtle highlights. 

Ex: InlineMessage`,
        value: '0rem 0.1rem 0.1rem 0rem hsla(204, 95%, 31%, 0.3)',
        id: 'S:6361d40b509d112c733483b262d9b4929ad0e1a9,:shadow:0'
    },
    {
        name: 'coralElevationShadowSuccess',
        type: 'shadow',
        description: `Shadow with a success tint. 

Use for subtle highlights. 

Ex: InlineMessage`,
        value: '0rem 0.1rem 0.1rem 0rem hsla(111, 49%, 34%, 0.3)',
        id: 'S:1ccb355087e7a77695f62496bf7eb5c597e51b63,:shadow:0'
    },
    {
        name: 'coralElevationShadowDanger',
        type: 'shadow',
        description: `Shadow with a danger tint. 

Use for subtle highlights. 

Ex: InlineMessage`,
        value: '0rem 0.1rem 0.1rem 0rem hsla(359, 51%, 53%, 0.3)',
        id: 'S:127a019202b5a99380f18aeda574499aa518d902,:shadow:0'
    },
    {
        name: 'coralElevationShadowWarning',
        type: 'shadow',
        description: `Shadow with a warning tint. 

Use for subtle highlights. 

Ex: InlineMessage`,
        value: '0rem 0.1rem 0.1rem 0rem hsla(22, 93%, 41%, 0.3)',
        id: 'S:b336004b0f814ea5dea03c146da768f78dbe6495,:shadow:0'
    },
    {
        name: 'coralElevationShadowBeta',
        type: 'shadow',
        description: `Shadow with a beta tint. 

Use for subtle highlights. 

Ex: InlineMessage`,
        value: '0rem 0.1rem 0.1rem 0rem hsla(281, 58%, 29%, 0.3)',
        id: 'S:8b514aff6b0d1ad3862f3d1f04d9f0a7d9ee6f3e,:shadow:0'
    },
    {
        name: 'coralElevationShadowNeutralInvertedM',
        type: 'shadow',
        description: `Default shadow. 

Use on "first layer" of elevation. Reserve it for elements sticking to the bottom of the viewport.`,
        value: '0rem -0.2rem 0.6rem 0rem hsla(0, 0%, 0%, 0.3)',
        id: 'S:1402e349bd668e8e2765a70a5b3c9d4aa261f6ac,:shadow:0'
    },
    {
        name: 'coralElevationShadowNeutralInvertedL',
        type: 'shadow',
        description: `Large shadow. 

Use on "second layer" of elevation - something that need to be "above" anything else.
Reserve it for elements sticking to the bottom of the viewport.`,
        value: '0rem -0.4rem 0.8rem 0rem hsla(0, 0%, 0%, 0.3)',
        id: 'S:2442aa4ab53dacae61024bae62200ad42e042707,:shadow:0'
    },
    {
        name: 'coralElevationShadowNeutralL',
        type: 'shadow',
        description: `Large shadow. 

Use on "second layer" of elevation - something that need to be "above" anything else.`,
        value: '0rem 0.4rem 0.8rem 0rem hsla(0, 0%, 0%, 0.3)',
        id: 'S:a2f6e4c6b17f0f6fcf8525d14fbd34f992350375,:shadow:0'
    },
    {
        name: 'coralHeadingL',
        type: 'typography',
        description: `Heading text - Use for highest level headings.`,
        value: `600 1.8rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1.8rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:6bb115f27ce676bc5491994efd88dc26e42f8278,'
    },
    {
        name: 'coralParagraphM',
        type: 'typography',
        description: `Paragraph text - Standard size.`,
        value: `400 1.4rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '1.4rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:5f86329d644f421531e3b10ecd2c2ddc9aab7534,'
    },
    {
        name: 'coralParagraphMBold',
        type: 'typography',
        description: `Paragraph text - Standard size, bold.`,
        value: `600 1.4rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1.4rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:d0051bcd9176315ca785dcd5f4f38cae78fc3365,'
    },
    {
        name: 'coralParagraphS',
        type: 'typography',
        description: `Paragraph text - Small size.`,
        value: `400 1.2rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '1.2rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:b65ed5e12e3bdbcd4e4d5c671e5e0c4e9c036508,'
    },
    {
        name: 'coralParagraphSBold',
        type: 'typography',
        description: `Paragraph text - Standard size bold.`,
        value: `600 1.2rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1.2rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:d1431673fbf2f45ad943eadb6059a7772f5e6135,'
    },
    {
        name: 'coralHeadingM',
        type: 'typography',
        description: `Heading text - Use for medium level headings, most current ones.`,
        value: `600 1.6rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1.6rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:66b449607e413393608bc764de806198cd9c823c,'
    },
    {
        name: 'coralHeadingS',
        type: 'typography',
        description: `Heading text - Use for small level headings. Use with caution, this can clash with bold paragraphs.`,
        value: `600 1.4rem/140% 'Source Sans Pro'`,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1.4rem',
        lineHeight: '140%',
        fontFamily: 'Source Sans Pro',
        id: 'S:3dd149175fbc721e3fb89a0b02bcfd5d52ac651e,'
    },
    {
        name: 'coralDataM',
        type: 'typography',
        description: ``,
        value: `400 1.4rem/140% 'Inconsolata'`,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '1.4rem',
        lineHeight: '140%',
        fontFamily: 'Inconsolata',
        id: 'S:1237da4bc0c13b10a30023cb0076edbfc83f79e8,'
    },
    {
        name: 'coralDataMBold',
        type: 'typography',
        description: ``,
        value: `700 1.4rem/140% 'Inconsolata'`,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '1.4rem',
        lineHeight: '140%',
        fontFamily: 'Inconsolata',
        id: 'S:4d7b8461e5b594b28d6d64272b468b810ff31e92,'
    },
    {
        name: 'coralRadiusM',
        type: 'radius',
        description: `Radius for molecules (Accordion, Fieldset, Popover, etc.)`,
        value: '0.8rem',
        id: '73293f90-3e58-11ec-94da-6d5db9104cfa'
    },
    {
        name: 'coralRadiusL',
        type: 'radius',
        description: `Radius for layout components (Card, Modal, etc.)`,
        value: '1.6rem',
        id: '7ba9c311-3e58-11ec-94da-6d5db9104cfa'
    },
    {
        name: 'coralRadiusRound',
        type: 'radius',
        description: `Radius for immediate actions (badges, switch, etc.)`,
        value: '9999.9rem',
        id: '887c1481-3e58-11ec-94da-6d5db9104cfa'
    },
    {
        name: 'coralRadiusS',
        type: 'radius',
        description: `Radius for atomic components (button, tag, tooltip, etc.) `,
        value: '0.4rem',
        id: '52824640-4783-11ec-a826-6db8532cd4e8'
    },
    {
        name: 'coralBorderSSolid',
        type: 'border',
        description: `Solid border to visually separate elements`,
        value: `1px solid`,
        id: '2856c970-40b4-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralBorderMSolid',
        type: 'border',
        description: `Solid border to visually identify a selection`,
        value: `2px solid`,
        id: '3105aff1-40b4-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralBorderSDashed',
        type: 'border',
        description: `Dashed border to visually identify potentially interactive components.

Ex: Droppable zone`,
        value: `1px dashed`,
        id: '37916851-40b4-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralBorderMDashed',
        type: 'border',
        description: `Dashed border to visually identify a possible selection.

Ex: Ongoing mapper link`,
        value: `2px dashed`,
        id: '43602c71-40b4-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralOpacityL',
        type: 'opacity',
        description: `Very transparent.

Opacity for components that are not currently enabled.`,
        value: `0.2`,
        id: 'ddfa9d50-40b5-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralOpacityM',
        type: 'opacity',
        description: `Transparent.

Opacity for components that are only temporarily disabled.`,
        value: `0.4`,
        id: 'e9be8c01-40b5-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralOpacityS',
        type: 'opacity',
        description: `Barely transparent.`,
        value: `0.6`,
        id: 'f65d4a51-40b5-11ec-a696-dbb292a77d6e'
    },
    {
        name: 'coralBreakpointS',
        type: 'breakpoint',
        description: `Small screen (Portrait)`,
        value: `40em`,
        id: 'e8d1aad0-4140-11ec-8de5-f7dcd20b9ace'
    },
    {
        name: 'coralBreakpointM',
        type: 'breakpoint',
        description: `Small screen (Landscape)`,
        value: `48em`,
        id: 'f70c8cf1-4140-11ec-8de5-f7dcd20b9ace'
    },
    {
        name: 'coralBreakpointL',
        type: 'breakpoint',
        description: `Wide screen (Portrait)`,
        value: `64em`,
        id: '034adbc1-4141-11ec-8de5-f7dcd20b9ace'
    },
    {
        name: 'coralBreakpointXl',
        type: 'breakpoint',
        description: `Wide screen (Landscape)`,
        value: `80em`,
        id: '12525cb1-4141-11ec-8de5-f7dcd20b9ace'
    },
    {
        name: 'coralBrandingLogo',
        type: 'branding',
        description: `Brand logo in App heading`,
        value: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ3SURBVHgB7Zu/UxNBFMe/e6ahQ0qxiBpaQWfUTjM0aqMMnWMh1iJEeyHBXiLqjDM6IP+A0Dk2Gkq0EMaxkhmuADsgNmZGgfW9vZz5dUcul938uPGbCbnb+5H95L3bu33vIaBZMpXqxT6GADEIIYcgaFmilzbFq3a1aZtN2/KQIkdHrovn2Rw0S0CDilBJOtskrRKcAgqjPL1zEGJZzM0uQoOaAlRghwQlkUJ4KD/ZYNg/yIiXWRshFQrQMFjN11EvM/iNxTCgDQPK8dQIHbUA82DV2iTXzTTquoEBldUkpslyKbRTFmap1zMim80H2T0QIMHFCWyJAIfQGdqka3M4iMvWBVRwB/iI2mG+3QoEeSRgB8O5qgvpC9gFcK6OhPQEVAPKAb6g8+EcCeqrRZAeA4/leQCPlt0Cx5I4R+8pr001FpT3U2P0sYDuk6TXKD3PLpc3VlhQXXdQ1jOn61eBvj4YkKDXE3V5lanSRQ9xByZd89IFArwGDJyBIZ2ih/6KB5F/gMp6EmmYUk+PA2daAhPlVixZcN8gHMuca1breLkVS4ACV2BKDJc0d/oalVlRARZHzjhMiOFa4ZqVoumcUL+oa8Gb0C2+5m7fagccS0DKSWcByoJ70DW/Y7DkZccledlLGxvAzm5l2y6tv3sPjdrDMZyO0QQ2CV1woyN0K7joD+YqkaB3VdvOjm5AFfyKqTmeltATnFFya9tZHkj471coAL8KlW1fv0G7JANaGkfP1/POJ4OmH/nv93YJWP0MwxLEdpYHmVbHVloniskyYBxRFQWcow1IbBYirv+A3S4GtBFd2ZZKX0VVkgGBdURVAj/ZgmuIpiSFYFYsoowqIFtwzUJMAUbxOsxzStwqRoOjaMUV/uPcByWeIlqSnOfnBQcwRrnwVrqp+eia7WaCFaByU51W5AltoeC/PeExGU5QMLi/H5qUcxdiKC1lKaPEgZrm54cMxzN7v1k9t3NAiuMwHN5g4JME951iNc9eoElJSqfNuCsVwQqKz6SpRU9ugt1w4l5wd+Qf5dW8E5BqRhIZGj3T7mrlwzZbkROKOsTWmSNrrH7iL/UXg3GwKf24eTju+z7elDfUps+cMpEl6BRbUbnhiVLEbesHsL2tA8oVj5x3q8tMvDO84yku1WhvuUijksiSaz6obvaeD8aQUWnh7tGm6rOHPAHVbcPCKHRdj2blFCH4FAYFKSP5AE4sdqbCl5G46mDIQIVAdWMyZHqbkhjD6CR35fEhYClXoKBTEfI8j1Q4+q5mXtwHKxgcq/FySidZyjUprXbZTYJ7WF0mUk9hC2Lj9MQwRkdPhT1HA3ImAvSUFbSEslzNljQz6HQxvx+HXtimwFxp65ByXYkbdMYkSjOSRs+fLwbBGCzXDBhCdiCQilnjQXqzZXvpW+KotbCtYrIc9JJijf+tgONDOqDK9RfJ1nAWmpwCzwAAAABJRU5ErkJggg==')`,
        id: 'ee8df300-4787-11ec-a826-6db8532cd4e8'
    },
    {
        name: 'coralTransitionInstant',
        type: 'transition',
        description: `Instant transition for hovering effects (opacity, color...)`,
        value: `100ms ease-out`,
        id: 'fde4cb70-5d8b-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralTransitionFast',
        type: 'transition',
        description: `Fast transition for "out" effects (closing menu, hide modal...)`,
        value: `250ms ease-in-out`,
        id: '087f7c61-5d8c-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralTransitionNormal',
        type: 'transition',
        description: `Normal transition for "in" effects (opening menu, show modal...)`,
        value: `300ms ease-in-out`,
        id: '1f78fc71-5d8c-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralTransitionSlow',
        type: 'transition',
        description: `Slow transition for background illustrations with movement.`,
        value: `400ms ease-in`,
        id: '31b8ec11-5d8c-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralElevationLayerFlat',
        type: 'elevation',
        description: `Default content elevation`,
        value: `0`,
        id: '26c8aba1-5d8d-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralElevationLayerStandardFront',
        type: 'elevation',
        description: `First elevation layer.

Just above the default content (Drawer, Modal, Fixed layout...)`,
        value: `4`,
        id: '2d995c41-5d8d-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralElevationLayerInteractiveFront',
        type: 'elevation',
        description: `Second elevation layer. 

For elements above any layout (Dropdown, Popover).`,
        value: `8`,
        id: '334e63b1-5d8d-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralElevationLayerOverlay',
        type: 'elevation',
        description: `Topmost layer.

For items that stand on top of anything (Alert, Confirm, Tooltip, etc.)`,
        value: `16`,
        id: '3853ca31-5d8d-11ec-9f08-61882f73ab2c'
    },
    {
        name: 'coralAnimationHeartbeat',
        type: 'animation',
        description: `Heartbeat animation. 

Ex: Skeletons 

Usage: 

animate: tokens.$animation-heartbeat;`,
        value: `coral-light-keyframes-blink 1.5s cubic-bezier(0.7, 0, 1, 1) infinite`,
        id: '4c3ea510-93cf-11ec-969d-2dcd5665e329'
    },
];

export default dictionary;