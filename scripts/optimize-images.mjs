import { execFile } from "node:child_process"
import { promisify } from "node:util"
import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const execFileAsync = promisify(execFile)
const root = process.cwd()
const imagesDir = path.join(root, "public", "images")

const downloads = [
    { url: "https://i.ibb.co/MPZVFyj/menu-Logo-Horizontal.png", file: "logo-horizontal.webp", max: 640 },
    { url: "https://i.ibb.co/PY1byp5/Logo-2021-Fundo-Branco-sem-texto.png", file: "logo-compet.webp", max: 800 },
    { url: "https://i.ibb.co/MhJkY7n/Logo-Interpet.png", file: "logo-interpet.webp", max: 600 },
    { url: "https://i.ibb.co/61Y0dqL/instagram-icon.png", file: "icon-instagram.webp", max: 96 },
    { url: "https://i.ibb.co/cvRb3nZ/linkedin-icon.png", file: "icon-linkedin.webp", max: 96 },
    { url: "https://i.ibb.co/mT4S0S9/facebook-icon.png", file: "icon-facebook.webp", max: 96 },
    { url: "https://i.ibb.co/Zfb5rRR/twitter-icon.png", file: "icon-twitter.webp", max: 96 },
    { url: "https://i.ibb.co/3swTqhQ/default-photo.webp", file: "default-photo.webp", max: 400 },
    { url: "https://i.ibb.co/5ckzrdq/mail-icon.png", file: "icon-mail.webp", max: 96 },
    { url: "https://i.ibb.co/r438RBd/lattes-icon.png", file: "icon-lattes.webp", max: 96 },
    { url: "https://i.ibb.co/6Ncfhf0/Search-Icon.jpg", file: "icon-search.webp", max: 96 },
    { url: "https://i.ibb.co/QNYSh70/clock.png", file: "icon-clock.webp", max: 128 },
    { url: "https://i.ibb.co/t87HGv3/book.png", file: "icon-book.webp", max: 128 },
    { url: "https://i.ibb.co/YDG6CXd/people.png", file: "icon-people.webp", max: 128 },
    { url: "https://i.ibb.co/fCY9y4N/idea.png", file: "icon-idea.webp", max: 128 },
    { url: "https://i.ibb.co/fGszj1d/inter-Pet-sobre.jpg", file: "interpet-sobre.webp", max: 1200 },
    { url: "https://i.ibb.co/HFHt1Kq/0006.png", file: "about-compet.webp", max: 1000 },
    { url: "https://i.ibb.co/tDjGdZP/blog.png", file: "blog-header.webp", max: 1600 },
    { url: "https://i.ibb.co/0BY1q2k/Help.png", file: "help.webp", max: 400 },
    { url: "https://i.ibb.co/nbdnSB7/9.png", file: "cert-pet.webp", max: 800 },
    { url: "https://i.ibb.co/GVfDrhm/4.png", file: "cert-talks.webp", max: 800 },
    { url: "https://i.ibb.co/nffSXMG/3.png", file: "cert-compbio.webp", max: 800 },
    { url: "https://i.ibb.co/4FC1KfN/2.png", file: "manual-calendario.webp", max: 800 },
    { url: "https://i.ibb.co/NTmfzKR/8.png", file: "manual-faltas.webp", max: 800 },
    { url: "https://i.ibb.co/dk6NQf3/Design-sem-nome.png", file: "manual-email.webp", max: 800 },
    { url: "https://i.ibb.co/vPY3JQY/3.png", file: "manual-grupos.webp", max: 800 },
    { url: "https://i.ibb.co/wKqx1sc/4.png", file: "manual-formularios.webp", max: 800 },
    { url: "https://i.ibb.co/8bJKW6r/5.png", file: "manual-estagio.webp", max: 800 },
    { url: "https://i.ibb.co/Tq0dz0c/6.png", file: "manual-grupos-gerais.webp", max: 800 },
    { url: "https://i.ibb.co/z5BzbZm/8.png", file: "manual-coordenacao.webp", max: 800 },
    { url: "https://i.ibb.co/VVDHbcK/7.png", file: "manual-biblioteca.webp", max: 800 },
]

async function curlDownload(url, dest) {
    await execFileAsync(
        "curl.exe",
        [
            "-L",
            "--fail",
            "--retry",
            "4",
            "--retry-delay",
            "2",
            "--max-time",
            "90",
            "-A",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "-o",
            dest,
            url,
        ],
        { windowsHide: true }
    )
}

async function toWebp(input, max, dest) {
    await sharp(input)
        .rotate()
        .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(dest)
}

async function compressInPlace(filePath, max) {
    const ext = path.extname(filePath).toLowerCase()
    const tmp = `${filePath}.tmp`
    const pipeline = sharp(filePath)
        .rotate()
        .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })

    if (ext === ".png") {
        await pipeline.png({ compressionLevel: 9, quality: 70 }).toFile(tmp)
    } else if (ext === ".webp") {
        await pipeline.webp({ quality: 78 }).toFile(tmp)
    } else {
        await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(tmp)
    }

    const before = (await fs.stat(filePath)).size
    const after = (await fs.stat(tmp)).size
    if (after < before) {
        await fs.rename(tmp, filePath)
        return { before, after }
    }
    await fs.unlink(tmp)
    return { before, after: before }
}

async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) files.push(...(await walk(full)))
        else files.push(full)
    }
    return files
}

const localSkip = new Set(["comment.svg", "like.svg", "save.svg", "vercel.svg", "share.png"])

async function main() {
    await fs.mkdir(imagesDir, { recursive: true })

    for (const item of downloads) {
        const dest = path.join(imagesDir, item.file)
        const tmp = `${dest}.src`
        try {
            await fs.access(dest)
            console.log(`skip ${item.file} (already exists)`)
            continue
        } catch {
            /* download */
        }
        try {
            await curlDownload(item.url, tmp)
            await toWebp(tmp, item.max, dest)
            await fs.unlink(tmp)
            const size = (await fs.stat(dest)).size
            console.log(`ok  ${item.file}  ${(size / 1024).toFixed(1)} KB`)
        } catch (error) {
            await fs.rm(tmp, { force: true })
            console.error(`fail ${item.file}: ${error.message}`)
        }
    }

    const junteSe = path.join(root, "public", "junte-se a nós - icone.png")
    const junteDest = path.join(imagesDir, "junte-se-icone.webp")
    try {
        await fs.access(junteSe)
        await toWebp(junteSe, 800, junteDest)
        const size = (await fs.stat(junteDest)).size
        console.log(`ok  junte-se-icone.webp  ${(size / 1024).toFixed(1)} KB`)
        await fs.unlink(junteSe)
        console.log("removed original junte-se icon")
    } catch (error) {
        if (error.code !== "ENOENT") console.error(`fail junte-se: ${error.message}`)
    }

    const publicDir = path.join(root, "public")
    const files = await walk(publicDir)
    for (const file of files) {
        const rel = path.relative(publicDir, file).replaceAll("\\", "/")
        if (rel.startsWith("images/")) continue
        const ext = path.extname(file).toLowerCase()
        if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue
        if (localSkip.has(path.basename(file))) continue
        const max = rel.startsWith("PetianosEmProjetos/") ? 480 : 900
        try {
            const { before, after } = await compressInPlace(file, max)
            if (after < before) {
                console.log(
                    `compressed ${rel}  ${(before / 1024).toFixed(1)} -> ${(after / 1024).toFixed(1)} KB`
                )
            }
        } catch (error) {
            console.error(`fail ${rel}: ${error.message}`)
        }
    }
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
