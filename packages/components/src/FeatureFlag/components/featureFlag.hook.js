import { useState, useEffect } from 'react';
import featureFlag from '../service';

export default function useFeature(featureName) {
	const [hasFeatureEnabled, changeState] = useState(featureFlag.getStatus(featureName));

	useEffect(() => {
		const changeFeatureState = feature =>
			feature.featureName === featureName &&
			feature.enabled !== hasFeatureEnabled &&
			changeState(feature.enabled);

		featureFlag.subscribe(changeFeatureState);

		return () => featureFlag.unsubscribe(changeFeatureState);
	});

	return hasFeatureEnabled;
}
