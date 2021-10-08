import Badge from './Badge.component';
import BadgeComposition from './BadgeComposition';

Object.entries(BadgeComposition).forEach(([key, value]) => {
	Badge[key] = value;
});

export default Badge;
