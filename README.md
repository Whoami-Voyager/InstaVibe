# InstaVibe

export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
flask db init
flask db revision --autogenerate -m 'Create tables' 
flask db upgrade