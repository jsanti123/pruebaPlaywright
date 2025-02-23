# Pruebas de Automatizacion con Playwrigth

## Descripción
Este proyecto contiene pruebas automatizadas para la plataforma Priverion, enfocándose en la gestión del módulo **ROPA**. Se han desarrollado tests para la creación, edición y eliminación de registros.

---

## Instalación, Configuración y Uso
### 1. Requisitos previos
Antes de comenzar, asegurarse de tener instalado:
- [Node.js](versión utilizada: v20.17.0)
- [npm](versión utilizada: 10.8.2)
- Playwright (**se instala automáticamente con los pasos siguientes**)

### 2. Clonar el repositorio
- git clone https://github.com/jsanti123/pruebaPlaywright.git
- cd pruebaPlaywright

### 3. Instalar dependencias
- npm install
- npx playwrigth install

### 4. Ejecución de pruebas
- npx playwright test (Ejecutar todas las pruebas)
- npx playwright test tests/ropa/editRopa.spec.ts (Ejecutar una prueba especifica)
- npx playwright test --project=chromium (ejecutar en un navegador especifico)

### 5. Reporte de Pruebas
- npx playwright test --reporter=html (Generar reporte HTML)
- npx playwright show-report (Abrir el archivo)

## Autor
- Santiago Posada Florez - Ingeniero de Sistemas y Computación

# Notas 
- En la carpeta Evidencia se encuentra una imagen que respalda un inconveniente relacionado con la resolución de la página, el cual generaba un error durante la ejecución de las pruebas. Para solucionar este problema, se ajustó el tamaño de la pantalla, permitiendo que las pruebas se llevaran a cabo de manera correcta y sin interrupciones.

- En cada uno de los archivos **spec** se descripbe al inicio del archivo el proposito de cada prueba

- Es posible que algunos test fallen como por ejemplo **editRopa.spec.ts** debido a que es necesario que exista un registro en el modulo de **ROPA** para que pueda ser editado