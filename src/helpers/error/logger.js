module.exports = (error, isWarn = false) => {
    try {
        if(process.env.NODE_ENV === 'test') {
            return true;
        }
        if (isWarn) {
            console.log(error);
        } else {
            console.error(error);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};