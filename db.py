from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    rating = db.Column(db.Float())
    course_description = db.Column(db.Text(), nullable=False)
    description1 = db.Column(db.Text())
    description2 = db.Column(db.Text())
    category = db.Column(db.String())
    instructor = db.Column(db.String(), nullable=False)  # Store as JSON or comma-separated string
    duration = db.Column(db.String())
    number_of_lessons = db.Column(db.Integer())
    price = db.Column(db.Float())
    original_price = db.Column(db.Float())
    image_url = db.Column(db.String())
    featured = db.Column(db.Boolean(), default=False)
    key_topics_covered = db.Column(db.Text())  # Store as JSON or comma-separated string
    requirements = db.Column(db.Text())  # Store as JSON or comma-separated string
    target_audience = db.Column(db.Text())  # Store as JSON or comma-separated string
    learning_outcomes = db.Column(db.Text())  # Store as JSON or comma-separated string
    modules = db.relationship('Module', backref='course', lazy=True)

    def __repr__(self):
        return f"<Course(title='{self.title}', instructor='{self.instructor}')>"

class Module(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text())
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    lessons = db.relationship('Lesson', backref='module', lazy=True)

    def __repr__(self):
        return f"<Module(title='{self.title}')>"

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    duration = db.Column(db.String())
    module_id = db.Column(db.Integer, db.ForeignKey('module.id'), nullable=False)
    content_type = db.Column(db.String(), default='video')  # e.g., 'video', 'reading'

    def __repr__(self):
        return f"<Lesson(title='{self.title}')>"
# Sample data seeding (optional, for development/testing)
# def seed_data():
#     if not Course.query.first():
#         course1 = Course(
#     id= 101,
#     title= "Complete Python Bootcamp",
#     rating= 4.7,
#     course_description= "Learn Python from scratch to advanced level with hands-on projects",
#     description1= "Perfect for beginners with no prior experience",
#     description2= "Includes real-world applications and portfolio projects",
#     category= "Programming",
#     instructor= "{\"name\": \"John Smith\", \"experience\": \"10 years\", \"specialization\": \"Data Science\"}",
#     duration= "30 hours",
#     number_of_lessons= 45,
#     price= 49.99,
#     original_price= 99.99,
#     image_url= "https://example.com/images/python-course.jpg",
#     featured= true,
#     key_topics_covered= "[\"Data Types\", \"OOP\", \"Web Development\", \"Data Analysis\"]",
#     requirements= "[\"Basic Computer Skills\", \"No Prior Programming Needed\"]",
#     target_audience= "[\"Beginners\", \"Career Switchers\", \"Data Professionals\"]",
#     learning_outcomes= "[\"Build Python applications\", \"Automate tasks\", \"Analyze data\"]"
#         )
#         db.session.add(course1)
#         db.session.commit()
