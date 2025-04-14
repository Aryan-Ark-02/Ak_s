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
    category = db.Column(db.String())
    instructor = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    duration = db.Column(db.String())
    lessons = db.Column(db.Integer())
    rating = db.Column(db.Float())
    price = db.Column(db.Float())
    original_price = db.Column(db.Float())
    image_url = db.Column(db.String())
    featured = db.Column(db.Boolean(), default=False)
    
def __repr__(self):
    return f"<Course(title='{self.title}', instructor='{self.instructor}')>"
