function utilizouHoraExtra(url){
    token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    $.ajax({
        type: 'POST',
        url: url,
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

function process_response(funcionarios){
    func_select = document.getElementById('funcionarios');
    func_select.innerHTML = "";

    funcionarios.forEach(function(funcionario){
        var option = document.createElement("option");
        option.text = funcionario.fields.nome;
        func_select.add(option);
    });
}

function filtraFuncionarios(url){
    depart_id = document.getElementById('departamentos').value;
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            outro_param: depart_id
        },
        success: function(result){
            process_response(result);
            $("#mensagem").text('Funcionarios carregados');
        }
    });
}