# CUOL-Wordle Backend - django

This directory contains *(link files are the most important ones to look at)*:
- Django server files
    - cuol_wordle_django - main django app that includes [settings](cuol_wordle_django/setings.py)
    - cuol_wordle_api - [APIs](cuol_wordle_api/views.py), [models](cuol_wordle_api/models.py), [crons](cuol_wordle_api/crons.py)
    - auth_wordle - authentication app 
    - frontend - app that servers the static files
- [Dockerfile](Dockerfile) to build the container 
- [docker compose](docker-compose.yaml) to run the PostgreSQL and the Django server locally
- [cloud migrate](cloudmigrate.yaml) that build the image, pushes it to Google Container Registry and uploads the static files to Google Storage Bucket - [source](https://cloud.google.com/python/django/run)

## How to run

**Prerequisites**

- Installed PostgreSQL or exposed running PostgreSQL container
- Have python 3.10 installed

1. correct the DATABASES variable in [settings](cuol_wordle_django/setings.py) accordigly to your setup
Example:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'wordle_db',
        'USER': 'backend',
        'PASSWORD': 'test',
        'HOST': 'localhost',
        'PORT': 5432 
    }
}
```

1. Install required python packages
`pip install -r requirements.txt`

1. Create migrations
`python3 manage.py makemigrations`

1. Apply migrations
`python3 manage.py migrate`

1. Copy the UI build  to the `ui` directory. \
You can copy the build using `cp -r ../../cuol-wordle-ui/cuol_wordle_ui/build ./ui`

1. Collect static files using `python3 manage.py collectstatic`
1. Run server
`python3 manage.py runserver`

