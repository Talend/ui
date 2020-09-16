import List from './List.component';
import ListComposition, { hooks } from './ListComposition';

Object.entries(ListComposition).forEach(([key, value]) => {
	List[key] = value;
});
List.hooks = hooks;
export default List;
