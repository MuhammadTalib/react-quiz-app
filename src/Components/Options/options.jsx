import React ,{Component} from 'react';
import "./style.css"

class Options extends Component {
    state = { 
    }
    render() { 
        return ( <button 
                    disabled={!this.props.disable}
                    className="option" 
                    style={{
                        backgroundColor:this.props.option.correct!==undefined?(this.props.option.correct===true?"green":"red"):"#1a1aff"
                    }}
                    onClick={()=>this.props.clickOption(this.props.option)}>
                        {decodeURIComponent(this.props.option.question)}
                </button> );
    }
}
 
export default Options;
