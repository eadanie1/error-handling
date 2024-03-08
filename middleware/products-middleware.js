export const productsMiddleware = (req, res, next) => {
  console.log(`Thank you for choosing to shop with us, 
  please wait while we process your request`);
  next();
};