import Person from '../models/person/model';

export const single = async (req, res) => {

  let person = await Person.findById(req.params.userId).exec();

  res.json(person);

}
