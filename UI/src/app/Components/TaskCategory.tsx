import React, { useEffect } from 'react';
import { loadToDosAsync } from '../Store/todoSlice';
import { useAppDispatch } from '../Store/hooks';
import { Form } from 'react-bootstrap';

const TaskCategory = () => {
    const dispatch = useAppDispatch();
     const location = 1;
    
    useEffect(() => {
      dispatch(loadToDosAsync(3));      
    }, [location]);

    return (
        <div className="container">
        <Form>      
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="All"
            name="group1"
            type='radio'
            defaultChecked
            onChange={() => dispatch(loadToDosAsync(3))}
            id={`inline-radio-1`
          }
          />
          <Form.Check
            inline
            label="InComplete"
            name="group1"
            type='radio'
            onChange={() => dispatch(loadToDosAsync(2))}
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="Completed"
            name="group1"
            type='radio'
            onChange={() => dispatch(loadToDosAsync(1))}
            id={`inline-radio-3`}
          />
        </div>
      
    </Form>
  
      </div>
    );
  };
  
  export default TaskCategory;