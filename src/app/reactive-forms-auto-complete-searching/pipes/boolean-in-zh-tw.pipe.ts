import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanInZhTw'
})
export class BooleanInZhTwPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? '是' : '否';
  }

}
