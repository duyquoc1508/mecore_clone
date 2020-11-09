# Document for mecore

## Database

- Database config in file <b>root/config/Mongooose.js</b>
- Create model in file <b>root/models/NameModel.js</b>
- Remember have field "connection" + "tableName"

## Controller

## Route

## Auth

- Declare in directory <b>root/hapi/auth</b> + require it in file <b>root/config/Hapi.js</b>

- field auth in route (_false_ to disable || or _name of auth_ defined in hapi.js)

- get data inside payload token

```
request.auth.credentials
```

## mongo note

nếu findOne mà có nhiều thì sẽ return ra 1
thằng cũ nhất. và ở trên trong mongo compass
findOne nếu không có thì try/catch bắt không được

- using {new: true} with operator findByIdAndUpdate to return data after update

## validate

- validate with Joi

* nếu cho phép nhiều giá trị giống như enum thì dùng

- alternative

```
const alt = Joi.alternatives().try(Joi.number(), Joi.string());
// Same as [Joi.number(), Joi.string()]
```

- cho phép validate với dữ liệu array

- allow validate base64

- Flow _joi_
  raw data ------------------------ joi(same middleware) -----------------------> result data

validate
enum => Joi.string().valid("type1", "type2")

- check exit

```
!doSchool || _.get("doSchool", id, "false") === false
```

// thống kê từ array sáng object thì dùng countBy
[1,2,3,4,1,1,2] --countBy-> {1: 3, 2: 2, 3: 1, 4: 1}
