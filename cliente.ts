import * as net from "net";
const readline = require("readline-sync");
function gerarLeitura(banca: number) {
  return {
    banca,
    temperatura: (Math.random() * (26 - 18) + 18).toFixed(2),
    umidade: (Math.random() * (90 - 60) + 60).toFixed(2),
    condutividade: (Math.random() * (2.5 - 1.2) + 1.2).toFixed(2),
  };
}

const cliente = net.createConnection({ host: "localhost", port: 3000 });
/*
setInterval(() => {
  console.log("ESTADO ATUAL DAS BANCAS:");
  let temp_bancadas = [];
  let umidade_bancada = [];
  let cond_bancada = [];
  for (const banca in bancas) {
    var sum = temp_bancadas.reduce((acumulator, currentValue) => {
      return acumulator + currentValue;
    }, 0);
    console.log(
      `Média: `,
      sum / 2,
      banca,
      "Temperatura: ",
      (parseFloat(bancas[banca].temperatura) +
        parseFloat(bancas[banca].temperatura)) /
        2
    ),
      " Umidade: ",
      parseFloat(bancas[banca].umidade),
      " Condutividade: ",
      parseFloat(bancas[banca].condutividade);

    temp_bancadas.push(
      parseFloat(bancas[banca].temperatura)
    );
    umidade_bancada.push( 
      parseFloat(bancas[banca].umidade)
    );
    cond_bancada.push(
      parseFloat(bancas[banca].condutividade)
    );
  }
}, 5000);
*/
cliente.on("connect", () => {
  for (let banca = 1; banca <= 1; banca++) {
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
