const mongoose =require('mongoose');
const {Schema}=mongoose;

//product structure
const categorySchema =new Schema({
    values:{type:String,required:true,unique:true},
    label:{type:String,required:true,unique:true}
    

})
//to make virtual datafield
const virtual =categorySchema.virtual('id');
virtual.get(function(){
    return this._id
    //tels us to return _id because we are using id in front end
})
//automatically id is create and add to data response
categorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){delete ret._id}
})

exports.Category=mongoose.model('Category',categorySchema)