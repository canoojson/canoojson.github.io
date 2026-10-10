# Manual de ReparaTIC

ReparaTIC es la app con la que el profesorado de un centro educativo comunica las averías y problemas
informáticos (un proyector que no enciende, un ordenador sin red, un programa que falta) y con la que el
departamento TIC los organiza, los resuelve y mantiene informado a quien los comunicó.

Este manual tiene tres partes:

1. [Puesta en marcha](#1-puesta-en-marcha), para el coordinador TIC, una sola vez.
2. [Uso diario](#2-uso-diario), para todo el profesorado.
3. [Administración](#3-administración), para el departamento TIC y la dirección.

---

## 1. Puesta en marcha

### 1.1. Instalar el servidor

ReparaTIC guarda los datos en un equipo del centro (el servidor), no en internet. Basta un ordenador que
esté siempre encendido y conectado a la red del centro.

- **Windows**: ejecutar `ReparaTIC-Servidor-<versión>.exe` como administrador y seguir el asistente. Al
  terminar se abre un fichero con la **dirección del servidor** (por ejemplo `192.168.1.44:8080`): hay que
  apuntarla, se usa en cada móvil.
- **Linux**: con Docker (`docker compose up -d --build`), con el fichero de configuración que se entrega
  junto al servidor.

Los móviles tienen que estar conectados a la misma red que el servidor (la wifi del centro).

### 1.2. Instalar la app en los móviles

Instalar `ReparaTIC-<versión>.apk` (Android 7.0 o superior). Android pedirá permitir la instalación de apps
de fuera de Google Play.

La primera vez, en la pantalla de inicio de sesión:

1. Pulsar **Servidor** (abajo) y escribir la dirección del servidor. La app comprueba que responde antes de
   guardarla.
2. Al entrar, aceptar el permiso de **notificaciones**: así llegan los avisos de comentarios y asignaciones.

### 1.3. Primer acceso: el usuario `admin`

El servidor se instala con **un único usuario: `admin`, sin contraseña**. Para entrar se escribe `admin` y se
deja vacío el campo de la contraseña.

Lo primero, nada más entrar:

1. **Perfil → Seguridad → Establecer contraseña** y ponerle una contraseña a `admin`. Hasta entonces,
   cualquiera con la app podría entrar como administrador.
2. En **Gestión**, dar de alta los datos del centro, en este orden:
   1. **Departamentos** (Matemáticas, Lengua, Secretaría…).
   2. **Ubicaciones** (aulas, laboratorios, biblioteca, sala de profesores…). Desde la pestaña
      **Ubicaciones**.
   3. **Tipos de hardware**: ya vienen los habituales (ordenador, monitor, impresora, proyector, router…);
      se pueden añadir más.
   4. **Roles y permisos**: revisar qué puede hacer cada rol (ver [3.3](#33-roles-y-permisos)).
   5. **Profesores**: una cuenta por persona, con su departamento y su rol.

### 1.4. Contraseñas del profesorado

Cada profesor nuevo empieza con la contraseña **`-a123456`**. Es la misma para todos a propósito: sirve para
que cada uno pueda entrar la primera vez sin que el coordinador tenga que repartir contraseñas distintas.

Al repartir los accesos, hay que pedir a cada profesor que **la cambie nada más entrar** (ver
[2.6](#26-cambiar-la-contraseña)).

Si alguien la olvida, el coordinador la **restablece** y vuelve a ser `-a123456`
(ver [3.2](#32-restablecer-una-contraseña-olvidada)).

---

## 2. Uso diario

La app tiene cuatro secciones en la barra inferior: **Incidencias**, **Ubicaciones**, **Perfil** y
**Gestión**.

### 2.1. Entrar

Usuario y contraseña. La sesión se queda abierta: la próxima vez la app entra sola. Para salir, **Perfil →**
icono de salir (arriba a la derecha).

### 2.2. Comunicar una incidencia

**Incidencias → Nueva incidencia** y rellenar:

- **Descripción**: qué pasa, en una frase («El proyector no enciende: la luz parpadea en rojo»).
- **Fecha** en que ocurrió, **ubicación** y **departamento afectado**.
- **Tipo**:
  - **Hardware**: tipo de equipo, modelo y número de serie (suelen estar en una etiqueta del aparato).
  - **Software**: sistema operativo y programa.
- **Observaciones**: lo que ya se ha probado, horarios en los que se puede revisar, etc.
- **Adjunto** (opcional): una foto de la avería (**Hacer foto** o **Foto o PDF** para elegirla de la galería)
  o un PDF, hasta 10 MB. Las fotos se reducen antes de enviarlas. En la ficha se ven y, al pulsarlas, se abren a
  pantalla completa.

La incidencia queda en estado **Comunicada** hasta que el departamento TIC se ocupa de ella.

### 2.3. Seguir las incidencias

La lista muestra las incidencias que has comunicado y las que tienes asignadas. Arriba hay un buscador
(descripción, profesor, ubicación…) y filtros por estado:

| Estado | Significado |
| --- | --- |
| **Comunicada** | Recibida; nadie se ha puesto con ella todavía |
| **En solución** | El responsable está trabajando en ella |
| **Solucionada** | Resuelta |
| **Solución inviable** | No se puede arreglar (hay que sustituir el equipo, depende de otra empresa…) |

Las incidencias con novedades llevan la marca **Nuevo**, y el icono de Incidencias muestra cuántas hay.

### 2.4. Comentar

Al final de la ficha de cada incidencia está la conversación: se escribe abajo y se envía con la flecha. Sirve
para preguntar, avisar de cuándo se puede pasar por el aula o confirmar que ya funciona.

### 2.5. Notificaciones

El móvil avisa, aunque la app esté cerrada, cuando:

- alguien comenta en una incidencia tuya o asignada a ti;
- te asignan una incidencia.

Al pulsar el aviso se abre la incidencia. Con la app abierta, los avisos llegan en unos 30 segundos. Con la
app cerrada, Android puede retrasarlos para ahorrar batería; si tardan mucho, conviene quitar a ReparaTIC de
la optimización de batería en los ajustes del móvil.

Solo llegan avisos mientras el móvil está conectado a la red del centro.

### 2.6. Cambiar la contraseña

**Perfil → Seguridad → Cambiar contraseña**: la contraseña actual y la nueva dos veces.

---

## 3. Administración

Estas acciones dependen de los permisos del rol de cada usuario.

### 3.1. Gestionar incidencias

Desde la ficha de una incidencia, con el icono del lápiz:

- **Responsable**: quién se encarga. Recibe un aviso en el móvil.
- **Estado**: En solución, Solucionada o Solución inviable.
- **Fecha de resolución** y **tiempo invertido**, al cerrarla.

Con el permiso *Ver todas las incidencias de todos los usuarios*, la lista muestra las de todo el centro.

### 3.2. Restablecer una contraseña olvidada

**Gestión → Profesores →** el profesor **→ Seguridad → Restablecer contraseña**.

Su contraseña vuelve a ser **`-a123456`**. Se le comunica, entra con ella y la cambia por una que recuerde
desde su Perfil ([2.6](#26-cambiar-la-contraseña)).

Hace falta el permiso *Cambiar contraseña de los profesores*.

### 3.3. Roles y permisos

**Gestión → Roles y permisos**. Cada usuario tiene un rol, y cada rol un conjunto de permisos. Se pueden
crear roles nuevos y cambiar los existentes; los cambios se aplican la próxima vez que cada usuario entra.

Roles que trae la instalación:

| Permiso | Profesor | Coordinador TIC | Directivo | Administrador |
| --- | :---: | :---: | :---: | :---: |
| Añadir incidencias | ✓ | ✓ | ✓ | ✓ |
| Modificar/borrar incidencias | ✓ | ✓ | ✓ | ✓ |
| Añadir, borrar o modificar tipos de hardware | ✓ | ✓ | ✓ | ✓ |
| Alta/baja/modificación de roles y permisos | | ✓ | ✓ | ✓ |
| Informes sobre incidencias ¹ | | ✓ | ✓ | ✓ |
| Operaciones de importación/exportación ¹ | | | | ✓ |
| Ver todas las incidencias de todos los usuarios | | ✓ | | ✓ |
| Borrar administradores | | ✓ | | ✓ |
| Cambiar contraseña de los profesores | | ✓ | | ✓ |
| Modificar/eliminar profesores | | ✓ | | ✓ |
| Modificar/eliminar ubicaciones | | ✓ | | ✓ |
| Modificar/eliminar departamentos | | ✓ | | ✓ |
| Añadir departamentos | | ✓ | | ✓ |
| Añadir ubicaciones | | ✓ | | ✓ |
| Añadir profesores | | ✓ | | ✓ |

¹ Reservados para funciones futuras: todavía no hay pantallas de informes ni de importación/exportación.

Sin el permiso *Modificar/borrar incidencias*, cada profesor puede editar solo las incidencias que ha
comunicado él.

Recomendación: revisar el rol **Profesor** antes de dar de alta al profesorado. Por defecto puede modificar y
borrar incidencias y tipos de hardware; en muchos centros basta con *Añadir incidencias*.

### 3.4. Profesores, departamentos y ubicaciones

Desde **Gestión** (profesores, departamentos, tipos de hardware) y la pestaña **Ubicaciones**: botón
**Nuevo…** para añadir, y en la ficha de cada elemento, lápiz para editar y papelera para borrar.

---

## Preguntas frecuentes

**La app no conecta con el servidor.**
Comprobar que el móvil está en la wifi del centro y que el servidor está encendido. En la pantalla de inicio
de sesión, **Servidor** muestra la dirección configurada; al guardarla, la app comprueba si responde.

**Han cambiado el servidor de equipo.**
En cada móvil: cerrar sesión, **Servidor →** la dirección nueva, y volver a entrar.

**Un profesor no ve una incidencia.**
Solo ve las que ha comunicado y las que tiene asignadas, salvo que su rol tenga *Ver todas las incidencias de
todos los usuarios*.

**No llegan las notificaciones.**
Revisar en los ajustes de Android que ReparaTIC tiene permiso de notificaciones y que no está restringida
por el ahorro de batería.
