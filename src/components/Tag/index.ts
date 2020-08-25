import Tag from './Tag';
import TagSuccess from './variations/Tag.success';
import TagDestructive from './variations/Tag.destructive';
import TagInformation from './variations/Tag.information';
import TagWarning from './variations/Tag.warning';

const TagComponent = Tag as typeof Tag & {
	Success: typeof TagSuccess;
	Destructive: typeof TagDestructive;
	Information: typeof TagInformation;
	Warning: typeof TagWarning;
};

TagComponent.Success = TagSuccess;
TagComponent.Destructive = TagDestructive;
TagComponent.Information = TagInformation;
TagComponent.Warning = TagWarning;

export default TagComponent;
