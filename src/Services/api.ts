// Services/api.ts
import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios"; // <- IMPORT DE TIPO

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: false, // <- sem cookies/sessão
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// sempre que for mandar request, injeta o access_token no header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


let isRefreshing = false;
let queue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  originalConfig: AxiosRequestConfig;
}[] = [];

function processQueue(error: any, token: string | null) {
  queue.forEach(({ resolve, reject, originalConfig }) => {
    if (error) {
      reject(error);
    } else {
      if (token) {
        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${token}`;
      }
      resolve(api.request(originalConfig));
    }
  });
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

    // só tenta refresh se for 401 e ainda não tentamos
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) {
        // não tem refresh -> desloga
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";

        
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // se já tem refresh em andamento, coloca na fila
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject, originalConfig });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refresh_token: refresh }
        );

        const newAccess = data.access_token as string;
        localStorage.setItem("access_token", newAccess);

        isRefreshing = false;
        processQueue(null, newAccess);

        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${newAccess}`;
        return api.request(originalConfig);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);



// função para tratar erros
function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    return {
      status: err.response?.status ?? 0,
      message: err.response?.data?.message || err.message,
      details: err.response?.data,
    };
  }
  return {
    status: 0,
    message: "Erro desconhecido",
    details: error,
  };
}

// funções genéricas
export async function get<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const res = await api.get<T>(url, config);
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
}

export async function post<T, B = any>(url: string, body?: B, config?: AxiosRequestConfig) {
  try {
    const res = await api.post<T>(url, body, config);
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
}

export async function put<T, B = any>(url: string, body?: B, config?: AxiosRequestConfig) {
  try {
    const res = await api.put<T>(url, body, config);
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
}

export async function del<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const res = await api.delete<T>(url, config);
    return res.data;
  } catch (err) {
    throw handleError(err);
  }
}

