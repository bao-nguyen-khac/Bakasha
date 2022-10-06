# BaKasha Shop
> Trang Ecommerce với M.E.R.N Stack và Redux. Repo bao gồm 2 phần chính là:
- **server** : chứa API cho shop, được tạo bằng Node.js, Express và MongoDB. Sử dụng RESTful API.
- **client** : trang web cho người dùng, được tạo bằng React, Redux và Bootstraps.


## Tính năng

- Đầy đủ tính năng cho giỏ hàng.
- Review sách và đánh giá.
- Sản phẩm nổi bật/đang sale.
- Phân trang.
- Hỗ trợ bộ lọc tìm kiếm.
- Cập nhật thông tin người dùng.
- Sử dụng paypal để thanh toán.
- Đánh dấu đơn hàng đã được thanh toán, đã chuyển phát.
- Tác giả.

## Cài đặt

- Giải nén source code .
- Thêm 4 file json trong thư mục data vào MongoDB của bạn.
- Vào file server/.env và config như sau:
  NODE_ENV = development
  PORT = 5000
  MONGO_URI = Your db
  JWT_SECRET = Your key
  PAYPAL_CLIENT_ID = Your id
- Run server bằng cách:
  cd serve
  npm start
- Run web bằng cách:
  cd client
  npm start

## Cấu trúc
    code
      │
      ├── server
      │   ├── uploads
      │   ├── src
      │   │   ├── config
      │   │   ├── controllers
      │   │   ├── middleware
      │   │   ├── models
      │   │   ├── routes
      │   │   ├── utils
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── actions
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── constants
      │   │   ├── hooks
      │   │   ├── reducers
      │   │   ├── routes
      │   │   ├── screens
      │   │   ├── App.js
      │   │   ├── store.js
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── .gitignore
      └── README.md