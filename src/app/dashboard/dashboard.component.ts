import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  goalStatusChart: any;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.fetchGoalData();
  }

  fetchGoalData() {
    this.goalService.getAllGoals().subscribe(
      (response) => {
        if (response.status) {
          const goals = response.data;
          const statusCounts = this.countStatuses(goals);
          this.initializeChart(statusCounts);
        } else {
          console.error('Failed to fetch goals:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching goals:', error);
      }
    );
  }

  countStatuses(goals: any[]): { inProgress: number; completed: number; notStarted: number } {
    const statusCounts = {
      inProgress: 0,
      completed: 0,
      notStarted: 0,
    };

    for (const goal of goals) {
      if (goal.status === 'in progress') {
        statusCounts.inProgress++;
      } else if (goal.status === 'completed') {
        statusCounts.completed++;
      } else if (goal.status === 'not started') {
        statusCounts.notStarted++;
      }
    }

    return statusCounts;
  }

  initializeChart(statusCounts: { inProgress: number; completed: number; notStarted: number }) {
    this.goalStatusChart = new Chart('goalStatusChart', {
      type: 'doughnut', 
      data: {
        labels: ['In Progress', 'Completed', 'Not Started'],
        datasets: [
          {
            data: [
              statusCounts.inProgress,
              statusCounts.completed,
              statusCounts.notStarted,
            ],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Colors for the chart
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
