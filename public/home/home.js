const form = document.querySelector('form')

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // const oldChat = JSON.parse(localStorage.getItem("messages"))
        // if (oldChat?.length) {
            // const lastChat = oldChat.pop()
            // const lastChatID = lastChat.id
            const token = localStorage.getItem("token")

            const res = await axios.get("http://localhost:3000/group/getGroup", { headers: { "Authorization": token } })

            if (res.data && res.data.data)
                showGroup(res.data.data)

            // const result = await axios.get(`http://localhost:3000/message/getMessage/${lastChatID}`, { headers: { "Authorization": token } })

            const result = await axios.get(`http://localhost:3000/message/getGroupMessages?groupId=${checkGroupId()}`, { headers: { "Authorization": token } })


            if (result.data.status) {
                // const oldChat = JSON.parse(localStorage.getItem("messages"))
                // localStorage.removeItem("messages")
                // if (oldChat.length >= 10) {
                    // oldChat.splice(0, result.data.data.length)
                // }
                // result?.data?.data.map((item) => {
                //     oldChat.push(item)
                // })

                // localStorage.setItem("messages", JSON.stringify(oldChat))
                // showChat(JSON.parse(localStorage.getItem("messages")))
                showChat(result.data.data)
                }
        // }
        // else {
            // const token = localStorage.getItem("token")

            // const res = await axios.get("http://localhost:3000/group/getGroup", { headers: { "Authorization": token } })

            // if (res.data && res.data.data)
                // showGroup(res.data.data)

            // const result = await axios.get("http://localhost:3000/message/getNewMessage", { headers: { "Authorization": token } })

            // if (result.data.status) {
                // const chat = result?.data?.data.map((item) => {
                    // return item
                // })

                // localStorage.setItem("messages", JSON.stringify(chat))
                // showChat(result.data.data)
            // }
        // }
    } catch (error) {
        alert("Something Went Wrong")
        console.log('errors', error);
    }
})

function showChat(data) {
    const box = document.getElementById('box')
    box.innerHTML = ''
    data?.map((item, i) => {
        const div = document.createElement('div')
        div.innerHTML = `${i + 1}) ${item.message}`
        div.style.fontSize = '18px'
        box.appendChild(div)
    })
}

async function fetchChat(groupId) {
    try {
        const token = localStorage.getItem("token")
        const result = await axios.get(`http://localhost:3000/message/getGroupMessages?groupId=${groupId}`, { headers: { "Authorization": token } })
        if(result.data.status){
            console.log(result.data)
            showChat(result.data.data)
        }
    } catch (error) {
        alert("Something Went Wrong")
        console.log("error",error);
    }
}

let currentGroupId;
function showGroup(data) {
    let currentSelectedDiv;
    currentGroupId = data[0].id
    data.map((item,i) => {
        const div = document.createElement('div')
        div.innerHTML = `${item.groupname}`
        div.style.fontSize = '18px'
        div.style.cursor = 'pointer'
        if(i==0){
            div.style.background='black'
            div.style.color='white'
            currentSelectedDiv = div
        }
        div.addEventListener("click", function (event) {
            if (currentSelectedDiv) {
                currentSelectedDiv.style.backgroundColor = ''; 
                currentSelectedDiv.style.color = 'green'
            }
            fetchChat(item.id);
            fetchChat(item.id);
            div.style.backgroundColor = 'black';
            div.style.color = 'white';
            currentGroupId = item.id;
            currentSelectedDiv = div;
        })
        document.getElementById('list').appendChild(div)
    })
}

function checkGroupId(){
    return currentGroupId;
}

form.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const message = event.target.message.value;
        const data = {
            message: message,
            groupId:checkGroupId(),
        }

        const result = await axios.post("http://localhost:3000/message/saveMessage", data, { headers: { 'Authorization': token } })
        if (result.data.status) {
            // const chat = JSON.parse(localStorage.getItem("messages"));
            // chat.push(result.data.data);
                fetchChat(checkGroupId())
            // window.location.reload();
            // showChat(result.data.data)
        }
        event.target.message.value = ''
    } catch (error) {
        alert("Something Went Wrong");
        console.log(error);
    }
})


function handleCreateGroup(event) {
    window.location.href = "../group/createGroup.html";
}