import React from 'react';

export default function DefaultStringCellRenderer({ data }) {
	return <span>{data.value}</span>;
}
