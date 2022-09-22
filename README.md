# MauricioRomero_Repositorios

## Instalación

1. Instalar NodeJS [link de descarga](https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi)
2. Clonar el repositorio, se recomienda VSCode.
3. Ejecutar npm install en el terminal.
4. Crear archivo de configuración .env en la raiz del proyecto y agregar el siguiente contenido.

USER=UserRepository
PASSWORD=****
HOST=****
DATABASE=****
NODE_ENV=development
REPOSITORY_STATUS_URL=http://localhost:3000/repositories/status
SSL=true
SYNCHRONIZE=false
PORT=26257

Nota: **** Reemplazar por los valores correspondientes.
Nota2: Se recomienda mantener la variable SSL en true durante la primera ejecución para que genenere la BDD.
Nota3: La BDD debe existir, el proyecto no crea Bases de Datos.

5. Ejecutar el comando npx tsc en el terminal.

## Ejecución
1. Ejecutar comando npm run dev en el terminal.
2. Importar el archivo Repositorios.postman_collection.json que se encuentra en la raíz del proyecto en Postman.

## Pruebas

1. Ejecutar comando npm run test en el terminal.

## Contenido del archivo .env

