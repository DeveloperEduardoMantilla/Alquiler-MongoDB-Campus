<div style="height:5px; width:100%; background-color:#283747;padding:0; margin:0"></div>
<h1 style="font-size:23px;color:#283747; text-align:center">Alquiler MongoDB JWT DTO</h1>
<div style="margin: 30px 0; box-shadow: 10px 10px 20px #f2f2f2; border-radius:10px; cursor:pointer">
<img src="/resources/img/db_reference.jpeg"><br>
</div>
<h1 style="color:#283747; font-size:20px; margin:0">Contexto</h1>
<p style="text-align: justify">La problematica a la cual daremos solucion es acerca de una empresa de alquiler de vehiculos la cual esta presentando deficiencia en sus procesos reserva, gestion de clientes, sucursales, empleados entre otras cosas.</p>
<p style="text-align: justify">Como equipo de desarrollo brindaremos una solucion a dicha problematica enfocandonos desde el lado del BackEnd, teniendo presente que implementaremos seguridad y a su vez eficiencia en la aplicacion.</p>

<p>Las tablas con la que se cuenta en la base de datos son las siguientes:</p>

<ul>
    <li>Sucursal</li>
    <li>Sucursal Automovil</li>
    <li>Automovil</li>
    <li>Reserva</li>
    <li>Alquiler</li>
    <li>Cliente</li>
    <li>Registro Entrega</li>
    <li>Registro Devolucion</li>
    <li>Empleado</li>
</ul>
<h4>Dependencias utilizadas</h4>
<p>A continuacion se presentan las dependencias utilizadas en el desarrollo de la solucion.</p>

```Json
"devDependencies": {
    "class-transformer": "0.5.1",
    "class-validator": "0.14.0",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-rate-limit": "6.8.1",
    "jose": "4.14.4",
    "mongodb": "5.7.0",
    "node": "20.5.0",
    "nodemon": "3.0.1",
    "reflect-metadata": "0.1.13",
    "typescript": "5.1.6"
  }
```

<h4>Despliegue</h4>

1. Ejecutamos el siguiente comando en la terminal estando ubicados en la ruta que queremos que repose el proyecto.

```Js
https://github.com/EduardoMantillaCampus/Alquiler-MongoDB-Campus.git
```

2. Ya teniendo abierto el proyecto en Visual Studio Code, nos dirigimos a la terminal donde instalaremos el siguiente comando.

```Js
npm install
```
3. Hora vamos a tomar el archivo .env-example y lo vamos a dejar con el nombre .env.

<p>Dentro de este archivo reponsan las varibales de entorno que se requieren para el funcionamiento de la herramienta, por ende necesitaremos configurar la conexion la base de datos entre otras cosas. </p>

4. Ejecutamos el siguiente comando en la terminal, el cual nos permitira correr el proyecto. 

```Js
npm run dev
```

5. Una vez el servidor ya este levantado y nos aparezca un mensaje como estos en la consola http://127.0.0.1:5015 podemos dar por hecho que el servidor ya se encuentro en funcionamiento. 

<hr style="height:1px; padding:0; margin:10px 0">


<h2>EndPoinst Disponibles</h2>

<b>IMPORTANTE</b>
<p>Recuerda que para poder hacer uso de los diferentes EndPoint requieres de un token, el cual debera ser generado por usted, de lo contrario la consulta no sera satisfactoria</p>

¿Como puedo genera un Token?

Para generar un token debera acceder a la siguiente ruta y al final debera poner el nombre de la collection a la cual requiere generarle el token, recuerde que para cada collection requiere un token. 

http://127.0.0.1:5015/token/Automovil

Collectiones disponibles:
<ul>
    <li>Alquiler</li>
    <li>Cliente</li>
    <li>Automovil</li>
    <li>Reserva</li>
    <li>Empleado</li>
</ul>
<p></p>


1. Mostrar todos los alquileres.
    <br>
   <b>http://127.0.0.1:5015/alquiler</b>
<hr style="height:1px; padding:; margin:10px 0">

