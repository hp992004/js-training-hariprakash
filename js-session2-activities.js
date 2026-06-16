//Activity 1 - Undertanding Aync Behaviour

//1
console.log("1")
setTimeout(() => console.log("2"), 1000)
console.log("3")

/*
1. JavaScript runs the code line by line.
2. setTimeout starts a 1000ms timer and moves on.
3. The next line runs immediately, so "3" is logged.
4. After 1 second, the callback runs and logs "2".
*/

//2
console.log("1")
setTimeout(() => console.log("2"), 0)
console.log("3")

/*
1. setTimeout(0) schedules the function to run as soon as possible.
2. It does not run immediately, even with a 0ms delay.
3. JavaScript first finishes all the current code, including logging "3".
4. After the current code is done, the setTimeout callback runs and logs "2".
*/

//3
console.log("Fetching data...");

setTimeout(() => console.log("Data Received !"), 2000);

//Activity 2 - Promises

//1
const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5
  setTimeout(() => {
    if (success) resolve("Data loaded!")
    else reject("Something went wrong")
  }, 1000)
})

getData
.then((msg) => {console.log("Success:", msg)})
.catch((error) => console.log("Error:", error));

//2
const startValue = new Promise((resolve) => resolve(5))

startValue
  .then((value) => value * 2)
  .then((value) => value + 10)
  .then((result) => {
    console.log("Final result:", result)
  })

//3
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("User loaded"), 1000))

const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Orders loaded"), 1500))

Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results)
  })
  .catch((error) => {
    console.log(error)
  })

//Activity 3 - async / await

//1
const getUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const user = await response.json()

    console.log(user.name)
  } catch (error) {
    console.log(error)
  }
}

getUser()

//2
const getUserById = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const user = await response.json()

  return {
    name: user.name,
    email: user.email
  }
}

getUserById(3).then((user) => {console.log(user)})

//3
const getAllUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await response.json()

  return users.map((user) => ({
    name: user.name,
    email: user.email
  }))
}

getAllUsers().then((users) => {console.log(users)})

//Activity 4 — Error Handling

//1
const fetchUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const data = await response.json()
    console.log(data)
  } 
  catch (error) {
    console.log("Error:", error)
  }
}

fetchUser()

//2
const fetchMissing = async () => {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/99999")
    if (!response.ok) {
    throw new Error("User not found")
    }
    const data = await response.json()
    console.log(data)
} 
catch (error) {
    console.log("Caught:", error.message)
    }
}

fetchMissing()

//3
const checkUsers = async () => {
const userRequest = fetch("https://jsonplaceholder.typicode.com/users/1")

const invalidRequest = fetch("https://jsonplaceholder.typicode.com/invalid")

const fetchResults = await Promise.allSettled([userRequest,invalidRequest])

fetchResults.forEach((item) => {
    if (item.status === "fulfilled") {
    console.log("Success:", item.value.status)
    } else {
    console.log("Failed:", item.reason)
    }
})
}

checkUsers()

//Activity 5 - DOM: Select & Update

//1
const title = document.querySelector("#title")
title.innerHTML = "Hello, Intern!"

//2
const subtitle = document.querySelector("#subtitle")
subtitle.style.color = "blue"

//3
const counter = document.querySelector("#counter")
const currentValue = Number(counter.textContent)
counter.textContent = currentValue + 1

//4
const names = ["Alice", "Bob", "Carol"]
const userList = document.querySelector("#user-list")
names.forEach((name) => {
const listItem = document.createElement("li")
listItem.textContent = name
userList.appendChild(listItem)
})

const titleStyle = () => {
  title.classList.toggle("highlight")
}

titleStyle()

//Activity 6 — Events

//1
const greetBtn = document.querySelector("#greet-btn")
const nameInput = document.querySelector("#name-input")
const greeting = document.querySelector("#greeting")

const showGreeting = () => {
  const name = nameInput.value

  if (name === "") {
    greeting.textContent = "Please enter a name"
  } else {
    greeting.textContent = `Hello, ${name}!`
  }
}

greetBtn.addEventListener("click", showGreeting)


//2
const addBtn = document.querySelector("#add-btn")
const resetBtn = document.querySelector("#reset-btn")
const clickCount = document.querySelector("#click-count")
let count = 0

addBtn.addEventListener("click", () => {
  count++
  clickCount.textContent = `Clicks: ${count}`
})
resetBtn.addEventListener("click", () => {
  count = 0
  clickCount.textContent = `Clicks: ${count}`
})

//3
nameInput.addEventListener("input", () => {
  const name = nameInput.value
  if (name === "") {
    greeting.textContent = ""
  } else {
    greeting.textContent = `Hello, ${name}!`
  }
})

//4
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showGreeting()
  }
})

//Activity 7 — Fetch + DOM (Full Flow)
const loadBtn = document.querySelector("#load-btn")
const status = document.querySelector("#status")
const usersContainer = document.querySelector("#users-container")
const searchInput = document.querySelector("#search")

let usersData = []

//1
loadBtn.addEventListener("click", async () => {
  try {
    status.textContent = "Loading..."
    usersContainer.innerHTML = ""
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    const users = await response.json()
    usersData = users
    renderUsers(usersData)
    status.textContent = `${users.length} users loaded`
  } catch (error) {
    status.textContent = "Failed to load users. Try again."
    usersContainer.innerHTML = ""
  }
})

//2
const renderUsers = (users) => {
  usersContainer.innerHTML = ""
  users.forEach((user) => {
    const userDiv = document.createElement("div")
    userDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>`
    usersContainer.appendChild(userDiv)
  })
}

//3
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase()
  const filteredUsers = usersData.filter((user) => {
    return user.name.toLowerCase().includes(searchText)
  })
  renderUsers(filteredUsers)
})

//Activity 8 — Self Learn

//1
const getUserAndPosts = async () => {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ])
    const user = await userResponse.json()
    const posts = await postsResponse.json()
    console.log(`${user.name} has ${posts.length} posts`)
  } catch (error) {
    console.log("Error:", error)
  }
}

getUserAndPosts()

//2
const renderUsers = (users) => {
  const container = document.querySelector("#users-container")

  container.innerHTML = ""

  users.forEach((user) => {
    const userDiv = document.createElement("div")
    const name = document.createElement("h3")
    name.textContent = user.name
    const email = document.createElement("p")
    email.textContent = user.email
    const city = document.createElement("p")
    city.textContent = user.address.city
    userDiv.appendChild(name)
    userDiv.appendChild(email)
    userDiv.appendChild(city)
    container.appendChild(userDiv)
  })
}

//3
const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users))
}
const loadSavedUsers = () => {
  const savedUsers = localStorage.getItem("users")
  if (savedUsers) {
    return JSON.parse(savedUsers)
  }
  return []
}

//4

const cancelController = new AbortController()
const loadData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        signal: cancelController.signal
      }
    )
    const data = await response.json()
    console.log(data)
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch cancelled")
    } else {
      console.log("Error:", error)
    }
  }
}

loadData()