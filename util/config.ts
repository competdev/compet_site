import type { IncomingMessage } from "http"

export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"

/** Base para chamar `/api/*` no SSR: usa host da requisição (evita 404 quando a porta ≠ 3000). No cliente, URL relativa. */
export function getInternalApiBaseUrl(req?: IncomingMessage): string {
    if (typeof window !== "undefined") return ""
    if (!req?.headers?.host) return NEXT_URL
    const xf = req.headers["x-forwarded-proto"]
    const proto =
        typeof xf === "string"
            ? xf.split(",")[0].trim()
            : Array.isArray(xf) && xf[0]
              ? xf[0]
              : "http"
    return `${proto}://${req.headers.host}`
}
