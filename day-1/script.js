const { default: axios } = require("axios");

async function getData() {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
    }catch(error){
        console.error(error.message);
    }
}
getData()

async function PostData(){
    const newObject = { 
        name:"prem",
        age: 22,
        city: "Bangalore"
    }
    try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts ', newObject);
        console.log(response.data);
    }catch(error){
        console.error(error.message);
    }

}
PostData()
