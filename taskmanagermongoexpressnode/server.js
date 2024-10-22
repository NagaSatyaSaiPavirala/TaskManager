const express = require('express');
const mongoose = require('mongoose');
const TaskSchema=require('./model');
const cors=require('cors');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2')
  .then(() => console.log('DB Connected'))
// app.get('/', (req, res)=>{
//     res.send('Hello World!');
// }
app.use(express.json())
app.use(cors({origin:'*'}))
app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData=new TaskSchema({
            todo:todo//schema:value
        })
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err);
    }
});

app.get('/gettask',async(req,res)=>{
    try{
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})
app.listen(5000,() => console.log('Server running...'));
