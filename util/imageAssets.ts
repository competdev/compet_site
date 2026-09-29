export const DEFAULT_PHOTO = "/images/default-photo.webp"

export const IMAGE_ASSETS = {
    logoHorizontal: "/images/logo-horizontal.webp",
    logoCompet: "/images/logo-compet.webp",
    logoInterpet: "/images/logo-interpet.webp",
    iconInstagram: "/images/icon-instagram.webp",
    iconLinkedin: "/images/icon-linkedin.webp",
    iconFacebook: "/images/icon-facebook.webp",
    iconTwitter: "/images/icon-twitter.webp",
    iconMail: "/images/icon-mail.webp",
    iconLattes: "/images/icon-lattes.webp",
    iconSearch: "/images/icon-search.webp",
    iconClock: "/images/icon-clock.webp",
    iconBook: "/images/icon-book.webp",
    iconPeople: "/images/icon-people.webp",
    iconIdea: "/images/icon-idea.webp",
    interpetSobre: "/images/interpet-sobre.webp",
    aboutCompet: "/images/about-compet.webp",
    blogHeader: "/images/blog-header.webp",
    help: "/images/help.webp",
    certPet: "/images/cert-pet.webp",
    certTalks: "/images/cert-talks.webp",
    certCompbio: "/images/cert-compbio.webp",
    junteSeIcone: "/images/junte-se-icone.webp",
    icone10anos: "/images/icone-10anos.webp",
    manualCalendario: "/images/manual-calendario.webp",
    manualFaltas: "/images/manual-faltas.webp",
    manualEmail: "/images/manual-email.webp",
    manualGrupos: "/images/manual-grupos.webp",
    manualFormularios: "/images/manual-formularios.webp",
    manualEstagio: "/images/manual-estagio.webp",
    manualGruposGerais: "/images/manual-grupos-gerais.webp",
    manualCoordenacao: "/images/manual-coordenacao.webp",
    manualBiblioteca: "/images/manual-biblioteca.webp",
} as const

const IBB_TO_LOCAL: Record<string, string> = {
    "https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png": IMAGE_ASSETS.logoHorizontal,
    "https://i.ibb.co/PY1byp5/Logo-2021-Fundo-Branco-sem-texto.png": IMAGE_ASSETS.logoCompet,
    "https://i.ibb.co/MhJkY7n/Logo-Interpet.png": IMAGE_ASSETS.logoInterpet,
    "https://i.ibb.co/61Y0dqL/instagram-icon.png": IMAGE_ASSETS.iconInstagram,
    "https://i.ibb.co/cvRb3nZ/linkedin-icon.png": IMAGE_ASSETS.iconLinkedin,
    "https://i.ibb.co/mT4S0S9/facebook-icon.png": IMAGE_ASSETS.iconFacebook,
    "https://i.ibb.co/Zfb5rRR/twitter-icon.png": IMAGE_ASSETS.iconTwitter,
    "https://i.ibb.co/3swTqhQ/default-photo.webp": DEFAULT_PHOTO,
    "https://i.ibb.co/5ckzrdq/mail-icon.png": IMAGE_ASSETS.iconMail,
    "https://i.ibb.co/r438RBd/lattes-icon.png": IMAGE_ASSETS.iconLattes,
    "https://i.ibb.co/6Ncfhf0/Search-Icon.jpg": IMAGE_ASSETS.iconSearch,
    "https://i.ibb.co/QNYSh70/clock.png": IMAGE_ASSETS.iconClock,
    "https://i.ibb.co/t87HGv3/book.png": IMAGE_ASSETS.iconBook,
    "https://i.ibb.co/YDG6CXd/people.png": IMAGE_ASSETS.iconPeople,
    "https://i.ibb.co/fCY9y4N/idea.png": IMAGE_ASSETS.iconIdea,
    "https://i.ibb.co/fGszj1d/inter-Pet-sobre.jpg": IMAGE_ASSETS.interpetSobre,
    "https://i.ibb.co/HFHt1Kq/0006.png": IMAGE_ASSETS.aboutCompet,
    "https://i.ibb.co/tDjGdZP/blog.png": IMAGE_ASSETS.blogHeader,
    "https://i.ibb.co/0BY1q2k/Help.png": IMAGE_ASSETS.help,
    "https://i.ibb.co/nbdnSB7/9.png": IMAGE_ASSETS.certPet,
    "https://i.ibb.co/GVfDrhm/4.png": IMAGE_ASSETS.certTalks,
    "https://i.ibb.co/nffSXMG/3.png": IMAGE_ASSETS.certCompbio,
    "https://i.ibb.co/4FC1KfN/2.png": IMAGE_ASSETS.manualCalendario,
    "https://i.ibb.co/NTmfzKR/8.png": IMAGE_ASSETS.manualFaltas,
    "https://i.ibb.co/dk6NQf3/Design-sem-nome.png": IMAGE_ASSETS.manualEmail,
    "https://i.ibb.co/vPY3JQY/3.png": IMAGE_ASSETS.manualGrupos,
    "https://i.ibb.co/wKqx1sc/4.png": IMAGE_ASSETS.manualFormularios,
    "https://i.ibb.co/8bJKW6r/5.png": IMAGE_ASSETS.manualEstagio,
    "https://i.ibb.co/Tq0dz0c/6.png": IMAGE_ASSETS.manualGruposGerais,
    "https://i.ibb.co/z5BzbZm/8.png": IMAGE_ASSETS.manualCoordenacao,
    "https://i.ibb.co/VVDHbcK/7.png": IMAGE_ASSETS.manualBiblioteca,
}

