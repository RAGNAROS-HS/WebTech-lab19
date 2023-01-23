window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    let idclear = document.getElementById("id");
    idclear.innerHTML = '';
    var nameButtons = [];
    var authors = [];
    let filterbar = document.getElementById("filterBar");
    var filterModal = document.getElementById("filterModal");    
    filterModal.style.display = "none";

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
        console.log(data);
        data.forEach(function(person){
            if(isInVector(person.author) == false){
                authors.push(person.author);
                const insert = '<p>'+person.author+'</p>'
                let list = document.getElementById("sourcesList");
                list.insertAdjacentHTML("afterbegin", insert);
            }
            const markup = '<tr><td><div><img src = "'+person.image+'" alt="Picture of '+person.author+'"></div></td><td><button class="nameButton">'+person.author+'</button></td><td><p>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.author+'</p><p>'+person.description+'</p></td><td><p>'+person.id+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 2];
            lastRow.insertAdjacentHTML('afterend', markup);
        },
        );
    })
    .then(function(){
        nameButtons = document.getElementsByClassName("nameButton");
        for (var i = 0; i < nameButtons.length; i++) {
            let btn = nameButtons[i]
            btn.addEventListener('click', function(){
                var filter, table, tr, td, i, txtValue;
                filter = btn.textContent;
                table = document.getElementById("table");
                tr = table.getElementsByTagName("tr");
                tr.length -= 2;
                filterModal.style.display = "block";
        
                for(i = 0; i < tr.length; i++){
                    td = tr[i].getElementsByTagName("td")[1];
                    if(td){
                        txtValue = td.textContent || td.innerText;
                        if(txtValue == filter){
                            tr[i].style.display = "";
                        }else{
                            tr[i].style.display = "none";
                        }
                    }
                }
                who = document.getElementById("whoFilter");
                who.innerText = "Now filtering by: "+filter;
            });
        }
    })
    .then(function(){
        editButtons = document.getElementsByClassName("editButton");
        for(i = 0; i < editButtons.length; i++){
            let btn = editButtons[i];
            btn.addEventListener('click', function(){
                console.log("ahaha")
            })
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
                description: descriptionInput,
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
            const markup = '<tr><td><div><img src = "'+imageInput+'" alt="Picture of '+authorInput+'"></div></td><td><button class="nameButton">'+authorInput+'</button></td><td><p><strong>'+authorInput+'</strong>'+tagsInput+'</p></td><td><p>'+tagsInput+'</p></td><td><p><b>This is a photo of '+authorInput+'</p><p>'+descriptionInput+'</p></td><td><p>'+'</p></td></tr>';
            let rowsNB = document.querySelectorAll('tr');
            let lastRow = rowsNB[rowsNB.length - 3];
            lastRow.insertAdjacentHTML('afterend', markup);
        })
        .then(function(){
            nameButtons = document.getElementsByClassName("nameButton");
            nameButtons[nameButtons.length-1].addEventListener('click', function(){
                let btn = nameButtons[nameButtons.length-1];
                var filter, table, tr, td, i, txtValue;
                filter = btn.textContent;
                table = document.getElementById("table");
                tr = table.getElementsByTagName("tr");
                tr.length -= 2;
                filterModal.style.display = "block";
        
                for(i = 0; i < tr.length; i++){
                    td = tr[i].getElementsByTagName("td")[1];
                    if(td){
                        txtValue = td.textContent || td.innerText;
                        if(txtValue == filter){
                            tr[i].style.display = "";
                        }else{
                            tr[i].style.display = "none";
                        }
                    }
                }
                who = document.getElementById("whoFilter");
                who.innerText = "Now filtering by: "+filter;
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
                for(var i = 1; i < nbRows-1; i++){
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
                        const markup = '<tr><td><div><img src = '+person.image+' alt="Picture of '+person.author+'"></div></td><td><button class="nameButton">'+person.author+'</button></td><td><p>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.author+'</p><p>'+person.description+'</p></td><td><p>'+person.id+'</p></td></tr>';
                        let hahaKitten = document.getElementsByTagName("tr")[0];
                        hahaKitten.insertAdjacentHTML('afterend', markup);

                    });
                })
                .then(function(){
                    nameButtons = document.getElementsByClassName("nameButton");
                    for (var i = 0; i < nameButtons.length; i++) {
                        btn = nameButtons[i];
                        btn.addEventListener('click', function(){
                            var filter, table, tr, td, i, txtValue;
                            filter = btn.textContent;
                            table = document.getElementById("table");
                            tr = table.getElementsByTagName("tr");
                            tr.length -= 2;
                    
                            for(i = 0; i < tr.length; i++){
                                td = tr[i].getElementsByTagName("td")[1];
                                if(td){
                                    txtValue = td.textContent || td.innerText;
                                    if(txtValue == filter){
                                        tr[i].style.display = "";
                                    }else{
                                        tr[i].style.display = "none";
                                    }
                                }
                            }
                            who = document.getElementById("whoFilter");
                            who.innerText = "Now filtering by: "+filter;
                        });
                    }
                })
            })

        }

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("modalButton");
    var span = document.getElementsByClassName("close")[0];
    var span2 = document.getElementsByClassName("close")[1];
    
    var span3 = document.getElementsByClassName("close")[2];

    span3.addEventListener("click", function(){
        let who = document.getElementById("filterModal");
        who.style.display = "none";
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");

        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName("td")[1];
            if(td){
                tr[i].style.display = "";
            }
        }
    })

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

    

    filterbar.addEventListener("keydown", function(){
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("filterBar");
        filter = input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        tr.length -= 2;
        filterModal.style.display = "none";

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

    /*For the filterable gallery functionality we will be using a modified implementation of the search bar from this site: https://www.w3schools.com/howto/howto_js_filter_table.asp */

    let el = document.getElementById('updateModal');
    let updateButton = document.getElementById("uButton");
    updateButton.addEventListener('click', function(){
        let selectBox = document.getElementById("id");
        rows = document.getElementsByTagName('tr');
        ids =[];
        rows.length -= 2;

        for(i = 0; i < rows.length; i++){
            td = rows[i].getElementsByTagName("td")[5];
            if(td){
                ids.push(td.innerText)
            }
        }

        for(x = 0; x < ids.length; x++){
            const markup = '<option value="'+ids[x]+'">'+ids[x]+'</option>';
            selectBox.insertAdjacentHTML('beforeend', markup);
        }
        el.style.display="block";

    })

    span2.addEventListener("click", function(){
        el.style.display = "none";

            let nbRows = document.querySelectorAll('tr').length;
            let table = document.getElementById("table")
            for(var i = 1; i < nbRows-1; i++){
                table.deleteRow(1);
            }
            authors.length = 0;
            document.getElementById("sourcesList").innerHTML = "";
        
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
                    const markup = '<tr><td><div><img src = '+person.image+' alt="Picture of '+person.author+'"></div></td><td><button class="nameButton">'+person.author+'</button></td><td><p>'+person.alt+'</p></td><td><p>'+person.tags+'</p></td><td><p><b>This is a photo of '+person.author+'</p><p>'+person.description+'</p></td><td><p>'+person.id+'</p></td></tr>';
                    let hahaKitten = document.getElementsByTagName("tr")[0];
                    hahaKitten.insertAdjacentHTML('afterend', markup);

                })
            })
        
    })

    let box = document.getElementById("id");
    box.addEventListener("change", function(){
        let rows = document.getElementsByTagName("tr");
        rows.length -= 2;
        let selected = document.getElementById('id').value;
        for(index = 1; index < rows.length; index++){
            data = rows[index].getElementsByTagName("td")[5]; 
            if(data){
                if(data.textContent == selected){
                    let bomba = document.getElementById("image1")
                    let image = rows[index].getElementsByTagName("img")[0].getAttribute("src");
                    bomba.value = image;

                    let bimba = document.getElementById("author1")
                    let author = rows[index].getElementsByTagName("button")[0].innerText;
                    bimba.value = author;

                    let bumba = document.getElementById("alt1")
                    let alt = rows[index].getElementsByTagName("p")[0].innerText;
                    bumba.value = alt;

                    let bamba = document.getElementById("tags1")
                    let tag = rows[index].getElementsByTagName("p")[1].innerText;
                    bamba.value = tag;

                    let bymba = document.getElementById("description1")
                    let description = rows[index].getElementsByTagName("p")[2].innerText;
                    bymba.value = description;
                }
            }
        }
    })

    let updateSubmit = document.getElementById("update");
    updateSubmit.addEventListener("click", function(e){
        
            e.preventDefault();
            console.log("poopy");
            var imageInput = document.getElementById('image1').value
            var authorInput = document.getElementById('author1').value
            var altInput = document.getElementById('alt1').value
            var tagsInput = document.getElementById('tags1').value
            var descriptionInput = document.getElementById('description1').value
            var imageId = document.getElementById("id").value
            let str = "https://wt.ops.labs.vu.nl/api23/99a18706/item/"+imageId
            console.log(str);
    
            fetch(str, {
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body:JSON.stringify({
                    image: imageInput,
                    author: authorInput,
                    alt: altInput,
                    tags: tagsInput,
                    description: descriptionInput,
                }),
            })
      
    })


});


