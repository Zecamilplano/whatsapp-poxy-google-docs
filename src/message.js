
function reciveMessage(client) {
  console.log("msg")

  return (
    client.on('message_create', message => {
      console.log(message.body)

      if (message.body === "!atividade") {
        console.log("oi tudo bem ")

      }
    })
  )
}
module.exports = reciveMessage
