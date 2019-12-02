const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

module.exports = (app) => {
    app.use(bodyParser.json({limit: '30mb', extended: true}));
    app.use(bodyParser.urlencoded({limit: '30mb', extended: true, parameterLimit: 1000000}));
    app.use(cors());
    app.options('*', cors());

    /** Ligando o stalker **/
    const logControl = require("./LogControlExpress");
    app.use(morgan(logControl));

    /**Abrindo a bunda no cors ALGUEM ME SALVA!!!**/
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        //intercepts OPTIONS method
        if ("OPTIONS" === req.method) {
            //respond with 200
            res.send(200);
        } else {
            //move on
            next();
        }
    });

    /** Robots no Pass **/
    app.use('/robots.txt', function (req, res, next) {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    });

    /** Se o cara tentar acessar usando so o ip vai tomar na cara **/
    app.use(function (req, res, next) {
        let blocks = req.headers.host.split(".");
        if (blocks.length === 4) {
            for (let i = 0; i < blocks.length; i++) {
                if (parseInt(blocks[i], 10) >= 0 && parseInt(blocks[i], 10) <= 255) {
                    return res.status(401).json({
                        error: "not authorized"
                    });
                }
            }
        }
        next()
    });

    /** Se entrar direto no / vai tomar na cara **/
    app.get("/", (req, res, next) => {
        return res.status(401).json({
            error: "not authorized"
        });
    });
};
