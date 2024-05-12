import { Task } from "../interfaces/Task";
import { Tasks } from "./Tasks";
import { useEffect, useState } from "react";

export const AddTask = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const storedTaskListJSON = localStorage.getItem("taskList");
    if (storedTaskListJSON) {
      setTaskList(JSON.parse(storedTaskListJSON));
    }
  }, []);

  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    const newTask: Task = { task: task, checked: false };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTask("");
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your task..."
          required
          value={task}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleTask(event)
          }
        />

        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#B24BF3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={handleAddTask}
        >
          <svg
            className="w-5 h-5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>

      <Tasks taskList={taskList} setTaskList={setTaskList} />
    </>
  );
};
