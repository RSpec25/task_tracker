import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem';
export default function TodoList() {
    const [tasks, setTasks] = useState(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        return items || [];
    });

    const [filter, setFilter] = useState('all')
    const [txt, setTxt] = useState("");
    const [taskTime, setTaskTime] = useState("")
    useEffect(() => {
        console.log(tasks);
        localStorage.setItem('items', JSON.stringify(tasks));
    }, [tasks]);

    function addTask() {
        const newtask = { id: Date.now(), text: txt, completed: false, time: taskTime };
        setTasks([...tasks, newtask]);
        setTxt('');
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggle = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }

    return (
        <>
            <div>
                <input type="text" value={txt} onChange={(event) => { setTxt(event.target.value) }} placeholder='add task' />
                <button onClick={() => addTask()} >Add Task</button>
                <div>
                    <label htmlFor="filterSelector">show</label>
                    <select name="filter" id="filterSelector" onChange={(event) => { setFilter(event.target.value) }} value={filter}>
                        <option value="all">All</option>\
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date-time">set date</label>
                    <input type="datetime-local" id='date-time' value={taskTime} onChange={(e) => { setTaskTime(e.target.value) }} />
                </div>
                <div>
                    {tasks.map((task, index) => {
                        if (filter === 'all')
                            return < TodoItem key={index} task={task} deleteTask={deleteTask} toggleCompleted={toggle} />;
                        if (filter === 'completed' && task.completed)
                            return < TodoItem key={index} task={task} deleteTask={deleteTask} toggleCompleted={toggle} />;
                        if (filter === 'pending' && !task.completed)
                            return < TodoItem key={index} task={task} deleteTask={deleteTask} toggleCompleted={toggle} />
                    })}
                </div>
            </div>
        </>
    )
}