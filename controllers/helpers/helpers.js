// Renders Webpages
function serveWebpage({ session, baseUrl }, res, webpageName) {
    try {
        res.render(webpageName, {
            userID: session.userID,
            isLoggedin: session.isLoggedIn,
            isHomeRoute: baseUrl === '/Home',
            isLoginRoute: baseUrl === '/Login',
            isSignupRoute: baseUrl === '/Signup',
            isDashboardRoute: baseUrl === '/Dashboard'
        });
    }
    catch(error) {
        const errMsg = `Internal Server Error when trying to render ${webpageName} Webpage in '${baseUrl}' route!`;
        res.status(500).send(errMsg);
        console.error(errMsg);
        throw error;
    }
}


// Authenticates User
const withAuth = ({ session, baseUrl }, res, next) => {
    if(session.isLoggedIn) {
        res.redirect(`${baseUrl}/:${session.userID}`);
    }
    else next();
}


// Exporting Modules
module.exports = { serveWebpage, withAuth }