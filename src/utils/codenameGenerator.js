const codenames= ["The Nightingale","The Kraken"," The Chimera","The Phoenix",
    "The Ghost","The Viper","The Sentine1","The Hawk","The Cobra"
];
const generateCodename = () =>{
    return codenames[Math.floor(Math.random()*codenames.length)];
};
module.exports=generateCodename;