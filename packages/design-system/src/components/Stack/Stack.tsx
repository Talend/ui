import React from 'react';
import classnames from 'classnames';
import styles from './Stack.module.scss';

export const justifyOptions = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    spaceBetween: 'justify-space-between',
    spaceAround: 'justify-space-around',
    spaceEvenly: 'justify-space-evenly',
};

export type StackProps = {
    as?: 'div' | 'ul' | 'ol';
    children: React.ReactElement;
    justify?: keyof typeof justifyOptions;
};

function Stack({ as = 'div', children, justify = 'start'}: StackProps){
    const TagType = as;
    const childrenArray = React.Children.toArray(children);
    return (
        <TagType className={classnames(
            styles.stack,
            styles[justifyOptions[justify]]
        )}
        >
            {childrenArray.map(child => (
                <div key={child.key}>
                    {React.cloneElement(child)}
                </div>
            ))}
        </TagType>
    );
}

export default Stack;
