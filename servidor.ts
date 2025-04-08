import * as net from "net";

const bancas: Record<number, any> = {};

const servidor = net.createServer((socket) => {
  console.log("Cliente conectado");

  socket.on("data", (mensagem: Buffer) => {
    const linhas = mensagem
      .toString("utf-8")
      .split("\n")
      .filter((l) => l.trim() !== "");
    linhas.forEach((linha) => {
      const dados = JSON.parse(linha);
      const { banca } = dados;

      bancas[banca] = dados;

      console.log(`Dados da banca ${banca}:`, dados);
    });

    socket.write("Dados recebidos com sucesso");
  });

  socket.on("close", () => {
    console.log("Cliente desconectado");
  });
});

servidor.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});

setInterval(() => {
  console.log("ESTADO ATUAL DAS BANCAS:");
  let temp_bancadas = [];
  let umidade_bancada = [];
  let cond_bancada = [];
  for (const banca in bancas) {
    // console.log(`Banca ${banca}:`, bancas[banca], "Temperatura: ", (parseFloat(bancas[banca].temperatura) + parseFloat(bancas[banca].temperatura)) / 2), " Umidade: ", (parseFloat(bancas[banca].umidade));
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
