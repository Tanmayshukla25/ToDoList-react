import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

function Todolist() {

    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [EditId, setEditId] = useState(null);

    function AddTask() {
        if (isEditing) {

            setTasks(tasks.map((obj) => {

                return obj.id === EditId ? { ...obj, task: input } : obj
            }))
        }
        else {

            const obj = {
                id: Date.now(),
                task: input

            }
            setTasks([...tasks, obj])
            setIsEditing(false)
            setEditId(null)
        }
        setInput("")
    }
    console.log(tasks);

    function DeleteTasks(e, id) {
        const DeleteTasksIndex = tasks.findIndex((obj) => {
            return obj.id === id;
        });
        setTasks(
            tasks.filter((obj, index) => {
                return index !== DeleteTasksIndex;
            })
        )

    }
    function EditTasks(e, id) {
        const Edit = tasks.find((task) => {
            return task.id === id;
        });
        setInput(Edit.task);
        setIsEditing(true);
        setEditId(id)

    }

    return (
        <>
            <h1>ToDoList</h1>
            <input type="text" id='inputbtn' onChange={(e) => setInput(e.target.value)} value={input} placeholder="Enter the task" />
            <button onClick={AddTask}>{!isEditing ? "Add task" : "Edit task"}</button>
            <ul type="none">
                {tasks.map((obj, index) => {
                    return (
                        <li key={index} className='inputbox'>
                            <span>{obj.task}</span>
                            <MdDelete onClick={(e) => DeleteTasks(e, obj.id)} />
                            <MdOutlineEdit onClick={(e) => EditTasks(e, obj.id)} />
                       
                        </li>
                    );
                })}
            </ul>




        </>
    )

}
export default Todolist