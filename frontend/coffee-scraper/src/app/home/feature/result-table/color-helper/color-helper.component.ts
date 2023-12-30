import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonColors } from 'src/app/shared/configs/colors.config';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'color-helper',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  template: `
    <div class="color-helper-box">
      <div class="line-row" *ngFor="let color of colors">
        <h3 pTooltip="{{ color.toolTip }}">
          <span style="background-color:{{ color.color }}"></span
          >{{ color.name }}
        </h3>
      </div>
    </div>
  `,
  styles: [
    `
      .color-helper-box {
        border: 1px solid #5a5a5a;
        padding: 1em;
        border-radius: 1em;
        text-align: center;
      }
      h2 {
        margin-bottom: 1rem;
      }
      h3 {
        text-align: left;
        &:hover {
          cursor: pointer;
        }
      }
      span {
        display: inline-block;
        min-height: 0.5rem;
        width: 1rem;
        margin-right: 0.5rem;
        max-height: 1px;
      }
      .line-row {
        display: flex;
        justify-content: left;
        flex-direction: row;
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class ColorHelperComponent {
  colors = [
    {
      name: 'Increased',
      color: ComparisonColors.INCREASED,
      toolTip: 'Price increased',
    },
    {
      name: 'Decreased',
      color: ComparisonColors.DECREASED,
      toolTip: 'Price decreased',
    },
    {
      name: 'Equals',
      color: ComparisonColors.EQUALS,
      toolTip: 'Price not changed',
    },
  ];
}
