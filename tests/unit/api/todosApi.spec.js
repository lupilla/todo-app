import todosApi from "@/api/todosApi.js";

describe("todosApi tests", () => {
  test("todosApi should have the proper baseURL", async () => {
    const baseURL =
      "https://todos-app-a27eb-default-rtdb.europe-west1.firebasedatabase.app";
    expect(todosApi.defaults.baseURL).toBe(baseURL);
  });
  test("todosApi Api should return data without errors", async () => {
    let result;
    try {
      result = await todosApi.get("/todos.json");
    } catch (error) {
      result = error;
    }
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
  });

  test("todosApi Api should not return data with wrong url", async () => {
    let result;
    try {
      result = await todosApi.get("/todoos.json");
    } catch (error) {
      result = error;
    }
    expect(result.data).toBe(null);
  });
});
