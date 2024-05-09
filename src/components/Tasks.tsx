import { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";

export const Tasks = ({ taskList, setTaskList }: { taskList: Task[], setTaskList: React.Dispatch<React.SetStateAction<Task[]>> }) => {
  
  const [ editIndex, setEditIndex ] = useState<number>(-1);
  const [ newTaskName, setNewTaskName ] = useState<string>("");

  const editTask = (index: number, task: string) => {
    setEditIndex(index);
    setNewTaskName(task);
  }

  const checkedTask = (index: number, task: Task) => {
    const updatedTask: Task = {
      task: task.task,
      checked: !task.checked
    };
    updateTask(index, updatedTask);
  }

  const closeEditTask = () => {
    setEditIndex(-1); 
  }

  const changeTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  }

  const saveNewTaskName = (index: number) => {
    const taskFormatted = newTaskName.trim();
    const updatedTask: Task = {
      task: taskFormatted,
      checked: false
    };
    updateTask(index, updatedTask);
    closeEditTask();
  }

  const updateTask = (index: number, updatedTask?: Task) => {
    const updatedTaskList = [...taskList];
    updatedTask ? updatedTaskList.splice(index, 1, updatedTask) : updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  }

  return (
    <div className="pt-3">
      {taskList.map((task, index) => (
        <div key={index} className="flex justify-between">
          {editIndex === index ? (

            <div className="flex">
              {/* EDIT BTN MODE */}
              <button onClick={() => saveNewTaskName(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>

              {/* EDIT INPUT MODE */}
              <input type='text'
                required 
                value={newTaskName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeTaskName(event)}
              />

              {/* EDIT CLOSE MODE */}
              <button onClick={() => closeEditTask()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>

          ) : (

            <>

              {/* TASK CHECKBOX & INPUT */}
              <div className="flex">
                <input type="checkbox" className="mr-5" onChange={() => checkedTask(index, task)} />
                <li className={`list-none ${task.checked  ? 'line-through' : ''}`}>{task.task}</li>
              </div>
              <div>
                {/* EDIT BTN START */}
                {editIndex !== index  &&
                  <button onClick={() => editTask(index, task.task)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                }
                {/* DELETE BTN START */}
                <button onClick={() => updateTask(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>

            </>

          )}
        </div>
      ))}
    </div>
  );
}
