import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe  {
  // transform(value: any, args?: any): any {

  //   if(!value) return null;
  //   if(!args) return value;

  //   args= args.toLowerCase();

  //   return value.filter((item:any)=>{
  //     return JSON.stringify(item).toLowerCase().includes(args);
  //   })

  // }

  // transform(
  //   value: any[],
  //   filterString: string,
  //   propName1: string,
  //   propName2: string
  // ): any[] {
  //   const result: any = [];
  //   if (!value || filterString == '' || propName1 == '' || propName2 == '') {
  //     return value;
  //   }

  //   value.forEach((a: any) => {
  //     if (
  //       a[propName1]
  //         .trim()
  //         .toLowerCase()
  //         .includes(filterString.toLowerCase()) ||
  //       a[propName2].trim().toLowerCase().includes(filterString.toLowerCase())
  //     ) {
  //       result.push(a);
  //     }
  //   });
  //   return result;
  // }
}
