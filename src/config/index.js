module.exports = {
  dav:{
    name: process.env.DAV_ACCOUNT_NAME || "DAV Foundation",
    email: process.env.DAV_ACCOUNT_EMAIL || "tal@dav.network",
    password: process.env.DAV_ACCOUNT_PASSWORD || "12345"
  },
  session: {
    secret: process.env.SESSION_SECRET || ""
  },
  mongo:{
    url: process.env.MONGO_URL || "mongodb://mongo:27017"
  },
  accountType:{
    vehicle: "vehicle",
    station: "station",
    person: "person"
  },
  cutoffDate: new Date("2017-12-31"),
  allowedOrigins: (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(',')) || [],
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || "",
    listId: process.env.MAILCHIMP_LIST_ID || "",
    instance: process.env.MAILCHIMP_INSTANCE || ""
  },
  generateData: true,
  ethNode: 'http://pub-node1.etherscan.io:8545'
};
