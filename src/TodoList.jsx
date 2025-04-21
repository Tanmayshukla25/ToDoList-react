import { useState } from 'react';
import { MdDelete, MdOutlineEdit } from "react-icons/md";

function Todolist() {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    function AddTask() {
        const value = input.trim();
        if (value === "") return;

        if (isEditing) {
            setTasks(tasks.map(task =>
                task.id === editId ? { ...task, task: value } : task
            ));
            setIsEditing(false);
            setEditId(null);
        } else {
            const newTask = {
                id: Date.now(),
                task: value
            };
            setTasks([...tasks, newTask]);
        }

        setInput("");
    }

    function DeleteTasks(e, id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function EditTasks(e, id) {
        const taskToEdit = tasks.find(task => task.id === id);
        setInput(taskToEdit.task);
        setIsEditing(true);
        setEditId(id);
    }

    return (
        <>
            <h1>ToDoList</h1>
            <input type="text" onChange={(e) => setInput(e.target.value)} value={input} id='inputbtn' placeholder="Enter the task"
            />
            <button onClick={AddTask}> {!isEditing ? "Add task" : "Edit task"}</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className='inputbox'>
                      <div id='btnparent'>
                      <span id='listName'>{task.task}</span>
                       <div>
                       <MdDelete onClick={(e) => DeleteTasks(e, task.id)} />
                       <MdOutlineEdit onClick={(e) => EditTasks(e, task.id)} />
                       </div>
                      </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todolist;
