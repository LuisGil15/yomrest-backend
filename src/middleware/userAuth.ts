const jwt = require("jsonwebtoken")

module.exports = (_req: any, res: any, next: any) => {
    const auth = _req.headers.authorization;
    let token = null;
    let decodeToken = null;

    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      token = auth?.substring(7);
    }

    if (token) {
      try {
        decodeToken = jwt.verify(token, "luis");
      } catch (error) {
        res.status(401).json({
          success: false,
          error: "Token invalido",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        error: "Sin token",
      });
    }
    
    let { id } = {id: null};

    try {
        id = decodeToken.id;
    } catch (error) {
        res.status(401).json({
            success: false,
            error: "Token invalido",
        });
    }

    _req.body.idUser = id;

    next()
}
