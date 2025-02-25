# simplifood demo

## Ejecutar el proyecto en local

```bash
npm install && npm run dev
```

Acceder a `http://localhost:3000/login` para usar la demo.

## Decisiones técnicas

### Uso de cookies para las sesiones

Para el manejo de las sesiones se hizo uso de cookies con ayuda de la librería [iron-session](https://github.com/vvo/iron-session). Las cookies se almacenan en el cliente con los datos encriptados y únicamente se puede acceder a ellas por medio de https (`httpOnly: true`y `secure: true` en producción).

El acceso a las credenciales del usuario se hace por `server-side`.

### Uso de server components y server actions

El fetching de la información se hace por server-side utilizando `server components`; posteriormente los datos son pasados a `client components` para renderizarse.

Los services son básicamente `server actions` que realizan peticiones a la api para mandar o recibir información. Todo este proceso se realiza server-side.

### Manejo de estado local

Se utilizó [zustand](https://github.com/pmndrs/zustand) para el manejo local del estado. La lista de `Order`s que se solicitan de la api desde el server-side, son almacenadas dentro de un `store` (`/stores/order-store.ts`). El componente `OrdersTable` (`/components/orders/orders-table.tsx`) consume este store para renderizar las Orders, gestionar el paginado y eliminar elementos de la tabla.

### Refresh token

Se utilizó [axios](https://github.com/axios/axios) para el manejo de las peticiones. Cuando una petición responde con un status `401`, un interceptor es invocado para realizar el `refresh token`. Este interceptor hace una petición a `/api/refresh` que es manejada por un `route handler` (`/app/api/refresh/route.ts`) de Nextjs. Este route handler se creo con la finalidad de tener acceso a las cookies con la información del usuario del lado del servidor. El route handler se encarga llamar a la api externa para obtener el refresh token y actualizar las cookies con el nuevo refresh token.
