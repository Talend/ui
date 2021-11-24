import Container from './Tile.component';
import Body from './Body/TileBody.component';
import Header from './Header/TileHeader.component';
import Footer from './Footer/TileFooter.component';
import Skeleton from './Skeleton/SkeletonTile.component';
import { TileContext, useTileContext } from './context';

export default {
	Body,
	Header,
	Footer,
	Container,
	Skeleton,
	useTileContext,
	context: TileContext,
};
