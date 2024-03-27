document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem("token")
        const result = await axios.get("http://localhost:3000/account/getAllUser", { headers: { "Authorization": token } })
        if (result.data.status) {
            showFriendList(result.data.data)
        }
    } catch (error) {
        alert("something Went wrong")
        console.log("error", error)
    }
})

let addFriends = []

function showFriendList(data) {
    const friendList = document.getElementById('friendList')

    data.map((item) => {
        const div = document.createElement('div')
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')
        const button = document.createElement('button')
        button.innerHTML = "Invite Friend"

        button.addEventListener('click', function (event) {
            event.preventDefault()
            addFriends.push(item.id)
            button.style.display = "none"
        })

        span1.innerHTML = item.name
        span2.appendChild(button)

        div.append(span1, span2)

        friendList.appendChild(div)

    })

}

const form = document.querySelector('form')

form.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        const data = {
            groupName: event.target.groupname.value,
            addFriends: addFriends
        }

        const token = localStorage.getItem("token")
        const result = await axios.post("http://localhost:3000/group/createGroup", data, { headers: { "Authorization": token } })
        if (result.data.status) {
            alert("Group Created Successfully")
            window.location.href = '../home/home.html'
        }
    } catch (error) {
        console.log(error)
        alert("Something Went Wrong")
    }
})


function homeClick(){
    window.location.href = "../home/home.html"
}