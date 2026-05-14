// Single source of truth for site-wide data.
// Edit values here and they propagate everywhere.

export const SITE = {
  name: 'Dra. Natalia Asquino',
  shortName: 'Dra. Asquino',
  tagline: 'Periodoncia · Implantes · Salud bucal integral',
  description:
    'Consulta de periodoncia e implantes en Montevideo y Punta del Este. Diagnóstico, tratamiento y mantenimiento periodontal con enfoque profesional y cercano.',
  url: 'https://dranataliaasquino.github.io', // update on launch
  locale: 'es-UY',
};

export const CONTACT = {
  whatsapp: {
    number: '+59892480200',
    display: '+598 92 480 200',
    message: 'Hola Dra. Asquino, me gustaría agendar una consulta.',
    messageColega: 'Hola Dra. Asquino, soy odontólogo/a y quería compartir información de un paciente que voy a derivar.',
  },
  email: 'dranataliaasquino@gmail.com',
};

export const LOCATIONS = [
  {
    id: 'montevideo',
    name: 'Montevideo',
    address: '26 de Marzo 3420, apt. 704',
    addressLine2: '11300 Montevideo, Uruguay',
    fullAddress: '26 de Marzo 3420, 11300 Montevideo, Departamento de Montevideo',
    hours: 'Lunes, jueves y viernes — 8:00 a 18:30',
    mapsEmbed:
      'https://www.google.com/maps/embed/v1/place?key=&q=26+de+Marzo+3420,+Montevideo,+Uruguay',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=26+de+Marzo+3420,+Montevideo,+Uruguay',
  },
  {
    id: 'punta-del-este',
    name: 'Punta del Este',
    address: 'Calle 24, entre 21 y 23',
    addressLine2: 'Edificio Linton Village, Punta del Este',
    fullAddress: 'Calle 24, entre 21 y 23, Edificio Linton Village, Punta del Este, Maldonado',
    hours: 'Lunes — 8:00 a 16:30',
    mapsEmbed:
      'https://www.google.com/maps/embed/v1/place?key=&q=Edificio+Linton+Village,+Calle+24,+Punta+del+Este,+Uruguay',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=Edificio+Linton+Village,+Calle+24,+Punta+del+Este,+Uruguay',
  },
];

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-natalia/', label: 'Sobre Natalia' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '/equipo/', label: 'Equipo' },
  { href: '/consultorios/', label: 'Consultorios' },
  { href: '/articulos/', label: 'Artículos' },
  { href: '/casos/', label: 'Casos clínicos' },
  { href: '/investigacion/', label: 'Investigación' },
  { href: '/para-colegas/', label: 'Para colegas' },
  { href: '/contacto/', label: 'Contacto' },
];

// Helpers
export function whatsappLink(message?: string) {
  const num = CONTACT.whatsapp.number.replace(/\D/g, '');
  const msg = encodeURIComponent(message ?? CONTACT.whatsapp.message);
  return `https://wa.me/${num}?text=${msg}`;
}

export function mailtoLink(subject = 'Consulta desde el sitio web') {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}
