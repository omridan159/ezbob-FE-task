export type ServerError = {
   response: {
      data: {
         message: string;
         code: number;
         stack?: string;
      };
   };
};
