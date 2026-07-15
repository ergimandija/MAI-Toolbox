import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-starter-page',
  imports: [RouterModule, Navbar],
  templateUrl: './starter-page.html',
  styleUrl: './starter-page.css',
})
export class StarterPage {}
