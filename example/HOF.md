```typescript
/**
 * Demonstrating higher order function in Typescript
 */

/**
 * General function that will do some math operation on two numbers
 * @param mathFunction math operation to be execute
 * @param number1
 * @param number2
 */
function func1(mathFunction: (num1: number, num2: number) => number, number1: number, number2: number): number{
    return mathFunction(number1, number2);
}


// approach 1 - using variable
//addd number
let addNum = function (num1: number, num2: number) : number {
    return num1 + num2;
};

func1(addNum,1, 3);

// approach 2 - using closure
func1((num1, num2) => {
    return num1 + num2;
},1, 2);

// approach 1 - using variable
//subtraction num
let subNum = function (num1: number, num2: number) : number {
    return num2 - num1;
};

func1(subNum, 1, 2);

// approach 2 - using closure
func1((num1, num2) => {
    return num1 + num2;
}, 1, 3);

func1((num1, num2) => num2 - num2, 1, 2);
```