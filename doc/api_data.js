define({ "api": [
  {
    "type": "get",
    "url": "/amount/announcement",
    "title": "Total amount of announcements",
    "name": "GetAnnouncementAmount",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "announcementAmount",
            "description": "<p>count of announcements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"announcementAmount\": 100\n   }",
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
            "description": "<p>Generic error. Could not get number of announcements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get number of announcements.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/amount/task",
    "title": "Total amount of tasks",
    "name": "GetTaskAmount",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "taskAmount",
            "description": "<p>count of tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "doneTaskAmount",
            "description": "<p>count of completed tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "openTaskAmount",
            "description": "<p>count of open tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"taskAmount\": 200,\n      \"doneTaskAmount\": 100,\n      \"openTaskAmount\": 100\n   }",
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
            "description": "<p>Generic error. Could not get number of tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get number of tasks.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/amount/tasklist",
    "title": "Total amount of Task Lists",
    "name": "GetTasklistAmount",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "tasklistAmount",
            "description": "<p>count of tasklists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"tasklistAmount\": 100\n   }",
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
            "description": "<p>Generic error. Could not get number of tasklists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get number of tasklists.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/amount/user",
    "title": "Total User Count",
    "name": "GetUserAmount",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "userAmount",
            "description": "<p>count of users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"userAmount\": 100\n   }",
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
            "description": "<p>Generic error. Could not get number of users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get number of users.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/announcement",
    "title": "Announcement User Statistics",
    "name": "GetUserStatsAnnouncements",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxUserAnnouncements",
            "description": "<p>count of announcements.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgUserAnnouncements",
            "description": "<p>count of announcements.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minUserAnnouncements",
            "description": "<p>count of announcements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxUserAnnouncements\": 10,\n      \"avgUserAnnouncements\": 2.33,\n      \"minUserAnnouncements\": 4\n   }",
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
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/doneTask",
    "title": "Done Tasks User Statistics",
    "name": "GetUserStatsDoneTasks",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxAssignedDoneTasks",
            "description": "<p>count of assigned done tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgAssignedDoneTasks",
            "description": "<p>count of assigned done tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minAssignedDoneTasks",
            "description": "<p>count of assigned done tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxAssignedDoneTasks\": 10,\n      \"avgAssignedDoneTasks\": 2.33,\n      \"minAssignedDoneTasks\": 4\n   }",
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
            "description": "<p>Generic error. Could not get done tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get done tasks.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/openTask",
    "title": "Open Tasks User Statistics",
    "name": "GetUserStatsOpenTasks",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxAssignedOpenTasks",
            "description": "<p>count of assigned open tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgAssignedOpenTasks",
            "description": "<p>count of assigned open tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minAssignedOpenTasks",
            "description": "<p>count of assigned open tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxAssignedOpenTasks\": 10,\n      \"avgAssignedOpenTasks\": 2.33,\n      \"minAssignedOpenTasks\": 4\n   }",
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
            "description": "<p>Generic error. Could not get done tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get done tasks.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/tasklistMembers",
    "title": "Task Lists Member Statistics",
    "name": "GetUserStatsTasklistMembers",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxMembersTasklists",
            "description": "<p>count of tasklistmembers.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgMembersTasklists",
            "description": "<p>count of tasklistmembers.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minMembersTasklists",
            "description": "<p>count of tasklistmembers.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxMembersTasklists\": 10,\n      \"avgMembersTasklists\": 2.33,\n      \"minMembersTasklists\": 4\n   }",
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
            "description": "<p>Generic error. Could not get tasklists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get tasklist members.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/tasklist",
    "title": "Task List User Statistics",
    "name": "GetUserStatsTasklists",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxUserTasklists",
            "description": "<p>count of tasklists.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgUserTasklists",
            "description": "<p>count of tasklists.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minUserTasklists",
            "description": "<p>count of tasklists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxUserTasklists\": 10,\n      \"avgUserTasklists\": 2.33,\n      \"minUserTasklists\": 4\n   }",
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
            "description": "<p>Generic error. Could not get tasklists.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get tasklists.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/stats/task",
    "title": "Task User Statistics",
    "name": "GetUserStatsTasks",
    "group": "Admin",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "maxAssignedTasks",
            "description": "<p>count of assigned tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "avgAssignedTasks",
            "description": "<p>count of assigned tasks.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "minAssignedTasks",
            "description": "<p>count of assigned tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"maxAssignedTasks\": 10,\n      \"avgAssignedTasks\": 2.33,\n      \"minAssignedTasks\": 4\n   }",
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
            "description": "<p>Generic error. Could not get tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get tasks.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
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
          "content": "HTTP/1.1 200 OK\n{\n      \"announcement\": \n      {\n            title: 'Hello World',\n            content: 'abcde',\n            author: 'Lara Marie Reimer',\n            creationDate: '19/05/2018',\n            isVotable: false,\n            votes: []\n        }\n   }",
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
    "type": "delete",
    "url": "/:announcementid",
    "title": "Delete an announcement",
    "name": "DeleteAnnouncement",
    "group": "Announcements",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
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
            "description": "<p>You must be admin or author of this announcement to delete.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"You must be admin or author of this announcement to delete.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/announcement-controller.js",
    "groupTitle": "Announcements"
  },
  {
    "type": "delete",
    "url": "/:announcementid/votes",
    "title": "Delete vote on announcement",
    "name": "DeleteAnnouncementVotes",
    "group": "Announcements",
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
          "content": "HTTP/1.1 200 OK\n\"announcement\": \n      { creationDate: 2018-05-23T16:44:15.190Z,\n        isVotable: true,\n        _id: 5b059a5fa1c1b2024bc547e2,\n        votes: [],\n        author: 5b048af5ccb271001bdfbd03,\n        title: 'Hello!',\n        content: 'This is another announcement' \n      }",
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
            "description": "<p>The request body must contain a user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a user.\"\n   }",
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
          "content": "HTTP/1.1 200 OK\n{\n      \"announcements\": \n      [ \n          {\n            title: 'Hello World',\n            content: 'abcde',\n            author: 'Lara Marie Reimer',\n            creationDate: '19/05/2018',\n            isVotable: false,\n            votes: []\n        }\n      ]\n   }",
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
    "type": "get",
    "url": "/annoncements",
    "title": "Get all Announcements for user",
    "name": "GetAnnoncements",
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
          "content": "HTTP/1.1 200 OK\n{\n      \"announcements\":\n      [\n          {\n            title: 'Hello World',\n            content: 'abcde',\n            author: 'Lara Marie Reimer',\n            creationDate: '19/05/2018',\n            isVotable: false,\n            upvotes: [],\n            downvotes: []\n        }\n      ]\n   }",
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
    "filename": "src/controllers/user.js",
    "groupTitle": "Announcements"
  },
  {
    "type": "post",
    "url": "/:announcementid/downvotes",
    "title": "Downvote on announcement",
    "name": "UpdateAnnouncementDownvotes",
    "group": "Announcements",
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
          "content": "HTTP/1.1 200 OK\n{\n      \"announcement\": \n      { creationDate: 2018-05-23T16:44:15.190Z,\n        isVotable: true,\n        _id: 5b059a5fa1c1b2024bc547e2,\n        votes:\n          { vote: 'down',\n            _id: 5b265d8d481aac011fe1b8a0,\n            user: 5b05a4418db29402fdeb3eda \n          },\n        author: 5b048af5ccb271001bdfbd03,\n        title: 'Hello!',\n        content: 'This is another announcement' \n      }\n   }",
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
            "description": "<p>The request body must contain a user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a user.\"\n   }",
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
    "url": "/:announcementid/upvotes",
    "title": "Upvote on announcement",
    "name": "UpdateAnnouncementUpvotes",
    "group": "Announcements",
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
          "content": "HTTP/1.1 200 OK\n\"announcement\": \n      { creationDate: 2018-05-23T16:44:15.190Z,\n        isVotable: true,\n        _id: 5b059a5fa1c1b2024bc547e2,\n        votes:\n          { vote: [Array],\n            _id: 5b265d8d481aac011fe1b8a0,\n            user: 5b05a4418db29402fdeb3eda \n          },\n        author: 5b048af5ccb271001bdfbd03,\n        title: 'Hello!',\n        content: 'This is another announcement' \n      }",
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
            "description": "<p>The request body must contain a user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a user.\"\n   }",
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
    "title": "Add members to a task list.",
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
    "title": "Add an array of tasks to a task list.",
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
          "content": "    HTTP/1.1 200 OK\n    {\n    \"members\": [\n        {\n            \"_id\": \"5afd440d8dfabd74b8297151\",\n            \"firstname\": \"Jon\",\n            \"lastname\": Doe\n        }\n    ],\n    \"task\":\n        {\n            \"_id\": \"5b0d4e66dd444525452990aa\",\n            \"name\": \"stuff to do\"\n        },\n        {\n            \"_id\": \"5b0d4e66dd444525452990ab\",\n            \"name\": \"special request for yasna\"\n        }\n    ],\n    \"_id\": \"5b098c0e70d4c7235cf9a6a6\",\n    \"author\": {\n        \"_id\": \"5afd440d8dfabd74b8297151\",\n        \"firstname\": \"Jon\",\n        \"lastname\": \"Doe\"\n    },\n    \"title\": \"test\",\n    \"creationDate\": \"2018-05-26T16:32:14.069Z\"\n}",
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
    "title": "Create a new TaskList",
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
    "url": "/tasklists/:id",
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
    "title": "All TaskLists",
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
    "url": "/tasklists/author",
    "title": "Get TaskLists for user as author",
    "name": "GetTasklistsAsAuthor",
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
    "filename": "src/controllers/user.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "get",
    "url": "/tasklists/member",
    "title": "Get TaskLists for user as memeber",
    "name": "GetTasklistsAsMemeber",
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
    "filename": "src/controllers/user.js",
    "groupTitle": "TaskList"
  },
  {
    "type": "get",
    "url": "tasklists/:id/tasks",
    "title": "Tasks of a TaskBoard by ID",
    "name": "GetTasksByTaskListID",
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
          "content": "HTTP/1.1 200 OK\n{ tasks: [\n   { isDone: false, _id: 5b1a4009322e5a4e00a38122, name: 'dsfdsf' }\n ],\n    _id: 5b1a3ffd322e5a4e00a3811f\n  }",
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
    "type": "get",
    "url": "/tasklists/:id",
    "title": "TaskList by ID",
    "name": "TaskListByID",
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
          "content": "HTTP/1.1 200 OK\n{\n      \"taskList\": {\n    \"members\": [],\n    \"tasks\": [],\n    \"_id\": \"5b0d09a50986de06c7f7293d\",\n    \"author\": {\n        \"_id\": \"5afd440d8dfabd74b8297151\",\n        \"firstname\": \"Jon\",\n        \"lastname\": \"Doe\"\n    },\n    \"title\": \"1234\",\n    \"creationDate\": \"2018-05-29T08:04:53.863Z\"\n}\n   }",
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
    "type": "put",
    "url": "/tasklists/:id/title",
    "title": "update a board title",
    "name": "UpdateTaskBoardTitle",
    "group": "TaskList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The new title of the task list.</p>"
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
          "content": "HTTP/1.1 200 OK\n{ members: [ 5b0ad5cfbe7b708aed9e4200, 5b0c0bc6cc1bf2d03597743d ],\n      tasks:\n      [ 5b181d8bba5358d762dec997,\n        5b181d93ba5358d762dec998,\n        5b181d95ba5358d762dec999 ],\n      _id: 5b1819663965d9d38d6336f3,\n      author: 5b0ad5cfbe7b708aed9e4200,\n      title: 'New title',\n      creationDate: 2018-06-06T17:27:02.067Z }",
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
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Could not update Task List Title. The request body must contain the new title\"\n   }",
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
    "url": "/tasks",
    "title": "for user",
    "name": "getAsignedTasks",
    "group": "Task",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tasks",
            "description": "<p>Array of Task objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"tasks\": [{ _id: 5b05a7dedc43694c58fffe01,\n                    name: 'dsfs',\n                    taskList: 5b05a7cedc43694c58fffdfa }]\n   }",
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
            "description": "<p>Generic error. Could not get tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get tasks.\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/user.js",
    "groupTitle": "Task"
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
    "type": "get",
    "url": "/tasks/byId/:id",
    "title": "Get all tasks of a TaskBoard",
    "name": "GetAllTasks",
    "group": "Tasks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "tasks",
            "description": "<p>Array of Task objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"tasks\": [{ _id: 5b05a7dedc43694c58fffe01,\n                    name: 'dsfs',\n                    taskList: 5b05a7cedc43694c58fffdfa }]\n   }",
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
            "description": "<p>Generic error. Could not get tasks.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"Generic error. Could not get tasks.\"\n   }",
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
            "field": "firstname",
            "description": "<p>First Name the User would prefer to use</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name the User would prefer to use</p>"
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
  },
  {
    "type": "put",
    "url": "/picture",
    "title": "update profile image",
    "name": "change_user_picture",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image.",
            "description": ""
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
            "field": "BadRequest",
            "description": "<p>The request body must contain a imageData property.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a imageData property\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/data",
    "title": "update firstname lastname email dateOfBirth",
    "name": "update_user_data",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateOfBirth",
            "description": ""
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
            "field": "BadRequest",
            "description": "<p>The request body must contain a name/emial/dateOfBirth property.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n      \"error\": \"Bad Request\",\n      \"message\": \"The request body must contain a firstname property\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/password",
    "title": "password",
    "name": "update_user_password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password.",
            "description": ""
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
          },
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
            "field": "BadRequest",
            "description": "<p>The request body must contain a password property.</p>"
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
    "filename": "src/controllers/user.js",
    "groupTitle": "User"
  }
] });
