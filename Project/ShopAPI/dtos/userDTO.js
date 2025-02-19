const { Expose } = require("class-transformer");


class UserDTO {
  @Expose()
  username;

  @Expose()
  email;
}

module.exports = { UserDTO };
