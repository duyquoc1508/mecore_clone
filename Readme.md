# Document for mecore

## Database

- Database config in file <b>root/config/Mongooose.js</b>
- Create model in file <b>root/models/NameModel.js</b>
- Remember have field "connection" + "tableName"

## Controller

## Route

## Auth

- Declare in directory <b>root/hapi/auth</b> + require it in file <b>root/config/Hapi.js</b>

## mongo note

nếu findOne mà có nhiều thì sẽ return ra 1
thằng cũ nhất. và ở trên trong mongo compass
findOne nếu không có thì try/catch bắt không được
