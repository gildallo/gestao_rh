# gestao_rh
Projeto criado pelo curso de Python e Django realizado na plataforma da Udemy

Este projeto pode usar qualquer ambiente que suporte as bibliotecas do arquivo requirements.txt.

Mas no curso criamos um ambiente para desenvolvimento usando o virtualenv, segue o comando para criação do ambiente com o virtualenv.

$ python -m venv nomedoambiente

# Deploy em ambiente de produção conforme aula

Foi criado um ambiente de produção conforme instruido pelo instrutor utilizando um linux Fedora, na pasta "Utils" 
encontra-se os exemplos de configuração usado para o gunicorn e nginx.


# Deploy em ambiente de produção com Docker

Foi realizados estudos para implementar o projeto em um ambiente de produção diferenciado, 
o deploy foi realizado em um Fedora 32, utilizando Docker, Gunicorn, Nginx, PostgreSQL.

* Rotina utilizada no preparo do ambiente de produção
1. Preparar uma imagem com os requisitos de serviços:
	- Baixar a imagem do centos 8 do repositório oficial do docker.
	- Criar um container, atualizar o linux no container e instalar o nano.
	- Instalar o python 3: dnf install python3
	- Instalar o gunicorn no container: pip3 install gunicorn
	- comitar o container para uma nova imagem (Criei com o nome "centos-to-django"")
2. Cria o volume para aplicação:
	- docker volume create django-app02
	- aplicar as permissões no diretório do volume no host para o usuário 
	- Por padrão os volumes ficam em /var/lib/docker/volumes/__data/django-app02>
3. Iniciar um container com volume do app:
	- docker run -itd -p 8001:8001 --name django-app02 --mount source=django-app02,target=/django-app02 centos-to-django
4. Preparar e rodar a aplicação:
	- Clonar a aplicação no diretório do host que corresponde ao volume.
	- Configurar o postgresql do host para conversar com o container(liberar ip no pg_hba.conf)
	- Configurar o settings.py (Variáveis e banco)
	- Criei um arquivo run-deploy.sh na pasta deploy no mesmo diretório do app, com o conteúdo a seguir:
		
	\#!/usr/bin/env bash<br>
	cd /django-app02/gestao_rh/<br>
	NOW=$(TZ=":America/Sao_Paulo" date +"%d-%m-%Y_%H-%M-%S")<br>
	LOG=/django-app02/deploy/logs/logs-deploy-${NOW}.log<br>
	echo "==================== Encerrando os processos gunicorn ====================" >> $LOG<br>
	ps aux | grep gunicorn | awk '{print $2;}' | xargs kill -9 2>/dev/null >> $LOG<br>
	echo "==================== Instalando requerimentos ====================" >> $LOG<br>
	pip3 install -r requirements.txt >> $LOG<br>
	echo "==================== Rodando migrações do banco de dados ====================" >> $LOG<br>
	python3 manage.py migrate >> $LOG<br>
	echo "==================== Gerando arquivos estáticos ====================" >> $LOG<br>
	python3 manage.py collectstatic --noinput >> $LOG<br>
	echo "==================== Iniciando o gunicorn ====================" >> $LOG<br>
	gunicorn --bind :8001 --workers 3 gestao_rh.wsgi:application >> $LOG<br>

	- Inciar o container criado: docker start django-app02
	- Conferir se os serviços utilizados estão onlines: Postgres, Redis, Nginx
	- Rodar o arquivo run-deploy.sh: docker exec -d -w /django-app02/deploy/ django-app02 ./run-deploy.sh
	- Configurar o virtualhost no nginx (É importante verificar a permissão dos diretos dos arquivos estáticos, toda a arvore deve estar acessível).
	- Recarregar configurações do nginx: nginx -s reload
	
# Comandos docker estudados
- Baixando uma imagem docker/centos do repositório oficial.<br>
$ docker pull centos
- Listar as imagens disponíveis no pc<br>
$ docker image ls
- Criar um container com opção interativa<br>
$ docker run -it <nome-da-imagem>
- Listar Containers ativos<br>
$ docker ps
- Lista todos os containers(ativados e desativados)<br>
$ docker ps -a
- Acessar um container em execução<br>
$ docker attach <id-ou-apelido>
- Salvar alterações realizadas na imagem<br>
$ docker commit <ID/apelido> <nome-da-nova-imagem>

- Remover imagem local<br>
$ docker rmi ID_ou_nome_da_imagem
- Criar um container com apelido<br>
$ docker run --name <apelido> <nome-da-imagem>
- Remover um container<br>
$ docker rm <id-ou-apelido>
- Informações de uso de hardware do container<br>
$ docker stats <id-ou-apelido>
- Informações uteis do container<br>
$ docker inspect <id-ou-apelido>
- Mapeando uma porta do container com o host<br>
$ docker run -it -p 8080:80 <id-ou-apelido>
- Executar container em segundo plano(Parametro -d)<br>
$ docker run -d <nome-da-imagem>
- Executar comando em modo interativo sem estar dentro do container<br>
$ docker exec -it <id-ou-apelido> <comando>
- Limpar o que não é usado<br>
$ docker system prune
- Criando Volume<br>
$ docker volume create django-app01
Observação: Os volume são criados por padrão no diretório do docker: /var/lib/docker/volumes/
- Iniciando um container com um volume<br>
$ docker run -d --name django-app01 --mount source=app01,target=/django-app01 centos-to-django