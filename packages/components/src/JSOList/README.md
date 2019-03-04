# Composable List

@nmaligne started a poc on List to change its pattern and get rid of the apropcalypse.
Moreover dataset module will need to add more things in it for faceted search and column chooser.

I continued his PoC. Can you look at http://2026.talend.surge.sh/components/?selectedKind=JSOList&selectedStory=Default
Any feedback is welcome.

## Principle



## Default

By default, List is only a ... list :)
It is not really useful to use it as is, instead use `VirtualizedList`.

But in order to explain the VList part for the following cases, here's an example.

```javascript
import CellTitle from '../../src/VirtualizedList/CellTitle';

function MySimpleList() {
    const simpleCollection = [
        { id: 1, name: 'My first item', description: 'First element', author: 'me', created: 15464354400 }
    ];

    return (
        <List.Container id="my-list" collection={simpleCollection}>
        	<List.VList id="my-vlist">
        		<List.VList.Content label="Id" dataKey="id" width={-1} />
                <List.VList.Content label="Name" dataKey="name" columnData={titleProps} width={-1} {...CellTitle} />
                <List.VList.Content label="Description" dataKey="description" width={-1} />
                <List.VList.Content label="Author" dataKey="author" width={-1} />
                <List.VList.Content label="Created" dataKey="created" width={-1} />
        	</List.VList>
        </List.Container>
    );
}
```
