export interface Empleado {
    IdEmpleado?: number;
    RFC: string;
    TipoContrato: string;
    Nombre: string;
    Apellido: string;
    Puesto: string;
    ModoPago: string;
    Correo: string;
    Departamento: string;
    Direccion: string;
    Telefono: string;
    FechaIngreso: string | Date;
    Salario: number;
  }