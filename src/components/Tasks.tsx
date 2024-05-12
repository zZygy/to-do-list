import { Task } from "../interfaces/Task";
import { TaskItem } from "./TaskItem";

export const Tasks = ({
  taskList,
  setTaskList,
}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const cleanTasks = () => {
    setTaskList([]);
  };

  return (
    <div className="pt-8">
      {taskList.map((task, index) => (
        <div key={index}>
          <TaskItem
            index={index}
            task={task}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      ))}

      {taskList.length > 1 && (
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#B24BF3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={cleanTasks}
        >
          Borrar tareas
        </button>
      )}
    </div>
  );
};
