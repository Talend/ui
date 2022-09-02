import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputWeekProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Week = forwardRef((props: InputWeekProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="week" ref={ref} />;
});

Week.displayName = 'Week';

export default Week;
