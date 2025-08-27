import { applyDecorators, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { ApiOkResponseGeneric } from "./apiOkResponseGeneric.decorator";


export const HttpPost = (route: string = "", responseType: any = null) => {
  return collectDecorators(Post, route, responseType);
}

export const HttpGet = (route: string = "", responseType: any = null) => {
  return collectDecorators(Get, route, responseType);
}

export const HttpPut = (route: string = "", responseType: any = null) => {
  return collectDecorators(Put, route, responseType);
}

export const HttpDelete = (route: string = "", responseType: any = null) => {
  return collectDecorators(Delete, route, responseType);
}

function collectDecorators(
  restDecorator: (path?: string | string[]) => MethodDecorator,
  route: string,
  responseType: any
) {
  const params = extractParams(route);
  const decorators: any = [
    ...params.map(x => ApiParam({
      name: x[0],
      type: x[1] == "number" ? Number : String,
      required: true,
    }))
  ];

  const normalizedRoute = normalizeRoute(route);
  decorators.push(restDecorator(normalizedRoute));

  if (responseType != null) {
    decorators.push(ApiOkResponseGeneric(responseType));
  }

  return applyDecorators(...decorators);
}

function extractParams(route: string): string[][] {
  const matches = Array.from(route.matchAll(/{(\w+):(\w+)}/g));
  return matches.map(x => [x[1], x[2]]);
}

function normalizeRoute(route: string): string {
  return route.replace(/{(\w+):\w+}/g, ":$1");
}
