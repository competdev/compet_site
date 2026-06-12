import { Materias } from "./interfaces"

export type MateriaDocumento = Materias & { grade?: string }

export function parseCarga(value: unknown): number {
    if (value == null || value === "") return 0
    if (typeof value === "number" && Number.isFinite(value)) return value
    if (typeof value === "string") {
        const parsed = Number.parseInt(value.trim(), 10)
        return Number.isFinite(parsed) ? parsed : 0
    }
    if (typeof value === "object" && value !== null) {
        const obj = value as Record<string, unknown>
        if ("$numberInt" in obj) return parseCarga(obj.$numberInt)
        if ("$numberLong" in obj) return parseCarga(obj.$numberLong)
        if (typeof obj.valueOf === "function") {
            const primitive = obj.valueOf()
            if (primitive !== value) return parseCarga(primitive)
        }
    }
    return 0
}

export function normalizeMateria(doc: Record<string, unknown>): MateriaDocumento {
    return {
        nome: String(doc.nome ?? ""),
        periodo: String(doc.periodo ?? ""),
        natureza: String(doc.natureza ?? ""),
        carga: parseCarga(doc.carga),
        prerequisitos: Array.isArray(doc.prerequisitos) ? doc.prerequisitos.map(String) : [],
        corequisitos: Array.isArray(doc.corequisitos) ? doc.corequisitos.map(String) : [],
        grade: doc.grade != null ? String(doc.grade) : undefined,
    }
}

export const GRADES_VELHA = ["velha", "antiga"] as const

export function filtrarMateriasPorGrade(materias: MateriaDocumento[], grade: "nova" | "velha"): Materias[] {
    if (grade === "nova") {
        return materias.filter((m) => m.grade === "nova")
    }
    return materias.filter((m) => m.grade != null && GRADES_VELHA.includes(m.grade as (typeof GRADES_VELHA)[number]))
}
