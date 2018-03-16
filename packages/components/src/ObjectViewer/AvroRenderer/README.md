# AvroRenderer

Some of those are from datagrid, but some variable names (including props names) have been changed to be more understandable.

## Concept

The `index.js` exposes a `injectedCellRenderer(getComponent, rendererId, avroRenderersIds, defaultRenderer)`.  
This inject a top renderer. If you need to have multiple renderers, this is the entry point to delegate to others.  

| Property | Type | Description |
|---|---|---|
| getComponent | function | Function passed to `Inject`. See the `Inject` component for more details. If not provided, the default renderer will be used. |
| rendererId | string | The top renderer id, used with `Inject` and `getComponent`. If not provided, the default renderer will be used. |
| avroRenderersIds | object | It's an object where the key is the avro type , and the value is the type renderer id to be used with `Inject` and `getComponent`. If an id is missing for a type, getComponent is not provided, or avroRendererIds is not provided, a default renderer is used for this type. |
| defaultRenderer | Component | The default top renderer to use. If not provided, it will use `DefaultAvroRenderer` |

## Renderer changes

#### avroRenderersIds

*Before*

* `avroRenderer` (yes, without `s`, and without `Id` notion)
* it has a set of constants renderer ids with a `getAvroRenderer()` function that merges those constants with the custom ones
````javascript
function getAvroRenderer(avroRenderer) {
	return {
		booleanCellRenderer: 'DefaultBooleanCellRenderer',
		dateCellRenderer: 'DefaultDateCellRenderer',
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer',
		...avroRenderer,
	};
}
````
* the keys are `${avroType}CellRenderer`, and registered by default (see up there)

*After*

* new name `avroRenderersIds`. The props too, in DefaultAvroRenderer.
* `getAvroRenderer` has been removed. By default it's the renderer associated to the type that is used (see `DefaultAvroRender` file). But if you want to override it, it used `Inject`, so you need to provide a `getComponent` and explicit componentIds via `avroRendererIds` object.
* `avroRenderersIds` keys are now the avro type, no need to concatenate `CellRenderer` to it.

## DefaultAvroRenderer

It takes `getComponent` and `avroRendererIds` to inject a renderer for a particular avro type.  

If something is missing, it fallbacks to a default renderer. It is possible to add new default renderers within this class.

## TODO

For now those files are duplication (that have been fixed/enhanced).

* use those in datagrid, that already has @talend/react-components as dependency.
* in datagrid adapt the name changes
* in datagrid, the DefaultCellRenderer stays in datagrid module. It adds a quality indicator and use the Avro renderer. The quality indicators are managed differently so it makes sense to keep those separated.
* in general, avoid any `cell(Renderer)` notion in components, prefer renderer.