const YT_THUMB_HOSTS = new Set(["i.ytimg.com", "img.youtube.com"])

function encodeLocalPath(src: string): string {
    if (!src.startsWith("/") || src.startsWith("//")) return src
    try {
        return encodeURI(decodeURI(src))
    } catch {
        return encodeURI(src)
    }
}

export function resolvePublicImageSrc(src?: string | null): string {
    if (!src || !String(src).trim()) return DEFAULT_PHOTO
    const trimmed = String(src).trim()
    return encodeLocalPath(IBB_TO_LOCAL[trimmed] ?? trimmed)
}

export function youtubeSizedThumb(
    src?: string | null,
    variant: "sddefault" | "hqdefault" = "sddefault"
): string {
    const resolved = resolvePublicImageSrc(src)
    if (!resolved.startsWith("http")) return resolved
    try {
        const url = new URL(resolved)
        if (!YT_THUMB_HOSTS.has(url.hostname)) return resolved
        url.pathname = url.pathname.replace(
            /\/(maxresdefault|sddefault|hqdefault|mqdefault|hq720|default)\.(jpg|jpeg|webp)/i,
            `/${variant}.$2`
        )
        return url.toString()
    } catch {
        return resolved
    }
}

export function pickDisplayImage(
    images: Array<{ url?: string; width?: number; height?: number }> | undefined,
    targetWidth = 640
): { url: string; width: number; height: number } {
    const fallback = {
        url: DEFAULT_PHOTO,
        width: targetWidth,
        height: Math.round((targetWidth * 9) / 16),
    }
    const valid = (images ?? []).filter(img => Boolean(img?.url))
    if (!valid.length) return fallback

    const sized = valid
        .map(img => ({
            url: youtubeSizedThumb(img.url, "sddefault"),
            width: img.width && img.width > 0 ? img.width : targetWidth,
            height: img.height && img.height > 0 ? img.height : Math.round((targetWidth * 9) / 16),
        }))
        .sort((a, b) => a.width - b.width)

    const fit = sized.find(img => img.width >= Math.min(targetWidth, 480))
    const chosen = fit ?? sized[sized.length - 1]
    return {
        ...chosen,
        url: youtubeSizedThumb(chosen.url, "sddefault"),
        width: Math.min(chosen.width, targetWidth) || targetWidth,
        height: chosen.width
            ? Math.round((Math.min(chosen.width, targetWidth) * chosen.height) / chosen.width)
            : Math.round((targetWidth * 9) / 16),
    }
}

export function isOptimizedRemoteHost(src: string): boolean {
    try {
        const hostname = new URL(src).hostname
        return (
            hostname === "i.ibb.co" ||
            hostname === "ibb.co" ||
            hostname === "i.ytimg.com" ||
            hostname === "img.youtube.com"
        )
    } catch {
        return false
    }
}
