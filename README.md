# 💰 FinanzasYA! — Versión Netlify (con Tutor IA funcional)

PWA educativa de finanzas personales para jóvenes colombianos.

## ⚡ Por qué esta versión es diferente a GitHub Pages

GitHub Pages **bloquea las llamadas directas a la API de Anthropic** (error CORS).  
Esta versión usa una **Netlify Function** como proxy seguro: el frontend llama a `/.netlify/functions/chat`, que internamente llama a Anthropic con la API key guardada como variable de entorno en Netlify (nunca expuesta al navegador).

---

## 🚀 Cómo desplegar en Netlify (paso a paso)

### 1. Sube este repositorio a GitHub
```
finanzasYA-netlify/
├── index.html
├── netlify.toml
├── netlify/
│   └── functions/
│       └── chat.js
└── README.md
```

### 2. Conecta en Netlify
- Ve a [app.netlify.com](https://app.netlify.com)
- **Add new site → Import an existing project → GitHub**
- Selecciona el repositorio
- Build settings: déjalos vacíos (el `netlify.toml` los configura)
- Clic en **Deploy site**

### 3. Configura la API Key (CRÍTICO)
- En Netlify, ve a **Site settings → Environment variables**
- Agrega:
  - **Key:** `ANTHROPIC_API_KEY`
  - **Value:** tu API key de Anthropic (`sk-ant-...`)
- Clic **Save** y luego **Trigger deploy** para redesplegar

### 4. ¡Listo!
El Tutor IA funcionará correctamente. El resto de funciones (módulos, simuladores, quiz, logros) funcionan sin API key.

---

## 🛠️ Estructura de archivos

| Archivo | Función |
|---------|---------|
| `index.html` | App completa (módulos, simuladores, quiz, presupuesto, logros) |
| `netlify.toml` | Configuración de build y funciones |
| `netlify/functions/chat.js` | Proxy seguro hacia la API de Anthropic |

---

## 👨‍💻 Desarrollado por
**Vibras Positivas HM** — Caucasia, Antioquia  
Derechos de Autor Reservados © 2025
