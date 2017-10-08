module.exports = {
  dav:{
    name: "",
    email: "",
    password: ""
  },
  session: {
    secret: ""
  },
  mongo:{
    url: "mongodb://mongo:27017"
  },
  accountType:{
    vehicle:"vehicle",
    station:"staion",
    person:"person"
  },
  cutoffDate: new Date("2017-12-31"),
  allowedOrigins: {
    login:'',
    client:'',
    server:''
  },
  mailchimp: {
    apiKey: "",
    listId: "",
    instance: ""
  }
};

