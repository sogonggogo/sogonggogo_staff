// API 클라이언트 설정

// Next.js rewrites를 통해 프록시되므로 상대 경로 사용
const API_BASE_URL = "";

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // DELETE 요청의 경우 상세 로깅
  if (options?.method === "DELETE") {
    console.log(`[Client] DELETE request to: ${url}`, {
      endpoint,
      fullUrl: url,
      method: options.method,
    });
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    // 204 No Content 응답 처리 (에러 체크 전에)
    if (response.status === 204) {
      return {} as T;
    }

    if (!response.ok) {
      let errorData = null;
      try {
        const text = await response.text();
        if (text) {
          errorData = JSON.parse(text);
        }
      } catch {
        // JSON 파싱 실패 시 무시
      }
      
      // 404 에러의 경우 더 자세한 정보 로깅
      if (response.status === 404) {
        console.error(`404 Not Found: ${options?.method || 'GET'} ${url}`, {
          endpoint,
          method: options?.method || 'GET',
          errorData,
        });
      }
      throw new ApiError(response.status, response.statusText, errorData);
    }

    // 응답 본문이 있는 경우에만 JSON 파싱
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      try {
        return await response.json();
      } catch {
        // JSON 파싱 실패 시 빈 객체 반환
        return {} as T;
      }
    }

    // JSON이 아닌 경우 빈 객체 반환
    return {} as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error}`);
  }
}

export const apiClient = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: "GET" }),

  post: <T>(endpoint: string, data?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, { method: "DELETE" }),
};

