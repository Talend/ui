import React from 'react';
import { storiesOf } from '@storybook/react';

import { QualityBar } from './QualityBar.component';

const stories = storiesOf('Data/Dataviz/QualityBar', module);
stories
    .addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
    .add('Quality bar', () => (
        <div>
            <section>
                <header>Quality Bar</header>
                <div>
                    <div>Homogeneous Quality</div>
                    <QualityBar invalid={30} valid={30} empty={30}></QualityBar>
                    <div>Very invalid</div>
                    <QualityBar invalid={30} valid={0} empty={0}></QualityBar>
                    <div>Best quality ever</div>
                    <QualityBar invalid={0} valid={30} empty={0}></QualityBar>
                    <div>Nothing to see here</div>
                    <QualityBar invalid={0} valid={0} empty={30}></QualityBar>
                    <div>Invalid and Empty</div>
                    <QualityBar invalid={0} valid={30} empty={30}></QualityBar>
                    <div>Classic look</div>
                    <QualityBar invalid={2} valid={88} empty={3}></QualityBar>
                    <div>Classic look (again yep)</div>
                    <QualityBar invalid={122} valid={1088} empty={293}></QualityBar>
                    <div>I really like the digits !</div>
                    <QualityBar invalid={30} valid={30} empty={30} digits={5}></QualityBar>
                </div>
            </section>
        </div>
    ));
