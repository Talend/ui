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
			illustration: (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.78125 21.9837C9.78125 20.447 11.0594 19.2012 12.6361 19.2012H18.3459C19.9226 19.2012 21.2008 20.447 21.2008 21.9837V30.3314C21.2008 31.8682 19.9226 33.114 18.3459 33.114H12.6361C11.0594 33.114 9.78125 31.8682 9.78125 30.3314V21.9837Z"
						fill="#CEDDE5"
					/>
					<path
						d="M19.2371 29.8797C18.7157 30.841 17.6795 31.4961 16.4863 31.4961L10.2674 31.4961C8.55016 31.4961 7.15803 30.1392 7.15803 28.4654L7.15803 19.3735C7.15803 17.6997 8.55016 16.3428 10.2674 16.3428L16.4863 16.3428C18.2036 16.3428 19.5957 17.6997 19.5957 19.3735L19.5957 26.6471"
						stroke="#4577AC"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M24.8125 19.4609C24.8125 18.6325 25.4861 17.9609 26.3171 17.9609H32.3353C33.1662 17.9609 33.8398 18.6325 33.8398 19.4609C33.8398 20.2894 33.1662 20.9609 32.3353 20.9609H26.3171C25.4861 20.9609 24.8125 20.2894 24.8125 19.4609Z"
						fill="#CEDDE5"
					/>
					<path
						d="M24.8125 25.5195C24.8125 24.6911 25.4861 24.0195 26.3171 24.0195H32.3353C33.1662 24.0195 33.8398 24.6911 33.8398 25.5195C33.8398 26.348 33.1662 27.0195 32.3353 27.0195H26.3171C25.4861 27.0195 24.8125 26.348 24.8125 25.5195Z"
						fill="#CEDDE5"
					/>
					<path
						d="M24.8125 31.582C24.8125 30.7536 25.4861 30.082 26.3171 30.082H29.3262C30.1571 30.082 30.8307 30.7536 30.8307 31.582C30.8307 32.4105 30.1571 33.082 29.3262 33.082H26.3171C25.4861 33.082 24.8125 32.4105 24.8125 31.582Z"
						fill="#CEDDE5"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M2.14258 14.6562L2.14272 10.1065C2.14272 6.68005 4.90069 3.90234 8.30281 3.90234H32.9432C36.3453 3.90234 39.1033 6.68005 39.1033 10.1065V14.6562H2.14258ZM9.65625 7.47266C9.65625 6.64423 8.98468 5.97266 8.15625 5.97266C7.32782 5.97266 6.65625 6.64423 6.65625 7.47266C6.65625 8.30108 7.32782 8.97266 8.15625 8.97266C8.98468 8.97266 9.65625 8.30108 9.65625 7.47266ZM14.1699 7.47266C14.1699 6.64423 13.4983 5.97266 12.6699 5.97266C11.8414 5.97266 11.1699 6.64423 11.1699 7.47266C11.1699 8.30108 11.8414 8.97266 12.6699 8.97266C13.4983 8.97266 14.1699 8.30108 14.1699 7.47266ZM17.1836 5.97266C18.012 5.97266 18.6836 6.64423 18.6836 7.47266C18.6836 8.30108 18.012 8.97266 17.1836 8.97266C16.3552 8.97266 15.6836 8.30108 15.6836 7.47266C15.6836 6.64423 16.3552 5.97266 17.1836 5.97266Z"
						fill="#CEDDE5"
					/>
					<path
						d="M2.14258 9.06912C2.14258 5.72155 4.83703 3.00781 8.16081 3.00781H32.2337C35.5575 3.00781 38.252 5.72155 38.252 9.06912V30.2837C38.252 31.9357 37.5958 33.4333 36.5316 34.5266M26.1016 36.345H8.16081C4.83703 36.345 2.14258 33.6312 2.14258 30.2837V14.8255"
						stroke="#4577AC"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<circle cx="24.3848" cy="18.1641" r="1" fill="#4577AC" />
					<circle cx="27.8203" cy="18.1641" r="1" fill="#4577AC" />
					<circle cx="29.8301" cy="36.3457" r="1" fill="#4577AC" />
					<circle cx="33.4961" cy="35.9453" r="1" fill="#4577AC" />
					<path
						d="M30.6953 18.1641H33.338M31.5326 24.3264H24.0098M24.0098 30.4887H28.2225"
						stroke="#4577AC"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			),
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
