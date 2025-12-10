# Tienda Online con ReactJS

Aplicación web desarrollada en **React** que permite visualizar productos, agregarlos a un carrito y realizar una compra simulada.  
Incluye sistema de autenticación, roles (usuario/administrador), administración de productos y persistencia de datos en **MockAPI**.


## Descripción general

Esta aplicación es una **carnicería en línea** donde los usuarios pueden:

- Navegar productos  
- Ver detalles  
- Agregar productos al carrito  
- Finalizar una compra  

La aplicación incluye autenticación con roles:

- **Administrador**: puede agregar, editar y eliminar productos
    correo: **administrador@correo.com**        contraseña: **abcd**
  
- **Usuario común**: puede comprar
    correo: **sgiles@correo.com**               contraseña: **1234**  

Los datos se almacenan en **MockAPI**, permitiendo un CRUD completo sin necesidad de un backend propio.

---

## Características

**Autenticación**  
- Login de usuarios  
- Persistencia de sesión  
- Roles: administrador y cliente  

**Carrito de compras**  
- Agregar productos  
- Eliminar productos  
- Vaciar carrito  
- Vista completa del carrito  
- Persistencia en LocalStorage  

**CRUD de productos (solo administrador)**  
- Crear productos  
- Editar productos (texto e imágenes)  
- Eliminar productos  

**Experiencia de usuario**  
- Filtros y búsqueda  
- Paginación  
- Vista de detalles  
- Modales y spinners de carga  

---

## Flujo de uso según rol

### Rol Usuario (logueado)
1. Inicia sesión con su cuenta.
2. Navega por la lista de productos disponibles.
3. Visualiza detalles de cada producto si lo desea.
4. Agrega productos al carrito de compras.
5. Accede a la página de pago para revisar su carrito.
6. Confirma la compra.
7. El carrito se vacía automáticamente tras la compra.
8. Puede volver a la lista de productos para seguir comprando.

### Rol Administrador
1. Inicia sesión con su cuenta de administrador.
2. Puede gestionar productos:
   - Agregar nuevos productos.
   - Editar productos existentes (nombre, descripción, precio e imagen).
   - Eliminar productos.
3. No puede agregar productos al carrito ni realizar compras.
4. Puede navegar por la lista de productos para administración.

