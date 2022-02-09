import pkg from "mongoose";
import mongosePaginate from "mongoose-paginate-v2"

const { Schema,model } = pkg

const taskSchema = new Schema({
    title : {
        type : String,
        required : true ,
        trim: true
    },
    description : {
        type : String,
        trim : true
    },
    done : {
        type: Boolean,
        default : false
    }
}, {
    versionKey: false,
    timestamps: true
});

taskSchema.plugin(mongosePaginate)
export default model('Task', taskSchema)