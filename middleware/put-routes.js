import { accountSettingsSchema } from "../app.js";

export const putRoutes = () => (req, res, next) => {
  if (req.method === 'PUT') {
    const { error, value } = accountSettingsSchema.validate(req.user);
    if (error) {
      return res.status(400).send(error.message);
    }
  }
  next();
};