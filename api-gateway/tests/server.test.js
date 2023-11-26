const app = require("../server");
const supertest = require("supertest");

test("Checking the app is healthy", async () => {

  await supertest(app).get("/health-check")
    .expect(200)
    .then(async (response) => {
      expect(response.text).toBe('Healthy');
    });
});
