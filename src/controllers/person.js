import Person from '../models/person/model';

export const single = async (req, res) => {

  if(req.isAuthenticated()){
    console.log("Authenticated");
    return res.json(req.user);
  }

  return res.status(403).send("Access Denied");


  // let person = await Person.findById(req.params.userId).exec();

  // res.json(person);

};
