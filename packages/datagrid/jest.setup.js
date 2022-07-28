// DS is mocked by ui-scripts, preventing us to use testing-library getByLabelText & others selectors
jest.unmock('@talend/design-system');
jest.setTimeout(10000);
