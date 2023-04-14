import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeTagProps = Omit<BadgePrimitiveProps, 'semanticIcon'>;

const BadgeTag = (props: BadgeTagProps) => <BadgePrimitive {...props} semanticIcon={'none'} />;

export default BadgeTag;
