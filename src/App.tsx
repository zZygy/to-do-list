import './App.css'

import { AddTask } from './components/AddTask'
import { ListName } from './components/ListName'

function App() {
  return (
    <div className="flex justify-center bg-[#F1F5F8] h-screen text-lg">
      <div className='w-2/5 h-fit mt-10 p-10 bg-white rounded-xl'>
        <ListName title='MI TODO LIST'/>
        <AddTask />
      </div>
    </div>
  )
}

export default App
