### Convert `number` to `string`
```typescript
let a = '1';
// + opeartor will convert string to number
let b = +a;
```

### Convert `number` to `boolean`
```typescript
let a = 1;
// the !! will convert number to boolean
let b = !!a
```

### Define key-value pairs (Index Signature)
```typescript
example(): {[key: string]: boolean} {
  return {key: false} //ok
  retrun {key: '1'} // error
}

```

### Evaluate null and undefined
```typescript
if(value) {
}
```
will evaluate to true if value is not:

- `null`
- `undefined`
- `NaN`
- `empty string ''`
- `0`
- `false`


### Spread Operator
- Expand array or object
```typescript
const testObj = {
    name: 'test',
    description: 'hello'
};

const spreadopeartor = {
    ...testObj,
};
```
The output for `spreadoperator` would be
```typescript
{
    name: 'this is name',
    description: 'this is description'
}
```
Output without `...` Spread operator
```typescript
{
testObj: {
      name: 'this is name',
      description: 'this is description'
      }
}
```
#### Override property
- override property `name`
```typescript
const spreadopeartor = {
    ...testObj,
    name: 'overriden name'
};
```
Output will be 
```typescript
{
    name: 'overriden name',
    description: 'this is description'
}
```

