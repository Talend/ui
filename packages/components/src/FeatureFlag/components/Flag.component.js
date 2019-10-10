import useFeature from './featureFlag.hook';

export default function Flag({ featureName, children }) {
	const featureEnabled = useFeature(featureName);

	if (!featureEnabled || !children) {
		return null;
	}

	return children;
}
