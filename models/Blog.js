const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let BlogSchema=new Schema(
    {
        blogId:
        {
            type:String,
            unique:true//Ensuring that no documents have the same blog Ids; similar to primary key in SQL
        },
        title:
        {
            type:String,
            default:''        
        },
        description:
        {
            type:String,
            default:''        
        },
        bodyHtml:
        {
            type:String,
            default:''        
        },
        views:
        {
            type:Number,
            default:0        
        },
        isPublished:
        {
            type:Boolean,
            default:false        
        },
        category:
        {
            type:String,
            default:''        
        },
        author:
        {
            type:String,
            default:''        
        },
        tags:[],
        created:
        {
            type:Date,
            default:Date.now
        },
        lastModified:
        {
            type:Date,
            default:Date.now
        }
    }
)

mongoose.model('Blog',BlogSchema);