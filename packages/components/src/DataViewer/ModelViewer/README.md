# ModelViewer

## Parser

The model viewer integrates his own avro-like format using a specific parser with added quality metadata.

#### An entry in a schema.

```json
	name: 'firstName',
	type: {
		type: 'string',
		dqType: 'First Name',
		dqTypeKey: 'FIRST_NAME',
	'@talend-quality@': {
		'-1': 0,
		1: 1000,
		0: 0,
		total: 1000,
	},
},
```

|    Attributes    |                       Use                        |
| :--------------: | :----------------------------------------------: |
|    name / doc    |               name of the element                |
|       type       | data about the type (can contain fields / items) |
|  fields / items  |               childs / next branch               |
| @talend-quality@ |      data about the quality of the element       |

#### A list containing simple items

```json
type: 'record',
name: 'Person',
namespace: 'experiment.sample',
fields: [
			{
				name: 'firstName',
				type: {
					type: 'string',
					dqType: 'First Name',
					dqTypeKey: 'FIRST_NAME',
					'@talend-quality@': {
						0: 0,
						1: 1000,
						'-1': 0,
						total: 1000,
					},
				},
			},
			{
				name: 'lastName',
				type: {
					type: 'string',
					dqType: 'Last Name',
					dqTypeKey: 'LAST_NAME',
					'@talend-quality@': {
						0: 0,
						1: 1000,
						'-1': 0,
						total: 1000,
					},
				},
			},
		],
'@talend-quality@': {
	0: 0,
	1: 994,
	'-1': 6,
	total: 1000,
},
```

#### A list containing another record

```json
name: 'friends',
type: {
	type: 'array',
	items: {
		type: 'record',
		name: 'friends',
		fields: [
					{
						name: 'id',
						type: {
							type: 'long',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 12,
								'-1': 0,
								total: 12,
							},
						},
					},
					{
						name: 'name',
						type: {
							type: 'string',
							dqType: '',
							dqTypeKey: '',
							'@talend-quality@': {
								0: 0,
								1: 12,
								'-1': 0,
								total: 12,
							},
						},
					},
				],
		'@talend-quality@': {
			0: 0,
			1: 12,
			'-1': 0,
			total: 12,
		},
	},
'@talend-quality@': {
	0: 0,
	1: 7,
	'-1': 0,
	total: 7,
},
```
