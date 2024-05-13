const main = require("./main.js")
const message = require("./src/message.js")
const fs = require("fs")
const path = require("path")
const chokidar = require("chokidar")

const modules = new Map()

function recarregarModule(arquivo) {
  console.log(`Modulo ${arquivo} modificado! Recarregando...`)
  delete require.cache[require.resolve(arquivo)]
  modules.set(arquivo, require(arquivo))
}

function monitorarArquivos(arquivo) {
  const watcher = chokidar.watch(arquivo, {
    ignored: /node_modules/,
    persistent: true
  })

  watcher.on("change", () => {
    recarregarModulo(arquivo)
  })
  console.log(`Monitorando alterações em ${arquivo}...`);
}

const arquivo = fs.readdirSync(path.join(__dirname, "./src"))

arquivo.forEach((arquivo) => {
  if (arquivo.endsWith(".js")) {
    const arquivoCompleto = path.join(__dirname, "./src", arquivo)
    monitorarArquivos(arquivoCompleto)
    modules.set(arquivoCompleto, require(arquivoCompleto))
  }
})

module.exports = monitorarArquivos
