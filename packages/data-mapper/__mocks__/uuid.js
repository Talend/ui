const uuid = jest.genMockFromModule('uuid');
uuid.v4 = () => '42';
export default uuid;
