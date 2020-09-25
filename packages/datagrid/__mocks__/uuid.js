const uuid = jest.genMockFromModule('uuid');
const v4 = () => '42';
uuid.v4 = v4;

export default uuid;
export { v4 };
