addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("signup-form").addEventListener('submit', signup);
})

async function signup(event) {
    event.preventDefault();

    var loginFormElement = document.getElementById("signup-form")
    var username = loginFormElement.querySelector("#username").value
    var password = loginFormElement.querySelector("#password").value
    var token = loginFormElement.querySelector("#token").value
    var loginInfoBannerElement = loginFormElement.querySelector("#login-info-banner")
    
    var json;
    try {
    json = await (await fetch(`${location.protocol === 'https:' ? "https" : "http"}://${window.location.hostname}:${location.port}/api`, {
        method: "POST",
        body: JSON.stringify({ id: 1, username: username, password: password, token : token }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })).json() //Ugly! FUCK THIS SHIT WHO WHY...
    } catch(e) {
        loginInfoBannerElement.innerHTML = "Failed to connect to server"
    }
    if(json.r != 0)
    {
        loginInfoBannerElement.innerHTML = "Login failed"
        return false;
    }

    document.cookie = `uuid=${json.uuid}`

    window.location.replace("/index.html");

    return false
}