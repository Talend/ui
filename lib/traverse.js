/**
 * Traverse a schema, applying a function(schema,path) on every sub schema
 * i.e. every property of an object.
 */
export function traverseSchema(schema, fn, path, ignoreArrays) {
  ignoreArrays = ignoreArrays === undefined ? true : ignoreArrays;

  path = path || [];

  const traverse = function(schema, fn, path) {
    fn(schema, path);
    if (schema.properties) {
      Object.keys(schema.properties).forEach((name) => {
        const currentPath = path.slice();
        currentPath.push(name);
        traverse(schema.properties[name], fn, currentPath);
      });
    }

    //Only support type "array" which have a schema as "items".
    if (!ignoreArrays && schema.items) {
      const arrPath = path.slice(); arrPath.push('');
      traverse(schema.items, fn, arrPath);
    }
  };

  traverse(schema, fn, path || []);
}

export function traverseForm(form, fn) {
  fn(form);
  if (form.items) {
    form.items.forEach((f) => {
      traverseForm(f, fn);
    });
  }

  if (form.tabs) {
    form.tabs.forEach((tab) => {
      if (tab.items) {
        tab.items.forEach((f) => {
          traverseForm(f, fn);
        });
      }
    });
  }
}
