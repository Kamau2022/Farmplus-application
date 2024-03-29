from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from .models import db  
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
auth = Blueprint('auth', __name__)
 
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Process the login form data here
        email = request.form.get('email')
        password = request.form.get('password1')
        user = User.query.filter_by(email=email).first()

        # Perform user authentication (check if username and password are valid)
        if user:
            if check_password_hash(user.password, password):
            # If authentication is successful, log the user in and redirect
            # You can use Flask-Login functions to handle user sessions
                flash('Login successful', category='success')
                login_user(user, remember=True)
            # Redirect to a protected route
                return redirect(url_for('views.index'))
            else:
                flash('incorrect password, try again.', category='error')
        else:
            flash('email does not exist.', category='error')
    return render_template("login.html", user=current_user)

# Add a route for the login page (GET request)
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.home'))

@auth.route('/signup', methods=['GET', 'POST'])
def sign_up(): 
    if request.method =='POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')

        elif len(email) < 4:
             flash('Email must be greater than 3 characters', category='error' )
        elif len(first_name) < 2:
            flash('First name must be greater than 1 characters',category='error')
        elif password1 != password2:
            flash('Passwords do not match',category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.home'))
    return render_template("signup.html", user=current_user)
@auth.route('/direct_4')
def redirect_to_cart():
    """a function that redirects to service page"""
    return redirect('/cart')

@auth.route('/cart')
def cart():
    """a function that returns cart page"""
    return render_template('cart.html')


