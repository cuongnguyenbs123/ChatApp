export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url,body)=>{
    var config = {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body),
    }
    const response = await fetch(url,config);
    const data = await response.json();
    if(!response.ok){
        let message
        if(data?.message){
            message = data.message
        }else{
            message = data
        }
        return {error:true, message};
    }
    return data;
}