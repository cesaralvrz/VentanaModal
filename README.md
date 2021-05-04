# VentanaModal 💬

Chat de simulación de una ventana modal.

Demo de la aplicación: https://vuechat-7d278.web.app/


## Tecnologías 🛠️
Para realizar este proyecto se utilizaron las siguientes tecnologías:
<br> <br>
<code><img height="35" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png"></code>
<code><img height="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"></code>
<code><img height="35" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/tailwind/tailwind.png"></code>

### Función de cada tecnología:
- Vue: Framework JavaScript del proyecto.
- Firebase: Almacenamiento de mensajes y de los documentos adjuntos, login con Google y hosting.
- CSS: Animación del modal para adjuntar archivos.
- Tailwind: Apartado estético de la aplicación.

## Funcionalidades 👨‍💻

Los primero que podemos observar al cargar a la aplicación en una ventana con los mensajes que se mandaron anteriormente precargados. Para escribir un mensaje tenemos que hacer click en el botón de "Iniciar Sesión". Nos aparecera una ventana emergente que nos permitirá hacer login con nuestra cuenta de Google.

![captura 1](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss1.png)
![captura 2](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss2.png)

Una vez iniciada la sesión podemos mandar mensajes escribiendolos en el input de "Introduce mensaje..." y luego hacer clikc en "Enviar".

![captura 3](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss3.png)

Los mensajes serán almacenados en una base de datos Firestore de Firebase. Que nos permite modificarlos y eliminarlos si deseamos.

![captura 7](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss7.png)

La aplicación también nos permite adjuntar archivos, para ello hay que hacer click en el botón "Archivo" y nos aparecerá un modal que nos permitirá subir un archivo y cuando este haya cargado podremos darle a aceptar y aparecerá en el chat con las especificaciones del archivo (nombre, tipo, tamaño y la fecha en la que fue añadido).

![captura 4](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss4.png)
![captura 5](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss5.png)
![captura 6](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss6.png)

Estos archivos se guardarán en el almacenamiento de nuestra aplicación de Firebase. 

![captura 8](https://github.com/cesaralvrz/VentanaModal/blob/main/assets/ss8.png)

