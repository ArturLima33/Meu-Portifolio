"use client";

import { useState } from "react";
import estilos from "./page.module.css";
import JogoForca from "./components/JogoForca";

export default function Home() {
  const [jogoAtivo, setJogoAtivo] = useState(false);

  return (
    <div className={estilos.pagina}>
      {!jogoAtivo && (
        <main className={estilos.principal}>
          <header className={estilos.cabecalho}>
            <h1>Nome: Artur Bacalhau
            </h1>
          </header>

          <section className={estilos.secao}>
            <h2>Bem-vindo!</h2>
            <p>
              Olá! Seja muito bem-vindo ao meu projeto! Sou estudante de <strong>Ciência da Computação</strong> e criei este jogo especialmente para você. Divirta-se, desafie seus conhecimentos e aproveite cada momento jogando!
            </p>
            <button className={estilos.botaoJogar} onClick={() => setJogoAtivo(true)}>
              Jogar Jogo da Forca
            </button>
          </section>
        </main>
      )}

      {jogoAtivo && (
        <>
          <button className={estilos.botaoVoltar} onClick={() => setJogoAtivo(false)}>
            ← Voltar para Home
          </button>
          <JogoForca />
        </>
      )}
    </div>
  );
}