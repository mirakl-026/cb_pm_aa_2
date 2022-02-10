// пример разбора коллбэков, промисов и async/await:

// к примеру у нас есть 3 функции, выполнение которых, должно идти друг за другом
// function first() {
//     console.log(1);
// }

// function second() {
//     console.log(2);
// }

// function third() {
//     console.log(3);
// }

// выполним их:
// first();
// second();
// third();

// 1
// 2
// 3 - всё ок

// пример асинхронной функции - setTimeout - выполнение спустя какое-то время:
function first() {
    console.log(1);
}

function second() {
    setTimeout(() => {
        console.log(2);
    }, 0);
}

function third() {
    console.log(3);
}

// выполним их:
first();
second();
third();

// 1
// 3
// 2 - почему так? 
/*
Stack
    The stack, or call stack, holds the state of what function is currently running. 
    If you’re unfamiliar with the concept of a stack, you can imagine it as an array
    with “Last in, first out” (LIFO) properties, meaning you can only add or remove
    items from the end of the stack.
    
    JavaScript will run the current frame (or function call in a specific environment)
    in the stack, then remove it and move on to the next one.

    For the example only containing synchronous code, the browser handles the execution
    in the following order:

    - Add first() to the stack, run first() which logs 1 to the console,
        remove first() from the stack.
    - Add second() to the stack, run second() which logs 2 to the console,
        remove second() from the stack.
    - Add third() to the stack, run third() which logs 3 to the console,
        remove third() from the stack.

    The second example with setTimout looks like this:

    - Add first() to the stack, run first() which logs 1 to the console,
        remove first() from the stack.
    - Add second() to the stack, run second().
        - Add setTimeout() to the stack, run the setTimeout() Web API which starts
            a timer and adds the anonymous function to the queue,
            remove setTimeout() from the stack.
            Remove second() from the stack.
    - Add third() to the stack, run third() which logs 3 to the console, 
        remove third() from the stack.

    The event loop checks the queue for any pending messages and finds the anonymous
    function from setTimeout(), adds the function to the stack which logs 2 to the
    console, then removes it from the stack.

    Using setTimeout, an asynchronous Web API, introduces the concept of the queue, 
    which this tutorial will cover next.


    Queue
    The queue, also referred to as message queue or task queue, is a waiting area 
    for functions.
    Whenever the call stack is empty, the event loop will check the queue for any 
    waiting messages, starting from the oldest message.
    
    Once it finds one, it will add it to the stack, which will execute the function
    in the message.

    In the setTimeout example, the anonymous function runs immediately after the rest
    of the top-level execution, since the timer was set to 0 seconds.
    It’s important to remember that the timer does not mean that the code will execute
    in exactly 0 seconds or whatever the specified time is, but that it will add
    the anonymous function to the queue in that amount of time. 
    
    This queue system exists because if the timer were to add the anonymous function
    directly to the stack when the timer finishes, it would interrupt whatever function
    is currently running, which could have unintended and unpredictable effects.

    Note: There is also another queue called the job queue or microtask queue that
    handles promises. Microtasks like promises are handled at a higher priority than
    macrotasks like setTimeout.

    Now you know how the event loop uses the stack and queue to handle the execution order of code. The next task is to figure out how to control the order of execution in your code. To do this, you will first learn about the original way to ensure asynchronous code is handled correctly by the event loop: callback functions.
*/