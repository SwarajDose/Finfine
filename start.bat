@echo off
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python app.py"
start cmd /k "cd frontend && npm install && npm run dev"
echo Frontend running at http://localhost:5173
echo Backend running at http://localhost:5000 