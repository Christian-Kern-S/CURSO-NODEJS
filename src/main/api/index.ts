import { PersonController } from "../../application/controller/person.js";
import type { Speaker } from "../../application/controller/person.js";

class Server{
    init (speaker: Speaker){
        console.log(speaker.speak('Christian'))
        console.log(speaker.speak())
    }
}

const server = new Server()
server.init( new PersonController() )
