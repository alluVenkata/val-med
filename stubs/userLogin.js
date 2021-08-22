import uuid from "react-native-uuid";

export default (schema, request) => {
  const requestUser = request.requestBody;
  const foundUser = schema.users.findBy({
    userName: requestUser.userName,
  });
  // console.log(foundUser.attrs);
  if (foundUser && foundUser.password === requestUser.password) {
    const token = uuid.v4();
    delete foundUser.password;
    return {
      userDetails: foundUser,
      token,
      expires: 5 * 60 * 1000,
    };
  }
  return new Response(409);
};

export const defaultUser = () => ({
  userName: "12345",
  password: "test",
  userShortName: "JD",
  name: "John Doe",
  age: "48",
  address: "x/x xxx street Glasgow GXXXX",
});
