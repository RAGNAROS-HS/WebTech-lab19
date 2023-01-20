window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    fetch("https://wt.ops.labs.vu.nl/api23/99a18706",{})
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

        fetch("https://wt.ops.labs.vu.nl/api23/99a18706", {
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

            fetch("https://wt.ops.labs.vu.nl/api23/99a18706/reset", {
                method: 'GET',
            })
            .then(response=>response.json())
            .then(data=>{ console.log(data); })
        }


        let update = document.getElementsByTagName("button")[1];
        update.addEventListener("click", updateFunction);
        var table = document.getElementById("table"),rIndex;

            
        for(var i = 1; i < table.rows.length - 2; i++){
            table.rows[i].addEventListener("click",function(){
                rIndex = this.rowIndex;
                console.log(rIndex);
                document.getElementById("image").value = table.rows[i].cells[1].innerHTML;
                document.getElementById("author").value = table.rows[i].cells[2].innerHTML;
                document.getElementById("alt").value = table.rows[i].cells[3].innerHTML;
                document.getElementById("tags").value = table.rows[i].cells[4].innerHTML;
                document.getElementById("description").value = table.rows[i].cells[5].innerHTML;
            })
            console.log("listener added");
        }                 
                    
        function updateFunction(){
            table.rows[rIndex].cells[1].innerHTML = document.getElementById("image").value;
            table.rows[rIndex].cells[2].innerHTML = document.getElementById("author").value;
            table.rows[rIndex].cells[3].innerHTML = document.getElementById("alt").value;
            table.rows[rIndex].cells[4].innerHTML = document.getElementById("tags").value;
            table.rows[rIndex].cells[5].innerHTML = document.getElementById("description").value;
        }
});


