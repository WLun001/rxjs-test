- [Code execution order](#code-execution-order)
  * [code will not execute after `unsubscribe` in a subscription](#code-will-not-execute-after--unsubscribe--in-a-subscription)
  * [`completion` will not execute if `error`](#-completion--will-not-execute-if--error-)
- [Nesting observable](#nesting-observable)
  * [Example 1](#example-1)
  * [Example 2](#example-2)
- [Return in observable](#return-in-observable)
  * [look at observable constructor signature](#look-at-observable-constructor-signature)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

### Code execution order
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

#### code will not execute after `unsubscribe` in a subscription
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

#### `completion` will not execute if `error`
```typescript
let ob = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.error(2);
    // the rest will not execute
    subscriber.next();
    subscriber.complete();

    return () => {
        // this will execute
    };
});

ob.subscribe(next => {},
    error => {
    // error will execute
    },
    () => {
    // completion will not execute
});
```
### Nesting observable
consider we have two observables, we need to run get value from `firstObservable`, if value > 2, we execute `secondObservable`
#### Example 1

#### consider we have two observables, we need to run get value from `firstObservable`, if value > 2, we execute `secondObservable`
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
##### instead of nesting observables like this
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

##### apply operator like this
```typescript
firstObservable.pipe(
    map(value => value),
    switchMap(value => value > 2 ? secondObservable : of())
).subscribe(value => {
    //do someting
});
```

#### Example 2
```typescript
let numbers = [1,23,4,5,6,4,5,6,4,5,4,8,9,0,7,6,5,7,8,5,10,87,46,35,38,36,88];
let words = ['hello', 'bye', 'haha', 'hehe', 'keke', 'hoho',];

let ob1 = from(numbers);
let ob2 = from(words);
```

this is the nesting observable
```typescript
ob1.subscribe((num ) => {
    if (num % 2 === 0) {
        ob2.subscribe(words => console.log(words));
    }
});
```

which can be refactor with operators
```typescript
ob1.pipe(
    map(num => num),
    switchMap(num => num % 2 === 0 ? ob2 : of())
).subscribe(words => console.log(words));
```

### Return in observable
#### look at observable constructor signature
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

##### approach 1: return `void`
```typescript
let ob = new Observable(subscriber => {

});
```
##### approach 2: return `Function`
```typescript
let ob2 = new Observable(subscriber => {
    return () => {

    }
});
```
