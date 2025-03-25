const logoutController = {};

logoutController.logout = async (req, res) => {
    //Delete Cookies
    res.clearCookie("authToken");

    //Report Logout
    return res.json({message: "Logged Out"})
}

//Export
export default logoutController;