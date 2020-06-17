import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'fdflksdhfsdbfsdfgbksdf'
DEBUG = False
ALLOWED_HOSTS = ['127.0.0.1']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'fdfdfd',
        'USER': 'fdfdfd',
        'PASSWORD': 'fdfdfd',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    },
    'antigo': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'dbantigo.sqlite3'),
    }
}
#EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'Nome da Pessoa <xxxxx@gmail.com>'
#EMAIL_USE_TLS = False
#EMAIL_USE_SSL = True
#EMAIL_HOST = 'smtp.gmail.com'
#EMAIL_HOST_USER = 'xxxx@gmail.com'
#EMAIL_HOST_PASSWORD = 'xxxx'
#EMAIL_PORT = 465

CONTACT_EMAIL = 'xxxxxx@gmail.com'

CELERY_BROKER_URL = 'redis://127.0.0.1:6379'
