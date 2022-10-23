import React, { ChangeEvent, useEffect, useState } from 'react';
import { MessageType } from '../Objects/MessageTypeEnum';
import { ITask } from "../Objects/ITask";
import TodoTask from "./TodoTask";
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import {
  completeTaskAsync,
  selectTodo,
  updateMessage,
  insertToDoAsync,
  loadToDosAsync,
  removeTaskAsync
} from '../Store/todoSlice';
import MessagePanel from './MessagePanel';
import { Button, Col, Form, FormGroup, FormLabel, Row, Stack, Table } from 'react-bootstrap';
import TaskCategory from './TaskCategory';
import { faCheck, faXmark  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ToDoLayout() {
  const todoList = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  
  
    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState(new Date().toDateString());
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
        if(todoList.message.show === true)
        {
          dispatch(updateMessage({message : '', show : false, type: MessageType.Info} ));
        }
    };

    const addTaskLocal = (): void => {
      if(task.length < 8)
      {
        dispatch(updateMessage({message : 'Task name should be greater than 8 characters', show : true, type: MessageType.Error}));
      }
      else{
        const newTask:ITask = { id : 0, itemName: task, deadline: deadline, isDone: false};
        dispatch(insertToDoAsync(newTask));
        closeMessagePanelInDelay();
        resetForm();
      }      
    };
  
    const resetForm = () =>
    {
      setTask("");
      setDeadline(new Date().toDateString());
    };

    const closeMessagePanelInDelay = () =>
    {
      setTimeout(() => 
      dispatch(updateMessage({message : '', show : false, type: MessageType.Error})),
       2000);
    };

    const onRemoveTask = (taskId: number): void => {
      dispatch(removeTaskAsync(taskId));
      //dispatch(removeTask(taskNameToDelete));
      closeMessagePanelInDelay();
    };
    const onCompleteTask = (taskId: number): void => {
      dispatch(completeTaskAsync(taskId));
      closeMessagePanelInDelay();
    };

    return (
      <>
        <Form className='mb-3'>
          <Form.Group className="mb-3" controlId="fgTask">
            <Form.Label>Task</Form.Label>
            <Form.Control as="textarea" id="task" rows={3} placeholder="Enter Task..." value={task}  onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fgDeadline">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" className='ms-auto' onClick={addTaskLocal}>Add Task</Button>
            <Button variant="secondary" type="reset">Reset</Button>  
          </Stack>
        </Form>

        <MessagePanel {...todoList.message} />
        
      <h3>List of Tasks</h3>
        <TaskCategory />

        <Table bordered hover>
      <thead>
        <tr>
          <th style={{width:'60%'}}>Task Name</th>
          <th style={{width:'15%'}}>Due Date</th>
          <th style={{width:'15%'}}>Status</th>
          <th style={{width:'10%'}}></th>
        </tr>
      </thead>
      <tbody>
        {
       (todoList.todos.length === 0) ? 
        
        (<tr>
          <td colSpan={4}>No Tasks found</td>
        </tr>) 
        :
        ''
        }
      {todoList.todos.map((task: ITask, key: number) => {
              return <tr className={task.isDone ? '' : (new Date(task.deadline) < new Date() ? 'bg-danger' : '')}>
                <td>
                  {
                    task.itemName
                  }
                </td>
                <td>
                  {
                    new Date(task.deadline).toDateString()
                  }
                </td>
                <td>
                  {
                    task.isDone ? 'Completed' : 'In Complete'
                  }
                </td>
                <td>
                  {
                    <Stack direction="horizontal" gap={3}>
                    <Button variant="success" disabled={task.isDone}  
                    onClick={() => onCompleteTask(task.id !== undefined ? task.id : 0)}
                            >
                              <FontAwesomeIcon icon={ faCheck } /> 
                              </Button>
                    <Button variant="danger" type="button" onClick={() => onRemoveTask(task.id !== undefined ? task.id : 0)}>
                    <FontAwesomeIcon icon={ faXmark } /> 
                    </Button>  
                    </Stack>

                  //   <button
                  //   onClick={() => {
                  //     onRemoveTask(task.id !== undefined ? task.id : 0);
                  //   }}
                  // >
                  //   X
                  // </button>
                  }
                </td>
              </tr>;
            })}
      </tbody>
    </Table>
    
        {/* <div className="todoList">
            {todoList.todos.map((task: ITask, key: number) => {
              return <TodoTask key={key} task={task} removeTask={onRemoveTask} completeTask={onCompleteTask}/>;
            })}
        </div> */}
        </>
    );
}




