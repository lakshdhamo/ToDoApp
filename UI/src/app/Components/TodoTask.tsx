import React from "react";
import { ITask } from "../Objects/ITask";

interface Props {
  task: ITask;
  removeTask(taskId: number): void;
  completeTask(taskId: number): void;
}

const TodoTask = ({ task, removeTask, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.itemName}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.id !== undefined ? task.id : 0);
        }}
      >
        Done
      </button>
      <button
        onClick={() => {
          removeTask(task.id !== undefined ? task.id : 0);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;