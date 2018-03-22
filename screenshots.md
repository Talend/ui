# Screenshots CLI for non regression tests

When you do change something you may introduce regression.
This is important for us to detect it as soon as possible while keeping the CI as fast as we can.

So you can use the npm script `test:nonreg` for that.
Behind it use the `screenshots.js` script

## How to use

At the root of this repository just do `yarn test:nonreg`

It will output stuff for you:

```
#### 1656 pixels differ from the original one /var/folders/f1/7ss5nvdd2n735tkpy6tr1wjw0000gn/T/subheader-default15626tn7CXWB3w8Uu.png
```

So you can open that file to see where the diff is.

