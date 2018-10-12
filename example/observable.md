code will not execute after `completion`
```typescript
var completionTest = Observable.create((observer: any) => {
     observer.next('Hello World!');
     observer.next('Hello Again!');
     observer.complete();
     //this will not execute
     observer.next('Bye');

     //teardown logic, to clear resources
     return () => {
         //claim resources
     }
    }
});

```

code will not execute after `unsubscribe` in a subscription
```typescript

var observableWithSubscribeWithin = new Observable(observer => {
    observer.next('Hello World!');
    observer.unsubscribe();
    // the rest will not execute
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
});
```

consider we have two observables, we need to run get value from `firstObservable`, if value > 2, we execute `secondObservable`
```typescript

const firstObservable = new Observable(subscriber => {
    subscriber.next(3);
    subscriber.complete();
    return () => {
        // do something
        //claim resources
        subscriber.unsubscribe();
    }
});

let secondObservable = new Observable(subscriber => {
    subscriber.next('observable 2');
    subscriber.complete();

    return () => {
        // do something
        //claim resources
        subscriber.unsubscribe();
    }
});


```
instead of nesting observables like this
```typescript
firstObservable.subscribe(res => {
        if (res > 2) {
            obTest2.subscribe(
                //do something
            )
        }
    }
)
```

apply operator like this
```typescript
firstObservable.pipe(
    map(value => value),
    switchMap(value => value > 2 ? secondObservable : of())
).subscribe(value => {
    //do someting
});
```


look at observable constructor signature
```typescript
constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic);
```

where `TeardownLogic` is
```typescript
export interface Unsubscribable {
  unsubscribe(): void;
}
export type TeardownLogic = Unsubscribable | Function | void;
```

which means it can return either Unsubscribable, Function or void. This is call `union types`. so we can call in two different ways

approach 1: return `void`
```typescript
let ob = new Observable(subscriber => {

});
```
approach 2: return `Function`
```typescript
let ob2 = new Observable(subscriber => {
    return () => {

    }
});
```
