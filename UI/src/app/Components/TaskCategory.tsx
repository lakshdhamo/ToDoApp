import React, { ChangeEvent, useEffect, useState } from 'react';
import { loadToDosAsync } from '../Store/todoSlice';
import { useAppDispatch } from '../Store/hooks';
import { Form } from 'react-bootstrap';
 import { useLocation } from "react-router-dom";

const TaskCategory = () => {
    const dispatch = useAppDispatch();
     const location = 1;
    // const [task, setTask] = useState<string>("");
    
    useEffect(() => {
      // Update the document title using the browser API
      dispatch(loadToDosAsync(3));
      
    }, [location]);

    // This function will be triggered when a radio button is selected
  // const categoryHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   let valSelected = event.target.value;

  //   if(valSelected === "All" )
  //   {
  //     setTask('All');
  //       dispatch(loadToDosAsync(3));
  //   }else if(valSelected === "InComplete")
  //   {
  //     setTask('All1');
  //       dispatch(loadToDosAsync(2));
  //   }
  //   else{
  //     setTask('All2');
  //       dispatch(loadToDosAsync(1));
  //   }
  // };

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
            // onChange={categoryHandler}
            id={`inline-radio-1`
          }
          />
          <Form.Check
            inline
            label="InComplete"
            name="group1"
            type='radio'
            onChange={() => dispatch(loadToDosAsync(2))}
            // onChange={categoryHandler}
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="Completed"
            name="group1"
            type='radio'
            onChange={() => dispatch(loadToDosAsync(1))}
            // onChange={categoryHandler}
            id={`inline-radio-3`}
          />
        </div>
      
    </Form>
        {/* <fieldset>
          <p>
            <input
              type="radio"
              name="taskOption"
              value="All"
              id="all"
              onChange={categoryHandler}
            />
            <label htmlFor="all">All Tasks</label>
          </p>
  
          <p>
            <input
              type="radio"
              name="taskOption"
              value="InComplete"
              id="inComplete"
              onChange={categoryHandler}
            />
            <label htmlFor="inComplete">InComplete Tasks</label>
          </p>
  
          <p>
            <input
              type="radio"
              name="taskOption"
              value="Completed"
              id="completed"
              onChange={categoryHandler}
            />
            <label htmlFor="completed">Completed Tasks</label>
          </p>
        </fieldset> */}
  
      </div>
    );
  };
  
  export default TaskCategory;