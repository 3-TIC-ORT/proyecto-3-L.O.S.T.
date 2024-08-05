function CreatePost() {
   let pene = document.createElement("div");
   pene.textContent = "épico"
   pene.classList.add("post");
   document.getElementById("ObjectsList").appendChild(pene);
   console.log("Hola")
} document.getElementById("create").addEventListener("click", CreatePost);