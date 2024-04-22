"use strict";
class DiExample {
    // Private constructor to enforce Singleton pattern
    constructor() {
        this.hello = 'hello';
    }
    // Method to get the singleton instance
    static getInstance() {
        if (!DiExample.instance) {
            DiExample.instance = new DiExample();
        }
        return DiExample.instance;
    }
    // Method to print the 'hello' message
    say() {
        console.log(this.hello);
    }
}
// Usage
DiExample.getInstance().say();
