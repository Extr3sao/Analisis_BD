# Implement Database Connections Management

## Goal
Implement a Database Connections management UI inside the "Server Configuration" tab, saving data securely to `internal.db` via a FastAPI backend and React frontend.

## Tasks
- [ ] Task 1: Create the `database_connections` table in `src/core/internal_db.py` with schema (id, name, type, host, port, database, username, password_encrypted, ssl, description, is_active, created_at, updated_at). → Verify: Table exists after app restart.
- [ ] Task 2: Implement a simple encryption utility `src/core/crypto_utils.py` using `cryptography.fernet` (or simple fallback if not installed) to encrypt/decrypt passwords. → Verify: Passwords aren't plain text in SQLite.
- [ ] Task 3: Add CRUD methods in `InternalDBManager` (`get_db_connections`, `add_db_connection`, `update_db_connection`, `delete_db_connection`). → Verify: Methods execute without SQL errors.
- [ ] Task 4: Create FastAPI endpoints in `src/api/main.py` (or new router) for `GET`, `POST`, `PUT`, `DELETE` `/api/database-connections`. Make sure `GET` masks passwords. → Verify: Postman/curl returns 200 OK.
- [ ] Task 5: Re-enable the "Configuració" tab in `AppShellChrome.jsx`. → Verify: Tab is visible and clickable.
- [ ] Task 6: Create `src/web-app/src/views/ConfigurationView.jsx` with a layout and a section for "Connexions a BBDD". → Verify: View renders.
- [ ] Task 7: Implement a Data Table/List component in `ConfigurationView.jsx` to fetch and display connections. → Verify: List is visible.
- [ ] Task 8: Implement a Form Modal/Drawer for Creating and Editing connections. Handle API requests and validation. → Verify: Can add and edit a connection.
- [ ] Task 9: Implement Delete functionality with confirmation dialog. → Verify: Can delete a connection.
- [ ] Task 10: Build the frontend `vite build` and test the whole flow. → Verify: Works in browser.

## Done When
- [ ] "Connexions a BBDD" section is fully functional.
- [ ] Connections are persisted in SQLite.
- [ ] Passwords are not sent in plain text to the frontend unless editing (or masked and only updated if changed).
- [ ] Passwords are encrypted in the database.
- [ ] UI matches existing design patterns (Tailwind, Lucide icons).
