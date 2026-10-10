import type { ProjectDetail } from '../projects.ts'

const dir = '/projects/airpods'

export const airpodsDetail: ProjectDetail = {
  release: { version: 'v0.1.5', url: 'https://github.com/canoojson/airpodsPopUpOnArchLinux/releases/latest' },
  license: 'GPL-3.0',
  youtube: { id: 'zYiF-NJgy94', poster: `${dir}/youtube.webp` },
  manualUrl: 'https://github.com/canoojson/airpodsPopUpOnArchLinux#readme',

  demos: [
    {
      src: `${dir}/popup-conectar.mp4`,
      poster: `${dir}/popup-conectar-poster.webp`,
      width: 800,
      height: 480,
      title: { es: 'Al abrir la caja', val: 'En obrir la caixa', en: 'When the case opens' },
      text: {
        es: 'El popup aparece en un segundo. Un clic en Conectar y los AirPods pasan al ordenador.',
        val: "La finestra emergent apareix en un segon. Un clic en Connectar i els AirPods passen a l'ordinador.",
        en: 'The popup shows up within a second. One click on Connect and the AirPods switch to the computer.',
      },
    },
    {
      src: `${dir}/panel-modos.mp4`,
      poster: `${dir}/panel-modos-poster.webp`,
      width: 900,
      height: 620,
      title: { es: 'Panel y modos de escucha', val: "Panell i modes d'escolta", en: 'Panel and listening modes' },
      text: {
        es: 'Desde la barra: batería de cada auricular y de la caja, cambio de modo de escucha y ajustes.',
        val: "Des de la barra: bateria de cada auricular i de la caixa, canvi de mode d'escolta i ajustos.",
        en: 'From the bar: battery of each earbud and the case, listening mode switching and settings.',
      },
    },
    {
      src: `${dir}/panel-estado.mp4`,
      poster: `${dir}/panel-estado-poster.webp`,
      width: 600,
      height: 560,
      title: { es: 'En tiempo real', val: 'En temps real', en: 'In real time' },
      text: {
        es: 'Al guardar los auriculares y cerrar la tapa, el panel lo refleja al momento y el audio vuelve a tus otros auriculares.',
        val: "En guardar els auriculars i tancar la tapa, el panell ho reflecteix a l'instant i l'àudio torna als teus altres auriculars.",
        en: 'Put the earbuds away and close the lid: the panel updates instantly and audio goes back to your other headphones.',
      },
    },
  ],

  features: [
    {
      title: { es: 'Batería al 1 %', val: 'Bateria a l’1 %', en: 'Battery to 1 %' },
      text: {
        es: 'Izquierdo, derecho y caja, con carga, detección en oreja y estado de la tapa.',
        val: "Esquerre, dret i caixa, amb càrrega, detecció a l'orella i estat de la tapa.",
        en: 'Left, right and case, with charging, in-ear detection and lid state.',
      },
    },
    {
      title: { es: 'Con la caja cerrada', val: 'Amb la caixa tancada', en: 'With the case closed' },
      text: {
        es: 'Descifra el anuncio cifrado de la caja con las claves de tus AirPods.',
        val: "Desxifra l'anunci xifrat de la caixa amb les claus dels teus AirPods.",
        en: "Decrypts the case's encrypted advertisement with your AirPods' keys.",
      },
    },
    {
      title: { es: 'Popup en ~1 s', val: 'Finestra en ~1 s', en: 'Popup in ~1 s' },
      text: {
        es: 'Panel flotante en Noctalia, o notificación en cualquier otro escritorio.',
        val: 'Panell flotant en Noctalia, o notificació en qualsevol altre escriptori.',
        en: 'Floating panel on Noctalia, or a notification on any other desktop.',
      },
    },
    {
      title: { es: 'Sin escaneo continuo', val: 'Sense escaneig continu', en: 'No constant scanning' },
      text: {
        es: 'Usa el monitor pasivo de BlueZ: no interfiere con tus otros dispositivos Bluetooth.',
        val: 'Fa servir el monitor passiu de BlueZ: no interfereix amb els teus altres dispositius Bluetooth.',
        en: "Uses BlueZ's passive monitor, so it doesn't interfere with your other Bluetooth devices.",
      },
    },
    {
      title: { es: 'Modos de escucha', val: "Modes d'escolta", en: 'Listening modes' },
      text: {
        es: 'Cancelación de ruido, adaptativo y sonido ambiente desde el panel.',
        val: 'Cancel·lació de soroll, adaptatiu i so ambient des del panell.',
        en: 'Noise cancellation, adaptive and transparency from the panel.',
      },
    },
    {
      title: { es: 'Todo en local', val: 'Tot en local', en: 'Fully local' },
      text: {
        es: 'Sin internet ni cuenta de iCloud. Solo procesa los anuncios de tus AirPods.',
        val: "Sense internet ni compte d'iCloud. Només processa els anuncis dels teus AirPods.",
        en: 'No internet or iCloud account. It only processes your own AirPods’ advertisements.',
      },
    },
  ],

  screenshots: [
    {
      src: `${dir}/popup.webp`,
      width: 488,
      height: 342,
      caption: { es: 'Popup al abrir la caja', val: 'Finestra en obrir la caixa', en: 'Popup when the case opens' },
    },
    {
      src: `${dir}/panel-conectado.webp`,
      width: 512,
      height: 576,
      caption: { es: 'Panel con modos de escucha', val: "Panell amb modes d'escolta", en: 'Panel with listening modes' },
    },
    {
      src: `${dir}/panel.webp`,
      width: 512,
      height: 576,
      caption: { es: 'Panel sin conectar', val: 'Panell sense connectar', en: 'Panel, not connected' },
    },
    {
      src: `${dir}/ajustes.webp`,
      width: 512,
      height: 576,
      caption: { es: 'Ajustes', val: 'Ajustos', en: 'Settings' },
    },
    {
      src: `${dir}/terminal.webp`,
      width: 900,
      height: 300,
      caption: { es: 'airpodsctl en la terminal', val: 'airpodsctl al terminal', en: 'airpodsctl in the terminal' },
    },
    {
      src: `${dir}/widget-barra.webp`,
      width: 400,
      height: 44,
      caption: { es: 'Widget en la barra de Noctalia', val: 'Widget a la barra de Noctalia', en: 'Noctalia bar widget' },
    },
  ],

  options: {
    title: { es: 'Ajustes del panel', val: 'Ajustos del panell', en: 'Panel settings' },
    items: [
      {
        label: { es: 'Nombre del dispositivo', val: 'Nom del dispositiu', en: 'Device name' },
        text: { es: 'Cambia el nombre de tus AirPods.', val: 'Canvia el nom dels teus AirPods.', en: 'Rename your AirPods.' },
      },
      {
        label: { es: 'Audio solo al ponértelos', val: "Àudio només en posar-te'ls", en: 'Audio only when worn' },
        text: {
          es: 'Si están en la caja, el sonido sigue por donde estaba.',
          val: 'Si estan a la caixa, el so continua per on estava.',
          en: 'While they’re in the case, audio stays where it was.',
        },
      },
      {
        label: { es: 'Pausar al quitarte uno', val: "Pausar en llevar-te'n un", en: 'Pause when one comes out' },
        text: {
          es: 'También con uno en la caja y otro puesto.',
          val: "També amb un a la caixa i l'altre posat.",
          en: 'Also with one in the case and the other worn.',
        },
      },
      {
        label: { es: 'Reanudar al volver a ponértelo', val: "Reprendre en tornar a posar-te'l", en: 'Resume when put back' },
        text: {
          es: 'Si vuelve a la oreja en menos de 2 minutos.',
          val: "Si torna a l'orella en menys de 2 minuts.",
          en: 'If it’s back in your ear within 2 minutes.',
        },
      },
      {
        label: { es: 'Actualizaciones automáticas', val: 'Actualitzacions automàtiques', en: 'Automatic updates' },
        text: {
          es: 'Consulta GitHub una vez al día y avisa si hay versión nueva.',
          val: 'Consulta GitHub una vegada al dia i avisa si hi ha versió nova.',
          en: 'Checks GitHub once a day and lets you know about new versions.',
        },
      },
    ],
  },

  commands: {
    title: { es: 'Desde la terminal', val: 'Des del terminal', en: 'From the terminal' },
    lines: [
      { code: 'airpodsctl status', text: { es: 'Estado actual o último conocido', val: 'Estat actual o últim conegut', en: 'Current or last known state' } },
      { code: 'airpodsctl watch', text: { es: 'Cada cambio en vivo', val: 'Cada canvi en viu', en: 'Every change, live' } },
      { code: 'airpodsctl keys fetch', text: { es: 'Pide las claves a tus AirPods (una vez)', val: 'Demana les claus als teus AirPods (una vegada)', en: 'Fetches your AirPods’ keys (once)' } },
      { code: 'busctl --user call io.github.AirpodsLinux …', text: { es: 'API D-Bus para otros widgets', val: 'API D-Bus per a altres widgets', en: 'D-Bus API for other widgets' } },
    ],
  },

  install: {
    command: 'curl -fsSL https://raw.githubusercontent.com/canoojson/airpodsPopUpOnArchLinux/main/install.sh | bash',
    note: {
      es: 'Se instala en tu usuario, sin sudo. Comprueba los requisitos, activa el servicio y, si usas Noctalia, el plugin.',
      val: "S'instal·la al teu usuari, sense sudo. Comprova els requisits, activa el servei i, si fas servir Noctalia, el connector.",
      en: 'Installs in your user account, no sudo. It checks requirements, enables the service and, on Noctalia, the plugin.',
    },
    compat: [
      {
        label: { es: 'AirPods', val: 'AirPods', en: 'AirPods' },
        value: { es: 'Pro 3 probados a fondo; otros modelos sin probar', val: 'Pro 3 provats a fons; altres models sense provar', en: 'Pro 3 fully tested; other models untested' },
      },
      {
        label: { es: 'Sistema', val: 'Sistema', en: 'System' },
        value: { es: 'Arch Linux; cualquier distro con systemd y BlueZ', val: 'Arch Linux; qualsevol distribució amb systemd i BlueZ', en: 'Arch Linux; any distro with systemd and BlueZ' },
      },
      {
        label: { es: 'Escritorio', val: 'Escriptori', en: 'Desktop' },
        value: { es: 'Cualquiera; integración completa con Noctalia', val: 'Qualsevol; integració completa amb Noctalia', en: 'Any; full integration with Noctalia' },
      },
    ],
  },
}
