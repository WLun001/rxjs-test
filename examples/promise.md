### Return value from Promise `then()`

Construct a `Promise`
```typescript
function isAuthenticated() {
    return new Promise(((resolve, reject) => {
      setTimeout(() => resolve(true), 800);
    }));
  }
```

With this, `canActivate()` will only return value from `then()` clause from a Promise, in this case, is a `boolean`
```typescript
function canActivate(): boolean {
    return isAuthenticated.then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        return false;
      }
    });
  }
```
