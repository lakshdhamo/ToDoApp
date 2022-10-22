import { ITask } from "../Objects/ITask";

// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) {
//     return new Promise<{ data: number }>((resolve) =>
//       setTimeout(() => resolve({ data: amount }), 500)
//     );
//   }

export async function insertTask(todoItem: ITask) {
    setTimeout(() =>  {

    }, 5000);
    
    try {
        return await fetch('https://localhost:7108/api/ToDo',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(todoItem),
            }
        ).then(data => 
        {
            return Promise.resolve(data.json());
        }
        ).catch(
            error => 
            {
                return Promise.reject(error);
            }
        );
        // return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
    
    // return new Promise<{ data: number }>((resolve) =>
    //   setTimeout(() => resolve({ data: amount }), 500)
    // );
  }
  