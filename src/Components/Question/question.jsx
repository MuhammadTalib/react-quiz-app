import React, { Component } from 'react'
import "./style.css"
import Option from "../Options/options"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
class Question extends Component {
    state = { 
        optionArray:[],
        clickedOption:null,
        correctOption:null,
        incorrectOption:null,
        optionIndex:Math.floor(Math.random() * 3),
        Answer:"",
    }
    getQuestion(q){
        var array=q.incorrect_answers
        array.splice(this.state.optionIndex , 0, q.correct_answer)
        return array
    }
    componentDidMount(){
        var o=this.getQuestion(this.props.question).map(m=>{
            return{
                question:m
            }
        })
        this.setState({optionArray:o})
    }
    componentWillReceiveProps(next){
        var o=this.getQuestion(next.question).map(m=>{
            return{
                question:m
            }
        })
        if(next.question.question!==this.props.question.question){
            this.setState({
                optionArray:o,
                clickedOption:null,
                correctOption:null,
                incorrectOption:null,
                optionIndex:Math.floor(Math.random() * 3),
                Answer:"",
            })
        }
    }
    onOptionClick(m,i){
        var array=this.state.optionArray,ans=""
        if(m.question===this.props.question.correct_answer){
            array[i].correct=true
            ans="Correct Answer"
            this.props.correctQuestion()
        }else{
            array[this.state.optionIndex].correct=true
            array[i].correct=false
            ans="Wrong Answer"
            this.props.wrongQuestion()
        }
        this.setState({optionArray:array,Answer:ans})

    }
    render() { 
        return ( <div className="qno-wrapper">
            <h1 className="qno-heading">
                Question {this.props.index+1} of {this.props.totalQno}
            </h1>
            <p className="qno-category">{decodeURIComponent(this.props.question.category)}</p>
            <span style={{
            }}>
            
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon style={{
                color:this.props.question.difficulty==="easy" && "#dedede"
            }} icon={faStar} />
            <FontAwesomeIcon style={{
                color:(this.props.question.difficulty==="easy" || this.props.question.difficulty==="medium") && "#dedede"
            }} icon={faStar} />


            </span>
            <h4 className="qno-question">
                {decodeURIComponent(this.props.question.question)}
            </h4>

            {this.state.optionArray.map((m,index)=>{
                return <Option 
                            key={index} 
                            option={m}
                            correctOption={this.props.question.correct_answer}
                            clickOption={()=>this.onOptionClick(m,index)}
                            disable={this.state.Answer===""}
                        />
            }) }
            <h3 className="qno-answer">{this.state.Answer}</h3>
            {this.state.Answer !== "" && <button onClick={this.props.nextQuestion} className="next-question">Next Question</button>}
        </div>
             );
    }
}
 
export default Question;