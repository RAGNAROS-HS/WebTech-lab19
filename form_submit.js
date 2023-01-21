window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    var nameButtons = [];
    var authors = [];
    let filterbar = document.getElementById("filterBar");

    
    function isInVector(element){
        var result = false;
        for(var i=0; i < authors.length; i++){
            if(authors.at(i) == element){
                result = true;
                return result;
            }
        }
        return result;
    }

    fetch("https://wt.ops.labs.vu.nl/api23/99a18706",{})
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.forEach(function(person){
            if(isInVector(person.author) == false){
                authors.push(person.author);
                const insert = '<p>'+person.author+'</p>'
                let list = document.getElementById("sourcesList");
                list.insertAdjacentHTML("afterbegin", insert);
            }
            const markup = '<tr><td><div><img src = "'+person.image+'" alt="Picture of '+person.author+'"></div></td><td><button class="nameButton">'+person.author+'</button></td><td><p>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.author+'</p><p>'+person.description+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 3];
            lastRow.insertAdjacentHTML('afterend', markup);
        },
        );
    })
    .then(function(){
        nameButtons = document.getElementsByClassName("nameButton");
        for (var i = 0; i < nameButtons.length; i++) {
            let btn = nameButtons[i]
            btn.addEventListener('click', function(){
                filterbar.value = btn.textContent;
                filterbar.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
            });
            console.log("listener added");
        }
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
            if(isInVector(authorInput) == false){
                authors.push(authorInput);
                const insert = '<p>'+authorInput+'</p>'
                let list = document.getElementById("sourcesList");
                list.insertAdjacentHTML("afterbegin", insert);
            }
            const markup = '<tr><td><div><img src = "'+imageInput+'" alt="Picture of '+authorInput+'"></div></td><td><button class="nameButton">'+authorInput+'</button></td><td><p><strong>'+authorInput+'</strong>'+tagsInput+'</p></td><td><p>'+tagsInput+'</p></td><td><p><b>This is a photo of '+authorInput+'</p><p>'+descriptionInput+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 3];
            lastRow.insertAdjacentHTML('afterend', markup);
        })
        .then(function(){
            nameButtons = document.getElementsByClassName("nameButton");
            nameButtons[nameButtons.length].addEventListener('click', function(){
                filterbar.innerText = nameButtons[nameButtons.length].innerText;
                console.log("listener added");
            });
        })

        });

        let reset = document.getElementsByClassName("resetButton")[0];
        reset.addEventListener("click", resetFunction);

        function resetFunction() {

            fetch("https://wt.ops.labs.vu.nl/api23/99a18706/reset", {
                method: 'GET',
            })
            .then(data=>{ console.log(data); 
            })
            .then(function(){
                let nbRows = document.querySelectorAll('tr').length;
                let table = document.getElementById("table")
                for(var i = 1; i < nbRows-2; i++){
                    table.deleteRow(1);
                }
                authors.length = 0;
                document.getElementById("sourcesList").innerHTML = "";
            })
            .then(function(){
                fetch("https://wt.ops.labs.vu.nl/api23/99a18706",{})
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    data.forEach(function(person){
                        if(isInVector(person.author) == false){
                            authors.push(person.author);
                            const insert = '<p>'+person.author+'</p>'
                            let list = document.getElementById("sourcesList");
                            list.insertAdjacentHTML("afterbegin", insert);
                        }
                        const markup = '<tr><td><div><img src = '+person.image+' alt="Picture of '+person.author+'"></div></td><td><button class="nameButton">'+person.author+'</button></td><td><p>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.author+'</p><p>'+person.description+'</p></td></tr>';
                        let hahaKitten = document.getElementsByTagName("tr")[0];
                        hahaKitten.insertAdjacentHTML('afterend', markup);

                    });
                })
                .then(function(){
                    nameButtons = document.getElementsByClassName("nameButton");
                    for (var i = 0; i < nameButtons.length; i++) {
                        btn = nameButtons[i];
                        btn.addEventListener('click', function(){
                            filterbar.value = btn.textContent;
                        });
                        console.log(btn.textContent);
                        console.log("listener added")
                    }
                })
            })

        }

/*
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

*/
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("modalButton");
    var span = document.getElementsByClassName("close")[0];

    btn.addEventListener("click", function(){
        modal.style.display = "block";
    })

    span.addEventListener("click", function(){
        modal.style.display = "none";
    })

    window.addEventListener("click", function(){
        if(event.target == modal){
            modal.style.display = "none";
        }
    })

    

    filterbar.addEventListener("keypress", function(){
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("filterBar");
        filter = input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        tr.length -= 2;

        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName("td")[1];
            if(td){
                txtValue = td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                }else{
                    tr[i].style.display = "none";
                }
            }
        }

    })

    console.log(nameButtons.length);
/*
    for (var i = 0; i < nameButtons.length; i++) {
        nameButtons[i].addEventListener('click', namefunction(i));
        console.log("listener added")
    }
*/
    function namefunction(i){
       // console.log(nameButtons[i].innerText)
        //console.log(filterbar.innerText)
        console.log("click");
        filterbar.innerText = this.innerText;
    }

    /*For the filterable gallery functionality we will be using a modified implementation of the search bar on this site: https://www.w3schools.com/howto/howto_js_filter_table.asp */

});


