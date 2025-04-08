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


