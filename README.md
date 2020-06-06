# gestao_rh
Projeto criado pelo curso de Python e Django realizado na plataforma da Udemy

Este projeto pode usar qualquer ambiente que suporte as bibliotecas do arquivo requirements.txt.

Mas no curso criamos um ambiente para desenvolvimento usando o virtualenv, segue o comando para criação do ambiente com o virtualenv.

$ python -m venv nomedoambiente

Comando para instalar as bibliotecas requeridas

$ pip install -r requirements.txt

Foi criado um ambiente de produção utilizando um linux Fedora, na pasta "Utils" encontra-se os exemplos de configuração usado para o gunicorn e nginx.

Para o nginx rodar os arquivos estáticos corretamente, é necessário utilizar o comando a seguir para compilar os arquivos estáticos:

$ python manage.py collectstatic