import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getBlogs = async () => {
  const res = await axios.get(`${API}/blogs`);
  return res.data.data;
};

export const addBlog = async (blog: any) => {
  const res = await axios.post(
    `${API}/blogs`,
    blog,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
