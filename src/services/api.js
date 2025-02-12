import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTk4ZmNmMDgzZjc3ODA4NWQwMThhMTMxMzBkODQwYSIsIm5iZiI6MTczOTIwNjg5Mi4yNDcsInN1YiI6IjY3YWEzMGVjZDE2ZGM3Njc3MzM5ZTk2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tLFrrZ1l2KWJMcT59JUonPZ7sYt9cxkus4xpYbb3Yrs";
const axiosOptions = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    },
});

export const fetchTrendingMovies = async (page) => {
    const { data } = await axiosOptions.get(`/trending/movie/week?language=en-US&page=${page}`);
    return data;
};

export const fetchSearchMovies = async (query, page) => {
    const { data } = await axiosOptions.get(`/search/movie?query=${query}&page=${page}`);
    return data;
};
