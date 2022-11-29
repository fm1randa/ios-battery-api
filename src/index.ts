import api from "./api";

api.listen(80, () => {
  console.log("Server started on port 80");
});
