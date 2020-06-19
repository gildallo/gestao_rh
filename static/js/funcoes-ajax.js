function utilizouHoraExtra(id, op){
    console.log(id);
    token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    $.ajax({
        type: 'POST',
        url: '/pt/horas-extras/utilizou-hora-extra/' + id + '/' + op + '/',
        data: {
            csrfmiddlewaretoken: token
        },
        success: function(result){
            $("#mensagem").text(result.mensagem);
            $("#horas_atualizadas").text(result.horas);
            if(result.utilizada){
                document.getElementById("btUtilizar").style.visibility = "hidden";
                document.getElementById("btRetornar").style.visibility = "visible";
            }else{
                document.getElementById("btRetornar").style.visibility = "hidden";
                document.getElementById("btUtilizar").style.visibility = "visible";
            }
        }
    });
}