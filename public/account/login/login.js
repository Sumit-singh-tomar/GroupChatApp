const form = document.querySelector('form')

form.addEventListener("submit", async function (event) {
    try {
        event.preventDefault()
        const userDetail = {
            email: event.target.email.value,
            password: event.target.password.value,
        }

        const result = await axios.post("http://localhost:3000/account/login", userDetail)
        if (result.data.status) {
            console.log(result.data)
            localStorage.setItem("token", result.data.token)
            alert('User Login Successfully')
            // window.location.href = ''
        }
    }
    catch (e) {
        console.log('error',e);
        alert(e.response.data.data)
    }
})