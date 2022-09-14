import { Component, OnInit } from '@angular/core';
import { QuesServService } from '../service/ques-serv.service';
import { interval } from 'rxjs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  // progress: number = 0;
  isQuizCompleted:Boolean=false

  constructor(private question_service: QuesServService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    // this.getProgressPercent();
    this.startCounter();
  }
  getAllQuestions() {
    this.question_service.getQuestion()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
    if(this.currentQuestion===this.questionList.length){
      
    }
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currQno: number, option: any) {
    if(currQno===this.questionList.length){
      this.isQuizCompleted=true;
      this.startCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();  
      },1000);
      // this.getProgressPercent();
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.points -= 10;  
      }, 1000);
      // this.getProgressPercent();
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
          
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.interval$.unsubscribe();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    // this.progress = 0;
  }
  get progress() {
    // this.progress = ((this.currentQuestion / (this.questionList).length) * 100)
    return `${Math.ceil(((this.currentQuestion / (this.questionList).length) * 100))}%`;
  }
}
