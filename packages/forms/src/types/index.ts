// can't list other modes for now, will complete this list
export type DisplayMode = 'text' | string;

export type ActionProps = Record<string, unknown>;

export type UiSchema = any[];

export type FormDefinition = {
	jsonSchema: any;
	uiSchema: UiSchema;
};
