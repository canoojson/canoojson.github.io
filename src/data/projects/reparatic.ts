import type { Media, ProjectDetail } from '../projects.ts'

const dir = '/projects/reparatic'

// Capturas del móvil (1080×2340), reducidas a la mitad
const pantalla = (nombre: string, caption: Media['caption']): Media => ({
  src: `${dir}/${nombre}.webp`,
  width: 540,
  height: 1170,
  caption,
})

export const reparaticDetail: ProjectDetail = {
  manualPage: true,

  features: [
    {
      title: { es: 'De la avería a la solución', val: "De l'avaria a la solució", en: 'From fault to fix' },
      text: {
        es: 'El profesorado comunica la incidencia; el departamento TIC asigna un responsable, cambia el estado y anota la resolución y el tiempo invertido.',
        val: "El professorat comunica la incidència; el departament TIC assigna un responsable, canvia l'estat i anota la resolució i el temps invertit.",
        en: 'Teachers report the issue; the IT department assigns someone, updates the status and logs the fix and time spent.',
      },
    },
    {
      title: { es: 'Foto o PDF de la avería', val: "Foto o PDF de l'avaria", en: 'Photo or PDF of the fault' },
      text: {
        es: 'Desde la cámara o la galería. Las fotos se enderezan y se reducen antes de enviarlas.',
        val: "Des de la càmera o la galeria. Les fotos s'adrecen i es reduïxen abans d'enviar-les.",
        en: 'From the camera or the gallery. Photos are straightened and downscaled before uploading.',
      },
    },
    {
      title: { es: 'Conversación en cada incidencia', val: 'Conversa en cada incidència', en: 'A chat in every issue' },
      text: {
        es: 'Los comentarios se ven como un chat dentro de la ficha, sin correos sueltos.',
        val: 'Els comentaris es veuen com un xat dins de la fitxa, sense correus solts.',
        en: 'Comments show up as a chat inside the issue, instead of scattered emails.',
      },
    },
    {
      title: { es: 'Avisos sin Firebase', val: 'Avisos sense Firebase', en: 'Notifications without Firebase' },
      text: {
        es: 'Triggers de MySQL registran cada comentario y asignación; la app los consulta cada 30 s con WorkManager. Nada sale de la red del centro.',
        val: "Triggers de MySQL registren cada comentari i assignació; l'aplicació els consulta cada 30 s amb WorkManager. Res ix de la xarxa del centre.",
        en: 'MySQL triggers record every comment and assignment; the app polls them every 30 s with WorkManager. Nothing leaves the school network.',
      },
    },
    {
      title: { es: 'Roles y 15 permisos', val: 'Rols i 15 permisos', en: 'Roles and 15 permissions' },
      text: {
        es: 'Profesor, coordinador TIC, directivo, administrador o los que crees: la app muestra u oculta cada acción según el rol.',
        val: "Professor, coordinador TIC, directiu, administrador o els que cregues: l'aplicació mostra o amaga cada acció segons el rol.",
        en: 'Teacher, IT coordinator, management, admin or your own: the app shows or hides each action depending on the role.',
      },
    },
    {
      title: { es: 'Listo para un centro', val: 'Preparat per a un centre', en: 'Ready for a school' },
      text: {
        es: 'Instalador de Windows con MySQL, Java y la API como servicios, o Docker en Linux. La app elige el servidor sin recompilar.',
        val: "Instal·lador de Windows amb MySQL, Java i l'API com a servicis, o Docker en Linux. L'aplicació tria el servidor sense recompilar.",
        en: 'Windows installer with MySQL, Java and the API as services, or Docker on Linux. The app picks the server without rebuilding.',
      },
    },
  ],

  screenshots: [
    pantalla('lista', { es: 'Incidencias, con buscador y filtros', val: 'Incidències, amb buscador i filtres', en: 'Issues, with search and filters' }),
    pantalla('ficha', { es: 'Ficha de una incidencia', val: "Fitxa d'una incidència", en: 'Issue details' }),
    pantalla('comentarios', { es: 'Comentarios como conversación', val: 'Comentaris com a conversa', en: 'Comments as a chat' }),
    pantalla('editar', { es: 'Edición', val: 'Edició', en: 'Editing' }),
    pantalla('ubicaciones', { es: 'Ubicaciones del centro', val: 'Ubicacions del centre', en: 'School locations' }),
    pantalla('perfil', { es: 'Perfil', val: 'Perfil', en: 'Profile' }),
    pantalla('gestion', { es: 'Gestión del centro', val: 'Gestió del centre', en: 'School management' }),
    pantalla('login', { es: 'Inicio de sesión', val: 'Inici de sessió', en: 'Sign in' }),
    {
      src: `${dir}/notificacion.webp`,
      // la imagen mide el doble: se muestra a la mitad para que no ocupe toda la fila
      width: 518,
      height: 168,
      caption: { es: 'Aviso de un comentario nuevo', val: "Avís d'un comentari nou", en: 'New comment notification' },
    },
  ],

  install: {
    steps: [
      {
        es: 'Servidor: el instalador de Windows deja MySQL, Java y la API como servicios; en Linux, Docker Compose.',
        val: "Servidor: l'instal·lador de Windows deixa MySQL, Java i l'API com a servicis; en Linux, Docker Compose.",
        en: 'Server: the Windows installer sets up MySQL, Java and the API as services; on Linux, Docker Compose.',
      },
      {
        es: 'Móviles: se instala el APK.',
        val: "Mòbils: s'instal·la l'APK.",
        en: 'Phones: install the APK.',
      },
      {
        es: 'En el inicio de sesión, «Servidor» y la dirección del equipo (por ejemplo 192.168.1.44:8080).',
        val: "En l'inici de sessió, «Servidor» i l'adreça de l'equip (per exemple 192.168.1.44:8080).",
        en: 'On the sign-in screen, “Server” and the machine’s address (for example 192.168.1.44:8080).',
      },
      {
        es: 'Primer acceso con admin, sin contraseña: se le pone una y se da de alta al centro.',
        val: "Primer accés amb admin, sense contrasenya: se li posa una i es dona d'alta el centre.",
        en: 'First sign-in as admin, with no password: set one and register the school’s data.',
      },
    ],
    note: {
      es: 'Todo funciona dentro de la red del centro: no depende de servicios externos ni de internet.',
      val: 'Tot funciona dins de la xarxa del centre: no depén de servicis externs ni d’internet.',
      en: 'Everything runs inside the school network, with no external services or internet needed.',
    },
    compat: [
      {
        label: { es: 'Móvil', val: 'Mòbil', en: 'Phone' },
        value: { es: 'Android 7.0 o superior', val: 'Android 7.0 o superior', en: 'Android 7.0 or later' },
      },
      {
        label: { es: 'Servidor', val: 'Servidor', en: 'Server' },
        value: { es: 'Windows de 64 bits, o Linux con Docker', val: 'Windows de 64 bits, o Linux amb Docker', en: '64-bit Windows, or Linux with Docker' },
      },
      {
        label: { es: 'Red', val: 'Xarxa', en: 'Network' },
        value: { es: 'Móviles y servidor en la misma red', val: 'Mòbils i servidor en la mateixa xarxa', en: 'Phones and server on the same network' },
      },
    ],
  },
}
