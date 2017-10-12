import Badge from '../models/badge/model';

export const list = async (req, res) => {

  let badges = await Badge.find({}).exec();

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
  let badgeDetails = {
    title: req.body.title,
    image: req.body.image
  };
  let newBadge = await Badge.create(badgeDetails);

  res.json(newBadge);
};
