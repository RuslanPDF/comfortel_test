import { applyDecorators, Controller, Scope } from "@nestjs/common";
import "reflect-metadata";

export function ApiController(){
  return (target: Function) => {
    const controllerName = target.name;
    const splitControllerName = controllerName.split(/(?=[A-Z])/);
    
    if (splitControllerName[splitControllerName.length - 1] == "Controller") {
      splitControllerName.pop();
    } else {
      throw new Error(`Incorrect controller name for controller - ${controllerName}`);
    }
    
    const route = splitControllerName
      .map(x => x.toLowerCase())
      .join("-");
    
    const result: ClassDecorator[] = [Controller({path: route, scope: Scope.REQUEST})];
    
    applyDecorators(...result)(target);
  }
}
