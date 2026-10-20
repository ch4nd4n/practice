import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL)

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
