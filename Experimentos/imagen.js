document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Seleccionar el primer archivo
    if (file) {
        const reader = new FileReader();

        // Función que se ejecuta cuando el archivo se ha cargado
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result; // Establece la fuente de la imagen
        };

        reader.readAsDataURL(file); // Convierte el archivo en una URL base64
    }
});
