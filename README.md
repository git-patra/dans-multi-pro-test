### Tech yang digunakan adalah Framework Nestjs dengan DBMS MYSQL dan bahasa Typescript

## Running the app

```bash
# setting .env
$ DBMS menggunakan MYSQL, credential mohon sesesuai dengan .env.example

# install package
$ yarn install

# running
$ npm run start:dev

# untuk dokumentasi parameter dan url apa saja yang bisa dihit bisa dilihat di swagger, kunjungi:
$ http://localhost:3333/api/docs

# list api
$ /api/users/login (login)
$ /api/users (create user)
$ /api/job-lists (index pagination + filter)
$ /api/job-lists/:id (detail job lsit)

# seeder account login
$ email: admin@dansmulti.pro
$ password: 123


```

## Noted

```
# Semua endpoint job-list baik pagination/detail akan menembak api yang disediakan dans multi pro menggunakan library axios
# example (http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description)
# feature yang saya kerjakan hanya login, create user, dan hit end point api yg telah disediakan
```