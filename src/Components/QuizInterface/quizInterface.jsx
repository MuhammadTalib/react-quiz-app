import React, { Component } from 'react'
import ProgressBar from "../ProgressBar/progressBar"
import quizData from "../../questions.json"
import Question from "../Question/question"
class QuizInterface extends Component {
    state = { 
        questions:quizData,
        currentQnoIndex:0,
        currentQno:quizData[0],
        correct:0,
        wrong:0,
        firstProgress:0,
        secondProgress:100,
        thirdProgress:0,
    }

    nextQuestion=()=>{
        var index=this.state.currentQnoIndex
        this.setState({currentQnoIndex:index+1})
        if(index+1<=quizData.length){
            this.setState({currentQno:quizData[index+1]})
        }
    }
    correctQuestion=()=>{
        console.log('correct')
        var fp=Math.round(((this.state.correct+1)/(this.state.correct+1+this.state.wrong))*100);
        var sp=Math.round(((this.state.questions.length-this.state.wrong)/this.state.questions.length)*100);
        var tp=Math.round(((this.state.correct+1)/this.state.questions.length)*100);
        
        this.setState({correct:this.state.correct+1})
        this.setState({
            firstProgress:fp,
            secondProgress:sp,
            thirdProgress:tp,
        })
    }
    wrongQuestion=()=>{
        console.log('wrong')

        var fp=Math.round(((this.state.correct)/(this.state.correct+this.state.wrong+1))*100);
        var sp=Math.round(((this.state.questions.length-this.state.wrong-1)/this.state.questions.length)*100);
        var tp=Math.round(((this.state.correct)/this.state.questions.length)*100);
        this.setState({
            firstProgress:fp,
            secondProgress:sp,
            thirdProgress:tp,
        })
        this.setState({wrong:this.state.wrong+1})

    }
    render() { 
        return ( <div>
            <ProgressBar 
                progressStyle={{
                    height:'20px',
                    width:'100%',
                    borderRadius:'0px',
                }}
                filler={[
                    {
                        width: `${((this.state.currentQnoIndex)/quizData.length)*100}%`,
                        background:'#999999'
                    }
                ]}
            />
            {this.state.currentQnoIndex+1<=quizData.length && <Question 
                index={this.state.currentQnoIndex}
                totalQno={this.state.questions.length}
                question={this.state.currentQno}
                nextQuestion={this.nextQuestion}
                correctQuestion={this.correctQuestion}
                wrongQuestion={this.wrongQuestion}
            />}
            <ProgressBar 
                progressStyle={{
                    position:"absolute",
                    top:"96%",
                    left:"50%",
                    transform:"translateX(-50%)",
                    height:'20px',
                    width:'80%',
                    borderRadius:'4px',
                    border:'1px solid black',
                }}
                filler={[{
                    width: `${this.state.firstProgress}%`,
                    background:'blue',
                    zIndex:Math.round(100-this.state.firstProgress)
                },{
                    width: `${this.state.secondProgress}%`,
                    background:'pink',
                    zIndex:Math.round(100-this.state.secondProgress)
                },{
                    width: `${this.state.thirdProgress}%`,
                    background:' #1a1a1a',
                    zIndex:Math.round(100-this.state.thirdProgress)
                }]}
            />
            
            <div style={{
                fontSize:"15px",
                height:"40px",
                position: "absolute",
                top: "86%",
                left: "10%",

            }}>Score: {this.state.firstProgress+"%"}</div>

            <div style={{
                fontSize:"15px",
                height:"40px",
                position: "absolute",
                top: "86%",
                left: "82%"
            }}>Max Score: {this.state.secondProgress}%</div>
            
        </div> );
    }
}
 
export default QuizInterface;