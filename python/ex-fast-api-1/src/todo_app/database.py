from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the database URL. 
# For local development, using SQLite is common. 
# For production, you'd use a more robust database like PostgreSQL.
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo_app.db"

# Create a SQLAlchemy engine.
# connect_args are specific to SQLite and are needed for SQLite to work with
# concurrent requests.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a SessionLocal class. This is a factory for creating Session objects.
# Each Session object is a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for declarative models.
# declarative_base() returns a new base class that features a metaclass
# allowing declarative style definition of mapped classes.
Base = declarative_base()

def get_db():
    """
    Dependency to easily retrieve a database session.
    This function yields a database session, and ensures it is closed
    after the request is finished, even if there are errors.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
