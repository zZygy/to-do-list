import './App.css'

import { AddTask } from './components/AddTask'
import { ListName } from './components/ListName'

function App() {
  return (
    <div className='flex justify-center items-center bg-slate-400 h-screen'>
      <div className='bg-gray-50 p-10 w-90 rounded'>
        <ListName title='MI TODO LIST'/>
        <AddTask />
      </div>
    </div>
  )
}

export default App
