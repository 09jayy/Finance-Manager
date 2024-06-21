import request from 'supertest';
import app from '../server';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import config from '../config/config';

let server;

beforeAll(async () => {
    await mongoose.connect(config.mongoURI)

    server = app.listen(config.port, () => {
        console.log(`Test server running on port ${config.port}`)
    })
})

afterAll(async () => {
    // Close the server
    await server.close()

    // Disconnect from MongoDB
    await mongoose.connection.close()
})

describe('GET /finance-manager/users', () => {
    it('should return JSON and status 200', async () => {
        const response = await request(app).get('/finance-manager/users')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
    })
});
