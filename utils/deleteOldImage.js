const fs = require("fs");
const path = require("path");

exports.deleteManyOldImages = function(imagePath) {
    imagePath.map(item=>{
        const fullImagePath = path.join(item);
        fs.unlink(fullImagePath,(error)=>{
            if(error){  
                console.error(error);
            }else{
                console.log("Image deleted");
            }
        })
    })
}
exports.deleteSingleOldImage = function(imagePath){
    const fullImagePath = path.join(imagePath);
    fs.unlink(fullImagePath,(error)=>{
        if (error) {
            console.log("Wrong prosses");
        }else{
            console.log("Old image delete successfull");
            
        }
    })
}