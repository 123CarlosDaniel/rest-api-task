import app from './app.js'
import './database.js'

app.listen(app.get('port'))
console.log(`Servidor corriendo en http://localhost:${app.get('port')}`)