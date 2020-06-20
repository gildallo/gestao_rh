# Gestão RH
Projeto criado pelo curso de Python e Django realizado na plataforma da Udemy<bt>
Este projeto pode usar qualquer ambiente que suporte as bibliotecas do arquivo requirements.txt.<br>
Mas no curso criamos um ambiente para desenvolvimento usando o virtualenv, segue o comando para criação<br> 
do ambiente com o virtualenv.

    $ python -m venv nomedoambiente

Comando para rodar o celery na aplicação:

    $ celery -A gestao_rh worker -l info

Comando para rodar Celery Workers e Celery Beat simultaneamente:

    $ celery -A gestao_rh worker --beat --scheduler django --loglevel=info
# Internacionalização - Tradução
Resumo referente ao sistema de internacionalização<br>
Para geração automática dos arquivos locale é necessário ter o gettext instalado na máquina.<br>
Comando para instalar no MacOSX:

    $ brew install gettext

Alteração no settings:

    LANGUAGES = (
        ('en', _('English')),
        ('pt', _('Portugues')),
        ('es', _('Spanish')),
    )

    LOCALE_PATHS = (
        os.path.join(BASE_DIR, 'locale'),
    )

    #Colocar após o middleware da sessão:

    'django.middleware.locale.LocaleMiddleware',

    'django.template.context_processors.i18n',

Para utilizar a tradução fora do ramplate, é necessário o código abaixo na view:

    from django.utils.translation import gettext_lazy as _

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['report_button'] = _("Employee report")
        return context

Comando para gerar o locale:

    $ python manage.py makemessages -l pt

Comando para compilar os arquivos locales:

    $ django-admin compilemessages

Colocar em todos templates que usam traducão:

    {% load i18n %}

Exemplo de uso simples:

    {% trans "Texto a ser traduzido" %}

# Deploy em ambiente de produção conforme aula

Foi criado um ambiente de produção conforme instruido pelo instrutor utilizando um linux Fedora, na pasta "Utils" 
encontra-se os exemplos de configuração usado para o gunicorn e nginx.

# Deploy em ambiente de produção com Docker

Foi realizados estudos para implementar o projeto em um ambiente de produção diferenciado, 
o deploy foi realizado em um Fedora 32, utilizando Docker, Gunicorn, Nginx, PostgreSQL.

* Rotina utilizada no preparo do ambiente de produção
1. Construir uma imagem com os requisitos mínimos usando o Dockerfile da pasta deploy, usar o comando "docker build" no mesmo diretório do arquivo Dockerfile:
	- $ docker build -t centos-to-django .
2. Cria o volume para aplicação e ajustar configurações necessárias:
	- docker volume create django-app-01
	- aplicar as permissões no diretório do volume no host para o usuário 
	- Por padrão os volumes ficam em /var/lib/docker/volumes/__data/django-app-01
    - Clonar a aplicação no volume criado.
	- Configurar o postgresql do host para conversar com o container(liberar ip no pg_hba.conf)
	- Configurar o settings.py (Variáveis e banco)
	- Conferir se os serviços utilizados estão onlines: Postgres, Redis, Nginx
3. Foi utilizado a aplicação Portainer para gerenciar o docker, use as seguintes opções na criação do container:
    - Usar a imagem centos-to-django
    - port publishing: 8001:8001
    - EntryPoint: deploy/run-app.sh
    - workking dir: /django-app-01/gestao_rh
    - Console: (-i -t)
    - Volume no container: /django-app-01
4. Configurar NGINX:
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
- Sair do container acessado com attach sem parar o container<br>
$ utilizar o comandos "CRTL+P", "CRTL+Q" seguidos no terminal do container<br>
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