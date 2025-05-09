export function formatDate(mysqlDate) {
    const date = new Date(mysqlDate); // Convierte la cadena de fecha de MySQL a un objeto Date
  
    const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (agrega 1 porque los meses empiezan desde 0) y lo formatea con 2 dígitos
    const year = date.getFullYear(); // Obtiene el año
  
    return `${day}-${month}-${year}`; // Retorna la fecha en formato "DD-MM-YYYY"
  }

export const isAllowedDate = (dateStr) => {
    const date = new Date(dateStr)
    const max = new Date() // hoy
    return  date < max
  }