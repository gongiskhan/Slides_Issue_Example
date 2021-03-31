import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';

import {Question} from './question';
import {TheQuestions} from './theQuestions';
import {StudentAnswer} from './student-answer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('wizardSlider', { static: true } ) slider: IonSlides;

  questions: Question[];
  givenAnswers: StudentAnswer[];
  questionSelectOptions = {
    mode: 'ios'
  };

  // Slider stuff
  prev = false;
  next = true;
  finish = false;

  constructor() {
    this.givenAnswers = [];
    this.createDb();
    this.initStudentAnswers();
  }

  ngOnInit() {
    this.slideHasChanged(0);
  }

  private createDb() {
    this.questions = TheQuestions.questions;
  }

  private initStudentAnswers() {
    const studentAnswer: StudentAnswer = {questionId: null, answer: '', rightAnswer: null};
    this.questions.forEach(elem => {
      this.givenAnswers.push(studentAnswer);
    });
  }

  private setAnswer(questionNumber: number, questionId: number, answer: string, rightAnswer: boolean) {
    // console.log(`student answered question ${questionId + 1} -> ${answer} -> is right = ${rightAnswer}`);
    const theAnswer: StudentAnswer = {questionId, answer, rightAnswer};
    this.givenAnswers[questionNumber] = theAnswer;
  }

  private hasAnswer(question: Question) {
    return !!this.givenAnswers[question.id];
  }

  private gotoSlide(i) {
    this.slider.slideTo(i, 300);
    return false;
  }

  private changeSlide(index: number): void {
    if (index > 0) {
      this.slider.slideNext(300);
    } else {
      this.slider.slidePrev(300);
    }
  }

  private slideHasChanged(index?: number): void {
    try {
      this.slider.isBeginning().then(value => this.prev = !value);
      this.slider.isEnd().then(value => this.next = !value);
      this.slider.isEnd().then(value => this.finish = value);
    } catch (e) { }
  }
}
