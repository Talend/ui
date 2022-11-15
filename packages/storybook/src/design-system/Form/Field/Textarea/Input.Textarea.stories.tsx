import React from 'react';
import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Textarea,
};

export const Textarea = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Textarea placeholder="Placeholder" name="time" label="Textarea" />
		<Form.Textarea placeholder="Placeholder" name="time" label="Textarea disabled" disabled />
		<Form.Textarea placeholder="Placeholder" name="time" label="Textarea read-only" readOnly />
		<Form.Textarea
			placeholder="Placeholder"
			name="time"
			label="Textarea read-only"
			required
			hasError
			description="This field is required"
		/>
		<Form.Textarea
			name="time"
			label="Textarea filled"
			defaultValue="Default content for a textarea field."
		/>
		<Form.Textarea
			name="time"
			label="Textarea filled disabled"
			defaultValue="Default content for a textarea field."
			disabled
		/>
		<Form.Textarea
			name="time"
			label="Textarea filled read-only"
			defaultValue="Default content for a textarea field."
			readOnly
		/>
		<Form.Textarea
			name="time"
			label="Textarea filled"
			defaultValue="Default content for a textarea field."
			required
			hasError
			description="There is an error here"
		/>
	</StackVertical>
);

export const TextareaMaxedOut = () => (
	<Form.Textarea
		placeholder="Placeholder"
		name="time"
		label="Textarea"
		defaultValue="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
	/>
);
