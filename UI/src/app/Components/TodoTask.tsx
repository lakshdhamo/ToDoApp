import React from "react";
import { ITask } from "../Objects/ITask";

interface Props {
  task: ITask;
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.itemName}</span>
        <span>{task.deadline.toLocaleDateString()}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.itemName);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;