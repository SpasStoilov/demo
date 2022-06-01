const { validationResult } = require("express-validator");
const useBackService = require('./services.js');

//------ Request Hendler Functions ----:

function home (req, res) {
    // const User = req.session.user;
    console.log('S:>>> HomeHandler acting...');
    console.log('S:>>> HomeHandler: User ->', req.session.user)
    console.log('S:>>> HomeHandler: Render: home.hbs')
    res.render('home.hbs', req.session);
};


async function register (req, res) {

    console.log('S:>>> RegisterHandler acting...');
    console.log('S:>>> RegisterHandler: User ->', req.session.user)
    console.log('S:>>> RegisterHandler: Saving User...');
    const { user } = req.session; // UserObj/ErrorOBJ

    console.log('S:>>> RegisterHandler: Delete User from session:');
    delete req.session.user;

    console.log('S:>>> RegisterHandler: Try Register User:', user);

    //  if defind go in = user not found
    if (user.errmsg) {

        console.log('S:>>> RegisterHandler: User Not found!');
        
        let {email, username, password} = req.body;
        const [...ServerErrReport] = validationResult(req).errors;
        
        console.log('S:>>> RegisterHandler: REQUEST Body:', req.body);

        if (JSON.stringify(ServerErrReport) !== '[]') {
            console.log('S:>>> RegisterHandler: SEVER ERRORS REPORT:', ServerErrReport);
            console.log('S:>>> RegisterHandler: Response ServerErrReport');
            res.json(ServerErrReport);
        } 
        else {
            const DataBaseErrReport = await useBackService.userCreation(email, username, password);
            if (JSON.stringify(DataBaseErrReport) !== '[]') {
                console.log('S:>>> RegisterHandler: DATABASE ERRORS REPORT:', DataBaseErrReport);
                console.log('S:>>> RegisterHandler: Response DataBaseErrors Reports!');
                res.json( DataBaseErrReport);
            } else {
                console.log('S:>>> RegisterHandler: Response UserFormData!');
                res.json(req.body);
            }
        };
    } 
    //  if undefind go in = user found
    else {
        console.log('S:>>> RegisterHandler: User FOUND!');
        console.log('S:>>> RegisterHandler: Response Message - User Exist!');
        res.json({errmsg: 'User Exist'});
    };

};


function logIn (req, res) {

    console.log('S:>>> LogIN Handler acting...');
    console.log('S:>>> LogIN Handler: Session:', req.session.user)

    const { user } = req.session; // UserObj/ErrorOBJ
    console.log('>>> LogIN Handler: User Try to log:', user);

    if (user.errmsg) {
        console.log('S:>>> LogIN Handler: Delete User');
        delete req.session.user;
    } else {
        // add accessToken to user:
        // req.session.user.accessToken = "somthing";
    };

    console.log('S:>>> LogIN Handler: Response User!');
    res.json(user);

};

function logout (req, res) {
    console.log('S:>>> LogOut Handler acting...');
    console.log('S:>>> LogOut Handler: Session:', req.session.user)
    delete req.session.user;
    res.redirect('/');
}

//------ Hendler Registrations ----:
const useHandler = {
    home,
    register,
    logIn,
    logout
};

module.exports = useHandler;









//JUNK

// const FILTERDServerErrReport = ServerErrReport.filter( err => {
//     let found = repeatErrors.find( field => {
//         return err.param === field;
//     });

//     if (!found) {
//         repeatErrors.push(err.param)
//         return true  
//     };
//     return false
// });

// console.log('>>> FILTERED ERRORS:', FILTERDServerErrReport);