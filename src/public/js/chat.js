const socket = io();


const chatBox = document.getElementById("input-msg");
const nameBox = document.getElementById("span-nombre").innerHTML;

chatBox.addEventListener("keyup", ({ key }) => {
  //alert("toco " + key);
  if (key == "Enter") {
    console.log(nameBox);
    socket.emit("msg_front_to_back", {
      user: nameBox,
      message: chatBox.value,
    });
    chatBox.value = "";
  }
});

socket.on("todos_los_msgs", (msgs) => {
  const divMsgs = document.getElementById("div-msgs");
  let contenido = "";
  msgs.forEach((msg) => {
    contenido = contenido + `<p>${msg.user} dice: ${msg.message}</p>`;
  });
  divMsgs.innerHTML = contenido;
  window.scrollTo(0, document.body.scrollHeight);
});