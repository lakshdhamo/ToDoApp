import { ITask } from "../Objects/ITask";

export async function loadTasks(status: number) {
    return fetch('https://localhost:7108/api/ToDo?status='+status,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        }
    )
        .then(data => Promise.resolve(data.json()))
        .catch(error => Promise.reject(error));
}

export async function insertTask(todoItem: ITask) {
    return fetch('https://localhost:7108/api/ToDo',
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(todoItem),
        }
    )
        .then(data => Promise.resolve(data.json()))
        .catch(error => Promise.reject(error));
}

export async function completeTaskAsDone(taskId: number) {
    return fetch('https://localhost:7108/api/ToDo/MarkAsDone?id='+taskId,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        }
    )
        .then(data => Promise.resolve(data.json()))
        .catch(error => Promise.reject(error));
}

export async function deleteTask(taskId: number) {
    return fetch('https://localhost:7108/api/ToDo/'+taskId,
        {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        }
    )
        .then(data => Promise.resolve(data.json()))
        .catch(error => Promise.reject(error));
}
