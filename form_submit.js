window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    fetch("https://wt.ops.labs.vu.nl/api23/98ce034a",{})
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.forEach(function(person){
            const markup = '<tr><td><div><img src = "'+person.image+'"></div></td><td>'+person.author+'</td><td><p><strong>'+person.author+'</strong>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.name+'</p><p>This talented persona is responsible for concepts like:</p><p>'+person.description+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 3];
            lastRow.insertAdjacentHTML('afterend', markup);
        });
    })

    var form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        
        e.preventDefault()
        var imageInput = document.getElementById('image').value
        var authorInput = document.getElementById('author').value
        var altInput = document.getElementById('alt').value
        var tagsInput = document.getElementById('tags').value
        var descriptionInput = document.getElementById('description').value

        fetch("https://wt.ops.labs.vu.nl/api23/98ce034a", {
            method: 'POST',
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                image: imageInput,
                author: authorInput,
                alt: altInput,
                tags: tagsInput,
                description: descriptionInput
            }),
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
        .then(function(){
            const markup = '<tr><td><div><img src = "'+imageInput+'"></div></td><td>'+authorInput+'</td><td><p><strong>'+authorInput+'</strong>'+tagsInput+'</p></td><td><p>'+tagsInput+'</p></td><td><p><b>This is a photo of '+authorInput+'</p><p>This talented persona is responsible for concepts like:</p><p>'+descriptionInput+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 3];
            lastRow.insertAdjacentHTML('afterend', markup);
        });

        });

        let reset = document.getElementsByTagName("button")[0];
        reset.addEventListener("click", resetFunction);

        function resetFunction() {
            fetch("https://wt.ops.labs.vu.nl/api23/98ce034a/reset", {
                method: 'GET',
            })
        }


        let update = document.getElementsByTagName("button")[1];
        update.addEventListener("click", updateFunction);

        function updateFunction(){

        }

});


