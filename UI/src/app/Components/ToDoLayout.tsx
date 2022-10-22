import React, { ChangeEvent, useState } from 'react';
// import DatePicker from "react-datepicker";
import DatePicker from 'react-date-picker';
import { MessageType } from '../Objects/MessageTypeEnum';
import { ITask } from "../Objects/ITask";
import TodoTask from "./TodoTask";
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import {
  addTask,
  completeTask,
  selectTodo,
  updateMessage,
} from '../Store/todoSlice';
import MessagePanel from './MessagePanel';

export function ToDoLayout() {
  const todoList = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();

    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState(new Date());
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === "task") {
        if(todoList.message.show === true)
        {
          dispatch(updateMessage({message : '', show : false, type: MessageType.Info} ));
        }
        setTask(event.target.value);
      } else {
        setDeadline(new Date(event.target.value));
      }
    };
  
    const addTaskLocal = (): void => {
      if(task.length < 8)
      {
        dispatch(updateMessage({message : 'Task name should be greater than 8 characters', show : true, type: MessageType.Error}));
      }
      else{
        const newTask:ITask = { id : 0, itemName: task, deadline: deadline, isDone: false};
        resetForm();
        dispatch(addTask(newTask));
      }      
    };
  
    const resetForm = () =>
    {
      setTask("");
      setDeadline(new Date());
    };

    const completeTaskLocal = (taskNameToDelete: string): void => {
      dispatch(completeTask(taskNameToDelete));
    };

    return (
        <div className="App">
          <div className="header">
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Task..."
                name="task"
                value={task}
                onChange={handleChange}
              />
              <DatePicker value={deadline} />

            </div>
            <button onClick={addTaskLocal}>Add Task</button>
          </div>
          <MessagePanel {...todoList.message}  />
          <div className="todoList">
            {todoList.todos.map((task: ITask, key: number) => {
              return <TodoTask key={key} task={task} completeTask={completeTaskLocal} />;
            })}

          </div>
        </div>
      );
}