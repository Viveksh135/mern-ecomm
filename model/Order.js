const mongoose =require('mongoose');
const {Schema}=mongoose;

//product structure
const orderSchema=new Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //TODO:  we can add enum types
    paymentMethod: { type: String, required: true },
    paymentstatus:{type:'string',default:'pending'},
    status: { type: String, default: 'pending' },
    selectedAddresses: { type: Schema.Types.Mixed, required: true },
})
//to make virtual datafield
const virtual =orderSchema.virtual('id');
    virtual.get(function(){
    return this._id
    //tels us to return _id because we are using id in front end
})
//automatically id is create and add to data response
orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function (doc,ret){delete ret._id}
})

exports.Order=mongoose.model('Order',orderSchema)