import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = "http://uoscholar-server.store/sogong-api";

// API Route 핸들러가 호출되는지 확인
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // API 명세서에 따라: DELETE /api/staff/inventory/{id}
    const backendUrl = `${BACKEND_API_URL}/api/staff/inventory/${id}`;

    // 요청 정보 로깅
    const requestUrl = request.url;
    console.log(`[DELETE] API Route handler called`, {
      requestUrl,
      id,
      backendUrl,
      method: request.method,
    });

    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`[DELETE] Backend response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: response.statusText || "Failed to delete item" };
      }

      console.error(`[DELETE] Backend error:`, {
        status: response.status,
        statusText: response.statusText,
        errorData,
        url: backendUrl,
      });

      return NextResponse.json(
        {
          error:
            errorData.message || `Failed to delete item (${response.status})`,
          status: response.status,
        },
        { status: response.status }
      );
    }

    // 204 No Content 응답 처리
    if (response.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // 200 OK 등 다른 성공 응답 처리
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      try {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } catch {
        // JSON 파싱 실패 시 빈 객체 반환
        return NextResponse.json(
          { success: true },
          { status: response.status }
        );
      }
    }

    // JSON이 아닌 경우 성공 응답으로 처리
    return NextResponse.json({ success: true }, { status: response.status });
  } catch (error) {
    console.error("[DELETE] Error proxying request:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
