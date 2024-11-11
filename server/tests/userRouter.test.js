import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "../helper/test.js";

describe("POST register", () => {
	const email = `register@test${Date.now()}.com`;
	const password = "register123";
	it("should register with valid email and password", async () => {
		const response = await fetch("http://localhost:3001/user/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(201, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id", "email");
	});
});

describe("POST login", () => {
	const email = "login@test";
	const password = "login123";
	insertTestUser(email, password);
	it("should login with valid email and password", async () => {
		const response = await fetch("http://localhost:3001/user/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(200, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("id", "email", "token");
	});
});

