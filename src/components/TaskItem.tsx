import { useState } from "react";
import { Task } from "../interfaces/Task";

export const TaskItem = ({
  index,
  task,
  taskList,
  setTaskList,
}: {
  index: number;
  task: Task;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const editTask = (index: number, task: string) => {
    setEditIndex(index);
    setNewTaskName(task);
  };

  const checkedTask = (index: number, task: Task) => {
    const updatedTask: Task = {
      task: task.task,
      checked: !task.checked,
    };
    updateTask(index, updatedTask);
  };

  const closeEditTask = () => {
    setEditIndex(-1);
  };

  const changeTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const saveNewTaskName = (index: number) => {
    const taskFormatted = newTaskName.trim();
    const updatedTask: Task = {
      task: taskFormatted,
      checked: false,
    };
    updateTask(index, updatedTask);
    closeEditTask();
  };

  const updateTask = (index: number, updatedTask?: Task) => {
    const updatedTaskList = [...taskList];
    updatedTask
      ? updatedTaskList.splice(index, 1, updatedTask)
      : updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };

  return (
    <div key={index} className="flex justify-between">
      {editIndex === index ? (
        <>
          <div className="flex">
            {/* EDIT BTN MODE */}
            <button
              onClick={() => saveNewTaskName(index)}
              className="-ml-1 mr-2"
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#B24BF3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
            </button>
            {/* EDIT INPUT MODE */}
            <input
              type="text"
              required
              value={newTaskName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                changeTaskName(event)
              }
            />
          </div>
          <div>
            {/* EDIT CLOSE MODE */}
            <button onClick={() => closeEditTask()} className="m-r-1">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#B24BF3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* TASK CHECKBOX & INPUT */}
          <div className="flex">
            <input
              type="checkbox"
              className="accent-[#B24BF3] mr-2"
              checked={task.checked}
              onChange={() => checkedTask(index, task)}
            />
            <li className={`list-none ${task.checked ? "line-through" : ""}`}>
              {task.task}
            </li>
          </div>
          <div>
            {/* EDIT BTN START */}
            {editIndex !== index && (
              <button onClick={() => editTask(index, task.task)}>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#B24BF3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </button>
            )}
            {/* DELETE BTN START */}
            <button onClick={() => updateTask(index)}>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#B24BF3"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
