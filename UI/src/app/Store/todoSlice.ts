import { IMessage } from './../Objects/IMessage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../Objects/ITask';
import { MessageType } from '../Objects/MessageTypeEnum';
import { RootState } from './store';
import { insertTask, loadTasks, completeTaskAsDone, deleteTask } from '../Services/todoService';

// Store data
export interface ToDoState {
  todos: ITask[];
  message: IMessage;
  isLoading: boolean;
}

// Initial Store value
const initialState: ToDoState = {
  todos: [],
  message: { message: '', show: false, type: MessageType.Info },
  isLoading: false
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // Insert task reducers
      .addCase(insertToDoAsync.pending, (state) => {
        state.isLoading = true;
        state.message = { message: 'Task adding is in Progress', show: true, type: MessageType.Loading };
      })
      .addCase(insertToDoAsync.fulfilled, (state, action) => {
        state.isLoading = true;
        state.message = { message: 'Task added successfully!', show: true, type: MessageType.Success };
        state.todos = [...state.todos, action.payload];        
      })
      .addCase(insertToDoAsync.rejected, (state) => {
        state.isLoading = false;
        state.message = { message: 'Task add is not successful', show: true, type: MessageType.Error };
      })
      // Load task reducers
      .addCase(loadToDosAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadToDosAsync.fulfilled, (state, action:any) => {
        state.isLoading = true;
        state.todos = action.payload;     
        state.message = { message: '', show: false, type: MessageType.Loading };   
      })
      .addCase(loadToDosAsync.rejected, (state) => {
        state.isLoading = false;
        state.message = { message: 'Load Task is not successful', show: true, type: MessageType.Error };
      })
      // Complete task reducers
      .addCase(completeTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.message = { message: 'Task completion is in Progress', show: true, type: MessageType.Loading };
      })
      .addCase(completeTaskAsync.fulfilled, (state, action:any) => {
        state.isLoading = true;
        state.message = { message: 'Task completed successfully!', show: true, type: MessageType.Success };
        let task = state.todos.find(x => x.id === action.payload.value);
        if(task !== undefined)
        {
          task.isDone = true;
        }        
      })
      .addCase(completeTaskAsync.rejected, (state) => {
        state.isLoading = false;
        state.message = { message: 'Task completion is not successful', show: true, type: MessageType.Error };
      })
      // Delete task reducers
      .addCase(removeTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.message = { message: 'Delete Task is in Progress', show: true, type: MessageType.Loading };
      })
      .addCase(removeTaskAsync.fulfilled, (state, action:any) => {
        state.isLoading = true;
        state.message = { message: 'Task deleted successfully!', show: true, type: MessageType.Success };
        let index = state.todos.findIndex(x => x.id === action.payload);
      state.todos.splice(index, 1);    
      })
      .addCase(removeTaskAsync.rejected, (state) => {
        state.isLoading = false;
        state.message = { message: 'Task deletion is not successful', show: true, type: MessageType.Error };
      });
  },
});

export const insertToDoAsync = createAsyncThunk(
  'todo/addTask',
  async (task: ITask) => {
    const response: ITask = await insertTask(task);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const loadToDosAsync = createAsyncThunk(
  'todo/loadTasks',
  async (status: number) => {
    const response: ITask = await loadTasks(status);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const completeTaskAsync = createAsyncThunk(
  'todo/completeTasks',
  async (taskId: number) => {
    const response: ITask = await completeTaskAsDone(taskId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const removeTaskAsync = createAsyncThunk(
  'todo/removeTask',
  async (taskId: number) => {
    const response: ITask = await deleteTask(taskId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const { updateMessage } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;