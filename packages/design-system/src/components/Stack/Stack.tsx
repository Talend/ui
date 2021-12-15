import React from 'react';

type StackProps = {
    as?: 'div' | 'ul' | 'ol';
    children: React.ReactElement;
};

function Stack({ as = 'div', children}: StackProps){
    const TagType = as;
    const childrenArray = React.Children.toArray(children);
    return (
        <TagType>
            {childrenArray.map(child => (
                <div key={child.key}>
                    {React.cloneElement(child)}
                </div>
            ))}
        </TagType>
    );
}

export default Stack;
