import { Checkbox } from "@mui/material"
import React, { useState } from "react"

export default function MateriaDiv({ mainTitle }) {
    const [checked, setChecked] = React.useState(false)

    const handleChange = event => {
        setChecked(event.target.checked)
    }

    return (
        <div
            style={{
                backgroundColor: "#024059",
                padding: "3%",
                margin: "1.2vw",
                width: "auto",
                height: "15vh",
                minWidth: "20vw",
                borderRadius: "1vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                border: "0.2vw solid #04D94F",
                boxShadow: "0.5vw 0.5vw 1.5vw rgba(0, 0, 0, 0.3)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                }}
            >
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    style={{ color: "#F2F2F2" }}
                />
                <h4 style={{ color: "#F2F2F2" }}>{mainTitle}</h4>
            </div>
        </div>
    )
}
