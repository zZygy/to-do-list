import { Task } from "../interfaces/Task";
import { TaskItem } from "./TaskItem";

export const Tasks = ({
  taskList,
  setTaskList,
}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  return (
    <div className="pt-8">
      {taskList.map((task, index) => (
        <TaskItem
          index={index}
          task={task}
          taskList={taskList}
          setTaskList={setTaskList}
        />
      ))}
    </div>
  );
};
