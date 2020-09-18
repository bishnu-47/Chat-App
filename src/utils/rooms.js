rooms = []

const addRoom = (room) =>{
    if(room){
        room = room.trim().toLowerCase()
        const isPresent = rooms.filter((item) => item === room )
        if(isPresent.length === 0){
            rooms.push(room)
        }
    }
}

const removeRoom = (room) =>{
    if(room){
        room = room.trim().toLowerCase()
        const index = rooms.findIndex((item) => item === room)

        if (index !== -1) {
            return rooms.splice(index, 1)[0]
        }
    }
}

const getRooms = () =>{
    const newRooms = rooms.map((item) => {
        return { room: item }
    })

    return newRooms
}

module.exports = {
    addRoom,
    removeRoom,
    getRooms,
}

addRoom("pubg")
addRoom("Pubg")
addRoom("cod")
addRoom("fortnite")
addRoom("Fortnite")
addRoom("COD")
// console.log(getRooms())
removeRoom("FORtnite")
// console.log(getRooms())
