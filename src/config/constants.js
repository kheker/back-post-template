export const SchemaList = {
  users: {
    create: ["email", "password", "fullName"],
    update: ["fullName", "avatar", "biography", "skills", "country"]
  },
  posts: {
    create: ["category", "title", "description", "tags", "fixedValue", "owner"],
    update: ["category", "title", "description", "tags", "fixedValue", "owner"]
  }
};

export default {
  PORT: process.env.PORT || 4000,
  MONGO_URL: "mongodb://127.0.0.1/app-dev",
  JWT_SECRET: "unallavemuysecreta",
};
