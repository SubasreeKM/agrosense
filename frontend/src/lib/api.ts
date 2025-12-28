const BASE_URL = "http://localhost:5000/api";

export const api = {
  getTodos: async () => {
    const res = await fetch(`${BASE_URL}/todo`);
    return res.json();
  },

  addTodo: async (task: string) => {
    return fetch(`${BASE_URL}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
  },

  updateTodo: async (id: string, completed: boolean) => {
    return fetch(`${BASE_URL}/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  },

  deleteTodo: async (id: string) => {
    return fetch(`${BASE_URL}/todo/${id}`, {
      method: "DELETE",
    });
  },
};
