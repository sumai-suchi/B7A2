import { config } from "./config"
import { app } from "./app"
import { sendResponse } from "./utils/sendResponse"
const main =async()=>
{
  app.listen(config.port, () => {
   
  console.log(`Example app listening on port ${config.port}`)
})
}

main()