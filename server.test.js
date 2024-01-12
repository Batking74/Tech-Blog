// Importing Modules
const { app, PORT } = require('./server');
const supertest = require('supertest');


// Testing Sever Startup
describe('Server Integration Tests', () => {
    test('Server starts and connects to the database', async () => {
        // Start your server
        const server = app.listen(PORT);
        
        // Performing Assertions
        await supertest(server).get('/').expect(200);
        server.close();
    });
});
