import React, { HTMLAttributes } from 'react';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';

export default {
	component: Textarea,
};

export const InputPrimitive = () => <Input type="password" />;
export const TextareaPrimitive = () => <Textarea />;
