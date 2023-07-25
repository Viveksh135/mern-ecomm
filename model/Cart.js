const mongoose =require('mongoose');
const {Schema}=mongoose;

//product structure
const cartSchema=new Schema({
   //everything will come from refernce
    quantity:{type:Number,required:true},
    product:{type:Schema.Types.ObjectId,ref:'Product',required:true},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
})
//to make virtual datafield
const virtual =cartSchema.virtual('id');
    virtual.get(function(){
    return this._id
    //tels us to return _id because we are using id in front end
})
//automatically id is create and add to data response
cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){delete ret._id}
})

exports.Cart=mongoose.model('Cart',cartSchema)