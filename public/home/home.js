const form = document.querySelector('form')

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const token = localStorage.getItem("token")
        const result = await axios.get("http://localhost:3000/message/getMessage", { headers: { "Authorization": token } })
        if (result.data.status) {
            console.log(result.data)
            showChat(result.data.data)
        }
    } catch (error) {
        alert("Something Went Wrong")
    }
})

function showChat(data){
    data.map((item)=>{
        const div = document.createElement('div')
        div.innerHTML = item.message
        div.style.fontSize='18px'
        document.getElementById('box').appendChild(div)
    })
}

form.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const message = event.target.message.value

        const data = {
            message: message,
        }

        const result = await axios.post("http://localhost:3000/message/saveMessage", data, { headers: { 'Authorization': token } })
        console.log(result);
        if (result.data.status) {
            window.location.reload()
        }
    } catch (error) {
        alert("Something Went Wrong")
        console.log(error);
    }
})