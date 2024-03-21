const form = document.querySelector('form')

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const oldChat = JSON.parse(localStorage.getItem("messages"))
        if (oldChat?.length) {
            const lastChat = oldChat.pop()
            const lastChatID = lastChat.id
            const token = localStorage.getItem("token")
 
            const res = await axios.get("http://localhost:3000/group/getGroup", { headers: {"Authorization":token }})

            showGroup(res.data.data)
  
            const result = await axios.get(`http://localhost:3000/message/getMessage/${lastChatID}`, { headers: { "Authorization": token } })
 
            if (result.data.status) {
                const oldChat = JSON.parse(localStorage.getItem("messages"))
                localStorage.removeItem("messages")
                if(oldChat.length>=10){
                    oldChat.splice(0,result.data.data.length)
                }
                result.data.data.map((item) => {
                    oldChat.push(item)
                })

                localStorage.setItem("messages", JSON.stringify(oldChat))
                showChat(JSON.parse(localStorage.getItem("messages")))
            }
        }
        else {
            const token = localStorage.getItem("token")
            const result = await axios.get("http://localhost:3000/message/getNewMessage", { headers: { "Authorization": token } })

            if (result.data.status) {
                const chat = result.data.data.map((item) => {
                    return item
                })

                localStorage.setItem("messages", JSON.stringify(chat))
                showChat(result.data.data)
            }
        }
    } catch (error) {
        alert("Something Went Wrong")
    }
})

function showChat(data) {
    data.map((item,i) => {
        const div = document.createElement('div')
        div.innerHTML = `${i+1}) ${item.message}`
        div.style.fontSize = '18px'
        document.getElementById('box').appendChild(div)
    })
}


function showGroup(data){
    data.map((item) => {
        const div = document.createElement('div')
        div.innerHTML = `${item.groupname}`
        div.style.fontSize = '18px'
        document.getElementById('list').appendChild(div)
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
            const chat = JSON.parse(localStorage.getItem("messages"))
            chat.push(result.data.data)
            window.location.reload()
        }
    } catch (error) {
        alert("Something Went Wrong")
        console.log(error);
    }
})


function handleCreateGroup(event){
    window.location.href = "../group/createGroup.html"
}