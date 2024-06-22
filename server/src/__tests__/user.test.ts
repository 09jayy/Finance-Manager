import request from 'supertest';
import app from '../server';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import config from '../config/config';
import User from '../models/user';

let server;
const testUser = {
    name: "test",
    email: "test@email.com",
    password: "password"
};

beforeAll(async () => {
    await mongoose.connect(config.mongoURI)

    server = app.listen(config.port, () => {
        console.log(`Test server running on port ${config.port}`)
    });

    await User.deleteMany({
        "$or": [
            { name: testUser.name },
            { email: testUser.email },
            { password: testUser.password }
        ]
    })
})

afterAll(async () => {
    await User.deleteMany({
        "$or": [
            { name: testUser.name },
            { email: testUser.email },
            { password: testUser.password }
        ]
    })

    // Close the server
    await server.close();

    // Disconnect from MongoDB
    await mongoose.connection.close();
})

describe("GET /finance-manager/users", () => {
    it("should return JSON and status 200", async () => {
        const res = await request(app).get("/finance-manager/users")
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
    })
})

describe("POST /finance-manager/users", () => {
    it("should successfully return 201 response", async () => {
        const res = await request(app).post("/finance-manager/users").send(testUser)
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/)
    })

    it("should successfully find previously added user", async () => {
        const res = await User.findOne({ name: testUser.name })
        expect(res).toBeInstanceOf(Object)
        expect(res.name).toBe(testUser.name)
        expect(res.email).toBe(testUser.email)
    })
});

describe("POST /finance-manager/users/login", () => {
    it("should successfully login the test user", async () => {
        const res = await request(app).post("/finance-manager/users/login").send({
            email: testUser.email,
            password: testUser.password,
        })
        expect(res.status).toBe(200);
        expect(typeof res.text).toBe('string')
    })
})

describe("PATCH /finance-manager/users/update", () => {
    it("should successfully update user name", async () => {
        const user = await User.findOne({name: testUser.name})

        const res = await request(app).patch("/finance-manager/users/update").send({
            id: user._id,
            update: {
                name: "test1"
            }
        })

        expect(res.status).toBe(200)

        const userFind = await User.findOne({email: testUser.email})

        expect(userFind.name).toBe("test1")
    })
})