import React from 'react';

module.exports = {
	"jsonSchema": {
		"title": "A connexion form",
		"description": "A simple form example.",
		"type": "object",
		"properties": {
			"authentication": {
				"type": "boolean",
				"title": "Authentication"
			},
			"customWidget": {
				"type": "string",
				"title": "Custom widget"
			}
		}
	},
	"uiSchema": {
		"authentication": {
			"ui:widget": "toggle",
			"ui:trigger": [
				"after"
			]
		},
		"customWidget": {
			"ui:widget": ({ id, value, options }) => {
				const { color, backgroundColor } = options;
				return (
					<div
						id={id}
						className="well well-sm"
						style={{ color, backgroundColor }}
					>
						{value}
					</div>
				);
			},
			"ui:options": {
				"color": "white",
				"backgroundColor": "deeppink",
			},
		},
	},
	"properties": {
		"customWidget": "value",
	}
};
