const express = require('express')
const app = express();
const port =process.env.PORT || 8600;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
//mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority
// mongodb://localhost:27017
const mongourl = "mongodb+srv://venky:venky123@cluster0.bxnfz.mongodb.net/amazon?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())



app.get('/', (req,res)=>{
    res.send('health ok')
}
)

app.get('/shirts', (req,res)=>{
  db.collection('shirts').find({}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


app.post('/cart', (req,res)=>{
  db.collection('cart').insert(req.body,(err,result)=>{
          if(err) throw err;
          res.send(result)
  })
})
app.post('/stack',(req,res)=>{
  db.collection('stack').insert(req.body,(err,result)=>{
          if(err) throw err;
          res.send(result)
  })
})

// app.delete('/cart1', (req,res)=>{
//   var id = req.params.id
//   db.collection('cart').remove(login1=id,(err,result)=>{
//           if(err) throw err;
//           res.send(result)
//   })
// })
 

app.get('/cart1',(req,res)=>{
  var condition={}
  if(req.query.login1){
    condition={login1:req.query.login1}
  }
  db.collection('cart').find(condition).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
app.get('/stack1',(req,res)=>{
   db.collection('stack').find().toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
app.get('/stacky/:id',(req,res)=>{
  console.log("request "+ req.params.id)
  

  db.collection('stack').find({'id':Number(req.params.id)}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
// app.get('/stack1/:id',(req,res) =>{
//   var id =req.params.id;
//   db.collection('stack').find({id:id}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })
app.delete('/stackremove',(req,res)=>{
  var id=req.params.id
  db.collection('stack').remove({id:id},(err,result)=>{
    if(err) throw err;
    res.send('item removed suceesfully')
  })
  
})
app.delete('/removeItem',(req,res)=>{
  var id=mongo.ObjectID(req.body._id)
  db.collection('cart').remove({_id:id},(err,result)=>{
    if(err) throw err;
    res.send('item removed suceesfully')
  })
  
})
app.delete('/removeItem1',(req,res)=>{
  var id=mongo.ObjectID(req.body._id)
  db.collection('cart').remove({_id:id},(err,result)=>{
    if(err) throw err;
    res.send('item removed suceesfully')
  })
  
})



app.get('/shirts/:id',(req,res) =>{
  var id = req.params.id
  db.collection('shirts').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
app.get('/pants/:id',(req,res) =>{
  var id = req.params.id
  db.collection('pants').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

/*app.get('/shirts', (req,res)=>{
  var condition ={};
  if(req.query._id){
    condition={_id:req.query._id}
  }
  db.collection('shirts').find(condition).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  }) 
})*/

app.get('/pants', (req,res)=>{
    db.collection('pants').find({}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result)
    })
})
app.get('/carosal',(req,res)=>{
  db.collection('carosal').find({}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})
app.get('/carosal/:id',(req,res)=>{
  var id = req.params.id
  db.collection('carosal').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
app.get('/brand',(req,res)=>{
  db.collection('brand').find({}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})
app.get('/brand/:id',(req,res)=>{
  var id = req.params.id
  db.collection('brand').find({_id:id}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
MongoClient.connect(mongourl,(err,connection) => {
    if(err) console.log(err);
    db = connection.db('amazon');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  
  })






