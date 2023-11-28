import { Actions } from '@talend/react-components';

interface CustomArrayTemplateProps {
	canReorder?: boolean;
	id?: string;
	onAdd: () => void;
	onRemove: (event: MouseEvent, index: number) => void;
	onReorder: (event: MouseEvent, payload: object) => void;
	renderItem: (index: number) => void;
	value: object[];
}

export function CustomArrayTemplate({
	canReorder,
	id,
	onAdd,
	onRemove,
	onReorder,
	renderItem,
	value,
}: CustomArrayTemplateProps) {
	return (
		<div>
			<style>
				{`
					ol {
						list-style: none;
					}

					.icon-up svg {
						 transform: rotate(180deg);
					}
				`}
			</style>
			<legend>This is a custom array template</legend>
			<ol id={id} style={{ listStyle: 'none' }}>
				{value.map((itemValue, index) => {
					const actions: object[] = [
						{
							label: 'Remove',
							icon: 'talend-trash',
							onClick: (event: MouseEvent) => onRemove(event, index),
							bsStyle: 'primary',
						},
					];

					if (canReorder) {
						actions.push(
							{
								label: 'Move Up',
								icon: 'talend-caret-down',
								className: 'icon-up',
								onClick: (event: MouseEvent) =>
									onReorder(event, {
										previousIndex: index,
										nextIndex: index - 1,
									}),
							},
							{
								label: 'Move Down',
								icon: 'talend-caret-down',
								onClick: (event: MouseEvent) =>
									onReorder(event, {
										previousIndex: index,
										nextIndex: index + 1,
									}),
							},
						);
					}

					return (
						<li key={index}>
							<Actions actions={actions} hideLabel />
							{renderItem(index)}
						</li>
					);
				})}
			</ol>
			<div>
				<button type="button" className="btn btn-info" onClick={onAdd}>
					New Element
				</button>
			</div>
		</div>
	);
}
