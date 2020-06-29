// Todo lo que este con el $ adelante es jQuery
$(function(){
    // -- Selectores --
    // primer parrafo que encuentre, le pone el fondo rojo
    // $('p').first().css('background-color', 'read');
    // a todos les pone el fondo azul
    $('p').css('background-color', 'blue');
    // Pero por prioridad le da al id si o si
    $('#parrafo1').css('background-color', 'green');
    // a todos los .naranja dentro de un div lo pongo naranja
    $('div .naranja').css('background-color', 'orange');

    // -- Eventos --
    $('.naranja').click(function(){
        // Hago referencia al evento al que se le hizo click con this
        $(this).css('background-color', 'violet');
    })

    // $('p:first').on('click', (function(){
    //     $(this).css('background-color', 'violet');
    // }))

    $('p:first').on('click', cambiarColor);//Agrego un handler al click
    $('p:first').off('click', cambiarColor);//Se lo saco

    function cambiarColor(elem){
        $(elem.target).css('background-color', 'red');
    }

    // la primer function se ejecuta cuando estamos arriba del elemento
    // y la segunda cuando salimos
    $('p').hover(function(){
        $(this).css('background-color', 'yellow');
    }, function(){
        $(this).css('background-color', 'cyan');
    })

    // -- Efectos --
    // Cuando se hace click en el boton, se hace un hide de 3000 ms
    // $('#btnOcultar').on('click', function(){
    //     $('#parrafo1').hide(1000, function(){
    //         console.log('Se oculto el primer parrafo');
    //     })
    //     $('#parrafo1').show(1000, function(){
    //         console.log('Se mostro el primer parrafo');
    //     })
    // })

    // Un click oculta otro click muestra
    $('#btnOcultar').on('click', function(){
        $('#parrafo1').toggle(1000, function(){
            console.log('Se oculto el primer parrafo');
        })
    })
    // $('#btnFade').click(function(){
    //     $('#parrafo1').fadeOut(1000, function(){
    //         console.log('Se oculto el primer parrafo');
    //     })
    // })

    // Un click oculta otro click muestra
    $('#btnFade').click(function(){
        $('#parrafo1').fadeToggle(1000);
    })

    $('#btnSlide').click(function(){
        $('#parrafo1').slideToggle(1000);
    })

    // -- Animate --
    // Cuando este por encima del parrafo, que agregue 100 px de altura y cuando salgo
    // se los reste
    $('p:first').hover(function(){
        $(this).animate({'height': '+=100px', 'border':'1px solid red'});
    }, function(){
        $(this).animate({'height': '-=100px', 'border':'1px solid red'});
    })

    // -- Manejo del HTML --
    // Con .text() ya tengo el contenido del primer parrafo
    console.log($('p:first').text());
    // Modifico el texto del parrafo
    // $('p:first').text('nuevo texto del parrafo 1')
    // console.log($('p:first').text());

    // Esto imprime el html del elemento
    console.log($('#parrafo2').html());

    // Del comboBox dame el valor de la option que este checkeada
    $('select').on('change',function(){
        console.log($(this).first('option:checked').val());
    })

    // -- Agregar HTML --
    $('p:first').before('<p>Parrafo Agregado antes del primero</p>');

    // Ajax
    // $('#btnGet').on('click', function(){
    //     $.get('http://localhost:3000/traer', function(data, status){
    //         console.log(data);
    //         console.log(status);
    //     })
    // })
    
    // $('#btnPost').on('click', function(){
    //     $.post('http://localhost:3000/alta', {'atributo1':'valor1'}, function(data, status){
    //         console.log(data);
    //         console.log(status);
    //     })
    // })

    // $('#btnAjax').on('click', function(){
    //     $.ajax({
    //         url:'http://localhost:3000/alta',
    //         method:'POST',
    //         data:JSON.stringify({'atributo1':'valor1', 'atributo2':'valor2'}),
    //         success: function(resultado){
    //             console.log(resultado.message);
    //         },
    //         error: function(){
    //             console.log('Ha ocurrido un error');
    //         },
    //         complete: function(){
    //             console.log('Transaccion completa');
    //         }
    //     })
    // })

    $('body').load('../components/div.html');
});