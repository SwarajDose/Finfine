#!/bin/bash

# Start backend
echo "Starting backend server..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo "Frontend running at http://localhost:5173"
echo "Backend running at http://localhost:5000"
echo "Press Ctrl+C to stop both servers"

# Trap SIGINT to kill both processes when user hits Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

# Wait for both processes
wait 