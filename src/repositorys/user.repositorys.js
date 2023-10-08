const {prisma} = require("../services/prisma")

exports.createUser = async(data) => {

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password}
    });
    return user;
}