module.exports = {
  cron: {
    pattern: "00 00 17 * * *", // 5PM everyday
    timeZone: "America/New_York"
  },
  nodemailer: {
    service: "Mailgun",
    auth: {
      user: "",
      pass: ""
    }
  }
}
