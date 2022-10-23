import React, { ChangeEvent, useState } from 'react';
import { MessageType } from '../Objects/MessageTypeEnum';
import { ITask } from "../Objects/ITask";
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import {
  completeTaskAsync,
  selectTodo,
  updateMessage,
  insertToDoAsync,
  removeTaskAsync
} from '../Store/todoSlice';
import MessagePanel from './MessagePanel';
import { Button, Form, Stack, Table } from 'react-bootstrap';
import TaskCategory from './TaskCategory';
import { faCheck, faXmark  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ToDoLayout() {
  // Selector to get the latest store value
  const todoList = useAppSelector(selectTodo);
  // Dispatcher is used to emit the event to update the store
  const dispatch = useAppDispatch();
    
  // Local store to maintain Task & Due date
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState(new Date().toDateString());
    
  // Even handler for Task entry
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTask(event.target.value);
        if(todoList.message.show === true)
        {
          dispatch(updateMessage({message : '', show : false, type: MessageType.Info} ));
        }
    };

    // Method to add the Task to the Task list
    const addTask  = (): void => {
      if(task.length <= 10)
      {
        dispatch(updateMessage({message : 'Task name must be longer than 10 characters', show : true, type: MessageType.Error}));
      }
      else{
        const newTask:ITask = { id : 0, itemName: task, deadline: deadline, isDone: false};
        dispatch(insertToDoAsync(newTask));
        closeMessagePanelInDelay();
        resetForm();
      }      
    };
  
    // Reset the form controls
    const resetForm = () =>
    {
      setTask("");
      setDeadline(new Date().toDateString());
    };

    // Remove the message panel
    const closeMessagePanelInDelay = () =>
    {
      setTimeout(() => 
      dispatch(updateMessage({message : '', show : false, type: MessageType.Error})),
       2000);
    };

    // Delete the task from the Task list
    const onRemoveTask = (taskId: number): void => {
      dispatch(removeTaskAsync(taskId));
      closeMessagePanelInDelay();
    };

    // Complete the task.
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
            <Form.Control type="date" min={new Date().toDateString()} value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" className='ms-auto' onClick={addTask}>Add Task</Button>
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
                  
                  }
                </td>
              </tr>;
            })}
      </tbody>
    </Table>

        </>
    );
}




