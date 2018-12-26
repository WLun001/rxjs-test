### Try and Catch

```typescript
let intervalOb = interval(1000);
intervalOb.pipe(
    mergeMap(value => {
        if (value > 1) {
             return throwError('eror') //throw here
        }
        else {
            return of(value);
        }
    }),
    catchError(err => of(`error happened on value ${err}`)) //catch here
).subscribe(value => console.log(value), error => console.log(error));
```


### concat
- It will run observables in sequence, one after another.
- Notes that it will only execute the second observable if the first observable is completed

### retryWhen
- retry with condition, if no need condition, consider to use `retry` instead. 
- It will pass errors observable (the parameter)
- These chain operators will do 
  - `delayWhen` delay 2 seconds
  - `tap` for logging purpose
  - `take` limit to 5 times
  - `concatMap` after it limit to five times, it will return an observable, then we rethrow the observable by combine the observables. `concatMap` is used instead of `concat` because we need data from first observable. `concat` is used instead of `merge` because we need to wait the first observable to complete first, which is return by `take`.

Example of trying http request after failure. `this.http.get` is `HttpClientModule` from Angular, which is an observable
```typescript
 this.http.get('url').pipe(
    retryWhen(errors /* error observable */=> errors.pipe(
        delayWhen(() => timer(2000)),
        tap(value => console.log(value)),
        take(5),
        concatMap(error => throwError(error)) // this will goes to error part when subscribe
    ))
);
```
