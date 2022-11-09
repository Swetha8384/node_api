var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

var a = app.listen(8081, () => {
  console.log("server running at 8081")
})

app.get('/', (req, res) => {
 /// console.log("Here is a test v1 uuid: "+uuid.v1());
  res.send("hello")
  
})
// for(let i=0;i<=5;i++)
// {
//   id1=uuid.v4()
//   console.log(id1)
  
// }; 



var User_details = [
  {
    "id":uuid.v4(), "username": "swetha", "mail": "s@gmail.com", "m1": 65, "m2": 70, "m3": 50, "m4": 71
  },
  {
    "id": uuid.v4(), "username": "vandhana", "mail": "v@gmail.com", "m1": 65, "m2": 70, "m3": 50, "m4": 71
  },
  {
    "id": uuid.v4(), "username": "roja", "mail": "r@gmail.com", "m1": 65, "m2": 70, "m3": 50, "m4": 71
  },
  {
    "id": uuid.v4(), "username": "charan", "mail": "r@gmail.com", "m1": 65, "m2": 70, "m3": 50, "m4": 71
  },
  {
    "id": uuid.v4(), "username": "ramya", "mail": "r@gmail.com", "m1": 65, "m2": 70, "m3": 50, "m4": 71
  }
]
console.log(User_details[0])
//retreving_details
app.get('/Userdetails/:id', (req, res) => {
  var uid = req.params.id;
  var index = User_details.findIndex(user_id => {
    return (user_id.id == uid)
  })
  console.log(index)
  if (index >= 0) {
    res.send({ status: true, Details: User_details[index], message: "Successfully data retrevied" })
    console.log(User_details[index])
  }
  else {
    res.status(200).send({ status: false, details: "error", message: "User Not Found" })           
  }
})


//post: storing data
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/adduser', (req, res) => {
  var updated_details={
    id: uuid.v4(), "username": 'rocky',"mail": 'r@gmail.com',"m1": 65, "m2": 70,"m3": 50,"m4": 71
  }
  console.log(updated_details)
  const adduser1=updated_details
  //const adduser1 = req.body;
 // console.log(adduser1)
  var New_User_details = User_details.push(adduser1);//pushing into old object
  if (User_details.length != New_User_details.length) {
    res.json({ status: true, Details: updated_details, Message: "Added data successfully" });//display updated data
   // console.log(User_details)
  }
  else {
    res.status(200).json({ details: "error", status: false, message: "Data is not added" })
  }
})




//Updating data
app.use(bodyParser.json())
app.put("/Update/:id", (req, res) => {
  var uid = req.params.id;

  var upname =req.body.username ;
  console.log(upname)//data updated in postman 
  var update_name = upname
  var index = User_details.findIndex((elements) => {
    return (elements.id == uid)
  })
  // const updated_details = User_details[index]
  // res.send(User_details)
  console.log(index)

  if (index >= 0) {
    const updated_details = User_details[index]
   // console.log(updated_details.username) //swetha
    updated_details.username = update_name;
    // console.log(updated_details) 
    User_details[index] = updated_details;
    res.send({ status: true, Details: User_details[index], Message: "Details Updated" })
    console.log(User_details)
  }
  else {
    res.status(200).send({ status: false, details: "error", message: "Details Not Updated" })
  }
})

//delete
app.delete("/:id", (req, res) => {
  var uid = req.params['id'];
  const requiredIndex = User_details.findIndex(el => {
     return el.id == uid ;
  });
  if(requiredIndex === -1){
    res.status(200).send({ status: false, details: "error", message: "Entered invalid id to delete data" })
 }
 else
 {
   User_details.splice( requiredIndex,1)
  // console.log(User_details)
  res.send({status:true,details:User_details,message: `id  Deleted  Successfully`})
 }
})
console.log("running")
