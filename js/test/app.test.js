// Test case to check if "Hello, World!" is logged to the console
function testHelloWorld() {
    console.log("Running test: 'Hello, World!' should be logged to the console");
    console.log = jest.fn(); // Mocking console.log function

    // Run the code to be tested
    require('./app.js');

    // Expect "Hello, World!" to be logged to the console
    expect(console.log).toHaveBeenCalledWith("Hello, World!");
}

// Run the test
testHelloWorld();
