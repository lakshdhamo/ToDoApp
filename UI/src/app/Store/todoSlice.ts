import { IMessage } from './../Objects/IMessage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../Objects/ITask';
import { MessageType } from '../Objects/MessageTypeEnum';
import { RootState } from './store';
import { insertTask } from '../Services/todoService';

export interface ToDoState {
    todos: ITask[];
    message: IMessage;
    isLoading: boolean;
  }

  const initialState: ToDoState = {
    todos: [],
    message: {message : '', show : false, type: MessageType.Info},
    isLoading: false
  };

  export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes

        state.isLoading = true;
        // insertToDoAsync(action.payload);

        let a = async (task: ITask) => {
            const response: ITask = await insertTask(task);
            // The value we return becomes the `fulfilled` action payload
            state.todos = [...state.todos, response];
            state.message = {message : 'ToDo item added successfully!', show : true, type: MessageType.Success};
            state.isLoading = false;
          };
a(action.payload);
        // insertTask(action.payload)
        //  state.todos = [...state.todos, action.payload];
        //  state.message = {message : 'ToDo item added successfully!', show : true, type: MessageType.Success};
        //  state.isLoading = false;
      },
      completeTask: (state, action: PayloadAction<string>) => {
        let index = state.todos.findIndex(x => x.itemName === action.payload);
        state.todos.splice(index, 1);
        state.message = {message : 'ToDo item removed successfully!', show : true, type: MessageType.Success};
      },
      updateMessage: (state, action: PayloadAction<IMessage>) => {
        state.message = action.payload;
      },
    },
    
  });

  const insertToDoAsync = createAsyncThunk(
    'counter/fetchCount',
    async (task: ITask) => {
      const response = await insertTask(task);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

  export const { addTask, completeTask, updateMessage } = todoSlice.actions;

  // The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
 export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;