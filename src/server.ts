import { config } from "./config"
import { app } from "./app"
const main =async()=>
{
  app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
}

main()