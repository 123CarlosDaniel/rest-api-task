import Task from "../models/Task.js";
import { getPagination } from "../libs/getPagination.js";

export const findAllTasks = async (req, res) => {
    try {
        const {size, page, title} = req.query
        
        const condition = title
            ?{
                title :{ $regex : new RegExp(title), $options :"i"}
            }
            :{}
        console.log(condition)
        const {limit, offset} = getPagination(page,size)

        const tasks = await Task.paginate(condition , {offset, limit}) //entre las llaves va el filtro
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something went wrong retrieving the tasks"
        })
    }
}

export const createTask = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        const taskSaved = await newTask.save()
        res.json(taskSaved)

    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a task"
        })
    }
}

export const findOneTask = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const task = await Task.findById(id)
        if (!task)
            return res
                .status(404)
                .json({
                    message: `Task with id ${id} does not exists`
                })

        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving Task with id :${id}`
        })
    }
}

export const deleteTask = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task)
            return res
                .status(404)
                .json({
                    message: `Task with id ${id} does not exists`
                })
        res.json({
            message: "Task was deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete task with id :${id}`
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({
        done: true
    })
    res.json(tasks)
}

export const updateTask = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const task = await Task.findByIdAndUpdate(id, req.body)
        if (!task)
            return res
                .status(404)
                .json({
                    message: `Task with id ${id} does not exists`
                })

        res.json({
            message: "Task was updated succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update task with id :${id}`
        })
    }
}