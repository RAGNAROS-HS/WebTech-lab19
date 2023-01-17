window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    let imageX;
    let authorX;
    let altX;
    let tagsX;
    let descriptionX;


    function logSubmit(event) {
        imageX = document.getElementById("image").value;
        authorX = document.getElementById("author").value;
        altX = document.getElementById("alt").value;
        tagsX = document.getElementById("tags").value;
        descriptionX = document.getElementById("description").value;
        event.preventDefault();
    }

    const form = document.getElementById("submitForm");
    form.addEventListener('submit', logSubmit);

    function objectData (image, author, alt, tags, description){
        this.image = image;
        this.author = author;
        this.alt = alt;
        this.tags =  tags;
        this.description = description;
    }

    const obiekt1 = new objectData(imageX, authorX, altX, tagsX, descriptionX);

});

