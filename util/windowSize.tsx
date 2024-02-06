import React, { useState, useEffect } from "react"

// Usage
function App() {
    const size = useWindowSize()
    return (
        <div>
            {size.width}px / {size.height}px
        </div>
    )
}

// Hook
export default function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            handleResize()
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])
    return windowSize
}
