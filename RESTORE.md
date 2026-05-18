# Guia de Restauració del Dashboard E13BD

Si estàs llegint això, és perquè has descomprimit el backup i vols tornar a fer funcionar l'aplicació completament. Aquí tens els passos detallats:

## 1. Requisits Previs
*   **Python 3.10+**: Per al backend.
*   **Node.js 18+**: Per al frontend (React).

---

## 2. Restauració del Backend (Python)
Des de l'arrel on has descomprimit el fitxer:

1.  **Crea un entorn virtual**:
    ```bash
    python -m venv .venv
    ```
2.  **Activa l'entorn**:
    *   *Windows*: `.venv\Scripts\activate`
    *   *Linux/Mac*: `source .venv/bin/activate`
3.  **Instal·la les dependències**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configuració (.env)**:
    Copia el fitxer `.env.example` a `.env` i configura les variables de connexió a la base de dades.

---

## 3. Restauració del Frontend (React)
Des de la carpeta de l'aplicació web:

1.  **Entra a la carpeta**:
    ```bash
    cd src/web-app
    ```
2.  **Instal·la les dependències**:
    ```bash
    npm install
    ```

---

## 4. Execució de l'Aplicació
Un cop instal·lat tot:

*   **Backend**: `python main.py` (o `python dashboard.py`)
*   **Frontend**: `cd src/web-app && npm run dev`

L'aplicació estarà disponible normalment a `http://localhost:5173` (o la URL que indiqui la consola de Vite).

---

© 2026 Dashboard E13BD Backup System
