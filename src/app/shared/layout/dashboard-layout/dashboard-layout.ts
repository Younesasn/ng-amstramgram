import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Header, RouterOutlet],
  standalone: true,
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {}
