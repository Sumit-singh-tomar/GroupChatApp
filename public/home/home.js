const form = document.querySelector('form')

form.addEventListener('submit',async (event) => {
    try {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const message = event.target.message.value
    
        const data = {
            message: message,
        }
    
        const result = await axios.post("http://localhost:3000/message/saveMessage", data, { headers: { 'Authorization': token } })
        console.log(result);
        if(result.data.status){
            alert("successfull")
        }    
    } catch (error) {
        alert("Something Went Wrong")
        console.log(error);
    }
})