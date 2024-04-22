class DiExample {
  private static instance: DiExample;
  private hello: string;

  // Private constructor to enforce Singleton pattern
  private constructor() {
    this.hello = 'hello';
  }

  // Method to get the singleton instance
  public static getInstance(): DiExample {
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
