import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { apelidoMateria } from "./apelidoMateria"

describe("apelidoMateria", () => {
    it("abreviado OFT, MOFT, AEDs, AOC e labs", () => {
        assert.equal(
            apelidoMateria(
                "Fundamentos de Oscilações, Fluidos e Termodinâmica (OFT)"
            ),
            "OFT"
        )
        assert.equal(apelidoMateria("Física Experimental - MOFT"), "MOFT")
        assert.equal(
            apelidoMateria("Algoritmos e Estruturas de Dados I"),
            "AEDs I"
        )
        assert.equal(
            apelidoMateria("Laboratório de Algoritmos e Estruturas de Dados I"),
            "Lab AEDs I"
        )
        assert.equal(
            apelidoMateria("Arquitetura e Organização de Computadores II"),
            "AOC II"
        )
        assert.equal(
            apelidoMateria(
                "Laboratório de Arquitetura e Organização de Computadores I"
            ),
            "Lab AOC I"
        )
    })

    it("abreviado GAAL, POO, SD, BD, engenharia de software e cálculos", () => {
        assert.equal(
            apelidoMateria("Geometria Analítica e Álgebra Linear"),
            "GAAL"
        )
        assert.equal(apelidoMateria("Programação Orientada a Objetos"), "POO")
        assert.equal(
            apelidoMateria("Laboratório de Programação Orientada a Objetos"),
            "Lab POO"
        )
        assert.equal(apelidoMateria("Sistemas Digitais para Computação"), "SD")
        assert.equal(apelidoMateria("Banco de Dados I"), "BD I")
        assert.equal(
            apelidoMateria("Engenharia de Software II"),
            "Engenharia de Software II"
        )
        assert.equal(
            apelidoMateria("Laboratório de Engenharia de Software I"),
            "Lab Engenharia de Software I"
        )
        assert.equal(
            apelidoMateria("Cálculo com Funções de uma Variável Real"),
            "Cálculo I"
        )
        assert.equal(
            apelidoMateria("Cálculo com Funções de Várias Variáveis I"),
            "CFVV1"
        )
        assert.equal(
            apelidoMateria("Cálculo com Funções de Várias Variáveis II"),
            "CFVV2"
        )
        assert.equal(
            apelidoMateria("Matemática Discreta"),
            "Matemática Discreta"
        )
        assert.equal(
            apelidoMateria("Fundamentos de Mecânica"),
            "Fundamentos de Mecânica"
        )
    })

    it("mantém nome original quando não há apelido", () => {
        assert.equal(apelidoMateria("Grafos"), "Grafos")
        assert.equal(apelidoMateria("Compiladores"), "Compiladores")
    })
})
