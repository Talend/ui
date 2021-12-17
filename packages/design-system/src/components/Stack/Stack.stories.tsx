import React from 'react';
import { Story } from '@storybook/react';

import Stack, { StackProps} from './Stack';

export default {
    component: Stack,
};

const Template = args => {
    return (
        <Stack
            {...args}
            gap="XL"
            padding="M"
        >
            <>Plick</>
            <>Pluck</>
            <div>Plock</div>
        </Stack>
    );
};

export const Test: Story<StackProps> = Template.bind({});
