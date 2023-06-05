import { RichRadioButton } from '@talend/design-system';

export default {
	component: RichRadioButton,
};

export const DefaultStory = () => (
	<RichRadioButton
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
	Porro nihil delectus quaerat repellat saepe officiis id aut. 
	Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButton'}
		name={'richRadioButton'}
		onChange={() => {}}
		title="This is a title"
	/>
);

export const RichRadioButtonWithTags = () => (
	<RichRadioButton
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButtonWithTags'}
		name={'richRadioButtonWithTags'}
		onChange={() => {}}
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
		title="This is a title"
	/>
);

export const RichRadioButtonWithTagsAndIcon = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButtonWithTagsAndIcon'}
		name={'richRadioButtonWithTagsAndIcon'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);

export const RichRadioButtonDisabled = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButtonDisabled'}
		isDisabled={true}
		name={'richRadioButtonDisabled'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);

export const RichRadioButtonReadOnly = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButtonReadOnly'}
		isReadOnly={true}
		name={'richRadioButtonReadOnly'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);

export const CheckedRichRadioButton = () => (
	<RichRadioButton
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
	Porro nihil delectus quaerat repellat saepe officiis id aut. 
	Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButton'}
		isChecked={true}
		name={'checkedRichRadioButton'}
		onChange={() => {}}
		title="This is a title"
	/>
);

export const CheckedRichRadioButtonWithTags = () => (
	<RichRadioButton
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonWithTags'}
		isChecked={true}
		name={'checkedRichRadioButtonWithTags'}
		onChange={() => {}}
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
		title="This is a title"
	/>
);

export const CheckedRichRadioButtonWithTagsAndIcon = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonWithTagsAndIcon'}
		isChecked={true}
		name={'checkedRichRadioButtonWithTagsAndIcon'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);

export const CheckedRichRadioButtonDisabled = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonDisabled'}
		isDisabled={true}
		isChecked={true}
		name={'checkedRichRadioButtonDisabled'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);

export const CheckedRichRadioButtonReadOnly = () => (
	<RichRadioButton
		asset={{
			name: 'user',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonReadOnly'}
		isReadOnly={true}
		isChecked={true}
		name={'checkedRichRadioButtonReadOnly'}
		onChange={() => {}}
		title="This is a title"
		tags={[
			{
				name: 'Tag 1',
			},
			{
				name: 'Tag 2',
				variant: 'information',
			},
			{
				name: 'Tag 3',
				variant: 'information',
			},
		]}
	/>
);
