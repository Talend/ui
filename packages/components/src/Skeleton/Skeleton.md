# **Skeleton**

# How to use the skeleton on your component

To use this component, you have to give a type and a size

```html
<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} />
```

The types / sizes are :
| Type | Size Available |
|---|---|
| circle | small / medium / large |
| text | small / medium / large / xlarge |
| button | NA |
| icon | NA |

You can also override css default sizes by
- Pass a className & define it
- Pass width & height props

```html
<Skeleton
    type={Skeleton.TYPES.text}
    size={Skeleton.SIZES.small}
    width={400}
/>
```
