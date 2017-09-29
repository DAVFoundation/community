import Badge from '../models/badge/model';

export const list = async (req, res) => {
  //res.send("get badge list");
  console.log("get badge list");

  let badges = await Badge.find({}).exec();

  //res.json(badges);
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

export const create = async (req, res) => {
  //res.send("create a badge");
  let badgeDetails = {
    title: req.body.title,
    image: req.body.image
  };
  console.log(badgeDetails);
  let newBadge = await Badge.create(badgeDetails);

  res.json(newBadge);
};
