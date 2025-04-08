import * as net from "net";

function gerarLeitura(banca: number) {
  return {
    banca,
    temperatura: (Math.random() * (26 - 18) + 18).toFixed(2),
    umidade: (Math.random() * (90 - 60) + 60).toFixed(2),
    condutividade: (Math.random() * (2.5 - 1.2) + 1.2).toFixed(2),
  };
}

const cliente = net.createConnection({ host: "localhost", port: 3000 });

cliente.on("connect", () => {
  for (let banca = 1; banca <= 2; banca++) {
    const leitura = gerarLeitura(banca);
    cliente.write(JSON.stringify(leitura) + "\n");
  }
  cliente.end();
});

/*
cliente.on("data", (mensagem: Buffer) => {
  console.log(`Servidor respondeu: ${mensagem.toString("utf-8")}`);
});*/

cliente.on("close", () => {
  console.log("Conexão encerrada");
});
