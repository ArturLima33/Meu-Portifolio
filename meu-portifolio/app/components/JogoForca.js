"use client";

import { useState, useEffect } from "react";
import estilos from "../styles/Forca.module.css";
import ForcaSVG from "./ForcaSVG";

const palavrasPorCategoria = {
  "Estruturas de Dados": [
    "ARRAY","LISTA","PILHA","FILA",
    "GRAFO","HASH","MAPA","VETOR",
    "NO","ARVORE"
  ],

  "Algoritmos": [
    "BUSCA","ORDENAR","MERGE","QUICK",
    "BUBBLE","INSERT","SELECAO",
    "RECURSAO","ITERACAO","DIVIDE"
  ],

  "Banco de Dados": [
    "TABELA","COLUNA","LINHA","CHAVE",
    "INDICE","SELECT","INSERT",
    "DELETE","UPDATE","QUERY"
  ],

  "Redes": [
    "TCP","UDP","IP","DNS","HTTP",
    "PACOTE","SERVIDOR","CLIENTE",
    "ROTA","PORTA"
  ],

  "Sistemas Operacionais": [
    "KERNEL","PROCESSO","THREAD",
    "MEMORIA","CACHE","ARQUIVO",
    "DISCO","SISTEMA","CPU","TEMPO"
  ],

  "Programação": [
    "FUNCAO","CLASSE","OBJETO",
    "VARIAVEL","STRING","NUMERO",
    "BOOLEANO","CODIGO","ERRO",
    "PYTHON"
  ],

  "Tecnologias": [
    "GITHUB","LINUX","WINDOWS",
    "ANDROID","APPLE","GOOGLE",
    "CHROME","FIREFOX","SERVER",
    "CLOUD"
  ]
};

export default function JogoForca() {
  const [categoria, setCategoria] = useState("");
  const [palavra, setPalavra] = useState("");
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [letraSelecionada, setLetraSelecionada] = useState("");
  const [aviso, setAviso] = useState("");
  const maxErros = 6;

  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  const iniciarNovoJogo = () => {
    const categorias = Object.keys(palavrasPorCategoria);
    const novaCategoria = categorias[Math.floor(Math.random() * categorias.length)];
    setCategoria(novaCategoria);

    const palavras = palavrasPorCategoria[novaCategoria];
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];

    setPalavra(novaPalavra);
    setLetrasCertas([]);
    setLetrasErradas([]);
    setLetraSelecionada("");
    setAviso("");
  };

  const enviarLetra = () => {
    const letra = letraSelecionada.toUpperCase();

    if (!letra) {
      setAviso("Digite uma letra antes de enviar!");
      return;
    }

    if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
      setAviso(`Você já usou a letra "${letra}"`);
      return;
    }

    if (palavra.includes(letra)) {
      setLetrasCertas([...letrasCertas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
    }

    setLetraSelecionada("");
    setAviso("");
  };

  const handleLetraClick = (letra) => {
    if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) {
      setAviso(`Você já usou a letra "${letra}"`);
      return;
    }

    setAviso("");
    setLetraSelecionada(letra);
  };

  const handleApagarLetra = () => {
    setLetraSelecionada("");
  };

  const handleTeclado = [
    "Q","W","E","R","T","Y","U","I","O","P",
    "A","S","D","F","G","H","J","K","L","⌫",
    "Z","X","C","V","B","N","M","ENTER"
  ];

  const palavraExibida = palavra
    .split("")
    .map((l) => (letrasCertas.includes(l) ? l : "_"))
    .join(" ");

  const venceu = palavra && palavra.split("").every((l) => letrasCertas.includes(l));
  const perdeu = letrasErradas.length >= maxErros;

  if (venceu || perdeu) {
    return (
      <div className={estilos.container}>
        <h2>Jogo da Forca</h2>
        <p><strong>Categoria:</strong> {categoria}</p>

        <ForcaSVG erros={letrasErradas.length} />
        <p className={estilos.palavra}>{palavraExibida}</p>

        {venceu && <p className={estilos.vitoria}>Parabéns! Você acertou: {palavra}</p>}
        {perdeu && <p className={estilos.derrota}>Fim de jogo! A palavra era: {palavra}</p>}

        <button onClick={iniciarNovoJogo} className={estilos.botao}>
          Jogar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={estilos.container}>
      <h2>Jogo da Forca</h2>
      <p><strong>Categoria:</strong> {categoria}</p>

      <ForcaSVG erros={letrasErradas.length} />
      <p className={estilos.palavra}>{palavraExibida}</p>

      <div className={estilos.caixinhaLetra}>
        {letraSelecionada || "_"}
      </div>

      {aviso && <p className={estilos.aviso}>{aviso}</p>}

      <div className={estilos.teclado}>
        {handleTeclado.map((tecla) => {
          if (tecla === "⌫") {
            return (
              <button key="apagar" onClick={handleApagarLetra} className={estilos.botaoTeclado}>
                ⌫
              </button>
            );
          }

          if (tecla === "ENTER") {
            return (
              <button key="enter" onClick={enviarLetra} className={estilos.botaoEnter}>
                ENTER
              </button>
            );
          }

          return (
            <button
              key={tecla}
              onClick={() => handleLetraClick(tecla)}
              className={`${estilos.botaoTeclado} ${
                letrasCertas.includes(tecla)
                  ? estilos.acertou
                  : letrasErradas.includes(tecla)
                  ? estilos.errou
                  : ""
              }`}
            >
              {tecla}
            </button>
          );
        })}
      </div>
    </div>
  );
}