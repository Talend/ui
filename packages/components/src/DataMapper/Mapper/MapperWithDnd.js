import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Mapper from './Mapper.js';

export default DragDropContext(HTML5Backend)(Mapper);
