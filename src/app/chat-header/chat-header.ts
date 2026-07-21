import { Component } from '@angular/core';
import { RangeSlider } from '../range-slider/range-slider';
import { signal, output, effect } from '@angular/core';



@Component({
  selector: 'app-chat-header',
  imports: [RangeSlider],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.css',
})
export class ChatHeader {
  readonly models = [{'name': 'Liskov', 'desc': 'OOP Expert'}, {'name': 'Turing', 'desc': 'Procedural Programmer / Algorithmist'}, {'name': 'DaVinci', 'desc': 'Creative Thinker'}, {'name': 'Cicero', 'desc': 'Philosopher'}, {'name': 'Shakescene', 'desc': 'Drama Writer'}, {'name': 'Cortana', 'desc': 'Virtual Assistant'}];
  readonly selectedModel = signal<string>(this.models[0].name);
  readonly sliderValue = signal<number>(0.8);
  readonly sliderValueChange = output<number>();
  readonly menuOpen = signal(false);
  readonly useKnowledgeBase = signal(false);
  readonly useKnowledgeBaseChange = output<boolean>();
  constructor() {
    effect(() => {
      this.sliderValueChange.emit(this.sliderValue());
    })
    effect(() => {
      this.useKnowledgeBaseChange.emit(this.useKnowledgeBase());
    })
  }



}
