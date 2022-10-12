//exporting self made module which return date

module.exports.getDate =function(){

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleString('en-us', options);

}

module.exports.getDay=function(){

    const options = { weekday: 'long'};
    return new Date().toLocaleString('en-us', options);
}
