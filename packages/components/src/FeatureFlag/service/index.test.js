import FeatureFlag from './FeatureFlag.class';
import featureFlag from '.';

const FEATURE_NAME = 'FEATURE_NAME';
const FEATURE_NO_INITIALIZED = 'FEATURE_NO_INITIALIZED';

describe('featureFlag', () => {
	it('should be an instanceof featureFlag', () => {
		expect(featureFlag instanceof FeatureFlag).toBe(true);
	});

	it('should enable a feature', () => {
		expect(featureFlag.feature.get(FEATURE_NAME)).toBeUndefined();
		featureFlag.enable(FEATURE_NAME);
		expect(featureFlag.feature.get(FEATURE_NAME)).toBe(true);
	});

	it('should disable a feature', () => {
		expect(featureFlag.feature.get(FEATURE_NAME)).toBe(true);
		featureFlag.disable(FEATURE_NAME);
		expect(featureFlag.feature.get(FEATURE_NAME)).toBe(false);
	});

	it('should return the flag for a feature', () => {
		expect(featureFlag.getStatus(FEATURE_NAME)).toBe(false);
		featureFlag.enable(FEATURE_NAME);
		expect(featureFlag.getStatus(FEATURE_NAME)).toBe(true);
		featureFlag.disable(FEATURE_NAME);
	});

	it('should return false for a no-initialized feature', () => {
		expect(featureFlag.getStatus(FEATURE_NO_INITIALIZED)).toBe(false);
	});

	it('should notifiy the observers that a feature has enabled', () => {
		const observer1 = jest.fn();
		const observer2 = jest.fn();

		featureFlag.subscribe(observer1);
		featureFlag.subscribe(observer2);

		featureFlag.enable(FEATURE_NAME);

		expect(observer1).toHaveBeenCalledWith({ featureName: FEATURE_NAME, enabled: true });
		expect(observer2).toHaveBeenCalledWith({ featureName: FEATURE_NAME, enabled: true });
	});

	it('should unscribe the observers', () => {
		const observer = jest.fn();

		featureFlag.subscribe(observer);

		featureFlag.enable(FEATURE_NAME);
		featureFlag.unsubscribe(observer);
		featureFlag.enable(FEATURE_NAME);
		expect(observer).toHaveBeenCalledWith({ featureName: FEATURE_NAME, enabled: true });
		expect(observer).toHaveBeenCalledTimes(1);
	});

	it('should notifiy the observers that a feature has disabled', () => {
		const observer1 = jest.fn();
		const observer2 = jest.fn();

		featureFlag.subscribe(observer1);
		featureFlag.subscribe(observer2);

		featureFlag.disable(FEATURE_NAME);

		expect(observer1).toHaveBeenCalledWith({ featureName: FEATURE_NAME, enabled: false });
		expect(observer2).toHaveBeenCalledWith({ featureName: FEATURE_NAME, enabled: false });
	});

	it('should provide featureFlag on window', () => {
		expect(window.featureFlag).toBe(featureFlag);
	});
});
