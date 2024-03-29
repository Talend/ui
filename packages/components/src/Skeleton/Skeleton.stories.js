import Skeleton from './Skeleton.component';

export default {
	title: 'Components/Design Principles/Loading Feedback/Skeleton',
	decorators: [story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>],
};

export const Default = () => (
	<div>
		<h4>Circles :</h4>
		<div>small</div>
		<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} />
		<div>medium</div>
		<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.medium} />
		<div>large</div>
		<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.large} />
		<div>custom size override class definition </div>
		<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} width={50} height={50} />

		<h4>Texts :</h4>
		<div>small:</div>
		<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
		<div>medium:</div>
		<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.medium} />
		<div>large:</div>
		<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
		<div>extra-large:</div>
		<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.xlarge} />
		<div>custom width:</div>
		<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} width={400} />

		<h4>Button: </h4>
		<Skeleton type={Skeleton.TYPES.button} />

		<h4>Icons :</h4>
		<Skeleton type={Skeleton.TYPES.icon} name="talend-locked" />
		<h4>Icons with custom css:</h4>
		<Skeleton
			type={Skeleton.TYPES.icon}
			name="talend-table"
			style={{ width: '6rem', height: '6rem' }}
		/>
	</div>
);
