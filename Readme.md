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

- Query trong object nested

```
const cursor = db.collection('inventory').find({
  'size.uom': 'in'
});
```

- Thao tác vơi mảng (vallue of a field is array)
  \$elementMatch

- Query với điều kiện field: [{ query với giá trị trong này}]
- Use the Array Index to Query for a Field in the Embedded Document

```
const cursor = db.collection('inventory').find({
  'instock.0.qty': { $lte: 20 }
});
```

Kiểm tra sự tồn tại của 1 field trong collection
const cursor = db.collection('inventory').find({
item: { \$exists: false }
});

### Indexed

Không giống như những DB có cấu trúc, MongoDB là dữ liệu phi cấu trúc. Do vậy MongoDB đọc toàn bộ Data của từng Document ra để đọc kiểm tra (Đối với những DB có cấu trúc DB chỉ cần đọc những trường cần kiểm tra thôi còn những trường không cần thiết thì không cần).

Nếu có Index thì việc kiểm tra điều kiện Query và sắp xếp chỉ cần thực hiện trên dữ liệu Index chứ không cần thực hiện trên dữ liệu của cả Document (nếu dữ liệu Index lưu hoàn toàn trên RAM thì việc thực hiện Query, Sort sẽ rất nhanh. Nghĩa là Index đúng và không đúng có thể khiến cho thời gian xử lý chênh nhau đến cả ngàn lần.

Nhưng thực tế lại không đúng như vậy. MongoDB hầu như không kết hợp được 2 Index khác nhau trong 1 Query

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

## Lưu trữ dữ liệu phân cấp (hierarchical data structure)

Tham khảo: https://butchiso.com/2013/06/cau-truc-du-lieu-phan-cap-va-ung-dung.html

- 2 types (nested set model || parent child model)

#### nested-set models

- query nhanh
- thêm, xóa, sửa lâu

#### parent-child model (adjacency list model)

- phù hợp với dữ liệu hay thay đổi
  (dữ liệu chứ ID và parentID) => cải thiến thêm 1 field "path" lưu đường dẫn đến các node cha
