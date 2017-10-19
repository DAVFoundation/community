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
    station:"station",
    person:"person"
  },
  cutoffDate: new Date("2017-12-31"),
  allowedOrigins: [],
  mailchimp: {
    apiKey: "",
    listId: "",
    instance: ""
  }
};

