export const processData = (data:any) => {
    return [
        { name: 'A', value: data.reduce((acc:any, item:any) => acc + item.A, 0) },
        { name: 'B', value: data.reduce((acc:any, item:any) => acc + item.B, 0) },
        { name: 'C', value: data.reduce((acc:any, item:any) => acc + item.C, 0) },
        { name: 'D', value: data.reduce((acc:any, item:any) => acc + item.D, 0) },
        { name: 'E', value: data.reduce((acc:any, item:any) => acc + item.E, 0) },
        { name: 'F', value: data.reduce((acc:any, item:any) => acc + item.F, 0) },
      ];
};