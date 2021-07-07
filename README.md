# Crud_c
Crud de cuestionarios y preguntas

#
#los paquetes que se requieren son los siguientes:
#
#-express
#-mysql
#-cors
#¿Como los instalo?
#1-Clona el repositorio.
#2-Entra a la carpeta del repositorio (que clonaste) con git bash.
#3-Ejecuta los siguientes comandos en la terminal:
#    -npm i express
#    -npm i mysql
#    -npm i cors
#    
#Hay 4 fuciones:
#
#mostrarCuestionarios: se encarga de mostrar los cuestionarios, devuelve todas las filas que se encuentran en la tabla cuestionario
#
#mostrarUnCuestionario: se encarga de mostrar un solo cuestionario seleccionado por id, solo devuelve la fila en la que se selecciono el id anteriormente, 
#se requiere de un parametro llamado id para efectuar esta funcion.

#crearUnCuestionario: se encarga de crear un cuestionario, se requieren de los siguientes parametros:
#-id
#-fechaCreacion
#-usuarioCreador
#-descripcion
#
#modificarUnCuestionario: se encarga de modificar un cuestionario, se requieren de los siguientes parametros:
#-id
#-fechaCreacion
#-usuarioCreador
#-descripcion

#eliminarUnCuestionario: se encarga de eliminar un cuestionario, se requiere de un parametro llamado id.


