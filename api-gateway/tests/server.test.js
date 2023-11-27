const { MSG } = require("../helpers/constants/constants")
const utility = require("../helpers/utility")
require('dotenv').config({ path: '.env.test' })
const app = require("../server");
const supertest = require("supertest");

test("Checking the app is healthy", async () => {

  await supertest(app).get("/health-check")
    .expect(200)
    .then(async (response) => {
      expect(response.text).toBe('Healthy');
    });
});

let token = null
let userId = null

const userData = {
  userName: 'sidheeq',
  userEmail: 'sidheeq',
  userMobileNo: (Math.floor(Math.random() * 9000000000) + 1000000000) + '',
  userPassword: 'sidheeq'
};

const invalidUserData = {
  userName: 'sidheeq',
  userEmail: 'sidheeq',
  userMobileNo: '80788580', // Invalid mobile no.
  userPassword: 'sidheeq'
}

test("User register", async () => {


  await supertest(app).post("/api/v1/users/auth/register")
    .send(userData)
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.registeredSuccessfully)
      expect(status).toBe('success')
      token = data.token
      userId = data.user._id
      expect(data.user.userName).toBe(utility.capitalizeString(userData.userName))
      expect(data.user.userMobileNo).toBe(userData.userMobileNo)
    });

  await supertest(app).post("/api/v1/users/auth/register")
    .send(userData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.userExist));
    });

  await supertest(app).post("/api/v1/users/auth/register")
    .send(invalidUserData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    });

});

test("User login", async () => {

  await supertest(app).post("/api/v1/users/auth/login")
    .send(userData)
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.loginSuccessfully)
      expect(status).toBe('success')
      token = data.token
      expect(data.user._id).toBe(userId)
      expect(data.user.userName).toBe(utility.capitalizeString(userData.userName))
      expect(data.user.userMobileNo).toBe(userData.userMobileNo)
    });

  await supertest(app).post("/api/v1/users/auth/login")
    .send({ 'userMobileNo': '2332', 'userPassword': '' })
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    });

  await supertest(app).post("/api/v1/users/auth/login")
    .send({ ...userData, 'userPassword': 'invlid passowrd' })
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.invalidCredentials));
    });

});
