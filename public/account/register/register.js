const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
    try {
        event.preventDefault();
        const userDetail = {
            name: event.target.name.value,
            email: event.target.email.value,
            phonenumber: event.target.phonenumber.value,
            password: event.target.password.value,
        }

        const result = await axios.post("http://localhost:3000/account/register", userDetail)
        console.log(result);
        if(result.data.status){
            alert("success")
        }

    } catch (e) {
        console.log(e)
        alert(e.response.data.data)
    }
})