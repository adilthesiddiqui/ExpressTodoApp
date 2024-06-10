const express = require("express");

const app = express();

const user = {
    name: "Adil",
    kidneys : [
        {healthy : false},
        {healthy :true}
    ]
}


const users = [user];

app.use(express.json())
// req and res : they stand for request nd respond
// get hte status of kidneys of the user 
app.get('/', (req,res)=>{
   const mykidneys = user.kidneys;
   //console.log(mykidneys);
    const numberofkidneys = mykidneys.length;

    let numberofhealthykidneys = 0;
    for( let i =0; i < mykidneys.length ; i++){
        if(mykidneys[i].healthy){
            numberofhealthykidneys = numberofhealthykidneys + 1;
        }
    }

    const numberunhealthykidney = numberofkidneys - numberofhealthykidneys;

    res.json({
        mykidneys,
        numberofhealthykidneys,
        numberunhealthykidney
    })



   //res.send("hellow world ")

})

// useer can add new kidney 
app.post('/', (req,res)=>{
   const ishealthy = req.body.ishealthy;
   user.kidneys.push({healthy : ishealthy});
   res.json({
    msg : "Done"
   })

})


// replace kidney
app.put('/', (req,res)=>{
    const mykidneys = user.kidneys;
   const ishealthy = req.body.ishealthy;
   for(let i = 0 ; i < mykidneys.length; i++){
    mykidneys[i].healthy = ishealthy;
   }
   res.json({
    msg : "done!"
   })

})

// remove kidneys 
app.delete('/', (req,res)=>{
   const newkidneys = [];
   for (let i  = 0 ; i < user.kidneys.length; i++){
        if(user.kidneys[i].healthy){
            newkidneys.push({healthy : true})
        }
   }
   user.kidneys = newkidneys;
   res.json({msg : "done!"})


})




app.listen(3000, () => {
    console.log('Server running on http://localhost:3000'); // Added a log message to indicate the server is running
});