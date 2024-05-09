import { Task } from "../interfaces/Task";
import { Tasks } from "./Tasks";
import { useEffect, useState } from "react";

export const AddTask = () => {
  const [ task, setTask ] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
console.log(taskList);
useEffect(() => {
  const storedTaskListJSON = localStorage.getItem('taskList');
  if (storedTaskListJSON) {
    setTaskList(JSON.parse(storedTaskListJSON));
  }
}, []);

  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  }

  const handleAddTask = () => {
    const newTask: Task = { task: task, checked: false };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTask('');
  }
  

  return (
    <>
      <div className='flex'>
        <input type='text' 
          placeholder='Write your task...'
          required 
          value={task}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleTask(event)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-70 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
        />
        
        <button 
          type='submit' 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <Tasks
        taskList={taskList} 
        setTaskList={setTaskList}
      />
    </>
  )
}