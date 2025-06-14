---
title: oj
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# oj

Base URLs: 127.0.0.1:8989

# Authentication

# 管理后台 - 题目

## POST 创建题目

POST /biz/question/create

创建题目

> Body 请求参数

```json
{
  "id": 1024,
  "title": "string",
  "content": "string",
  "answer": "string",
  "judgeCase": "string",
  "judgeConfig": "string",
  "tagIds": [
    0
  ],
  "difficulty": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[QuestionSaveReqVO](#schemaquestionsavereqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": 0,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultLong](#schemacommonresultlong)|

## PUT 更新题目

PUT /biz/question/update

更新题目

> Body 请求参数

```json
{
  "id": 1024,
  "title": "string",
  "content": "string",
  "answer": "string",
  "judgeCase": "string",
  "judgeConfig": "string",
  "tagIds": [
    0
  ],
  "difficulty": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[QuestionSaveReqVO](#schemaquestionsavereqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## DELETE 删除题目

DELETE /biz/question/delete

删除题目

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## DELETE 批量删除题目

DELETE /biz/question/delete-list

批量删除题目

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|array[integer]| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## GET 获得题目

GET /biz/question/get

获得题目

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "createTime": "",
    "title": "",
    "submitNum": 0,
    "acceptNum": 0,
    "thumbNum": 0,
    "favourNum": 0,
    "tags": [
      {
        "createTime": "",
        "updateTime": "",
        "creator": "",
        "updater": "",
        "deleted": false,
        "id": 0,
        "name": ""
      }
    ],
    "difficulty": "",
    "content": "",
    "answer": "",
    "judgeCase": "",
    "judgeConfig": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultQuestionRespVO](#schemacommonresultquestionrespvo)|

## GET 获得题目分页

GET /biz/question/page

获得题目分页

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNo|query|integer| 是 |页码，从 1 开始|
|pageSize|query|integer| 是 |每页条数，最大值为 100|
|title|query|string| 否 |标题|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 0,
        "createTime": "",
        "title": "",
        "submitNum": 0,
        "acceptNum": 0,
        "thumbNum": 0,
        "favourNum": 0,
        "tags": [
          {
            "createTime": "",
            "updateTime": "",
            "creator": "",
            "updater": "",
            "deleted": false,
            "id": 0,
            "name": ""
          }
        ],
        "difficulty": "",
        "content": "",
        "answer": "",
        "judgeCase": "",
        "judgeConfig": ""
      }
    ],
    "total": 0
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultPageResultQuestionRespVO](#schemacommonresultpageresultquestionrespvo)|

## GET 导出题目 Excel

GET /biz/question/export-excel

导出题目 Excel

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNo|query|integer| 是 |页码，从 1 开始|
|pageSize|query|integer| 是 |每页条数，最大值为 100|
|title|query|string| 否 |标题|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 管理后台 - 标签

## POST 创建标签

POST /biz/tag/create

创建标签

> Body 请求参数

```json
{
  "id": 8896,
  "name": "王五"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[TagSaveReqVO](#schematagsavereqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": 0,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultLong](#schemacommonresultlong)|

## PUT 更新标签

PUT /biz/tag/update

更新标签

> Body 请求参数

```json
{
  "id": 8896,
  "name": "王五"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[TagSaveReqVO](#schematagsavereqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## DELETE 删除标签

DELETE /biz/tag/delete

删除标签

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## DELETE 批量删除标签

DELETE /biz/tag/delete-list

批量删除标签

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|ids|query|array[integer]| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## GET 获得标签

GET /biz/tag/get

获得标签

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 是 |编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "createTime": "",
    "name": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultTagRespVO](#schemacommonresulttagrespvo)|

## GET 获得标签分页

GET /biz/tag/page

获得标签分页

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNo|query|integer| 是 |页码，从 1 开始|
|pageSize|query|integer| 是 |每页条数，最大值为 100|
|createTime|query|array[string]| 否 |创建时间|
|name|query|string| 否 |标签名|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 0,
        "createTime": "",
        "name": ""
      }
    ],
    "total": 0
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultPageResultTagRespVO](#schemacommonresultpageresulttagrespvo)|

## GET 导出标签 Excel

GET /biz/tag/export-excel

导出标签 Excel

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageNo|query|integer| 是 |页码，从 1 开始|
|pageSize|query|integer| 是 |每页条数，最大值为 100|
|createTime|query|array[string]| 否 |创建时间|
|name|query|string| 否 |标签名|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 根据问题id查询标签列表

GET /biz/tag/get-list-by-question-id

根据问题id查询标签列表
根据问题id查询标签列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|questionId|query|integer| 是 |问题id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": [
    {
      "id": 0,
      "createTime": "",
      "name": ""
    }
  ],
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultListTagRespVO](#schemacommonresultlisttagrespvo)|

## GET 获取全部标签列表

GET /biz/tag/get-list-all

获取全部标签列表
获取全部标签列表

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": [
    {
      "id": 0,
      "createTime": "",
      "name": ""
    }
  ],
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultListTagRespVO](#schemacommonresultlisttagrespvo)|

# 管理后台 - 认证

## POST 使用账号密码登录

POST /system/auth/login

使用账号密码登录

> Body 请求参数

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "username": "open-ojyuanma",
  "password": "buzhidao",
  "socialType": 10,
  "socialCode": "1024",
  "socialState": "9b2ffbc1-7425-4155-9894-9d5c08541d62"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthLoginReqVO](#schemaauthloginreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "userId": 0,
    "accessToken": "",
    "refreshToken": "",
    "expiresTime": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthLoginRespVO](#schemacommonresultauthloginrespvo)|

## POST 登出系统

POST /system/auth/logout

登出系统

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## POST 刷新令牌

POST /system/auth/refresh-token

刷新令牌

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|refreshToken|query|string| 是 |刷新令牌|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "userId": 0,
    "accessToken": "",
    "refreshToken": "",
    "expiresTime": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthLoginRespVO](#schemacommonresultauthloginrespvo)|

## GET 获取登录用户的权限信息

GET /system/auth/get-permission-info

获取登录用户的权限信息

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "user": {
      "id": 0,
      "nickname": "",
      "avatar": "",
      "deptId": 0,
      "username": "",
      "email": ""
    },
    "roles": [
      ""
    ],
    "permissions": [
      ""
    ],
    "menus": [
      {
        "id": 0,
        "parentId": 0,
        "name": "",
        "path": "",
        "component": "",
        "componentName": "",
        "icon": "",
        "visible": false,
        "keepAlive": false,
        "alwaysShow": false,
        "children": [
          {
            "id": 0,
            "parentId": 0,
            "name": "",
            "path": "",
            "component": "",
            "componentName": "",
            "icon": "",
            "visible": false,
            "keepAlive": false,
            "alwaysShow": false,
            "children": []
          }
        ]
      }
    ]
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthPermissionInfoRespVO](#schemacommonresultauthpermissioninforespvo)|

## POST 注册用户

POST /system/auth/register

注册用户

> Body 请求参数

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "username": "open-oj",
  "nickname": "芋艿",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthRegisterReqVO](#schemaauthregisterreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "userId": 0,
    "accessToken": "",
    "refreshToken": "",
    "expiresTime": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthLoginRespVO](#schemacommonresultauthloginrespvo)|

## POST 使用短信验证码登录

POST /system/auth/sms-login

使用短信验证码登录

> Body 请求参数

```json
{
  "mobile": "open-ojyuanma",
  "code": "1024"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthSmsLoginReqVO](#schemaauthsmsloginreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "userId": 0,
    "accessToken": "",
    "refreshToken": "",
    "expiresTime": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthLoginRespVO](#schemacommonresultauthloginrespvo)|

## POST 发送手机验证码

POST /system/auth/send-sms-code

发送手机验证码

> Body 请求参数

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "mobile": "open-ojyuanma",
  "scene": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthSmsSendReqVO](#schemaauthsmssendreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## POST 重置密码

POST /system/auth/reset-password

重置密码

> Body 请求参数

```json
{
  "password": "1234",
  "mobile": "13312341234",
  "code": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthResetPasswordReqVO](#schemaauthresetpasswordreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultBoolean](#schemacommonresultboolean)|

## GET 社交授权的跳转

GET /system/auth/social-auth-redirect

社交授权的跳转

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|integer| 是 |社交类型|
|redirectUri|query|string| 否 |回调路径|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": "",
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultString](#schemacommonresultstring)|

## POST 社交快捷登录，使用 code 授权码

POST /system/auth/social-login

社交快捷登录，使用 code 授权码
适合未登录的用户，但是社交账号已绑定用户

> Body 请求参数

```json
{
  "type": 10,
  "code": "1024",
  "state": "9b2ffbc1-7425-4155-9894-9d5c08541d62"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AuthSocialLoginReqVO](#schemaauthsocialloginreqvo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "userId": 0,
    "accessToken": "",
    "refreshToken": "",
    "expiresTime": ""
  },
  "msg": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[CommonResultAuthLoginRespVO](#schemacommonresultauthloginrespvo)|

# 数据模型

<h2 id="tocS_CommonResultLong">CommonResultLong</h2>

<a id="schemacommonresultlong"></a>
<a id="schema_CommonResultLong"></a>
<a id="tocScommonresultlong"></a>
<a id="tocscommonresultlong"></a>

```json
{
  "code": 0,
  "data": 0,
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|integer(int64)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_AuthLoginRespVO">AuthLoginRespVO</h2>

<a id="schemaauthloginrespvo"></a>
<a id="schema_AuthLoginRespVO"></a>
<a id="tocSauthloginrespvo"></a>
<a id="tocsauthloginrespvo"></a>

```json
{
  "userId": 1024,
  "accessToken": "happy",
  "refreshToken": "nice",
  "expiresTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userId|integer(int64)|false|none||用户编号|
|accessToken|string|false|none||访问令牌|
|refreshToken|string|false|none||刷新令牌|
|expiresTime|string|false|none||过期时间|

<h2 id="tocS_QuestionSaveReqVO">QuestionSaveReqVO</h2>

<a id="schemaquestionsavereqvo"></a>
<a id="schema_QuestionSaveReqVO"></a>
<a id="tocSquestionsavereqvo"></a>
<a id="tocsquestionsavereqvo"></a>

```json
{
  "id": 1024,
  "title": "string",
  "content": "string",
  "answer": "string",
  "judgeCase": "string",
  "judgeConfig": "string",
  "tagIds": [
    0
  ],
  "difficulty": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||编号|
|title|string|true|none||标题|
|content|string|true|none||内容|
|answer|string|true|none||答案|
|judgeCase|string|false|none||判题用例(json数组)|
|judgeConfig|string|false|none||判题配置(json对象)|
|tagIds|[integer]|false|none||标签列表|
|difficulty|string|true|none||none|

<h2 id="tocS_TagSaveReqVO">TagSaveReqVO</h2>

<a id="schematagsavereqvo"></a>
<a id="schema_TagSaveReqVO"></a>
<a id="tocStagsavereqvo"></a>
<a id="tocstagsavereqvo"></a>

```json
{
  "id": 8896,
  "name": "王五"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||编号|
|name|string|true|none||标签名|

<h2 id="tocS_CommonResultAuthLoginRespVO">CommonResultAuthLoginRespVO</h2>

<a id="schemacommonresultauthloginrespvo"></a>
<a id="schema_CommonResultAuthLoginRespVO"></a>
<a id="tocScommonresultauthloginrespvo"></a>
<a id="tocscommonresultauthloginrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "userId": 1024,
    "accessToken": "happy",
    "refreshToken": "nice",
    "expiresTime": "string"
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[AuthLoginRespVO](#schemaauthloginrespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_CommonResultBoolean">CommonResultBoolean</h2>

<a id="schemacommonresultboolean"></a>
<a id="schema_CommonResultBoolean"></a>
<a id="tocScommonresultboolean"></a>
<a id="tocscommonresultboolean"></a>

```json
{
  "code": 0,
  "data": true,
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|boolean|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_AuthLoginReqVO">AuthLoginReqVO</h2>

<a id="schemaauthloginreqvo"></a>
<a id="schema_AuthLoginReqVO"></a>
<a id="tocSauthloginreqvo"></a>
<a id="tocsauthloginreqvo"></a>

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "username": "open-ojyuanma",
  "password": "buzhidao",
  "socialType": 10,
  "socialCode": "1024",
  "socialState": "9b2ffbc1-7425-4155-9894-9d5c08541d62"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|captchaVerification|string|false|none||========== 图片验证码相关 ==========<br />验证码，验证码开启时，需要传递|
|username|string|true|none||账号|
|password|string|true|none||密码|
|socialType|integer|false|none||社交平台的类型，参见 SocialTypeEnum 枚举值|
|socialCode|string|false|none||授权码|
|socialState|string|false|none||state|

<h2 id="tocS_TagDO">TagDO</h2>

<a id="schematagdo"></a>
<a id="schema_TagDO"></a>
<a id="tocStagdo"></a>
<a id="tocstagdo"></a>

```json
{
  "createTime": "string",
  "updateTime": "string",
  "creator": "string",
  "updater": "string",
  "deleted": true,
  "id": 0,
  "name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|createTime|string|false|none||创建时间|
|updateTime|string|false|none||最后更新时间|
|creator|string|false|none||创建者，目前使用 SysUser 的 id 编号<br /><br />使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。|
|updater|string|false|none||更新者，目前使用 SysUser 的 id 编号<br /><br />使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。|
|deleted|boolean|false|none||是否删除|
|id|integer(int64)|false|none||编号|
|name|string|false|none||标签名|

<h2 id="tocS_TagRespVO">TagRespVO</h2>

<a id="schematagrespvo"></a>
<a id="schema_TagRespVO"></a>
<a id="tocStagrespvo"></a>
<a id="tocstagrespvo"></a>

```json
{
  "id": 8896,
  "createTime": "string",
  "name": "王五"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||编号|
|createTime|string|false|none||创建时间|
|name|string|false|none||标签名|

<h2 id="tocS_QuestionRespVO">QuestionRespVO</h2>

<a id="schemaquestionrespvo"></a>
<a id="schema_QuestionRespVO"></a>
<a id="tocSquestionrespvo"></a>
<a id="tocsquestionrespvo"></a>

```json
{
  "id": 1024,
  "createTime": "string",
  "title": "string",
  "submitNum": 0,
  "acceptNum": 0,
  "thumbNum": 0,
  "favourNum": 0,
  "tags": [
    {
      "createTime": "string",
      "updateTime": "string",
      "creator": "string",
      "updater": "string",
      "deleted": true,
      "id": 0,
      "name": "string"
    }
  ],
  "difficulty": "string",
  "content": "string",
  "answer": "string",
  "judgeCase": "string",
  "judgeConfig": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||编号|
|createTime|string|false|none||创建时间|
|title|string|false|none||标题|
|submitNum|integer|false|none||题目提交数|
|acceptNum|integer|false|none||题目通过数|
|thumbNum|integer|false|none||点赞数|
|favourNum|integer|false|none||收藏数|
|tags|[[TagDO](#schematagdo)]|false|none||标签列表|
|difficulty|string|false|none||题目难度|
|content|string|false|none||内容|
|answer|string|false|none||答案|
|judgeCase|string|false|none||判题用例|
|judgeConfig|string|false|none||判题配置|

<h2 id="tocS_CommonResultTagRespVO">CommonResultTagRespVO</h2>

<a id="schemacommonresulttagrespvo"></a>
<a id="schema_CommonResultTagRespVO"></a>
<a id="tocScommonresulttagrespvo"></a>
<a id="tocscommonresulttagrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "id": 8896,
    "createTime": "string",
    "name": "王五"
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[TagRespVO](#schematagrespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_UserVO">UserVO</h2>

<a id="schemauservo"></a>
<a id="schema_UserVO"></a>
<a id="tocSuservo"></a>
<a id="tocsuservo"></a>

```json
{
  "id": 1024,
  "nickname": "芋道源码",
  "avatar": "https://www.iocoder.cn/xx.jpg",
  "deptId": 2048,
  "username": "open-oj",
  "email": "open-oj@iocoder.cn"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||用户编号|
|nickname|string|false|none||用户昵称|
|avatar|string|false|none||用户头像|
|deptId|integer(int64)|false|none||部门编号|
|username|string|false|none||用户账号|
|email|string|false|none||用户邮箱|

<h2 id="tocS_CommonResultQuestionRespVO">CommonResultQuestionRespVO</h2>

<a id="schemacommonresultquestionrespvo"></a>
<a id="schema_CommonResultQuestionRespVO"></a>
<a id="tocScommonresultquestionrespvo"></a>
<a id="tocscommonresultquestionrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "id": 1024,
    "createTime": "string",
    "title": "string",
    "submitNum": 0,
    "acceptNum": 0,
    "thumbNum": 0,
    "favourNum": 0,
    "tags": [
      {
        "createTime": "string",
        "updateTime": "string",
        "creator": "string",
        "updater": "string",
        "deleted": true,
        "id": 0,
        "name": "string"
      }
    ],
    "difficulty": "string",
    "content": "string",
    "answer": "string",
    "judgeCase": "string",
    "judgeConfig": "string"
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[QuestionRespVO](#schemaquestionrespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_PageResultTagRespVO">PageResultTagRespVO</h2>

<a id="schemapageresulttagrespvo"></a>
<a id="schema_PageResultTagRespVO"></a>
<a id="tocSpageresulttagrespvo"></a>
<a id="tocspageresulttagrespvo"></a>

```json
{
  "list": [
    {
      "id": 8896,
      "createTime": "string",
      "name": "王五"
    }
  ],
  "total": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[TagRespVO](#schematagrespvo)]|false|none||数据|
|total|integer(int64)|false|none||总量|

<h2 id="tocS_MenuVO">MenuVO</h2>

<a id="schemamenuvo"></a>
<a id="schema_MenuVO"></a>
<a id="tocSmenuvo"></a>
<a id="tocsmenuvo"></a>

```json
{
  "id": null,
  "parentId": 1024,
  "name": "芋道",
  "path": "post",
  "component": "system/post/index",
  "componentName": "SystemUser",
  "icon": "/menu/list",
  "visible": false,
  "keepAlive": false,
  "alwaysShow": false,
  "children": [
    {
      "id": null,
      "parentId": 1024,
      "name": "芋道",
      "path": "post",
      "component": "system/post/index",
      "componentName": "SystemUser",
      "icon": "/menu/list",
      "visible": false,
      "keepAlive": false,
      "alwaysShow": false,
      "children": [
        {
          "id": null,
          "parentId": 1024,
          "name": "芋道",
          "path": "post",
          "component": "system/post/index",
          "componentName": "SystemUser",
          "icon": "/menu/list",
          "visible": false,
          "keepAlive": false,
          "alwaysShow": false,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||菜单名称|
|parentId|integer(int64)|false|none||父菜单 ID|
|name|string|false|none||菜单名称|
|path|string|false|none||路由地址,仅菜单类型为菜单或者目录时，才需要传|
|component|string|false|none||组件路径,仅菜单类型为菜单时，才需要传|
|componentName|string|false|none||组件名|
|icon|string|false|none||菜单图标,仅菜单类型为菜单或者目录时，才需要传|
|visible|boolean|false|none||是否可见|
|keepAlive|boolean|false|none||是否缓存|
|alwaysShow|boolean|false|none||是否总是显示|
|children|[[MenuVO](#schemamenuvo)]|false|none||子路由|

<h2 id="tocS_PageResultQuestionRespVO">PageResultQuestionRespVO</h2>

<a id="schemapageresultquestionrespvo"></a>
<a id="schema_PageResultQuestionRespVO"></a>
<a id="tocSpageresultquestionrespvo"></a>
<a id="tocspageresultquestionrespvo"></a>

```json
{
  "list": [
    {
      "id": 1024,
      "createTime": "string",
      "title": "string",
      "submitNum": 0,
      "acceptNum": 0,
      "thumbNum": 0,
      "favourNum": 0,
      "tags": [
        {
          "createTime": "string",
          "updateTime": "string",
          "creator": "string",
          "updater": "string",
          "deleted": true,
          "id": 0,
          "name": "string"
        }
      ],
      "difficulty": "string",
      "content": "string",
      "answer": "string",
      "judgeCase": "string",
      "judgeConfig": "string"
    }
  ],
  "total": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[QuestionRespVO](#schemaquestionrespvo)]|false|none||数据|
|total|integer(int64)|false|none||总量|

<h2 id="tocS_CommonResultPageResultTagRespVO">CommonResultPageResultTagRespVO</h2>

<a id="schemacommonresultpageresulttagrespvo"></a>
<a id="schema_CommonResultPageResultTagRespVO"></a>
<a id="tocScommonresultpageresulttagrespvo"></a>
<a id="tocscommonresultpageresulttagrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 8896,
        "createTime": "string",
        "name": "王五"
      }
    ],
    "total": 0
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[PageResultTagRespVO](#schemapageresulttagrespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_AuthPermissionInfoRespVO">AuthPermissionInfoRespVO</h2>

<a id="schemaauthpermissioninforespvo"></a>
<a id="schema_AuthPermissionInfoRespVO"></a>
<a id="tocSauthpermissioninforespvo"></a>
<a id="tocsauthpermissioninforespvo"></a>

```json
{
  "user": {
    "id": 1024,
    "nickname": "芋道源码",
    "avatar": "https://www.iocoder.cn/xx.jpg",
    "deptId": 2048,
    "username": "open-oj",
    "email": "open-oj@iocoder.cn"
  },
  "roles": [
    "string"
  ],
  "permissions": [
    "string"
  ],
  "menus": [
    {
      "id": null,
      "parentId": 1024,
      "name": "芋道",
      "path": "post",
      "component": "system/post/index",
      "componentName": "SystemUser",
      "icon": "/menu/list",
      "visible": false,
      "keepAlive": false,
      "alwaysShow": false,
      "children": [
        {
          "id": null,
          "parentId": 1024,
          "name": "芋道",
          "path": "post",
          "component": "system/post/index",
          "componentName": "SystemUser",
          "icon": "/menu/list",
          "visible": false,
          "keepAlive": false,
          "alwaysShow": false,
          "children": [
            {}
          ]
        }
      ]
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|user|[UserVO](#schemauservo)|false|none||用户信息|
|roles|[string]|false|none||角色标识数组|
|permissions|[string]|false|none||操作权限数组|
|menus|[[MenuVO](#schemamenuvo)]|false|none||菜单树|

<h2 id="tocS_CommonResultPageResultQuestionRespVO">CommonResultPageResultQuestionRespVO</h2>

<a id="schemacommonresultpageresultquestionrespvo"></a>
<a id="schema_CommonResultPageResultQuestionRespVO"></a>
<a id="tocScommonresultpageresultquestionrespvo"></a>
<a id="tocscommonresultpageresultquestionrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1024,
        "createTime": "string",
        "title": "string",
        "submitNum": 0,
        "acceptNum": 0,
        "thumbNum": 0,
        "favourNum": 0,
        "tags": [
          {
            "createTime": null,
            "updateTime": null,
            "creator": null,
            "updater": null,
            "deleted": null,
            "id": null,
            "name": null
          }
        ],
        "difficulty": "string",
        "content": "string",
        "answer": "string",
        "judgeCase": "string",
        "judgeConfig": "string"
      }
    ],
    "total": 0
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[PageResultQuestionRespVO](#schemapageresultquestionrespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_CommonResultListTagRespVO">CommonResultListTagRespVO</h2>

<a id="schemacommonresultlisttagrespvo"></a>
<a id="schema_CommonResultListTagRespVO"></a>
<a id="tocScommonresultlisttagrespvo"></a>
<a id="tocscommonresultlisttagrespvo"></a>

```json
{
  "code": 0,
  "data": [
    {
      "id": 8896,
      "createTime": "string",
      "name": "王五"
    }
  ],
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[[TagRespVO](#schematagrespvo)]|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_CommonResultAuthPermissionInfoRespVO">CommonResultAuthPermissionInfoRespVO</h2>

<a id="schemacommonresultauthpermissioninforespvo"></a>
<a id="schema_CommonResultAuthPermissionInfoRespVO"></a>
<a id="tocScommonresultauthpermissioninforespvo"></a>
<a id="tocscommonresultauthpermissioninforespvo"></a>

```json
{
  "code": 0,
  "data": {
    "user": {
      "id": 1024,
      "nickname": "芋道源码",
      "avatar": "https://www.iocoder.cn/xx.jpg",
      "deptId": 2048,
      "username": "open-oj",
      "email": "open-oj@iocoder.cn"
    },
    "roles": [
      "string"
    ],
    "permissions": [
      "string"
    ],
    "menus": [
      {
        "id": null,
        "parentId": 1024,
        "name": "芋道",
        "path": "post",
        "component": "system/post/index",
        "componentName": "SystemUser",
        "icon": "/menu/list",
        "visible": false,
        "keepAlive": false,
        "alwaysShow": false,
        "children": [
          {
            "id": null,
            "parentId": null,
            "name": null,
            "path": null,
            "component": null,
            "componentName": null,
            "icon": null,
            "visible": null,
            "keepAlive": null,
            "alwaysShow": null,
            "children": null
          }
        ]
      }
    ]
  },
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|[AuthPermissionInfoRespVO](#schemaauthpermissioninforespvo)|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_AuthRegisterReqVO">AuthRegisterReqVO</h2>

<a id="schemaauthregisterreqvo"></a>
<a id="schema_AuthRegisterReqVO"></a>
<a id="tocSauthregisterreqvo"></a>
<a id="tocsauthregisterreqvo"></a>

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "username": "open-oj",
  "nickname": "芋艿",
  "password": "123456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|captchaVerification|string|false|none||========== 图片验证码相关 ==========<br />验证码，验证码开启时，需要传递|
|username|string|true|none||用户账号|
|nickname|string|true|none||用户昵称|
|password|string|true|none||密码|

<h2 id="tocS_AuthSmsLoginReqVO">AuthSmsLoginReqVO</h2>

<a id="schemaauthsmsloginreqvo"></a>
<a id="schema_AuthSmsLoginReqVO"></a>
<a id="tocSauthsmsloginreqvo"></a>
<a id="tocsauthsmsloginreqvo"></a>

```json
{
  "mobile": "open-ojyuanma",
  "code": "1024"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|mobile|string|true|none||手机号|
|code|string|true|none||短信验证码|

<h2 id="tocS_AuthSmsSendReqVO">AuthSmsSendReqVO</h2>

<a id="schemaauthsmssendreqvo"></a>
<a id="schema_AuthSmsSendReqVO"></a>
<a id="tocSauthsmssendreqvo"></a>
<a id="tocsauthsmssendreqvo"></a>

```json
{
  "captchaVerification": "PfcH6mgr8tpXuMWFjvW6YVaqrswIuwmWI5dsVZSg7sGpWtDCUbHuDEXl3cFB1+VvCC/rAkSwK8Fad52FSuncVg==",
  "mobile": "open-ojyuanma",
  "scene": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|captchaVerification|string|false|none||========== 图片验证码相关 ==========<br />验证码，验证码开启时，需要传递|
|mobile|string|true|none||手机号|
|scene|integer|true|none||短信场景|

<h2 id="tocS_AuthResetPasswordReqVO">AuthResetPasswordReqVO</h2>

<a id="schemaauthresetpasswordreqvo"></a>
<a id="schema_AuthResetPasswordReqVO"></a>
<a id="tocSauthresetpasswordreqvo"></a>
<a id="tocsauthresetpasswordreqvo"></a>

```json
{
  "password": "1234",
  "mobile": "13312341234",
  "code": "123456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|password|string|true|none||密码|
|mobile|string|true|none||手机号|
|code|string|true|none||手机短信验证码|

<h2 id="tocS_CommonResultString">CommonResultString</h2>

<a id="schemacommonresultstring"></a>
<a id="schema_CommonResultString"></a>
<a id="tocScommonresultstring"></a>
<a id="tocscommonresultstring"></a>

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||错误码|
|data|string|false|none||返回数据|
|msg|string|false|none||错误提示，用户可阅读|

<h2 id="tocS_AuthSocialLoginReqVO">AuthSocialLoginReqVO</h2>

<a id="schemaauthsocialloginreqvo"></a>
<a id="schema_AuthSocialLoginReqVO"></a>
<a id="tocSauthsocialloginreqvo"></a>
<a id="tocsauthsocialloginreqvo"></a>

```json
{
  "type": 10,
  "code": "1024",
  "state": "9b2ffbc1-7425-4155-9894-9d5c08541d62"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|type|integer|true|none||社交平台的类型，参见 UserSocialTypeEnum 枚举值|
|code|string|true|none||授权码|
|state|string|true|none||state|

