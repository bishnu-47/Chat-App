const users = []

const addUser = (({ id, username, room}) =>{
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if(!username || !room){
        return {
            error: "Username and Room is requried!"
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate user
    if(existingUser){
        return {
            error: "Username already in use!"
        }
    }

    // Store user
    const user = { id, username, room}
    users.push(user)
    return { user }
})

const removeUser = (id) =>{
    const index = users.findIndex((user) =>{
        return id === user.id
    })

    if(id != -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) =>{
    return users.find((user) =>{
        return id === user.id
    })
}

const getUsersInRoom = (room) =>{
    return users.filter((user) => {
        return user.room === room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
}
