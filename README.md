# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

El ejemplo consta de los fundamentos de socket.io

- Instalar las dependencias:
```
npm install
```

- Ejecutar la aplicación em modo desarrollo:
```
npm run dev
```

Para evitar que este reinicie el servidor cada vez que cambiemos los valores en el json usamos:
```
$ nodemon server/server -e js,html
```