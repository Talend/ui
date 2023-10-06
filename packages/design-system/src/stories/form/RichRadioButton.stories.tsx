import { Illustration, RichRadioButton } from '../../';

export default {
	component: RichRadioButton,
	title: 'Form/RichRadioButton',
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

export const RichRadioButtonWithTagsAndIllustration = () => (
	<RichRadioButton
		asset={{
			illustration: Illustration.IconDefault,
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'richRadioButtonWithTagsAndIllustration'}
		name={'richRadioButtonWithTagsAndIllustration'}
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

export const CheckedRichRadioButtonWithTagsAndIllustration = () => (
	<RichRadioButton
		asset={{
			illustration: Illustration.IconDefault,
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonWithTagsAndIllustration'}
		isChecked={true}
		name={'checkedRichRadioButtonWithTagsAndIllustration'}
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

export const CheckedRichRadioButtonWithTagsAndLogo = () => (
	<RichRadioButton
		asset={{
			logo: 'talend-snowflake',
		}}
		description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
		Porro nihil delectus quaerat repellat saepe officiis id aut. 
		Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?"
		id={'checkedRichRadioButtonWithTagsAndLogo'}
		isChecked={true}
		name={'checkedRichRadioButtonWithTagsAndLogo'}
		onChange={() => {}}
		title="This is a snowflake title"
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
