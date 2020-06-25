const fs=require("fs")

const loadJson=()=>{
    try{
        const dataBuffer= fs.readFileSync('questions.json')
        const dataJSON=dataBuffer.toString()
        console.log(dataJSON)
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports={
    loadJson
} 