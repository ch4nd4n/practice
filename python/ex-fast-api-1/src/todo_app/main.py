from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, database

app = FastAPI(title="TODO API", description="A RESTful API for managing tasks.")

# Create the database tables
models.Base.metadata.create_all(bind=database.engine)

@app.post("/todos/", response_model=schemas.TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(database.get_db)):
	return crud.create_todo(db, todo)

@app.get("/todos/", response_model=List[schemas.TodoResponse])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
	return crud.get_todos(db, skip=skip, limit=limit)

@app.get("/todos/{todo_id}", response_model=schemas.TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(database.get_db)):
	db_todo = crud.get_todo(db, todo_id)
	if db_todo is None:
		raise HTTPException(status_code=404, detail="Todo not found")
	return db_todo

@app.patch("/todos/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(database.get_db)):
	db_todo = crud.update_todo(db, todo_id, todo_update)
	if db_todo is None:
		raise HTTPException(status_code=404, detail="Todo not found")
	return db_todo

@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: Session = Depends(database.get_db)):
	success = crud.delete_todo(db, todo_id)
	if not success:
		raise HTTPException(status_code=404, detail="Todo not found")
	return None
