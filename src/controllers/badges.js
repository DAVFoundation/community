export const list = (req, res) => {
  //res.send("get badge list");
  console.log("get badge list");
  res.json({
    badgeIds : [3,5],
    badgesById : {
      3 : {
        id: 3,
        img: "founder",
        title: "API Founder"
      },
      5 : {
        id: 5,
        img : "contributor",
        title: "API Contributor"
      }
    }
  });
};

export const create = (req, res) => {
  //res.send("create a badge");
  console.log("create badge");
  res.send("badge created");
};
