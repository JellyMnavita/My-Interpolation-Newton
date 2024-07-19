function polynome() {
    let xInput = $('.x');
    let fxInput = $('.fx');
    let x = [];
    let fx = [];

    for (let i = 0; i < xInput.length; i++) {
        x[i] = xInput.eq(i).val();
        fx[i] = fxInput.eq(i).val();
    }

    var form = new FormData();
    form.append("x", x);
    form.append("fx", fx);
    form.append('typeOP', 'polynome');
    var settings = {
        "url": "../php/traitement.php",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        response = JSON.parse(response);

        $('.myOutput').text(response.polynome);
    })
}
function valeurPoint() {
    let xInput = $('.x');
    let fxInput = $('.fx');
    let xi = $('.xi').val();
    let x = [];
    let fx = [];

    for (let i = 0; i < xInput.length; i++) {
        x[i] = xInput.eq(i).val();
        fx[i] = fxInput.eq(i).val();
    }

    var form = new FormData();
    form.append("x", x);
    form.append("fx", fx);
    form.append("xi", xi);
    form.append('typeOP', 'valeur');
    var settings = {
        "url": "http://localhost/Examen%20Analyse%20Num/php/traitement.php",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        response = JSON.parse(response);
        $('.myFx').text(response.valeur);
    })
}










/********************************EVENEMENTS***************************************** */

const ouverture = $('#submit');
const popUp = $('#solution');
const fond = $('#dark');
const fermeture = $('#myFerm');
const valeur = $('#valeurPoint');

ouverture.click(function (e) {
    e.preventDefault();
    polynome();
    popUp.removeClass('cacher');
    fond.removeClass('cacher');
})
valeur.click(function (e) {
    e.preventDefault();
    valeurPoint();
})
fermeture.click(function () {
    popUp.addClass('cacher');
    fond.addClass('cacher');
})




$('#plus').click(function () {
    let medoc = '<div class="medoc">' +
    '<div class="inputGroup">' +
    '<input type="text" class="x" required>' +
    '<input type="text" class="fx" required>' +
    '</div>' +
    '</div>';

    let number = $('.medoc').length;
    if (number < 10) {
        $('.group-medoc-medoc').append(medoc);
    }
    else {
        alert("Le nombre maximum de couple(x,fx) est 10")
    }
});

