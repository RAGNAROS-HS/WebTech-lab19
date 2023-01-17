window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');




    const formEl = document.querySelector('.submit');

    formEl.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(formEl);
        const data = new URLSearchParams(formData);

        fetch("https://wt.ops.labs.vu.nl/api23/98ce034a", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    })
});

