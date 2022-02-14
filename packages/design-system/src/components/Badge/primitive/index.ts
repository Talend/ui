import Badge, { BadgeProps as BaseProps } from './Badge';

export type BadgeProps = Omit<BaseProps, 'className'>;

export { Badge };
