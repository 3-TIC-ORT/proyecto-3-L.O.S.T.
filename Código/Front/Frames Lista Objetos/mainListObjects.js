function CreatePost() {
   let nuevo = document.createElement("div");
   nuevo.textContent = "épico"
   nuevo.classList.add("post");
   document.getElementById("ObjectsList").appendChild(nuevo);
} document.getElementById("create").addEventListener("click", CreatePost);