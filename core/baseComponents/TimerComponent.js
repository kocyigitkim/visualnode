const FlowComponent = require("../FlowComponent");

class TimerComponent extends FlowComponent{
    init(){
        console.log('Timer initialized');
        this.on('data', (message)=>{
            console.log(message);
        });
    }
}
module.exports = TimerComponent;