import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { isOptimizedRemoteHost, resolvePublicImageSrc } from "../../util/imageAssets"

type OptimizedImageProps = Omit<ImageProps, "src" | "alt"> & {
    src?: string | null
    alt: string
}

function isHttpUrl(src: string): boolean {
    return src.startsWith("http://") || src.startsWith("https://")
}

export default function OptimizedImage({
    src,
    alt,
    className,
    priority = false,
    sizes,
    fill,
    width,
    height,
    quality = 75,
    style,
    onError,
    ...rest
}: OptimizedImageProps) {
    const resolvedSrc = resolvePublicImageSrc(src)
    const [failed, setFailed] = useState(false)
    const canOptimize = Boolean(fill || (width != null && height != null))
    const useNext =
        canOptimize &&
        !failed &&
        (!isHttpUrl(resolvedSrc) || isOptimizedRemoteHost(resolvedSrc))

    const nativeStyle = fill
        ? {
              position: "absolute" as const,
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain" as const,
              ...style,
          }
        : style

    if (!useNext) {
        return (
            <img
                src={resolvedSrc}
                alt={alt}
                className={className}
                style={nativeStyle}
                width={typeof width === "number" ? width : undefined}
                height={typeof height === "number" ? height : undefined}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={priority ? "high" : undefined}
                referrerPolicy="no-referrer"
                onError={onError}
            />
        )
    }

    return (
        <Image
            src={resolvedSrc}
            alt={alt}
            className={className}
            style={fill ? { objectFit: "contain", ...style } : style}
            fill={fill}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            sizes={sizes}
            priority={priority}
            quality={quality}
            {...rest}
            onError={event => {
                setFailed(true)
                onError?.(event)
            }}
        />
    )
}
