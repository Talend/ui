import React from 'react';
import { ButtonsDispatcher } from '../src';

export default function ExampleButtonsDispatcher() {
	return (
		<div>
			<h1>ButtonsDispatcher</h1>
			<h2>Definition</h2>
			<p>This component take a content type and a category props to display the set of actions that are possible on it.</p>
			<h2>Example</h2>
			<ButtonsDispatcher contentType="article" category="primary" icon />
		</div>
	);
}
