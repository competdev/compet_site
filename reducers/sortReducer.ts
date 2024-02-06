import { sort } from "fast-sort"
import { SortOrder, SortAction } from "../types/types"

export function sortReducer(state: any[], action: SortAction) {
    switch (action.type) {
        case SortOrder.NAME_ASC:
            return sort(state).asc(u => u.nome)
        case SortOrder.NAME_DESC:
            return sort(state).desc(u => u.nome)
        case SortOrder.DATE_ASC:
            return state
                .slice()
                .sort(
                    (a, b) =>
                        new Date(a.data_fim).getFullYear() - new Date(b.data_fim).getFullYear()
                )
        case SortOrder.DATE_DESC:
            return state
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.data_fim).getFullYear() - new Date(a.data_fim).getFullYear()
                )
        default:
            return state
    }
}
