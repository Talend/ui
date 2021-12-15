import React from 'react';
import { Story } from '@storybook/react';

import Stack from './Stack';

export const Test = (props: Story) => {
    return (
        <Stack {...props}>
            <>Plick</>
            <>Pluck</>
            <div>Plock</div>
        </Stack>
    );
};