2. Mostrar todos los clientes registrados en la base de datos. 
    <br>
    <b>http://127.0.0.1:5015/cliente/</b>
<hr style="height:1px; padding:0; margin:10px 0">

3. Obtener todos los automóviles disponibles para alquiler.
    <br>
    <b>http://127.0.0.1:5015/alquiler/disponible</b>
<hr style="height:1px; padding:0; margin:10px 0">

4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.  
    <br>
    <b>http://127.0.0.1:5015/alquiler/activos</b>
<hr style="height:1px; padding:0; margin:10px 0">

5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado. 
    <br>
    <b>http://127.0.0.1:5015/Reserva/Pendiente</b>
<hr style="height:1px; padding:0; margin:10px 0">

6. Obtener los detalles del alquiler con el ID_Alquiler específico. 
    <br>
    <b>http://127.0.0.1:5015/alquiler/:idAlquiler</b>
<hr style="height:1px; padding:0; margin:10px 0">

7. Listar los empleados con el cargo de "Vendedor". 
    <br>
    <b>http://127.0.0.1:5015/Empleado/Vendedor</b>
<hr style="height:1px; padding:0; margin:10px 0">

8. Mostrar la cantidad total de automóviles disponibles en cada sucursal. 
    <br>
    <b>http://127.0.0.1:5015/Automovil/total</b>
<hr style="height:1px; padding:0; margin:10px 0">

9. Obtener el costo total de un alquiler específico. 
    <br>
    <b>http://127.0.0.1:5015/alquiler/costoTotal/:idAlquiler</b>
<hr style="height:1px; padding:0; margin:10px 0">

10. Listar los clientes con el DNI específico. 
    <br>
    <b>http://127.0.0.1:5015/cliente/dniCliente/:dni</b>
<hr style="height:1px; padding:0; margin:10px 0">

11. Mostrar todos los automóviles con una capacidad mayor a 5 personas. 
    <br>
    <b>http://127.0.0.1:5015/Automovil/Capacidad</b>
<hr style="height:1px; padding:0; margin:10px 0">

12. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. 
    <br>
    <b>http://127.0.0.1:5015/alquiler/detalles</b>
<hr style="height:1px; padding:0; margin:10px 0">

13. Listar las reservas pendientes realizadas por un cliente específico. 
    <br>
    <b>http://127.0.0.1:5015/Reserva/cliente/:idCliente</b>
<hr style="height:1px; padding:0; margin:10px 0">

14. Mostrar los empleados con cargo de "Gerente" o "Asistente". 
    <br>
    <b>http://127.0.0.1:5015/Empleado/gerenteAsistente</b>
<hr style="height:1px; padding:0; margin:10px 0">

15. Obtener los datos de los clientes que realizaron al menos un 
alquiler. 
    <br>
    <b>http://127.0.0.1:5015/Cliente/alquiler</b>
<hr style="height:1px; padding:0; margin:10px 0">

16. Listar todos los automóviles ordenados por marca y modelo. 
    <br>
    <b>http://127.0.0.1:5015/automovil/ordenados</b>
<hr style="height:1px; padding:0; margin:10px 0">

17. Mostrar la cantidad total de automóviles en cada sucursal junto 
con su dirección. 
    <br>
    <b>http://127.0.0.1:5015/automovil/sucursal</b>
<hr style="height:1px; padding:0; margin:10px 0">

18. Obtener la cantidad total de alquileres registrados en la base de datos. 
    <br>
    <b>http://127.0.0.1:5015/alquiler/total</b>
<hr style="height:1px; padding:0; margin:10px 0">

19. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.<br> 
    <br>
    <b>http://127.0.0.1:5015/automovil/capacidad/disponibles</b>
<hr style="height:1px; padding:0; margin:10px 0">

21. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
    <br>
    <b>http://127.0.0.1:5015/alquiler/alquileres/filtroFecha</b>
<hr style="height:1px; padding:0; margin:10px 0">


<div style="height:5px; width:100%; background-color:#283747;padding:0; margin:0"></div>
