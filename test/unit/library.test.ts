import DummyPlugin from '../../src';

/**
 * Dummy test
 */
describe('Dummy test', () => {
	it('works if true is truthy', () => {
		expect(true).toBeTruthy();
	});

	it('DummyPlugin is instantiable', () => {
		expect(new DummyPlugin()).toBeInstanceOf(DummyPlugin);
	});
});
