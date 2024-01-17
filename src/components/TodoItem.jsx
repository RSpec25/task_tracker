import React from 'react';
function TodoItem({ task, deleteTask, toggleCompleted }) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            <p className={task.completed ? 'todo-completed' : ''} >{task.text}</p>
            <p>{task.time}</p>
            <button onClick={() => deleteTask(task.id)}>
                X
            </button>
        </div>
    );
}
export default TodoItem;