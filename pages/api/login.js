import axios from "axios";

const urlApi = "https://accounts.interparking.com/connect/token";

const login = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { client_id, client_secret, scope, grant_type } = req.body;

      try {
        const resposta = await axios.post(
          urlApi,
          {
            ...req.body,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        const token = resposta.data.access_token;
        return res.status(200).json({
          success: true,
          token: token,
          message: "Login Success",
        });
      } catch (error) {
        console.log(error.response.status);
        return res.status(400).json({
          success: false,
          message: error?.message,
        });
      }
  }
};
export default login;
