import React from 'react';
import CMFStory from './CMFStory';

export default function CMFDecorator(story) {
	return <CMFStory>{story()}</CMFStory>;
}
