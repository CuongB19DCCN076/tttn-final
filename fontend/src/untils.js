export const isJsonToString = async (data) => {
    try{
        await JSON.parse(data);
    }catch(err){
        return false
    }
    return true;
}