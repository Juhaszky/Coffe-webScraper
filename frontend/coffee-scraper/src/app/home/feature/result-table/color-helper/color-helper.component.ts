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
      <div class="flex mb-1" *ngFor="let color of colors">
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
        box-shadow: 1px 1px 24px 1px rgba(0,0,0,0.2);
        padding: 0.5em;
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
