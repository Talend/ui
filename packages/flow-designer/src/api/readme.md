# Uncertainty
How uncertainty is handled in this API.

## extracting values from a given value (get*)
On dev mode:
- if the parameters are not fitting, throw an exception

On prod mode:
- if parameter are not fitting, don't throw, but return null.

```javascript
// dev
expect(Port.getPosition(invalidPort)).toThrow();
// throw

// prod
expect(Port.getPosition(invalidPort)).toBe(null);
// return null
```

## questioning the given value (is*, has*)
usualy questioning return a boolean. In this case the answer should never be something else than true or false

```javascript
// dev
expect(Port.isPort(invalidPort)).toThrow();
// throw

// prod
expect(Port.isPort(invalidPort)).toBe(false);
// return null
```

### transforming the given value (set*)
to avoid undefined error, in case the transformation is not applicable the original value is returned

```javascript
// dev
expect(Port.setId(id, invalidPort)).toThrow();
// throw

// prod
expect(Port.isPort(id, invalidPort)).toBe(invalidPort);
// return null
```

Why null returned when expected return is not a boolean ?
Because "" for string or 0 or NaN doesn't capture well the intent of providing a default neutral value for number and string, same apply to object. Undefined is not suitable to because undefined error often are unhandled error in your code or a remote code.

A better solution overall would be the use of Maybe wrapper.
