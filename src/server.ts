import { serverHttp } from "./http";
import "./websocket"

const PORT = 3500 || process.env.PORT

serverHttp.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
