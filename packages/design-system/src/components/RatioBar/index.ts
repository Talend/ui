import { RatioBar as RatioBarComponent } from './RatioBar.component';
import { RatioBarComposition, RatioBarLine } from './RatioBarComposition.component';

export type RatioBarType = typeof RatioBarComponent & {
	Composition: typeof RatioBarComposition;
	Line: typeof RatioBarLine;
};

const RatioBar = RatioBarComponent as RatioBarType;
RatioBar.Composition = RatioBarComposition;
RatioBar.Line = RatioBarLine;

export { RatioBarComposition, RatioBarLine };

export default RatioBar;
