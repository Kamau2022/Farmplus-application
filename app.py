from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Connect to the database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="kamau2368",
  database="farmplus"
)

# Create a cursor
mycursor = mydb.cursor()

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/example')
def example():
    return render_template('login.html')

@app.route('/redirect')
def redirect_to_example():
    return redirect('/example')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        mycursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = mycursor.fetchone()
        if user:
            return render_template('index.html')
        else:
            return render_template('login.html')
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        mycursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        mydb.commit()
        return redirect(url_for('dashboard'))
    return render_template('signup.html')

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)


