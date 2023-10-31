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
def home():
    """a function that returns home page"""
    return render_template('home.html')

@app.route('/login')
def login_1():
    """a function that returns login form"""
    return render_template('login.html')

@app.route('/direct')
def redirect_to_login_1():
    """a function that redirects to the login form"""
    return redirect('/login')

@app.route('/about')
def about():
    """a function that returns about page"""
    return render_template('about.html')

@app.route('/direct_1')
def redirect_to_about():
    """a function that redirects to about page"""
    return redirect('/about')

@app.route('/product')
def product():
    """a function that returns product page"""
    return render_template('product.html')

@app.route('/direct_2')
def redirect_to_product():
    """a function that redirects to about page"""
    return redirect('/product')

@app.route('/service')
def service():
    """a function that returns service page"""
    return render_template('service.html')

@app.route('/direct_3')
def redirect_to_service():
    """a function that redirects to service page"""
    return redirect('/service')

@app.route('/direct_4')
def redirect_to_cart():
    """a function that redirects to service page"""
    return redirect('/cart')

@app.route('/cart')
def cart():
    """a function that returns cart page"""
    return render_template('cart.html')

@app.route('/index')
def index():
    """a function that returns index page"""
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """a function that returns login home"""
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
    """a function that returns signup form"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        mycursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        mydb.commit()
        return render_template('login.html')
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)

