# Módulo de Asistencia a Clases Extracurriculares 🎓

Este proyecto es una aplicación frontend construida con **React** y **Material UI** que permite a los estudiantes y funcionarios de la universidad registrar, consultar y gestionar la asistencia a clases extracurriculares ofrecidas por Bienestar Universitario.

## 🚀 Tecnologías Utilizadas

- ⚛️ React (CRA)
- 💄 Material UI (MUI)
- 🌐 React Router DOM
- ☁️ Azure Static Web Apps (despliegue)
- 📦 GitHub Actions (CI/CD)

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   ├── images/
│   ├── resources/
│   └── Styles/
├── components/         # Componentes reutilizables: Navbar, Sidebar, Topbar, etc.
├── pages/              # Vistas principales como Dashboard, RegisterClass, etc.
├── routes/             # Rutas centralizadas en AppRoutes.jsx
├── service/            # Archivos de conexión a APIs
├── styles/             # Archivos de estilo CSS globales
├── App.js              # Entrada principal de la app
├── index.js            # Punto de montaje de ReactDOM
└── setupTests.js       # Configuración para pruebas
```

## 📌 Funcionalidades

- ✅ Visualización del **horario de clases** confirmado
- ✅ Consulta de clases y su estado de asistencia
- ✅ Registro de clases disponibles por ID
- ✅ Confirmación de asistencia con datos del usuario
- ✅ Navegación fluida entre secciones con React Router

## 📦 Instalación local

```bash
# Clona el repositorio
git clone https://github.com/Cristian5124/Modulo-3-Front.git
cd Modulo-3-Front

# Instala las dependencias
npm install

# Ejecuta en modo desarrollo
npm start
```

Accede en: [http://localhost:3000](http://localhost:3000)

## ☁️ Despliegue en Azure

El proyecto está configurado para desplegarse automáticamente en **Azure Static Web Apps** usando GitHub Actions.

- Output: `/build`
- App Location: `/`
- API Location: *(vacío, no se usa Functions)*

## 🔧 Variables de entorno

No se requieren por ahora. Las clases y asistencias se manejan localmente (modo demo).

## 👨‍💻 Autores

**Cristian David Polo Garrido** <br>
**Daniel Ricardo Ruge Gomez** <br>
**Juan Sebastián Velandia Pedraza** <br>
**David Santiago Villadiego Médicis** <br>

Estudiantes de Ingeniería de Sistemas
Escuela Colombiana de Ingeniería Julio Garavito

---
