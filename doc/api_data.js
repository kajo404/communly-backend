define({ "api": [
  {
    "type": "post",
    "url": "/",
    "title": "Create a new Announcement",
    "name": "CreateNewAnnouncement",
    "group": "Announcements",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>The author of the announcement.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the announcement.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The content of the announcement.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isVotable",
            "description": "<p>True if the announcement is votable.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "announcement",
            "description": "<p>The announcement object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"announcement\": \n      {\n            title: 'Hello World',\n            content: 'abcde',\n            author: 'Lara Marie Reimer',\n            creationDate: '19/05/2018',\n            isVotable: false,\n            upvotes: [],\n            downvotes: []\n        }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The request body must contain an author, a title and whether it is votable or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain an author and a title and whether it is votable or not.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/announcement-controller.js",
    "groupTitle": "Announcements"
  },
  {
    "type": "get",
    "url": "/announcements",
    "title": "Get all Announcements",
    "name": "GetAllAnnouncements",
    "group": "Announcements",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "announcements",
            "description": "<p>Array of announcement objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"announcements\": \n      [ \n          {\n            title: 'Hello World',\n            content: 'abcde',\n            author: 'Lara Marie Reimer',\n            creationDate: '19/05/2018',\n            isVotable: false,\n            upvotes: [],\n            downvotes: []\n        }\n      ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Generic error. Could not get announcements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get announcements.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/announcement-controller.js",
    "groupTitle": "Announcements"
  },
  {
    "type": "post",
    "url": "/tasklists/:id/members",
    "title": "Add new members to a task list.",
    "name": "AddMembersToTaskList",
    "group": "TaskList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "members",
            "description": "<p>Array of users to add to the task list.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n        \"members\": [\n          \"5afd440d8dfabd74b8297151\",\n          \"5afd440d8dfabd74b8297152\",\n          \"5b098c0e70d4c7235cf9a6a5\"\n        ],\n        \"_id\": \"5b098c0e70d4c7235cf9a6a6\",\n        \"author\": \"5afd440d8dfabd74b8297151\",\n        \"title\": \"test\",\n        \"creationDate\": \"2018-05-26T16:32:14.069Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "post",
    "url": "/tasklists/:id/tasks",
    "title": "Add an array of tasks to a task list. Updates if task already exists",
    "name": "AddTaskToTaskList",
    "group": "TaskList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Task[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Array of tasks</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "assignee",
            "description": "<p>id of the user assigned to the task.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"members\": [\n        {\n            \"_id\": \"5afd440d8dfabd74b8297151\",\n            \"name\": \"Jon Doe\"\n        }\n    ],\n    \"tasks\": [\n        {\n            \"_id\": \"5b0d4e66dd444525452990aa\",\n            \"name\": \"stuff to do\"\n        },\n        {\n            \"_id\": \"5b0d4e66dd444525452990ab\",\n            \"name\": \"special request for yasna\"\n        }\n    ],\n    \"_id\": \"5b098c0e70d4c7235cf9a6a6\",\n    \"author\": {\n        \"_id\": \"5afd440d8dfabd74b8297151\",\n        \"name\": \"Jon Doe\"\n    },\n    \"title\": \"test\",\n    \"creationDate\": \"2018-05-26T16:32:14.069Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "post",
    "url": "/tasklists",
    "title": "create a new TaskList",
    "name": "CreateNewTaskList",
    "group": "TaskList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the task list.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "members",
            "description": "<p>Users that can access this task list</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"taskList\": { title: 'some title', author: 'userID', ... }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The request body must contain an author and a title.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Could not create Task List. The request body must contain an author and a title\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "delete",
    "url": "/:id",
    "title": "Deletes a task list by id",
    "name": "DeleteById",
    "group": "TaskList",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>The deleted task list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n          \"n\": 1,\n          \"ok\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "get",
    "url": "/tasklists",
    "title": "Get all TaskLists",
    "name": "GetAllTaskLists",
    "group": "TaskList",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "taskLists",
            "description": "<p>Array of taskList objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"taskLists\": [ {\n                        members: [],\n                        _id: 5b057b36dc43694c58fffdef,\n                        title: 'Dinner Grocery List',\n                        creationDate: 2018-05-23T14:31:18.061Z }\n    ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Generic error. Could not get task lists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get task lists.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "get",
    "url": "/tasklists/:id",
    "title": "Get TaskList by ID",
    "name": "GetTaskListByID",
    "group": "TaskList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Tasklists unique id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"taskList\": {\n    \"members\": [],\n    \"tasks\": [],\n    \"_id\": \"5b0d09a50986de06c7f7293d\",\n    \"author\": {\n        \"_id\": \"5afd440d8dfabd74b8297151\",\n        \"name\": \"Jon Doe\"\n    },\n    \"title\": \"1234\",\n    \"creationDate\": \"2018-05-29T08:04:53.863Z\"\n}\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The request body must contain a tasklist id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a tasklist id\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/taskList.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "post",
    "url": "/tasks/:taskid/assign/:userid",
    "title": "Assign a member.",
    "name": "AssignMemberToTask",
    "group": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n        \"members\": [\n          \"5afd440d8dfabd74b8297151\",\n          \"5afd440d8dfabd74b8297152\",\n          \"5b098c0e70d4c7235cf9a6a5\"\n        ],\n        \"_id\": \"5b098c0e70d4c7235cf9a6a6\",\n        \"author\": \"5afd440d8dfabd74b8297151\",\n        \"title\": \"test\",\n        \"creationDate\": \"2018-05-26T16:32:14.069Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "delete",
    "url": "/tasks/:taskid",
    "title": "Deletes Task.",
    "name": "DeleteTask",
    "group": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "taskList",
            "description": "<p>the taskList object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"_id\": \"5b0d4dd54681bd24b629c017\",\n    \"name\": \"special request for yasna\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/tasks.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token for the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0N2YxMjM0ZDcyNGJjNGM5MGI0NCIsImlhdCI6MTUyNjU0NzU0MywiZXhwIjoxNTI2NjMzOTQzfQ.dKr6_xu8PMnBtd09Iu8Sp6dAQoYLW258AhJzbeHMx8M\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The request body must contain a password/email property.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a password property\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/auth/logout",
    "title": "Logout",
    "name": "LogoutUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "null",
            "optional": false,
            "field": "token",
            "description": "<p>Always returns null.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"token\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/auth/me",
    "title": "Me",
    "name": "MeUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer <token></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"5afc47f1234d724bc4c90b44\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Token is not viable.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 unauthorized\n{\n    \"error\": \"Unauthorized\",\n    \"message\": \"Failed to authenticate token.\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name the User would prefer to use</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "dateOfBirth",
            "description": "<p>Date of birth for the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "roles",
            "defaultValue": "user",
            "description": "<p>Array of Roles. Can be 'admin','user' or both</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token for the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0N2YxMjM0ZDcyNGJjNGM5MGI0NCIsImlhdCI6MTUyNjU0NzU0MywiZXhwIjoxNTI2NjMzOTQzfQ.dKr6_xu8PMnBtd09Iu8Sp6dAQoYLW258AhJzbeHMx8M\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The request body must contain a password/email/name property.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a password property\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "User"
  }
] });
