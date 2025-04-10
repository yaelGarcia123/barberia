export interface Empleado {
    IdEmpleado: number;
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
    FechaIngreso: Date;
    Salario: number;
  }
  
  export interface Nomina {
    IdNomina: number;
    RFC: string;
    Fecha: Date;
    Periodo: string;
    DiasPagados: number;
    TipoPago: string;
    SueldoBruto: number;
    TotalPercepciones: number;
    TotalDeducciones: number;
    SueldoNeto: number;
  }
  
  export interface Percepciones {
    IdPercepcion: number;
    IdNomina: number;
    SueldoBase: number;
    Puntualidad: number;
    ValesDespensa: number;
    Compensaciones: number;
    Vacaciones: number;
    PrimaAntiguedad: number;
    OtrasPrestaciones: number;
  }
  
  export interface Deducciones {
    IdDeduccion: number;
    IdNomina: number;
    ISR: number;
    IMSS: number;
    INFONAVIT: number;
    CajaAhorro: number;
    Prestamos: number;
    FONACOT: number;
    CuotaSindical: number;
    Otras: number;
  }
  
  export interface ReciboNomina {
    empleado: Empleado;
    nomina: Nomina;
    percepciones: Percepciones;
    deducciones: Deducciones;
  }