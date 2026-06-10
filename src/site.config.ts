// Single source of truth for site-wide data.
// Edit values here and they propagate everywhere.

// Master switch for "live" mode.
// While false: site emits noindex on every page and robots.txt blocks all crawlers.
// Flip to true ONLY at launch on dranataliaasquino.com.uy.
export const LIVE = true;

export const SITE = {
  name: 'Dra. Natalia Asquino',
  shortName: 'Dra. Asquino',
  tagline: 'Periodoncia · Implantes · Salud bucal integral',
  description:
    'Consulta de periodoncia e implantes en Montevideo y Punta del Este. Diagnóstico, tratamiento y mantenimiento periodontal con enfoque profesional y cercano.',
  url: 'https://dranataliaasquino.com.uy',
  locale: 'es-UY',
};

export const CONTACT = {
  whatsapp: {
    number: '+59892480200',
    display: '+598 92 480 200',
    message: 'Hola Dra. Asquino, me gustaría agendar una consulta.',
    messageColega: 'Hola Dra. Asquino, soy odontólogo/a y quería compartir información de un paciente que voy a derivar.',
  },
  email: 'contacto@dranataliaasquino.com.uy',
};

// Social profiles. Actualmente NO se renderizan en el sitio.
// IG y FB estan incompletos; reactivar cuando tengan contenido publicable:
// (i) reintroducir el bloque de iconos en Footer.astro;
// (ii) reimportar SOCIAL en BaseLayout.astro y agregar
//      sameAs: [SOCIAL.instagram, SOCIAL.facebook] al structuredData.
// La URL de Facebook depende del cambio de handle pendiente.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/dranataliaasquino',
  facebook: 'https://www.facebook.com/dranataliaasquino',
};

export const LOCATIONS = [
  {
    id: 'montevideo',
    name: 'Montevideo',
    address: '26 de Marzo 3420, apt. 704',
    addressLine2: '11300 Montevideo, Uruguay',
    fullAddress: '26 de Marzo 3420, 11300 Montevideo, Departamento de Montevideo',
    accessNote: 'Edificio Yes!',
    hours: 'Lunes, jueves y viernes — 9:00 a 18:00',
    // Fields used by the LocalBusiness JSON-LD schema in BaseLayout.astro
    postalCode: '11300',
    region: 'Montevideo',
    countryCode: 'UY',
    geo: { latitude: -34.88775, longitude: -56.06474 },
    openingHoursSchema: 'Mo,Th,Fr 09:00-18:00',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3271.99309870588!2d-56.138856399999995!3d-34.90662270000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f8121eb2ff111%3A0x3743fbbcb12b9442!2sDra.%20Natalia%20Asquino!5e0!3m2!1sen!2suy!4v1779890954816!5m2!1sen!2suy',
    mapsLink: 'https://maps.app.goo.gl/8SeVnT3CwsHXTCNc9',
  },
  {
    id: 'punta-del-este',
    name: 'Punta del Este',
    address: 'Calle 24, entre 21 y 23',
    addressLine2: 'Edificio Linton Village, Punta del Este',
    fullAddress: 'Calle 24, entre 21 y 23, Edificio Linton Village, Punta del Este, Maldonado',
    accessNote: 'El consultorio funciona dentro del espacio de Clínica Borges.',
    hours: 'Lunes — 9:00 a 18:00',
    // Fields used by the LocalBusiness JSON-LD schema in BaseLayout.astro
    postalCode: '20100',
    region: 'Maldonado',
    countryCode: 'UY',
    geo: { latitude: -34.96434, longitude: -54.94406 },
    openingHoursSchema: 'Mo 09:00-18:00',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.042010454335!2d-54.94426392047878!3d-34.96421681955498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9575054f9df42b5d%3A0xb88f1c6300a2f21!2sDra.%20Natalia%20Asquino!5e0!3m2!1sen!2suy!4v1779891742462!5m2!1sen!2suy',
    mapsLink: 'https://maps.app.goo.gl/PPCUm6Xb4SxjuZjV9',
  },
];

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-natalia/', label: 'Sobre Natalia' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '/equipo/', label: 'Equipo' },
  { href: '/consultorios/', label: 'Consultorios' },
  { href: '/articulos/', label: 'Artículos' },
  { href: '/investigacion/', label: 'Investigación' },
  { href: '/preguntas-frecuentes/', label: 'Preguntas frecuentes' },
  { href: '/para-colegas/', label: 'Para colegas' },
  { href: '/contacto/', label: 'Contacto' },
];

export function whatsappLink(message?: string) {
  const num = CONTACT.whatsapp.number.replace(/\D/g, '');
  const msg = encodeURIComponent(message ?? CONTACT.whatsapp.message);
  return `https://wa.me/${num}?text=${msg}`;
}

export function mailtoLink(subject = 'Consulta desde el sitio web') {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}
