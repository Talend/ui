
/**
 * This interface provides all the needed methods to access/update the
 * schema data.
 */
const schemaDataAccessor = {
	/**
	 * Returns the unique identifier as string of the schema.
	 */
	getSchemaId(schema) {
		return schema.id;
	},
	/**
	 * Returns the name of the schema.
	 */
	getSchemaName(schema) {
		return schema.name;
	},
	/**
	 * Returns the number of elements in the schema.
	 */
	getSchemaSize(schema) {
		return schema.elements.length;
	},
	/**
	 * Returns all the elements of the schema in an array.
	 */
	getSchemaElements(schema) {
		return schema.elements;
	},
	/**
	 * Returns the nth element of the schema.
	 */
	getSchemaElement(schema, index) {
		return schema.elements[index];
	},
	/**
	 * Returns the index of the given element,
	 * returns -1 if it is not in the schema.
	 */
	getSchemaElementIndex(schema, element) {
		return schema.elements.findIndex(elem => this.areElementsEqual(elem, element));
	},
	/**
	 * Returns the identifier of the element.
	 * Identifier must be a unique string.
	 */
	getElementId(element) {
		return element.id;
	},
	/**
	* Returns a label for the given element.
	*/
	getElementLabel(element) {
		return element.name;
	},
	/**
	* Returns the data corresponding to the given element and key.
	*/
  getRowData(element, key) {
    return element[key];
  },
	/**
	* Returns the header data for the given column key.
	*/
  getHeaderData(key) {
    return key;
  },
	/**
	* Indicates if the two given elements are equal.
	*/
	areElementsEqual(element1, element2) {
		return element1.id === element2.id;
	},
};
