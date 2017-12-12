import chai from 'chai';
import { describe, it } from 'mocha';
import canonicalTitleMap from './canonical-title-map';

chai.should();

describe('canonical-title-map.js', () => {
	it('should hold a normalisation function for enums and titleMaps to generate titleMaps', () => {
		canonicalTitleMap.should.be.an('function');
	});

	describe('canonicalTitleMap', () => {
		const enumeration = ['Joker', 'Riddler', 'Bane', 'Penguin', 'Cat Woman'];
		const titlemap = [
			{ name: 'Joker', value: 'Joker' },
			{ name: 'Riddler', value: 'Riddler' },
			{ name: 'Bane', value: 'Bane' },
			{ name: 'Penguin', value: 'Penguin' },
			{ name: 'Cat Woman', value: 'Cat Woman' },
		];
		const titlemapObj = {
			Joker: 'Joker',
			Riddler: 'Riddler',
			Bane: 'Bane',
			Penguin: 'Penguin',
			'Cat Woman': 'Cat Woman',
		};

		it('should return a titleMap for a titleMap object with original enum', () => {
			let result = canonicalTitleMap(titlemapObj, enumeration);
			result.should.be.deep.equal(titlemap);
		});

		it('should return a titleMap for a titleMap list with original enum', () => {
			let result = canonicalTitleMap(titlemap, enumeration);
			result.should.be.deep.equal(titlemap);
		});

		it('should return a titleMap for a titleMap object without enum', () => {
			let result = canonicalTitleMap(titlemapObj);
			result.should.be.deep.equal(titlemap);
		});

		it('should return a titleMap for a titleMap list without enum', () => {
			let result = canonicalTitleMap(titlemap);
			result.should.be.deep.equal(titlemap);
		});

		it('should return a titleMap for a titleMap object with original enum, returning "undefined" name if the enum value is not found', () => {
			enumeration.push('Mr Freeze');
			let result = canonicalTitleMap(titlemapObj, enumeration);
			titlemap.push({
				name: undefined,
				value: 'Mr Freeze',
			});
			result.should.be.deep.equal(titlemap);
		});
	});
});
