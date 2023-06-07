const formatearFecha = (fecha: Date): string => {
  const fechaNueva = new Date(fecha);

  const opciones: Object = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  fechaNueva.setMinutes(
    fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset(),
  );

  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export default formatearFecha;
