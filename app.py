from flask import Flask, render_template, request, redirect, url_for, flash
from sqlalchemy import inspect
from werkzeug.security import generate_password_hash, check_password_hash
from db import db, User, Course
from forms import SignupForm, LoginForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a strong secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/course-detail/<int:course_id>')
def course_detail(course_id):
    course = Course.query.get_or_404(course_id)
    return render_template('course-detail.html', course=course)

@app.route('/courses')
def courses():
    courses = Course.query.all()  # Retrieve all courses
    return render_template('courses.html', courses=courses)

@app.route('/enrolled-course')
def enrolled_course():
    return render_template('enrolled-course.html')

@app.route('/resource')
def resource():
    # TODO: Implement resource handling
    return "Resource page"

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.password, form.password.data):
            flash('Login successful!', 'success')
            return redirect(url_for('courses'))  # Redirect to courses page after login
        else:
            flash('Login unsuccessful. Please check your username and password.', 'danger')
    return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data, method='sha256')
        new_user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            age=form.age.data,
            username=form.username.data,
            email=form.email.data,
            password=hashed_password  # Store the hashed password
        )
        db.session.add(new_user)
        db.session.commit()
        flash('Account created successfully! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)

def seed_database():
    courses = [
        Course(
            title="Web Development Fundamentals",
            category="Web Development",
            instructor="John Smith",
            description="Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.",
            duration="8 weeks",
            lessons=24,
            rating=4.8,
            price=49.99,
            original_price=99.99,
            image_url="placeholder_url",
            featured=True,
        ),
        Course(
            title="Data Science Essentials",
            category="Data Science",
            instructor="Emily Chen",
            description="Master the fundamentals of data analysis, visualization, and machine learning.",
            duration="10 weeks",
            lessons=32,
            rating=4.7,
            price=59.99,
            original_price=129.99,
            image_url="placeholder_url",
            featured=False,
        ),
        # Add other courses similarly...
    ]

    with app.app_context():
        if not inspect(db.engine).has_table(Course.__tablename__):
            db.create_all()
        else:
            if Course.query.count() == 0:  # Check if the table is empty
                db.session.add_all(courses)
                db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_database()
    app.run(debug=True)