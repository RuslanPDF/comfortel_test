import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";


export const FromForm = (schema: string) => {
  const params = extractParams(schema);
  
  const properties = {};
  const decorators: MethodDecorator[] = [ApiConsumes("multipart/form-data")];
  
  for(const item of params) {
    properties[item[0]] = {
      type: item[1] == "number" ? "number" : "string"
    };
    
    if (item[1] == "file") {
      properties[item[0]].type = "binary";
      decorators.push(UseInterceptors(FileInterceptor(item[0])));
    }
  }
  
  decorators.push(ApiBody({
    schema: {
      type: "object",
      properties
    }
  }));
  
  return applyDecorators(...decorators);
}

function extractParams(schema: string): string[][] {
  const matches = Array.from(schema.matchAll(/{(\w+):(\w+)}/g));
  return matches.map(x => [x[1], x[2]]);
}

