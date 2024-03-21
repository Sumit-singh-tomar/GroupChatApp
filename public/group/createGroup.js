const form = document.querySelector('form')

form.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();
        const data = {
            groupName: event.target.groupname.value
        }

        const token = localStorage.getItem("token")
        const result = await axios.post("http://localhost:3000/group/createGroup", data, { headers: { "Authorization": token } })
        if (result.data.status) {
            console.log("successful", result.data)
            alert("Group Created Successfully")
        }
    } catch (error) {
        console.log(error)
        alert("Something Went Wrong")
    }
})